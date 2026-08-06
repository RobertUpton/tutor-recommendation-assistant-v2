import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        padding: "80px 20px",
        textAlign: "center",
        color: "white",
      }}
    >
      {/* Hero Section */}

      <h1
        style={{
          fontSize: "60px",
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        Find Your Perfect Tutor with AI
      </h1>

      <p
        style={{
          fontSize: "22px",
          color: "#cbd5e1",
          maxWidth: "750px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}
      >
        Receive personalized tutor recommendations, connect with expert tutors,
        and book lessons effortlessly with the power of artificial intelligence.
      </p>

      <div style={{ marginTop: "40px" }}>
        <Link to="/register">
        <button
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "15px 35px",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            marginRight: "15px",
          }}
        >
          Get Started
        </button>
      </Link>
    </div>

      {/* Feature Cards */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "90px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "300px",
            background: "#0f1d45",
            padding: "30px",
            borderRadius: "15px",
          }}
        >
          <h2> AI Recommendations</h2>

          <p style={{ color: "#cbd5e1" }}>
            Get tutor recommendations based on your learning goals, experience,
            budget, and preferred learning style.
          </p>
        </div>

        <div
          style={{
            width: "300px",
            background: "#0f1d45",
            padding: "30px",
            borderRadius: "15px",
          }}
        >
          <h2>Easy Booking</h2>

          <p style={{ color: "#cbd5e1" }}>
            Book tutoring sessions quickly with available tutors and manage your
            schedule in one place.
          </p>
        </div>

        <div
          style={{
            width: "300px",
            background: "#0f1d45",
            padding: "30px",
            borderRadius: "15px",
          }}
        >
          <h2>Direct Messaging</h2>

          <p style={{ color: "#cbd5e1" }}>
            Communicate directly with tutors before and after lessons to stay
            connected and prepared.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;