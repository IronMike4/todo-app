import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const TaskPage = ({ token }) => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the server
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5001/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }, // Authorization header
      });
      setTasks(res.data); // Update tasks
    } catch (err) {
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Add a new task
  const handleAddTask = async (content) => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/tasks",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
    } catch (err) {
      setError("Failed to add task. Please try again later.");
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError(`Failed to delete task. ${err.message}`);
    }
  };

  // Edit a task
  const handleEditTask = async (id, content) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/tasks/${id}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      setError("Failed to edit task. Please try again later.");
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mt-5">
      <h2>Your Tasks</h2>
      <TaskForm onSubmit={handleAddTask} />
      {loading && <div>Loading tasks...</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskPage;
