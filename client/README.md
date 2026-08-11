# TutorMatch AI - Client

The frontend application for TutorMatch AI, an AI-powered tutoring platform that allows students to find tutors, manage tutoring sessions, and interact with their account.

The client is built using React and Vite and communicates with the TutorMatch AI Express backend through REST API requests.

## Features

- User registration and login
- JWT-based authentication
- Protected application routes
- Student dashboard
- Browse available tutors
- View tutor information
- Book tutoring sessions
- Save tutors to a user's account
- User profile and settings
- Navigation through the dashboard layout
- Responsive tutor card layout
- Backend API integration

## Technologies Used

- React
- Vite
- JavaScript
- React Router
- CSS / Inline Styling
- Fetch API
- JWT authentication
- ESLint

## Project Structure

```text
client/
├── public/
├── src/
│   ├── components/
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tutors.jsx
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md