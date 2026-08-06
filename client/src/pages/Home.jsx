function Home() {
  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        
      }}
    >
      <h1 style={{ fontSize: "48px",color: "white" }}>
        Welcome to TutorMatch AI
      </h1>

      <p style={{ marginTop: "20px", fontSize: "20px", color: "white"}}>
        Find the perfect tutor with AI-powered recommendations.
      </p>

      <button
        style={{
          marginTop: "30px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        Find Tutors
      </button>
    </div>
  );
}

export default Home;