import React, { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the content exceeds 140 characters
    if (content.length > 140) {
      setError("Task cannot exceed 140 characters.");
    } else {
      setError("");
      onSubmit(content); // Submit the task content
      setContent(""); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Task input field */}
      <div className="form-group">
        <label htmlFor="taskContent">New Task</label>
        <textarea
          id="taskContent"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          placeholder="Enter your task (max 140 characters)"
          maxLength="140"
          required
        />
        {/* Display error message if content exceeds 140 characters */}
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary mt-3">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
