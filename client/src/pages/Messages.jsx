import DashboardLayout from "../components/DashboardLayout";

function Messages() {

  const messages = [
    {
      name: "Sarah Johnson",
      subject: "Mathematics",
      lastMessage: "Looking forward to our session tomorrow!",
      time: "2 mins ago",
    },
    {
      name: "David Lee",
      subject: "Physics",
      lastMessage: "I've uploaded some practice questions.",
      time: "1 hour ago",
    },
    {
      name: "Emily Carter",
      subject: "Programming",
      lastMessage: "Let's review React hooks next session.",
      time: "Yesterday",
    },
  ];

  return (
    <DashboardLayout>

      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ margin: 0 }}>
          Messages
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Communicate with your tutors and students.
        </p>
      </div>

      {/* Messages Container */}
      <div
        style={{
          backgroundColor: "#03163d",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
        }}
      >

        <h2 style={{ marginTop: 0 }}>
          Recent Messages
        </h2>

        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 0",
              borderBottom:
                index !== messages.length - 1
                  ? "1px solid #0f172a"
                  : "none",
            }}
          >

            {/* Left Side */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >

              {/* Avatar */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#2563eb",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {message.name.charAt(0)}
              </div>

              {/* Message Info */}
              <div>
                <h3 style={{ margin: 0 }}>
                  {message.name}
                </h3>

                <p
                  style={{
                    margin: "5px 0",
                    color: "#60a5fa",
                  }}
                >
                  {message.subject}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "#94a3b8",
                  }}
                >
                  {message.lastMessage}
                </p>
              </div>

            </div>

            {/* Right Side */}
            <div
              style={{
                textAlign: "right",
              }}
            >
              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "10px",
                }}
              >
                {message.time}
              </p>

              <button
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Open Chat
              </button>
            </div>

          </div>
        ))}

      </div>

    </DashboardLayout>
  );
}

export default Messages;