import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {

  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
};

const user =
  JSON.parse(
    localStorage.getItem("user")
  ) || {};

  const userName =
  user.name || "User";

const userInitial =
  userName.charAt(0).toUpperCase();

const [sidebarOpen, setSidebarOpen] =
  useState(true);


  return (

    // Full page container
    <div style={{ minHeight: "100vh", backgroundColor: "#020f2b", color: "white" }}>

      {/* Topbar */}
      <div style={{ backgroundColor: "#03163d", display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "18px 25px", borderBottom: "1px solid #0f172a" }}>

        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

          {/* Logo */}
          <h2 style={{ margin: 0, fontSize: "26px", fontWeight: "bold" }}>
            TutorMatch <span style={{ color: "#3b82f6" }}>AI</span>
          </h2>


          {/* Menu Icon */}
          <div
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            style={{ fontSize: "20px", cursor: "pointer" }}>

            ☰
          </div>

        </div>


        {/* Right side */}
        <div
          style={{ display: "flex", alignItems: "center",gap: "24px",}} >

          {/* Notification */}
          <div
            style={{position: "relative",cursor: "pointer",fontSize: "22px",}}>
            🔔

            <div
              style={{ position: "absolute",top: "-6px",
                right: "-6px",width: "18px", height: "18px",
                borderRadius: "50%", backgroundColor: "#ef4444",
                color: "white",fontSize: "10px",display: "flex",
                justifyContent: "center",alignItems: "center",fontWeight: "bold",}}>
              3
            </div>
          </div>

          {/* User */}
          <div
            style={{ display: "flex",alignItems: "center",
              
            }}
          >

            <div
              style={{width: "42px", height: "42px", borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#60a5fa,#2563eb)",display: "flex",
                justifyContent: "center",alignItems: "center",fontWeight: "bold",fontSize: "16px",}}>
              {userInitial}
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                }}
              >
                {userName}
              </p>

              <p
                style={{margin: 0,color: "#94a3b8",fontSize: "12px", }}>
                Student
              </p>
            </div>

          </div>

            </div>
            </div>


      {/* Dashboard Body */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 73px)" }}>

        {/* Sidebar */}
        <div style={{  width: sidebarOpen ? "165px" : "0px", backgroundColor: "#03163d", padding: "25px",
        borderRight: "1px solid #0f172a", borderRight: "1px solid #0f172a", display: "flex", flexDirection: "column", }} > 

          {/* Sidebar Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            
            <Link 
            to="/Dashboard"
            style={{ backgroundColor: "#07173a", padding: "14px",
            borderRadius: "14px", fontWeight: "500", margin: 0, cursor: "pointer", textDecoration: "none" }}>
              {sidebarOpen && "Dashboard"}
            </Link>

            
            <Link
            to="/Tutors"
             style={{ padding: "14px", borderRadius: "14px", margin: 0,
            cursor: "pointer", color: "#cbd5e1" , textDecoration: "none"}}>
              {sidebarOpen && "Browse Tutors"}
              
            </Link>

            <Link
            to="/Bookings"
             style={{ padding: "14px", borderRadius: "14px", margin: 0,
            cursor: "pointer", color: "#cbd5e1" , textDecoration: "none"}}>
              {sidebarOpen && " My Bookings"}
            </Link>

            <Link 
            to="/Messages"
            style={{ padding: "14px", borderRadius: "14px", margin: 0,
            cursor: "pointer", color: "#cbd5e1", textDecoration: "none"}}>
              {sidebarOpen && "Messages"}
            </Link>

            <Link 
            to="/Profile"
            style={{ padding: "14px", borderRadius: "14px", margin: 0,
            cursor: "pointer", color: "#cbd5e1", textDecoration: "none" }}>
              {sidebarOpen && "Profile"}
            </Link>

            <Link 
            to="/Settings"
            style={{ padding: "14px", borderRadius: "14px", margin: 0,
            cursor: "pointer", color: "#cbd5e1", textDecoration: "none" }}>
              {sidebarOpen && "Settings"}
            </Link>

          </div>

                  {/* Sign Out Button */}
          <div style={{ marginTop: "auto" }}>

            <button
             onClick={handleLogout}
              style={{padding: "14px",backgroundColor: "#07173a",color: "#cbd5e1",
                border: "none", borderRadius: "14px",cursor: "pointer",fontWeight: "bold",}} >
              {sidebarOpen && "Sign Out"}
            </button>

        </div>

        </div>


        {/* Main content area */}
        <div style={{ flex: 1, padding: "30px" }}>
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;