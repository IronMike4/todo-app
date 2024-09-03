import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";

const App = () => {
  const [token, setToken] = useState(null); // State to store authentication token

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken); // Restore token from localStorage if it exists
    }
  }, []);

  // Handle login by saving the token and updating state
  const handleLogin = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Pass handleLogin to LoginPage to manage token on login */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* Pass handleLogin to RegisterPage to manage token on registration */}
        <Route
          path="/register"
          element={<RegisterPage onRegister={handleLogin} />}
        />
        {/* Render TaskPage only if authenticated, otherwise redirect to HomePage */}
        <Route
          path="/tasks"
          element={token ? <TaskPage token={token} /> : <HomePage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
