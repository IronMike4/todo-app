# To-Do List Application

## Overview

This is a full-stack To-Do List application built with React on the frontend and Node.js/Express on the backend. Users can register, log in, and manage tasks. The application ensures secure access with token-based authentication and performs various validation checks.

## Features

- **User Authentication**: Register and log in to access the application.
- **Task Management**: Add, edit, and delete tasks.
- **Data Validation**: Enforces rules on content type and task length.
- **Error Handling**: Provides feedback on various errors such as invalid content type or excessive task length.

## Technologies Used

- Frontend: React, Bootstrap
- Backend: Node.js, Express
- Database: MongoDB
- Middleware: Custom middleware for validation and authentication.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IronMike4/todo-app.git
   cd todo-app
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Run the Backend Server:**

   ```bash
   cd backend
   npm start
   ```

   The server will run on http://localhost:5001.

4. **Run the Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   The application will be available at http://localhost:3000 by default.

## Usage

1. **Register a new account on the registration page.**
2. **Log in using your credentials.**
3. **Add new tasks, edit, or delete existing tasks from the task management page.**

## API Endpoints

    - POST /api/auth/register: Register a new user
    - POST /api/auth/login: Authenticate and get a token

### Tasks

    - GET /api/tasks: Retrieve all tasks
    - POST /api/tasks: Create a new task
    - PUT /api/tasks/:id: Update a task
    - DELETE /api/tasks/:id: Delete a task

## Middleware

- **Validation Middleware**: Ensures requests are JSON, content is under 140 characters, and enforces other validation rules.

## Contact

[Michael Mahachi](mikhach@gmail.com)

## References

HyperionDev Express - Middleware Task(PDF)
What is Middleware in Express JS? | Node.js Tutorials for Beginners - [YouTube Video](https://www.youtube.com/watch?v=y18ubz7gOsQ)
