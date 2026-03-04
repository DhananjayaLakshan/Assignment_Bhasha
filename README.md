# X Institute Student Management System

A full-stack MERN application developed as part of the **Bhasha Practical Full Stack Assignment**.  
This system allows administrators to manage students and courses using a secure dashboard.

The application implements authentication, course management, student registration, and a searchable dashboard.

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi (API validation)
- JWT Authentication
- bcrypt (password hashing)

## Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

---

# System Features

### Authentication
- Secure admin login
- JWT token authentication
- Protected routes
- Logout functionality

### Course Management
- Create new courses
- Departments supported:
  - Engineering
  - Business Management
  - English
  - Hospitality
  - Health

### Student Management
- Register students
- Assign students to courses
- Store student personal details

### Dashboard
- List all students
- View course details
- Search students by name or contact number
- Pagination support

---

# System Architecture
Frontend (React + Vite)
|
Axios API Client
|
Backend (Node.js + Express)
|
MongoDB Database


---

# Database Schema

## Users

{
_id: ObjectId,
username: String,
passwordHash: String,
role: "admin"
}

---

## Courses

{
_id: ObjectId,
name: String,
department: String,
fee: Number
}


---

## Students

{
_id: ObjectId,
firstName: String,
lastName: String,
birthday: Date,
address: String,
contactNumber: String,
courseId: ObjectId (reference to Course)
}


---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|------|---------|-------------|
POST | /api/auth/login | Admin login |

---

## Courses

| Method | Endpoint | Description |
|------|---------|-------------|
GET | /api/courses | List courses |
POST | /api/courses | Create course |

---

## Students

| Method | Endpoint | Description |
|------|---------|-------------|
GET | /api/students | List students |
GET | /api/students?q= | Search students |
POST | /api/students | Create student |
GET | /api/students/:id | Get student details |

---

# Project Structure
project-root
│
├── backend
│ ├── src
│ │ ├── config
│ │ ├── middleware
│ │ ├── modules
│ │ │ ├── auth
│ │ │ ├── students
│ │ │ └── courses
│ │ ├── utils
│ │ └── server.js
│
├── frontend
│ ├── src
│ │ ├── api
│ │ ├── components
│ │ ├── pages
│ │ └── App.jsx
│
└── README.md


---

# Setup Instructions

## 1. Clone Repository

git clone <repository-url>

---

## 2. Backend Setup

Navigate to backend folder

cd backend

Install dependencies

npm install

Create `.env` file

PORT=4000
MONGO_URI=mongodb://localhost:27017/x-institute
JWT_SECRET=supersecret
JWT_EXPIRES=1d
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123


Run backend server
npm run dev




---

## 3. Seed Admin User

Run: 
npm run seed:admin



Default credentials:
Username: admin
Password: admin123


---

## 4. Frontend Setup

Navigate to frontend
cd frontend

Install dependencies
npm install

Run frontend server
npm run dev

Open in browser:[Open in browser:](http://localhost:5173/)




---

# Authentication Flow

1. User logs in using admin credentials
2. Backend verifies credentials
3. JWT token is generated
4. Token stored in browser localStorage
5. Protected routes require valid token
6. Logout removes token from localStorage

---

# Validation Strategy

API request validation is implemented using **Joi** to ensure:

- Valid student details
- Valid course data
- Proper input formatting
- Secure backend processing

Example validation:


contactNumber: Joi.string().min(7).max(30).required()


---

# Error Handling

Centralized error handling middleware is used to manage:

- Validation errors
- Authentication errors
- Server errors
- Database errors

All errors follow a consistent JSON structure:


{
"success": false,
"message": "Error description"
}


---

# Future Improvements

- Role-based access control
- Course editing and deletion
- Student update functionality
- Advanced dashboard analytics
- UI improvements and pagination controls
- Docker deployment

---

# Author

Student Name: *[Your Name]*  
Assignment: Bhasha Practical Exam – Full Stack Development  
Technology: MERN Stack

