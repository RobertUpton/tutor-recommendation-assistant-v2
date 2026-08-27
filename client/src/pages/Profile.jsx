import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    fetch(
      `http://localhost:5000/api/users/${user.id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        return response.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error(
          "Failed to load profile:",
          error
        );
      });
  }, [user?.id]);

  if (!user?.id) {
    return (
      <DashboardLayout>
        <div style={styles.messageBox}>
          <h2 style={{ margin: 0 }}>
            Please login again.
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div style={styles.messageBox}>
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  const handleChange = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            education: profile.education,
            favoriteSubject:
              profile.favoriteSubject,
            bio: profile.bio,
          }),
        }
      );

      const updated = await response.json();

      if (!response.ok) {
        throw new Error(
          updated.message ||
            "Failed to update profile"
        );
      }

      setProfile(updated);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: updated.name,
          email: updated.email,
        })
      );

      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );

      setMessage(
        "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    fetch(
      `http://localhost:5000/api/users/${user.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setEditing(false);
        setMessage("");
      })
      .catch((error) => {
        console.error(
          "Failed to reset profile:",
          error
        );
      });
  };

  const initials = profile.name
    ? profile.name.charAt(0).toUpperCase()
    : "U";

  const profileFields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.location,
    profile.education,
    profile.favoriteSubject,
    profile.bio,
  ];

  const completedFields =
    profileFields.filter(
      (field) =>
        field &&
        field.toString().trim() !== ""
    ).length;

  const completion =
    Math.round(
      (completedFields /
        profileFields.length) *
        100
    );

  return (
    <DashboardLayout>

      {/* Page Header */}
      <div style={styles.pageHeader}>

        <div>
          <h1 style={styles.title}>
            My Profile
          </h1>

          <p style={styles.subtitle}>
            Manage your personal information and
            learning profile.
          </p>
        </div>

        {!editing && (
          <button
            onClick={() => {
              setEditing(true);
              setMessage("");
            }}
            style={styles.editButton}
          >
            Edit Profile
          </button>
        )}

      </div>

      {/* Profile Header Card */}
      <div style={styles.profileHero}>

        <div style={styles.heroLeft}>

          <div style={styles.avatar}>
            {initials}
          </div>

          <div>

            {editing ? (
              <input
                value={profile.name || ""}
                onChange={(e) =>
                  handleChange(
                    "name",
                    e.target.value
                  )
                }
                style={styles.nameInput}
                placeholder="Your name"
              />
            ) : (
              <h2 style={styles.profileName}>
                {profile.name || "User"}
              </h2>
            )}

            <p style={styles.email}>
              {profile.email ||
                "No email added"}
            </p>

            <span style={styles.studentBadge}>
              Student
            </span>

          </div>

        </div>

        {/* Completion */}
        <div style={styles.completionBox}>

          <div style={styles.completionHeader}>
            <span>
              Profile Completion
            </span>

            <strong>
              {completion}%
            </strong>
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressBar,
                width: `${completion}%`,
              }}
            />
          </div>

          <p style={styles.completionText}>
            {completion === 100
              ? "Your profile is complete."
              : "Add more information to complete your profile."}
          </p>

        </div>

      </div>

      {/* Main Profile Grid */}
      <div style={styles.mainGrid}>

        {/* Personal Information */}
        <section style={styles.card}>

          <div style={styles.sectionHeader}>

            <div style={styles.sectionIcon}>
              👤
            </div>

            <div>
              <h2 style={styles.sectionTitle}>
                Personal Information
              </h2>

              <p style={styles.sectionDescription}>
                Your basic contact information.
              </p>
            </div>

          </div>

          <div style={styles.infoGrid}>

            <ProfileField
              label="Full Name"
              value={profile.name}
              editing={editing}
              onChange={(value) =>
                handleChange("name", value)
              }
            />

            <ProfileField
              label="Email Address"
              value={profile.email}
              editing={editing}
              onChange={(value) =>
                handleChange("email", value)
              }
            />

            <ProfileField
              label="Phone Number"
              value={profile.phone}
              editing={editing}
              onChange={(value) =>
                handleChange("phone", value)
              }
            />

            <ProfileField
              label="Location"
              value={profile.location}
              editing={editing}
              onChange={(value) =>
                handleChange(
                  "location",
                  value
                )
              }
            />

          </div>

        </section>

        {/* Learning Information */}
        <section style={styles.card}>

          <div style={styles.sectionHeader}>

            <div style={styles.sectionIcon}>
              🎓
            </div>

            <div>
              <h2 style={styles.sectionTitle}>
                Learning Profile
              </h2>

              <p style={styles.sectionDescription}>
                Information that helps tutors understand
                your learning goals.
              </p>
            </div>

          </div>

          <div style={styles.infoGrid}>

            <ProfileField
              label="Education"
              value={profile.education}
              editing={editing}
              onChange={(value) =>
                handleChange(
                  "education",
                  value
                )
              }
            />

            <ProfileField
              label="Favorite Subject"
              value={
                profile.favoriteSubject
              }
              editing={editing}
              onChange={(value) =>
                handleChange(
                  "favoriteSubject",
                  value
                )
              }
            />

          </div>

        </section>

      </div>

      {/* About Me */}
      <section style={styles.aboutCard}>

        <div style={styles.sectionHeader}>

          <div style={styles.sectionIcon}>
            ✨
          </div>

          <div>
            <h2 style={styles.sectionTitle}>
              About Me
            </h2>

            <p style={styles.sectionDescription}>
              Tell tutors a little about yourself.
            </p>
          </div>

        </div>

        {editing ? (
          <textarea
            value={profile.bio || ""}
            onChange={(e) =>
              handleChange(
                "bio",
                e.target.value
              )
            }
            rows="5"
            placeholder="Tell your tutors about yourself, your goals, or what you are currently learning..."
            style={styles.textarea}
          />
        ) : (
          <div style={styles.bioBox}>
            {profile.bio ? (
              profile.bio
            ) : (
              <span style={styles.emptyText}>
                No bio added yet. Tell tutors a
                little about yourself.
              </span>
            )}
          </div>
        )}

      </section>

      {/* Edit Actions */}
      {editing && (
        <div style={styles.actionArea}>

          <div>
            {message && (
              <p
                style={{
                  ...styles.message,
                  color: message.includes(
                    "successfully"
                  )
                    ? "#22c55e"
                    : "#f87171",
                }}
              >
                {message}
              </p>
            )}
          </div>

          <div style={styles.actionButtons}>

            <button
              onClick={cancelEdit}
              disabled={saving}
              style={styles.cancelButton}
            >
              Cancel
            </button>

            <button
              onClick={saveProfile}
              disabled={saving}
              style={styles.saveButton}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </div>
      )}

      {/* Non-edit success message */}
      {!editing && message && (
        <p
          style={{
            ...styles.message,
            color: "#22c55e",
          }}
        >
          {message}
        </p>
      )}

    </DashboardLayout>
  );
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
}) {
  return (
    <div style={styles.field}>

      <label style={styles.label}>
        {label}
      </label>

      {editing ? (
        <input
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={`Enter ${label.toLowerCase()}`}
          style={styles.input}
        />
      ) : (
        <p style={styles.value}>
          {value || (
            <span style={styles.emptyValue}>
              Not added
            </span>
          )}
        </p>
      )}

    </div>
  );
}

const styles = {

  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "22px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
  },

  subtitle: {
    color: "#94a3b8",
    margin: "7px 0 0",
    fontSize: "14px",
  },

  editButton: {
    padding: "11px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  profileHero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    backgroundColor: "#03163d",
    border: "1px solid #16366d",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "20px",
  },

  heroLeft: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  avatar: {
    width: "76px",
    height: "76px",
    minWidth: "76px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #60a5fa, #2563eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "29px",
    fontWeight: "bold",
  },

  profileName: {
    margin: 0,
    fontSize: "23px",
  },

  nameInput: {
    width: "220px",
    boxSizing: "border-box",
    backgroundColor: "#071b43",
    border: "1px solid #2563eb",
    borderRadius: "8px",
    color: "white",
    padding: "8px 10px",
    fontSize: "20px",
    fontWeight: "bold",
    outline: "none",
  },

  email: {
    margin: "5px 0 8px",
    color: "#94a3b8",
    fontSize: "13px",
  },

  studentBadge: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "20px",
    backgroundColor: "#0b2b66",
    color: "#60a5fa",
    fontSize: "11px",
    fontWeight: "bold",
  },

  completionBox: {
    width: "230px",
    flexShrink: 0,
  },

  completionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#cbd5e1",
    fontSize: "12px",
    marginBottom: "8px",
  },

  progressTrack: {
    height: "7px",
    backgroundColor: "#071b43",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },

  completionText: {
    color: "#64748b",
    fontSize: "11px",
    margin: "7px 0 0",
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "#03163d",
    border: "1px solid #16366d",
    borderRadius: "16px",
    padding: "22px",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },

  sectionIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    backgroundColor: "#0b2454",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },

  sectionTitle: {
    margin: 0,
    fontSize: "17px",
  },

  sectionDescription: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: "11px",
    lineHeight: "1.4",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "14px",
  },

  field: {
    backgroundColor: "#061b45",
    borderRadius: "10px",
    padding: "13px",
    minWidth: 0,
  },

  label: {
    display: "block",
    color: "#64748b",
    fontSize: "11px",
    marginBottom: "7px",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },

  value: {
    margin: 0,
    color: "#f1f5f9",
    fontSize: "13px",
    fontWeight: "500",
    minHeight: "18px",
    wordBreak: "break-word",
  },

  emptyValue: {
    color: "#475569",
    fontWeight: "normal",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#03163d",
    border: "1px solid #23457d",
    borderRadius: "7px",
    color: "white",
    padding: "9px 10px",
    outline: "none",
    fontSize: "13px",
  },

  aboutCard: {
    backgroundColor: "#03163d",
    border: "1px solid #16366d",
    borderRadius: "16px",
    padding: "22px",
    marginTop: "20px",
  },

  bioBox: {
    backgroundColor: "#061b45",
    borderRadius: "10px",
    padding: "15px",
    color: "#e2e8f0",
    lineHeight: "1.6",
    fontSize: "13px",
    minHeight: "45px",
  },

  emptyText: {
    color: "#64748b",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#061b45",
    border: "1px solid #23457d",
    borderRadius: "10px",
    color: "white",
    padding: "12px",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    fontSize: "13px",
  },

  actionArea: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "25px",
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
  },

  saveButton: {
    padding: "11px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  cancelButton: {
    padding: "11px 20px",
    backgroundColor: "transparent",
    color: "#cbd5e1",
    border: "1px solid #31558d",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  message: {
    margin: "12px 0",
    fontSize: "13px",
  },

  messageBox: {
    backgroundColor: "#03163d",
    border: "1px solid #16366d",
    borderRadius: "12px",
    padding: "25px",
  },
};

export default Profile;