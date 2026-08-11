import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";

function BookTutor() {

  const { id } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tutor, setTutor] =
    useState(null);

  const [sessionDate,
    setSessionDate] =
    useState("");

  const [selectedTime,
    setSelectedTime] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [availableTimes,
    setAvailableTimes] =
    useState([]);

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

    fetch(
      `http://localhost:5000/api/tutors/${id}`
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {

        setTutor(data);

        setAvailableTimes(
          tutorAvailability[
            data.subject
          ] || [
            "09:00 AM",
            "11:00 AM",
            "01:00 PM",
          ]
        );

      })
      .catch((error) => {
        console.error(error);
      });

  }, [id]);

  const handleBooking =
    async () => {

      if (
        !sessionDate ||
        !selectedTime
      ) {

        alert(
          "Please select a date and time."
        );

        return;
      }

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/bookings",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                userId: user.id,
                tutorId: tutor._id,
                sessionDate:
                  `${sessionDate} ${selectedTime}`,
                notes,
              }),
            }
          );

        if (response.ok) {

          alert(
            "Session booked successfully!"
          );

          navigate("/bookings");

        } else {

          alert(
            "Unable to create booking"
          );

        }

      } catch (error) {

        console.error(error);

      }
    };

  if (!tutor) {

    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      {/* Back Button */}
      <button
        onClick={() =>
          navigate("/tutors")
        }
        style={{
          backgroundColor: "#07173a",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Tutors
      </button>

      {/* Header */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1>
          Book Session
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Select a date and time for
          your tutoring session.
        </p>
      </div>

      {/* Booking Card */}
      <div
        style={{
          backgroundColor:
            "#03163d",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "700px",
        }}
      >

        {/* Tutor Info */}
        <h2>
          {tutor.name}
        </h2>

        <p
          style={{
            color: "#60a5fa",
          }}
        >
          {tutor.subject}
        </p>

        <p>
          ${tutor.price}/hour
        </p>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          {tutor.experience}
        </p>

        <hr
          style={{
            border:
              "1px solid #1e293b",
            margin: "25px 0",
          }}
        />

        {/* Date */}
        <label>
          Session Date
        </label>

        <input
          type="date"
          value={sessionDate}
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          onChange={(e) =>
            setSessionDate(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* Time Slots */}
        <label>
          Available Times
        </label>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "15px",
            marginBottom: "25px",
          }}
        >
          {availableTimes.map(
            (time) => (

              <button
                key={time}
                onClick={() =>
                  setSelectedTime(
                    time
                  )
                }
                style={{
                  padding:
                    "10px 15px",
                  borderRadius:
                    "10px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor:
                    selectedTime ===
                    time
                      ? "#2563eb"
                      : "#07173a",
                  color: "white",
                }}
              >
                {time}
              </button>

            )
          )}
        </div>

        {/* Notes */}
        <label>
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          placeholder="Anything you'd like the tutor to know..."
          style={{
            ...inputStyle,
            height: "120px",
          }}
        />

        {/* Confirm Button */}
        <button
          onClick={handleBooking}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            backgroundColor:
              "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Confirm Booking
        </button>

      </div>

    </DashboardLayout>

  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "none",
};

export default BookTutor;