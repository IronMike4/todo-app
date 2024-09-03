import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = ({ onLogin }) => {
  const [message, setMessage] = useState(""); // State to manage success or error messages
  const [error, setError] = useState(""); // State to manage form validation errors
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (credentials) => {
    const { username, password } = credentials;

    // Check if both fields are filled
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      // Make POST request to login endpoint
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        credentials
      );

      // If login is successful and token is received
      if (res.data.token) {
        onLogin(res.data.token); // Pass the token to the parent component for authentication
        setMessage("Login successful! Redirecting to tasks...");

        // Redirect to tasks page after a short delay
        setTimeout(() => navigate("/tasks"), 2000);
      } else {
        setMessage("Login failed.");
      }
    } catch (err) {
      // Handle login failure
      setMessage("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg rounded-lg overflow-hidden">
            <div className="card-header bg-primary text-white text-center py-4">
              <h4 className="mb-0">Welcome Back</h4>
            </div>
            <div className="card-body bg-light p-4">
              {/* Render the AuthForm component for user input */}
              <AuthForm onSubmit={handleLogin} errorMessage={error} />
              {/* Display success or error message */}
              {message && (
                <div className="alert alert-info mt-3 text-center">
                  {message}
                </div>
              )}
            </div>
            <div className="card-footer bg-light text-center py-3">
              <p className="mb-0">
                Don't have an account?{" "}
                <a href="/register" className="text-primary fw-bold">
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
