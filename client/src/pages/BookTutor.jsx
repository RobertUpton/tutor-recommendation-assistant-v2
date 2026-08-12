import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";

function BookTutor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [tutor, setTutor] = useState(null);
  const [sessionDate, setSessionDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const tutorAvailability = {
    Mathematics: [
      "09:00 AM",
      "11:00 AM",
      "01:00 PM",
      "03:00 PM",
    ],

    Physics: [
      "10:00 AM",
      "12:00 PM",
      "02:00 PM",
      "04:00 PM",
    ],

    English: [
      "08:00 AM",
      "10:00 AM",
      "12:00 PM",
      "02:00 PM",
    ],

    Chemistry: [
      "09:30 AM",
      "11:30 AM",
      "01:30 PM",
      "03:30 PM",
    ],

    Biology: [
      "09:00 AM",
      "11:00 AM",
      "01:00 PM",
      "03:00 PM",
    ],

    Programming: [
      "06:00 PM",
      "07:00 PM",
      "08:00 PM",
      "09:00 PM",
    ],
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/tutors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTutor(data);

        setAvailableTimes(
          tutorAvailability[data.subject] || [
            "09:00 AM",
            "11:00 AM",
            "01:00 PM",
          ]
        );
      })
      .catch((error) => {
        console.error("Error loading tutor:", error);
      });
  }, [id]);

  const handleBooking = async () => {
  if (!user?.id) {
    alert("Please login before booking a session.");
    return;
  }

  if (!sessionDate || !selectedTime) {
    alert("Please select a date and time.");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login before booking a session.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/bookings",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          userId: user.id,
          tutorId: tutor._id,
          sessionDate: `${sessionDate} ${selectedTime}`,
          notes,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      navigate("/bookings");
    } else {
      alert(data.message || "Unable to create booking.");
    }
  } catch (error) {
    console.error("Booking error:", error);
    alert("Something went wrong while booking.");
  }
};

  if (!tutor) {
    return (
      <DashboardLayout>
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          Loading tutor...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Back Button */}
      <button
        onClick={() => navigate("/tutors")}
        style={{
          backgroundColor: "#071a40",
          color: "#cbd5e1",
          border: "1px solid #17366f",
          padding: "10px 16px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "25px",
          fontWeight: "600",
        }}
      >
        ← Back to Tutors
      </button>

      {/* Page Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
          }}
        >
          Book a Session
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "8px",
            fontSize: "16px",
          }}
        >
          Choose a date and time that works for you.
        </p>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.7fr) minmax(280px, 0.8fr)",
          gap: "25px",
          maxWidth: "1050px",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            backgroundColor: "#03163d",
            border: "1px solid #102f68",
            borderRadius: "20px",
            padding: "28px",
          }}
        >
          {/* Tutor Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginBottom: "25px",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "70px",
                height: "70px",
                minWidth: "70px",
                borderRadius: "50%",
                backgroundColor: "#2563eb",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "26px",
                fontWeight: "bold",
              }}
            >
              {tutor.name.charAt(0)}
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                }}
              >
                {tutor.name}
              </h2>

              <p
                style={{
                  margin: "5px 0",
                  color: "#60a5fa",
                }}
              >
                {tutor.subject}
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#22c55e",
                  fontSize: "13px",
                }}
              >
                ● Available Now
              </p>
            </div>
          </div>

          {/* Tutor Info */}
          <div
            style={{
              display: "flex",
              gap: "30px",
              padding: "18px 0",
              borderTop: "1px solid #17305c",
              borderBottom: "1px solid #17305c",
              marginBottom: "28px",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                PRICE
              </span>

              <strong>
                ${tutor.price}/hour
              </strong>
            </div>

            <div>
              <span
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                EXPERIENCE
              </span>

              <strong>
                {tutor.experience || "Experienced Tutor"}
              </strong>
            </div>
          </div>

          {/* Date Section */}
          <div style={{ marginBottom: "28px" }}>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "18px",
              }}
            >
              1. Choose a Date
            </h3>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginTop: 0,
              }}
            >
              Select the day you'd like to meet with your tutor.
            </p>

            <input
              type="date"
              value={sessionDate}
              min={new Date()
                .toISOString()
                .split("T")[0]}
              onChange={(e) => {
                setSessionDate(e.target.value);
                setSelectedTime("");
              }}
              style={inputStyle}
            />
          </div>

          {/* Time Section */}
          <div style={{ marginBottom: "28px" }}>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "18px",
              }}
            >
              2. Choose a Time
            </h3>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginTop: 0,
              }}
            >
              Select one of the available session times.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "10px",
              }}
            >
              {availableTimes.map((time) => {
                const isSelected =
                  selectedTime === time;

                return (
                  <button
                    key={time}
                    onClick={() =>
                      setSelectedTime(time)
                    }
                    style={{
                      padding: "13px",
                      borderRadius: "10px",
                      border: isSelected
                        ? "1px solid #60a5fa"
                        : "1px solid #17366f",
                      backgroundColor: isSelected
                        ? "#2563eb"
                        : "#071a40",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "0.2s",
                    }}
                  >
                    {isSelected ? "✓ " : ""}
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "18px",
              }}
            >
              3. Add Notes
            </h3>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginTop: 0,
              }}
            >
              Let your tutor know what you'd like help with.
            </p>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Example: I'd like help preparing for my chemistry exam..."
              style={{
                ...inputStyle,
                height: "120px",
                resize: "vertical",
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div
          style={{
            backgroundColor: "#03163d",
            border: "1px solid #102f68",
            borderRadius: "20px",
            padding: "25px",
            height: "fit-content",
            position: "sticky",
            top: "20px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: "20px",
            }}
          >
            Booking Summary
          </h2>

          {/* Tutor */}
          <div
            style={{
              paddingBottom: "20px",
              borderBottom: "1px solid #17305c",
            }}
          >
            <p
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                marginBottom: "5px",
              }}
            >
              TUTOR
            </p>

            <strong>{tutor.name}</strong>

            <p
              style={{
                color: "#60a5fa",
                margin: "4px 0 0",
                fontSize: "14px",
              }}
            >
              {tutor.subject}
            </p>
          </div>

          {/* Date */}
          <div
            style={{
              padding: "18px 0",
              borderBottom: "1px solid #17305c",
            }}
          >
            <p
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                marginBottom: "5px",
              }}
            >
              DATE
            </p>

            <strong>
              {sessionDate
                ? sessionDate
                : "No date selected"}
            </strong>
          </div>

          {/* Time */}
          <div
            style={{
              padding: "18px 0",
              borderBottom: "1px solid #17305c",
            }}
          >
            <p
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                marginBottom: "5px",
              }}
            >
              TIME
            </p>

            <strong>
              {selectedTime
                ? selectedTime
                : "No time selected"}
            </strong>
          </div>

          {/* Price */}
          <div
            style={{
              padding: "18px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "#94a3b8",
              }}
            >
              Session Price
            </span>

            <strong>
              ${tutor.price}
            </strong>
          </div>

          {/* Confirm */}
          <button
            onClick={handleBooking}
            disabled={
              !sessionDate || !selectedTime
            }
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor:
                !sessionDate || !selectedTime
                  ? "#1e3a6e"
                  : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor:
                !sessionDate || !selectedTime
                  ? "not-allowed"
                  : "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              marginTop: "5px",
            }}
          >
            Confirm Booking
          </button>

          {(!sessionDate || !selectedTime) && (
            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "12px",
                marginBottom: 0,
              }}
            >
              Select a date and time to continue
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "1px solid #17366f",
  backgroundColor: "#071a40",
  color: "white",
  fontSize: "14px",
  outline: "none",
};

export default BookTutor;