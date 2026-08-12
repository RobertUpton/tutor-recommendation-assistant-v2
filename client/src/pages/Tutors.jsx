import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tutors() {
  const navigate = useNavigate();

  // Store all tutors
  const [tutors, setTutors] = useState([]);

  // Controls which tab is displayed
  const [activeTab, setActiveTab] = useState("all");

  // Store IDs of saved tutors
  const [savedTutorIds, setSavedTutorIds] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch all tutors
  const fetchAllTutors = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/tutors"
      );

      const data = await response.json();

      if (response.ok) {
        setTutors(data);
      } else {
        console.error(data.message);
        setTutors([]);
      }
    } catch (error) {
      console.error("Error fetching tutors:", error);
      setTutors([]);
    }
  };

  // Fetch saved tutors
  const fetchSavedTutors = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setSavedTutorIds([]);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/saved-tutors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store only the tutor IDs
        const savedIds = data.map((tutor) => tutor._id);

        setSavedTutorIds(savedIds);
      } else {
        console.error(data.message);
        setSavedTutorIds([]);
      }
    } catch (error) {
      console.error(
        "Error fetching saved tutors:",
        error
      );

      setSavedTutorIds([]);
    }
  };

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
        // Add tutor ID to saved tutors
        setSavedTutorIds((previousIds) => [
          ...previousIds,
          tutorId,
        ]);

        //alert("Tutor saved!");
      } else {
        alert(
          data.message ||
          "Failed to save tutor."
        );
      }
    } catch (error) {
      console.error(
        "Save tutor error:",
        error
      );

      alert("Failed to save tutor.");
    }
  };

  // Remove tutor from saved tutors
  const handleRemoveTutor = async (tutorId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/save-tutor/${tutorId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Remove tutor ID from saved list
        setSavedTutorIds((previousIds) =>
          previousIds.filter(
            (id) => id !== tutorId
          )
        );

        ///alert("Tutor removed from saved tutors.");
      } else {
        alert(
          data.message ||
          "Failed to remove tutor."
        );
      }
    } catch (error) {
      console.error(
        "Remove tutor error:",
        error
      );

      alert("Failed to remove tutor.");
    }
  };

  // Load tutors and saved tutors when page opens
  useEffect(() => {
    const loadTutors = async () => {
      setLoading(true);

      await Promise.all([
        fetchAllTutors(),
        fetchSavedTutors(),
      ]);

      setLoading(false);
    };

    loadTutors();
  }, []);

  // Decide which tutors to display
  const displayedTutors =
    activeTab === "all"
      ? tutors
      : tutors.filter((tutor) =>
        savedTutorIds.includes(tutor._id)
      );

  return (
    <DashboardLayout>

      {/* Page Header */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          Browse Tutors
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Find the perfect tutor for your
          learning goals.
        </p>
      </div>

      {/* Tutor Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >

        {/* All Tutors */}
        <button
          onClick={() =>
            setActiveTab("all")
          }
          style={{
            padding: "12px 22px",
            borderRadius: "10px",
            border: "1px solid #2563eb",
            backgroundColor:
              activeTab === "all"
                ? "#2563eb"
                : "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          All Tutors
        </button>

        {/* Saved Tutors */}
        <button
          onClick={() =>
            setActiveTab("saved")
          }
          style={{
            padding: "12px 22px",
            borderRadius: "10px",
            border: "1px solid #2563eb",
            backgroundColor:
              activeTab === "saved"
                ? "#2563eb"
                : "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ♥ Saved Tutors
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#94a3b8",
          }}
        >
          Loading tutors...
        </div>
      )}

      {/* Empty Saved Tutors */}
      {!loading &&
        activeTab === "saved" &&
        displayedTutors.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#03163d",
              borderRadius: "20px",
              border: "1px solid #1e3a6e",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              No Saved Tutors
            </h2>

            <p
              style={{
                color: "#94a3b8",
                margin: 0,
              }}
            >
              Tutors you save will
              appear here.
            </p>
          </div>
        )}

      {/* Tutor Grid */}
      {!loading &&
        displayedTutors.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, 290px)",
              justifyContent: "start",
              gap: "20px",
            }}
          >

            {/* Tutor Cards */}
            {displayedTutors.map(
              (tutor) => {

                const isSaved =
                  savedTutorIds.includes(
                    tutor._id
                  );

                return (
                  <div
                    key={tutor._id}
                    style={{
                      backgroundColor:"#03163d",
                      padding: "18px",
                      borderRadius: "14px",
                      border:"1px solid #102a5c",
                      boxShadow:"0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >

                    {/* Avatar */}
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor:"#2563eb",
                        display: "flex",
                        justifyContent:"center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      {tutor.name?.charAt(0)}
                    </div>

                    {/* Tutor Name */}
                    <h2
                      style={{
                        margin:"0 0 6px 0",
                        fontSize: "20px",
                      }}
                    >
                      {tutor.name}
                    </h2>

                    {/* Subject */}
                    <p
                      style={{
                        color: "#60a5fa",
                        margin:"0 0 12px 0",
                        fontSize: "14px",
                      }}
                    >
                      {tutor.subject}
                    </p>

                    {/* Price */}
                    <p
                      style={{
                        margin:"0 0 8px 0",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      ${tutor.price}/hour
                    </p>

                    {/* Bio */}
                    <p
                      style={{
                        margin:"0 0 10px 0",
                        fontSize: "13px",
                        lineHeight: "1.5",
                        color: "#cbd5e1",
                      }}
                    >
                      {tutor.bio}
                    </p>

                    {/* Availability */}
                    <p
                      style={{
                        color: "#22c55e",
                        margin:"0 0 15px 0",
                        fontSize: "13px",
                      }}
                    >
                      ● Available Now
                    </p>

                    {/* Buttons */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >

                      {/* Book Session */}
                      <button
                        onClick={() =>
                          navigate( `/book/${tutor._id}`)
                        }
                        style={{
                          flex: 1,
                          padding:"9px 8px",
                          backgroundColor: "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight:"bold",
                          fontSize: "12px",
                        }}
                      >
                        Book Session
                      </button>

                      {/* Save / Saved */}
                      {activeTab ===
                        "all" && (
                          <button
                            onClick={() => {
                              if (!isSaved) {
                                handleSaveTutor(
                                  tutor._id
                                );
                              }
                            }}
                            disabled={isSaved}
                            style={{
                              flex: 1,
                              padding:
                                "9px 8px",

                              backgroundColor:
                                isSaved
                                  ? "#1e3a8a"
                                  : "transparent",

                              color:
                                isSaved
                                  ? "#60a5fa"
                                  : "#cbd5e1",

                              border:
                                "1px solid #2563eb",

                              borderRadius:
                                "8px",

                              cursor:
                                isSaved
                                  ? "default"
                                  : "pointer",

                              fontWeight:
                                "bold",

                              fontSize:
                                "12px",
                            }}
                          >
                            {isSaved
                              ? "♥ Tutor Saved"
                              : "♡ Save Tutor"}
                          </button>
                        )}

                      {/* Remove Saved */}
                      {activeTab ===
                        "saved" && (
                          <button
                            onClick={() =>
                              handleRemoveTutor(
                                tutor._id
                              )
                            }
                            style={{
                              flex: 1,
                              padding:
                                "9px 8px",
                              backgroundColor:
                                "transparent",
                              color:
                                "#f87171",
                              border:
                                "1px solid #ef4444",
                              borderRadius:
                                "8px",
                              cursor:
                                "pointer",
                              fontWeight:
                                "bold",
                              fontSize:
                                "12px",
                            }}
                          >
                            ♥ Remove Saved
                          </button>
                        )}

                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}

    </DashboardLayout>
  );
}

export default Tutors;