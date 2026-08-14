import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:5000/api/users/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Failed to load profile:", error);
      });
  }, [user?.id]);

  if (!user) {
    return (
      <DashboardLayout>
        <div style={styles.messageBox}>
          <h2>Please login again.</h2>
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
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      const response = await fetch(
        `http://localhost:5000/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updated = await response.json();

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
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    fetch(`http://localhost:5000/api/users/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Failed to reset profile:", error);
      });
  };

  const initials = profile.name
    ? profile.name.charAt(0).toUpperCase()
    : "U";

  return (
    <DashboardLayout>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>My Profile</h1>

        <p style={styles.subtitle}>
          Manage your personal information and learning preferences.
        </p>
      </div>

      <div style={styles.profileCard}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {initials}
          </div>

          <div style={styles.profileIdentity}>
            {editing ? (
              <input
                value={profile.name || ""}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                style={styles.nameInput}
                placeholder="Your name"
              />
            ) : (
              <h2 style={styles.name}>
                {profile.name}
              </h2>
            )}

            <p style={styles.email}>
              {profile.email}
            </p>

            <span style={styles.studentBadge}>
              Student
            </span>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Personal Information */}
        <h3 style={styles.sectionTitle}>
          Personal Information
        </h3>

        <div style={styles.grid}>
          <ProfileField
            label="Phone"
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
              handleChange("location", value)
            }
          />

          <ProfileField
            label="Education Level"
            value={profile.educationLevel}
            editing={editing}
            onChange={(value) =>
              handleChange("educationLevel", value)
            }
          />

          <ProfileField
            label="Favorite Subject"
            value={profile.favoriteSubject}
            editing={editing}
            onChange={(value) =>
              handleChange("favoriteSubject", value)
            }
          />
        </div>

        {/* About Me */}
        <div style={styles.aboutSection}>
          <h3 style={styles.sectionTitle}>
            About Me
          </h3>

          {editing ? (
            <textarea
              value={profile.bio || ""}
              onChange={(e) =>
                handleChange("bio", e.target.value)
              }
              rows="5"
              placeholder="Tell your tutors a little about yourself..."
              style={styles.textarea}
            />
          ) : (
            <div style={styles.bioBox}>
              {profile.bio || ""}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          {editing ? (
            <>
              <button
                onClick={saveProfile}
                disabled={saving}
                style={styles.saveButton}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={cancelEdit}
                disabled={saving}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              style={styles.editButton}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
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
          {value || ""}
        </p>
      )}
    </div>
  );
}

const styles = {
  pageHeader: {
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "8px",
  },

  profileCard: {
    backgroundColor: "#03163d",
    border: "1px solid #16366d",
    borderRadius: "16px",
    padding: "28px",
    maxWidth: "850px",
  },

  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  avatar: {
    width: "80px",
    height: "80px",
    minWidth: "80px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: "bold",
  },

  profileIdentity: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  name: {
    margin: 0,
    fontSize: "25px",
  },

  nameInput: {
    backgroundColor: "#061b45",
    border: "1px solid #2563eb",
    borderRadius: "8px",
    color: "white",
    padding: "9px 12px",
    fontSize: "22px",
    fontWeight: "bold",
    outline: "none",
  },

  email: {
    margin: 0,
    color: "#94a3b8",
  },

  studentBadge: {
    width: "fit-content",
    marginTop: "4px",
    padding: "4px 10px",
    borderRadius: "20px",
    backgroundColor: "#0b2b66",
    color: "#60a5fa",
    fontSize: "12px",
    fontWeight: "bold",
  },

  divider: {
    height: "1px",
    backgroundColor: "#16366d",
    margin: "25px 0",
  },

  sectionTitle: {
    margin: "0 0 18px",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "20px",
  },

  field: {
    backgroundColor: "#061b45",
    borderRadius: "10px",
    padding: "15px",
  },

  label: {
    display: "block",
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "7px",
  },

  value: {
    margin: 0,
    fontWeight: "500",
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
  },

  aboutSection: {
    marginTop: "25px",
  },

  bioBox: {
    backgroundColor: "#061b45",
    borderRadius: "10px",
    padding: "15px",
    color: "#e2e8f0",
    lineHeight: "1.6",
    minHeight: "50px",
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
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "25px",
  },

  editButton: {
    padding: "11px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "bold",
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

  messageBox: {
    backgroundColor: "#03163d",
    borderRadius: "12px",
    padding: "25px",
  },
};

export default Profile;