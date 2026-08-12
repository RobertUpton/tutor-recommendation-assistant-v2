# TutorMatch AI Verison 2

TutorMatch AI is a full-stack tutoring platform designed to help students find tutors, manage tutoring sessions, and receive personalized tutoring recommendations.

The application uses a React frontend and an Express/MongoDB backend, with JWT authentication for protected user functionality.

## Project Overview

TutorMatch AI allows students to:

- Create an account and log in
- Browse available tutors
- View tutor information and pricing
- Book tutoring sessions
- Save tutors for later
- View tutoring activity through a dashboard
- Manage their account
- Receive AI-powered tutor recommendations

The project is currently under development, with additional features and improvements being added throughout development.

## Technologies

### Frontend

- React
- Vite
- JavaScript
- React Router
- Fetch API
- ESLint

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- CORS
- dotenv
- Nodemon

### AI

- OpenAI API

## Project Structure

```text
tutor-recommendation-assistant-v2/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── README.md
│
└── README.md
