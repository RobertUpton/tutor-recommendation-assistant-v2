import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Bookings() {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadBookings = () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:5000/api/bookings/user/${user.id}`
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {

        setBookings(data);

        setLoading(false);

      })
      .catch((error) => {

        console.error(error);

        setLoading(false);

      });
  };

  useEffect(() => {

    loadBookings();

  }, []);

  const cancelBooking =
    async (bookingId) => {

      const confirmed =
        window.confirm(
          "Cancel this booking?"
        );

      if (!confirmed) return;

      try {

        await fetch(
          `http://localhost:5000/api/bookings/cancel/${bookingId}`,
          {
            method: "PUT",
          }
        );

        loadBookings();

      } catch (error) {

        console.error(error);

      }
    };

  const rescheduleBooking =
    (bookingId) => {

      alert(
        "Reschedule feature coming next."
      );

    };

  const joinSession =
    (booking) => {

      if (
        booking.meetingLink
      ) {

        window.open(
          booking.meetingLink,
          "_blank"
        );

      } else {

        alert(
          "Meeting link not available yet."
        );

      }
    };

  return (

    <DashboardLayout>

      {/* Header */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1>
          My Bookings
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          View and manage your
          tutoring sessions.
        </p>
      </div>

      {/* Loading */}
      {loading && (

        <div
          style={{
            backgroundColor:
              "#03163d",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          Loading bookings...
        </div>

      )}

      {/* Empty */}
      {!loading &&
        bookings.length === 0 && (

        <div
          style={{
            backgroundColor:
              "#03163d",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          No bookings found.
        </div>

      )}

      {/* Booking Grid */}
      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >

        {bookings.map(
          (booking) => (

          <div
            key={booking._id}
            style={{
              backgroundColor:
                "#03163d",
              padding: "25px",
              borderRadius: "20px",
            }}
          >

            <h2>
              {
                booking.tutorId
                  ?.name
              }
            </h2>

            <p
              style={{
                color:
                  "#60a5fa",
              }}
            >
              {
                booking.tutorId
                  ?.subject
              }
            </p>

            <p>
              💰 $
              {
                booking.tutorId
                  ?.price
              }
              /hour
            </p>

            <p>
              📅{" "}
              {new Date(
                booking.sessionDate
              ).toLocaleDateString()}
            </p>

            <p>
              ⏰{" "}
              {new Date(
                booking.sessionDate
              ).toLocaleTimeString(
                [],
                {
                  hour:
                    "2-digit",
                  minute:
                    "2-digit",
                }
              )}
            </p>

            <p>
              Status:{" "}
              <strong>
                {
                  booking.status
                }
              </strong>
            </p>

            {booking.notes && (

              <p
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                Notes:
                {" "}
                {
                  booking.notes
                }
              </p>

            )}

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >

              <button
                onClick={() =>
                  joinSession(
                    booking
                  )
                }
                style={{
                  padding:
                    "10px 15px",
                  border: "none",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    "#2563eb",
                  color: "white",
                  cursor:
                    "pointer",
                }}
              >
                Join Session
              </button>

              <button
                onClick={() =>
                  rescheduleBooking(
                    booking._id
                  )
                }
                style={{
                  padding:
                    "10px 15px",
                  border: "none",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    "#f59e0b",
                  color: "white",
                  cursor:
                    "pointer",
                }}
              >
                Reschedule
              </button>

              <button
                onClick={() =>
                  cancelBooking(
                    booking._id
                  )
                }
                style={{
                  padding:
                    "10px 15px",
                  border: "none",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    "#ef4444",
                  color: "white",
                  cursor:
                    "pointer",
                }}
              >
                Cancel
              </button>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>

  );
}

export default Bookings;