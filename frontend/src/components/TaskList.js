import React, { useState } from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  // Start editing a task
  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditingContent(task.content);
  };

  // Handle saving edited task
  const handleEdit = (taskId) => {
    if (editingContent.length <= 140) {
      onEdit(taskId, editingContent);
      setEditingTaskId(null); // Exit editing mode
    } else {
      alert("Task cannot exceed 140 characters.");
    }
  };

  return (
    <ul className="list-group">
      {/* Render list of tasks */}
      {tasks.map((task) => (
        <li
          key={task._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {/* Conditional rendering for editing mode */}
          {editingTaskId === task._id ? (
            <div className="flex-grow-1">
              <textarea
                className="form-control"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                maxLength="140"
                rows="2"
              />
            </div>
          ) : (
            <span className="flex-grow-1">{task.content}</span>
          )}
          <div className="btn-group">
            {/* Edit or save button */}
            {editingTaskId === task._id ? (
              <button
                onClick={() => handleEdit(task._id)}
                className="btn btn-success btn-sm"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEditing(task)}
                className="btn btn-primary btn-sm"
              >
                Edit
              </button>
            )}
            {/* Delete button */}
            <button
              onClick={() => onDelete(task._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
