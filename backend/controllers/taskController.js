const Task = require("../models/Task");

// Retrieve all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    // Find tasks associated with the authenticated user
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks); // Respond with the list of tasks
  } catch (err) {
    // Handle errors and respond with a server error
    res.status(500).json({ error: err.message });
  }
};

// Add a new task for the authenticated user
exports.addTask = async (req, res) => {
  const { content } = req.body;

  // Ensure content is provided
  if (!content) {
    return res.status(400).json({ error: "Task content is required" });
  }

  try {
    // Create and save a new task
    const task = await Task.create({ content, user: req.user._id });
    res.status(201).json(task); // Respond with the created task
  } catch (err) {
    // Handle errors and respond with a server error
    res.status(500).json({ error: err.message });
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    // Find the task by ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Update the task content if provided
    task.content = content || task.content;
    await task.save(); // Save the updated task
    res.json(task); // Respond with the updated task
  } catch (err) {
    // Handle errors and respond with a server error
    res.status(500).json({ error: err.message });
  }
};

// Delete an existing task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Attempting to delete task with ID:", id);

    // Find the task by ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Delete the task
    await task.deleteOne(); // Updated method
    console.log("Task removed successfully");
    res.json({ message: "Task removed" }); // Confirm deletion
  } catch (err) {
    // Handle errors and respond with a server error
    console.error("Error in deleteTask:", err.message);
    res.status(500).json({ error: err.message });
  }
};
