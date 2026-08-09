import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Get the logged-in user's information
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const userName = user.name || "User";

  const userInitial =
    userName.charAt(0).toUpperCase();

  // Log the user out and return to the home page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="dashboard-layout">

      {/* Top navigation bar */}
      <header className="dashboard-topbar">

        {/* Logo and sidebar toggle */}
        <div className="topbar-left">

          {/* TutorMatch AI logo */}
          <h2 className="dashboard-logo">
            TutorMatch <span>AI</span>
          </h2>

          {/* Sidebar toggle button */}
          <button
            className="sidebar-toggle"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

        </div>


        {/* Right side of navbar */}
        <div className="topbar-right">

          {/* Notification */}
          <div className="notification">

            🔔

            <span className="notification-badge">
              3
            </span>

          </div>


          {/* User information */}
          <div className="user-info">

            {/* User avatar */}
            <div className="user-avatar">
              {userInitial}
            </div>

            {/* User name and role */}
            <div>

              <p className="user-name">
                {userName}
              </p>

              <p className="user-role">
                Student
              </p>

            </div>

          </div>

        </div>

      </header>


      {/* Dashboard body */}
      <div className="dashboard-body">

        {/* Sidebar */}
        <aside
          className={`dashboard-sidebar ${
            !sidebarOpen ? "closed" : ""
          }`}
        >

          {/* Navigation */}
          <nav className="sidebar-nav">

            <NavLink
              to="/Dashboard"
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              

              Dashboard
            </NavLink>


            <NavLink
              to="/Tutors"
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
            

              Browse Tutors
            </NavLink>


            <NavLink
              to="/Bookings"
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              My Bookings
            </NavLink>


            <NavLink
              to="/Messages"
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
               Messages
            </NavLink>


            <NavLink
              to="/Profile"
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              Profile
            </NavLink>


            <NavLink
              to="/Settings"
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              Settings
            </NavLink>

          </nav>


          {/* Sign out */}
          <div className="sidebar-bottom">

            <button
              className="signout-button"
              onClick={handleLogout}
            >
               Sign Out
            </button>

          </div>

        </aside>


        {/* Main dashboard content */}
        <main className="dashboard-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;