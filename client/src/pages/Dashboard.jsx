import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [stats, setStats] = useState({
    upcomingSessions: 0,
    savedTutors: 0,
    completedSessions: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error("Dashboard Error:", error);
      });
  }, []);

  return (

    <DashboardLayout>

      {/* Welcome Section */}
      <div style={{ marginBottom: "30px" }}>

        <h1 style={{ margin: 0 }}>
          Welcome back, {user?.name || "User"}
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Here's what's happening with your tutoring sessions.
        </p>

      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        {/* Card 1 */}
        <div
          style={{
            backgroundColor: "#03163d",
            padding: "20px",
            borderRadius: "20px",
            flex: 1,
          }}
        >
          <p style={{ color: "#94a3b8" }}>
            Upcoming Sessions
          </p>

          <h2 style={{ margin: 0 }}>
            {stats.upcomingSessions}
          </h2>
        </div>

        {/* Card 2 */}
        <div
          style={{
            backgroundColor: "#03163d",
            padding: "20px",
            borderRadius: "20px",
            flex: 1,
          }}
        >
          <p style={{ color: "#94a3b8" }}>
            Saved Tutors
          </p>

          <h2 style={{ margin: 0 }}>
            {stats.savedTutors}
          </h2>
        </div>

        {/* Card 3 */}
        <div
          style={{
            backgroundColor: "#03163d",
            padding: "20px",
            borderRadius: "20px",
            flex: 1,
          }}
        >
          <p style={{ color: "#94a3b8" }}>
            Completed Sessions
          </p>

          <h2 style={{ margin: 0 }}>
            {stats.completedSessions}
          </h2>
        </div>

      </div>

    </DashboardLayout>

  );
}

export default Dashboard;