import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => (
  <div className="container mt-5">
    {/* Centered row for main content */}
    <div className="row justify-content-center">
      <div className="col-md-8 text-center">
        {/* Jumbotron for welcoming message */}
        <div className="jumbotron bg-primary text-white rounded-lg p-5 shadow-lg">
          <h1 className="display-4 mb-4">Welcome to the To-Do List App</h1>
          <p className="lead mb-4">
            Manage your tasks efficiently with our simple and intuitive app.
          </p>
          {/* Links to login and registration pages */}
          <Link to="/login" className="btn btn-light btn-lg mx-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-light btn-lg mx-2">
            Register
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
