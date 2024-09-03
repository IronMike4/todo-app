import React, { useState } from "react";

const AuthForm = ({ onSubmit, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onSubmit({ username, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username input field */}
      <div className="form-group mb-3">
        <label htmlFor="username" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="username"
          className="form-control form-control-lg border-0 shadow-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password input field */}
      <div className="form-group mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control form-control-lg border-0 shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Display error message if provided */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-lg w-100">
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
