const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    // Log connection errors
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
