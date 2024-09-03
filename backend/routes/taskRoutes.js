const express = require("express");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const {
  protect,
  validationMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Add a new task
router.post("/", validationMiddleware, addTask);

// Update an existing task by ID
router.put("/:id", validationMiddleware, updateTask);

// Delete a task by ID
router.delete("/:id", deleteTask);

// Get all tasks for the authenticated user
router.get("/", getTasks);

module.exports = router;
