const mongoose = require("mongoose");

// Task schema definition
const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true, // Task content is required
      maxlength: 140, // Max length of task content
    },
    completed: {
      type: Boolean,
      default: false, // Default value for completion status
    },
  },
  { timestamps: true }
); // Add createdAt and updatedAt fields

// Export the Task model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
