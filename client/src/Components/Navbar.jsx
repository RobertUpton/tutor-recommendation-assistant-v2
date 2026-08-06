import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px",}}
    >
      <nav style={{width: "90%", maxWidth: "1000px",padding: "15px 30px",
          background: "linear-gradient(to right, #0b1020, #111827)",
          color: "white",  display: "flex", justifyContent: "space-between",  alignItems: "center",
          borderRadius: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Title */}
        <h2 style={{margin: 0,fontSize: "24px",fontWeight: "bold",}}
          >
          TutorMatch <span style={{ color: "#3b82f6" }}>AI</span>
        </h2>


        {/* Links */}
        <div style={{display: "flex", alignItems: "center", gap: "25px",  }} >
          <Link  to="/login"
            style={{  color: "#60a5fa",  textDecoration: "none",  borderBottom: "2px solid #3b82f6",
              paddingBottom: "4px", fontWeight: "500",  }} >
            Login
          </Link>

          <Link to="Register" 
            style={{  color: "#60a5fa",  textDecoration: "none",  borderBottom: "2px solid #3b82f6",
              paddingBottom: "4px", fontWeight: "500",}} >
            Register
          </Link>

        
        </div>
      </nav>
    </div>
  );
}

export default Navbar;