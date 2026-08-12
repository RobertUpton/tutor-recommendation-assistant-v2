import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  const loadBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load bookings");
      }

      const data = await response.json();

      setBookings(data);
    } catch (error) {
      console.error("Error loading bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async () => {
    if (!cancelId) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${cancelId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to cancel booking");
      }

      setCancelId(null);

      await loadBookings();
    } catch (error) {
      console.error("Cancel booking error:", error);
    }
  };

  const rescheduleBooking = (bookingId) => {
    alert("Reschedule feature coming next.");
  };

  const joinSession = (booking) => {
    if (booking.meetingLink) {
      window.open(booking.meetingLink, "_blank");
    } else {
      alert("The meeting link will be available closer to your session.");
    }
  };

  const messageTutor = (booking) => {
    alert(
      `Messaging ${booking.tutorId?.name || "your tutor"} will be available soon.`
    );
  };

  const getStatusStyle = (status) => {
    if (status === "Confirmed") {
      return {
        backgroundColor: "#064e3b",
        color: "#34d399",
      };
    }

    if (status === "Completed") {
      return {
        backgroundColor: "#172554",
        color: "#60a5fa",
      };
    }

    if (status === "Cancelled") {
      return {
        backgroundColor: "#450a0a",
        color: "#f87171",
      };
    }

    return {
      backgroundColor: "#4a3000",
      color: "#f59e0b",
    };
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
          }}
        >
          My Bookings
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "8px",
          }}
        >
          View and manage your tutoring sessions.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div
          style={{
            backgroundColor: "#03163d",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #102a5c",
          }}
        >
          Loading bookings...
        </div>
      )}

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <div
          style={{
            backgroundColor: "#03163d",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid #102a5c",
          }}
        >
          <h2
            style={{
              margin: "0 0 8px 0",
            }}
          >
            No bookings found
          </h2>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
            }}
          >
            Book a tutoring session and it will appear here.
          </p>
        </div>
      )}

      {/* Booking List */}
      {!loading && bookings.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            alignItems: "start",
          }}
        >
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              style={{
                backgroundColor: "#03163d",
                padding: "25px",
                borderRadius: "14px",
                border: "1px solid #173b73",

                // Make the last card span both columns when needed
                gridColumn:
                  bookings.length % 2 !== 0 &&
                    index === bookings.length - 1
                    ? "1 / -1"
                    : "auto",
              }}
            >
              {/* Booking Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "15px",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: "0 0 5px 0",
                      fontSize: "21px",
                    }}
                  >
                    {booking.tutorId?.name || "Tutor"}
                  </h2>

                  <p
                    style={{
                      margin: "0 0 4px 0",
                      color: "#60a5fa",
                      fontSize: "14px",
                    }}
                  >
                    {booking.tutorId?.subject || "Subject"}
                  </p>

                  <strong
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    ${booking.tutorId?.price || 0}/hour
                  </strong>
                </div>

                {/* Status */}
                <span
                  style={{
                    ...getStatusStyle(booking.status),
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {booking.status}
                </span>
              </div>

              {/* Date and Time */}
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  padding: "14px 0",
                  borderTop: "1px solid #102a5c",
                  borderBottom: "1px solid #102a5c",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0 0 4px 0",
                      color: "#64748b",
                      fontSize: "11px",
                      textTransform: "uppercase",
                    }}
                  >
                    Date
                  </p>

                  <strong style={{ fontSize: "14px" }}>
                    📅{" "}
                    {new Date(
                      booking.sessionDate
                    ).toLocaleDateString()}
                  </strong>
                </div>

                <div>
                  <p
                    style={{
                      margin: "0 0 4px 0",
                      color: "#64748b",
                      fontSize: "11px",
                      textTransform: "uppercase",
                    }}
                  >
                    Time
                  </p>

                  <strong style={{ fontSize: "14px" }}>
                    ⏰{" "}
                    {new Date(
                      booking.sessionDate
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>
                </div>
              </div>

              {/* Notes */}
              {booking.notes && (
                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 5px 0",
                      color: "#64748b",
                      fontSize: "11px",
                      textTransform: "uppercase",
                    }}
                  >
                    Session Notes
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#cbd5e1",
                    }}
                  >
                    {booking.notes}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => joinSession(booking)}
                  style={{
                    padding: "9px 18px",
                    border: "none",
                    borderRadius: "9px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  🎥 Join Session
                </button>

                <button
                  onClick={() => messageTutor(booking)}
                  style={{
                    padding: "9px 18px",
                    border: "1px solid #2563eb",
                    borderRadius: "9px",
                    backgroundColor: "transparent",
                    color: "#60a5fa",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  💬 Message Tutor
                </button>

                <button
                  onClick={() => rescheduleBooking(booking._id)}
                  style={{
                    padding: "9px 18px",
                    border: "none",
                    borderRadius: "9px",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Reschedule
                </button>

                <button
                  onClick={() => setCancelId(booking._id)}
                  style={{
                    padding: "9px 18px",
                    border: "1px solid #ef4444",
                    borderRadius: "9px",
                    backgroundColor: "transparent",
                    color: "#f87171",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#03163d",
              border: "1px solid #1e3a6e",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            }}
          >
            <h2
              style={{
                margin: "0 0 10px 0",
                fontSize: "21px",
              }}
            >
              Cancel Session?
            </h2>

            <p
              style={{
                margin: "0 0 22px 0",
                color: "#94a3b8",
                lineHeight: "1.5",
              }}
            >
              This will cancel your tutoring session. You can book another
              session later.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setCancelId(null)}
                style={{
                  padding: "9px 18px",
                  borderRadius: "9px",
                  border: "1px solid #334155",
                  backgroundColor: "transparent",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Keep Session
              </button>

              <button
                onClick={cancelBooking}
                style={{
                  padding: "9px 18px",
                  borderRadius: "9px",
                  border: "none",
                  backgroundColor: "#ef4444",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel Session
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Bookings;