const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User schema definition
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add an email"], // Email is required
    unique: true, // Must be unique
    trim: true,
    lowercase: true, // Convert to lowercase
  },
  password: {
    type: String,
    required: [true, "Please add a password"], // Password is required
    minlength: 6, // Minimum length of password
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip if password is not modified
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash password
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare hashed passwords
};

// Export the User model
module.exports = mongoose.model("User", userSchema);
