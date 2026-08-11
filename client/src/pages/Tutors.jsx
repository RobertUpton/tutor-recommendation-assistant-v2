import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Save tutor
const handleSaveTutor = async (tutorId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to save a tutor.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/users/save-tutor/${tutorId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Tutor saved!");
    } else {
      alert(data.message || "Failed to save tutor.");
    }
  } catch (error) {
    console.error("Save tutor error:", error);
    alert("Failed to save tutor.");
  }
};

function Tutors() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);

  // Controls which tutor tab is currently displayed
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5000/api/tutors")
      .then((response) => response.json())
      .then((data) => {
        setTutors(data);
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
      });

  },
    []);


  const handleBookTutor = async (tutorId) => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            tutorId,
            sessionDate: new Date(),
            notes: "",
          }),
        }
      );


      const data = await response.json();

      if (response.ok) {
        alert("Session booked!");
      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Booking failed");

    }

  };


  return (

    <DashboardLayout>

      {/* Page Header */}
      <div style={{ marginBottom: "30px" }}>

        <h1 style={{ margin: 0 }}>
          Browse Tutors
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Find the perfect tutor for your learning goals.
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => setActiveTab("all")}
          style={{
            padding: "12px 22px",
            borderRadius: "10px",
            border: "1px solid #2563eb",
            backgroundColor:
              activeTab === "all" ? "#2563eb" : "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          All Tutors
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          style={{
            padding: "12px 22px",
            borderRadius: "10px",
            border: "1px solid #2563eb",
            backgroundColor:
              activeTab === "saved" ? "#2563eb" : "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ♥ Saved Tutors
        </button>
      </div>


      {/* Tutor Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >

        {/* Generate Tutor Cards */}
        {tutors.map((tutor, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#03163d",
              padding: "18px",
              borderRadius: "14px",
              border: "1px solid #102a5c",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}>

            {/* Avatar */}
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#2563eb",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "20px",
              }}
            >
              {tutor.name.charAt(0)}
            </div>


            {/* Tutor Name */}
            <h2 style={{ margin: "0 0 6px 0", fontSize: "20px", marginTop: 0 }}>
              {tutor.name}
            </h2>


            {/* Subject */}
            <p style={{ color: "#60a5fa", marginTop: "-10px", margin: "0 0 12px 0", fontSize: "14px", }}>
              {tutor.subject}
            </p>

            {/**Price**/}
            <p style={{ margin: "0 0 8px 0", frontSize: "15px", frontWeight: "bold", }}>
              ${tutor.price}/hour
            </p>

            {/**Bio**/}
            <p style={{ margin: "0 0 10px 0", fontSize: "13px", lineHeight: "1.5", color: "#cbd5e1", }}>
              {tutor.bio}
            </p>

            {/* Availability */}
            <p style={{ color: "#22c55e", margin: "0 0 15px 0", fontSize: "13px" }}>
              ● Available Now
            </p>


            {/**  Experience 
            <p style={{ color: "#94a3b8" }}>
              {tutor.experience}
            </p>*/}



            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}>
              {/* Book */}
              <button
                onClick={() => navigate(`/book/${tutor._id}`)}
                style={{
                  flex: 1,
                  padding: "9px 8px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Book Session
              </button>

              {/* Save */}
              <button
                onClick={() => handleSaveTutor(tutor._id)}
                style={{
                  flex: 1,
                  padding: "9px 8px",
                  backgroundColor: "transparent",
                  color: "#cbd5e1",
                  border: "1px solid #2563eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                ♡ Save Tutor
              </button>
            </div>
          </div>

        ))}

      </div>

    </DashboardLayout>

  );
}

export default Tutors;