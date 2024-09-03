import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const [message, setMessage] = useState(""); // State for success or informational messages
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle form submission for user registration
  const handleRegister = async (credentials) => {
    const { username, password } = credentials;

    // Validate that both fields are filled
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      // Send POST request to register user
      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        credentials
      );
      if (res.data.token) {
        // On success, show a message and redirect to login
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Registration failed.");
      }
    } catch (err) {
      // Handle errors based on response status
      if (err.response && err.response.status === 403) {
        setError("Only Gmail addresses are allowed for registration.");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      {" "}
      {/* Container for centering and padding */}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg rounded-lg overflow-hidden">
            <div className="card-header bg-primary text-white text-center py-4">
              <h4 className="mb-0">Create Your Account</h4>{" "}
              {/* Header for the registration card */}
            </div>
            <div className="card-body bg-light p-4">
              <AuthForm onSubmit={handleRegister} errorMessage={error} />
              {message && (
                <div className="alert alert-info mt-3 text-center">
                  {message}
                </div>
              )}{" "}
              {/* Display registration success or info messages */}
            </div>
            <div className="card-footer bg-light text-center py-3">
              <p className="mb-0">
                Already have an account?{" "}
                <a href="/login" className="text-primary fw-bold">
                  Login
                </a>
              </p>{" "}
              {/* Link to login page */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
