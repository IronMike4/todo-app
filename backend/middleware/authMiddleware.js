const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;
  // Check if authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach user to request object
      req.user = await User.findById(decoded.id).select("-password");

      // Log authenticated user details
      console.log("Authenticated user:", req.user);

      // Ensure user has a Gmail address
      if (!req.user.username.endsWith("@gmail.com")) {
        return res
          .status(403)
          .json({ error: "Forbidden: Only Gmail users are allowed." });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error("Error in authentication middleware:", err);
      res.status(401).json({ error: "Not authorized, token failed" }); // Respond with unauthorized error
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" }); // Respond with unauthorized error if no token is present
  }
};

// Middleware for validation
const validationMiddleware = (req, res, next) => {
  // Reject requests with non-JSON content types
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({ error: "Invalid content type" });
  }

  // Reject tasks with content exceeding 140 characters
  if (req.body.content && req.body.content.length > 140) {
    return res
      .status(400)
      .json({ error: "Task content exceeds 140 characters" });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = { protect, validationMiddleware };
