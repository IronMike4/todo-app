const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Handle user registration
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Ensure the username is a Gmail address
  if (!username.endsWith("@gmail.com")) {
    return res
      .status(403)
      .json({ error: "Only Gmail addresses are allowed for registration." });
  }

  // Validate input fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  try {
    // Create a new user
    const user = await User.create({ username, password });

    // Generate a token for the user
    const token = generateToken(user._id);

    // Respond with the token
    res.json({ token });
  } catch (err) {
    // Handle registration errors
    res.status(400).json({ error: err.message });
  }
};

// Handle user login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists and password is correct
    if (user && (await user.comparePassword(password))) {
      // Generate a token for the user
      const token = generateToken(user._id);

      // Respond with the token
      res.json({ token });
    } else {
      // Invalid credentials
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    // Handle login errors
    res.status(400).json({ error: err.message });
  }
};
