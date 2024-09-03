const validationMiddleware = (req, res, next) => {
  // Log the request method and headers for debugging purposes
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);

  // Check if the request method is POST or PUT
  if (["POST", "PUT"].includes(req.method)) {
    // Ensure the content type is application/json
    if (req.headers["content-type"] !== "application/json") {
      return res
        .status(400)
        .json({ error: "Invalid content type. Only JSON is allowed." });
    }

    // Check if the request body contains content and if it exceeds 140 characters
    if (req.body.content && req.body.content.length > 140) {
      return res
        .status(400)
        .json({ error: "Task content exceeds 140 characters." });
    }
  }

  // Proceed to the next middleware or route handler if all validations pass
  next();
};

module.exports = validationMiddleware;
