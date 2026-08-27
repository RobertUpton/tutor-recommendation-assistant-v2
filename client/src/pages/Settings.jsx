import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Settings() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user") || "{}");

  const [settings, setSettings] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    notifications: true,
    darkMode: true,
    createdAt: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    fetch(
      `http://localhost:5000/api/users/${user.id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load settings");
        }

        return response.json();
      })
      .then((data) => {
        setSettings({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          password: "",
          confirmPassword: "",
          notifications:
            data.notifications ?? true,
          darkMode:
            data.darkMode ?? true,
          createdAt:
            data.createdAt || "",
        });
      })
      .catch((error) => {
        console.error("Settings Error:", error);
      });
  }, []);

  const updateSetting = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const saveSettings = async () => {
    if (
      settings.password &&
      settings.password !== settings.confirmPassword
    ) {
      setMessage("Passwords do not match.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/settings/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: settings.name,
            email: settings.email,
            phone: settings.phone,
            location: settings.location,
            password: settings.password,
            notifications: settings.notifications,
            darkMode: settings.darkMode,
          }),
        }
      );

      const updated = await response.json();

      if (!response.ok) {
        throw new Error(
          updated.message || "Unable to save settings"
        );
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: updated.name,
          email: updated.email,
        })
      );

      setSettings((previous) => ({
        ...previous,
        password: "",
        confirmPassword: "",
      }));

      setMessage("Your settings have been saved.");
    } catch (error) {
      console.error("Save settings error:", error);
      setMessage(
        error.message || "Unable to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm(
      "Delete your account permanently? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete account.");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
    } catch (error) {
      console.error("Delete account error:", error);

      setMessage(
        "Unable to delete your account. Please try again."
      );
    }
  };

  const initial =
    settings.name
      ? settings.name.charAt(0).toUpperCase()
      : "U";

  return (
    <DashboardLayout>

      {/* Page Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>
            Settings
          </h1>

          <p style={subtitleStyle}>
            Manage your account, security, and preferences.
          </p>
        </div>
      </div>

      {/* Profile Summary */}
      <div style={profileCardStyle}>

        <div style={avatarStyle}>
          {initial}
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={profileNameStyle}>
            {settings.name || "User"}
          </h2>

          <p style={profileEmailStyle}>
            {settings.email || "No email available"}
          </p>

          <span style={studentBadgeStyle}>
            Student Account
          </span>
        </div>

      </div>

      {/* Settings Content */}
      <div style={settingsGridStyle}>

        {/* Personal Information */}
        <section style={cardStyle}>

          <div style={sectionHeaderStyle}>
            <div style={sectionIconStyle}>
              👤
            </div>

            <div>
              <h2 style={sectionTitleStyle}>
                Personal Information
              </h2>

              <p style={sectionDescriptionStyle}>
                Update your basic account information.
              </p>
            </div>
          </div>

          <div style={formGridStyle}>

            <div>
              <label style={labelStyle}>
                Full Name
              </label>

              <input
                type="text"
                value={settings.name}
                onChange={(e) =>
                  updateSetting(
                    "name",
                    e.target.value
                  )
                }
                style={inputStyle}
                placeholder="Your name"
              />
            </div>

            <div>
              <label style={labelStyle}>
                Email Address
              </label>

              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  updateSetting(
                    "email",
                    e.target.value
                  )
                }
                style={inputStyle}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label style={labelStyle}>
                Phone Number
              </label>

              <input
                type="text"
                value={settings.phone}
                onChange={(e) =>
                  updateSetting(
                    "phone",
                    e.target.value
                  )
                }
                style={inputStyle}
                placeholder="Add phone number"
              />
            </div>

            <div>
              <label style={labelStyle}>
                Location
              </label>

              <input
                type="text"
                value={settings.location}
                onChange={(e) =>
                  updateSetting(
                    "location",
                    e.target.value
                  )
                }
                style={inputStyle}
                placeholder="City, State"
              />
            </div>

          </div>

        </section>

        {/* Security */}
        <section style={cardStyle}>

          <div style={sectionHeaderStyle}>
            <div style={sectionIconStyle}>
              🔒
            </div>

            <div>
              <h2 style={sectionTitleStyle}>
                Security
              </h2>

              <p style={sectionDescriptionStyle}>
                Change your password to keep your account secure.
              </p>
            </div>
          </div>

          <label style={labelStyle}>
            New Password
          </label>

          <input
            type="password"
            value={settings.password}
            onChange={(e) =>
              updateSetting(
                "password",
                e.target.value
              )
            }
            style={inputStyle}
            placeholder="Enter new password"
          />

          <label style={labelStyle}>
            Confirm New Password
          </label>

          <input
            type="password"
            value={settings.confirmPassword}
            onChange={(e) =>
              updateSetting(
                "confirmPassword",
                e.target.value
              )
            }
            style={inputStyle}
            placeholder="Confirm new password"
          />

          <p style={securityHintStyle}>
            Leave these fields blank if you don't want to change your password.
          </p>

        </section>

        {/* Preferences */}
        <section style={cardStyle}>

          <div style={sectionHeaderStyle}>
            <div style={sectionIconStyle}>
              ⚙
            </div>

            <div>
              <h2 style={sectionTitleStyle}>
                Preferences
              </h2>

              <p style={sectionDescriptionStyle}>
                Customize how TutorMatch AI works for you.
              </p>
            </div>
          </div>

          {/* Notifications */}
          <div style={preferenceRowStyle}>

            <div>
              <h3 style={preferenceTitleStyle}>
                Email Notifications
              </h3>

              <p style={preferenceDescriptionStyle}>
                Receive updates about bookings and tutoring sessions.
              </p>
            </div>

            <button
              onClick={() =>
                updateSetting(
                  "notifications",
                  !settings.notifications
                )
              }
              style={{
                ...toggleStyle,
                backgroundColor:
                  settings.notifications
                    ? "#2563eb"
                    : "#1e293b",
              }}
            >
              <span
                style={{
                  ...toggleCircleStyle,
                  transform:
                    settings.notifications
                      ? "translateX(20px)"
                      : "translateX(0)",
                }}
              />
            </button>

          </div>

          {/* Dark Mode */}
          <div style={preferenceRowStyle}>

            <div>
              <h3 style={preferenceTitleStyle}>
                Dark Mode
              </h3>

              <p style={preferenceDescriptionStyle}>
                Use the dark appearance throughout the dashboard.
              </p>
            </div>

            <button
              onClick={() =>
                updateSetting(
                  "darkMode",
                  !settings.darkMode
                )
              }
              style={{
                ...toggleStyle,
                backgroundColor:
                  settings.darkMode
                    ? "#2563eb"
                    : "#1e293b",
              }}
            >
              <span
                style={{
                  ...toggleCircleStyle,
                  transform:
                    settings.darkMode
                      ? "translateX(20px)"
                      : "translateX(0)",
                }}
              />
            </button>

          </div>

        </section>

        {/* Account Information */}
        <section style={cardStyle}>

          <div style={sectionHeaderStyle}>
            <div style={sectionIconStyle}>
              ℹ
            </div>

            <div>
              <h2 style={sectionTitleStyle}>
                Account Information
              </h2>

              <p style={sectionDescriptionStyle}>
                Information about your TutorMatch AI account.
              </p>
            </div>
          </div>

          <div style={infoRowStyle}>
            <span style={infoLabelStyle}>
              Account Type
            </span>

            <span style={infoValueStyle}>
              Student
            </span>
          </div>

          <div style={infoRowStyle}>
            <span style={infoLabelStyle}>
              Member Since
            </span>

            <span style={infoValueStyle}>
              {settings.createdAt
                ? new Date(
                    settings.createdAt
                  ).toLocaleDateString()
                : "Loading..."}
            </span>
          </div>

          <div style={infoRowStyle}>
            <span style={infoLabelStyle}>
              Email Notifications
            </span>

            <span
              style={{
                ...statusBadgeStyle,
                color: settings.notifications
                  ? "#22c55e"
                  : "#94a3b8",
                backgroundColor:
                  settings.notifications
                    ? "#052e16"
                    : "#1e293b",
              }}
            >
              {settings.notifications
                ? "Enabled"
                : "Disabled"}
            </span>
          </div>

        </section>

      </div>

      {/* Save Area */}
      <div style={saveAreaStyle}>

        <div>
          {message && (
            <p
              style={{
                margin: 0,
                color: message.includes("saved")
                  ? "#22c55e"
                  : "#f87171",
                fontSize: "14px",
              }}
            >
              {message}
            </p>
          )}
        </div>

        <button
          onClick={saveSettings}
          disabled={saving}
          style={{
            ...saveButtonStyle,
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

      {/* Danger Zone */}
      <section style={dangerZoneStyle}>

        <div>
          <h2 style={dangerTitleStyle}>
            Danger Zone
          </h2>

          <p style={dangerDescriptionStyle}>
            Permanently delete your TutorMatch AI account and all associated data.
          </p>
        </div>

        <button
          onClick={deleteAccount}
          style={deleteButtonStyle}
        >
          Delete Account
        </button>

      </section>

    </DashboardLayout>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const titleStyle = {
  margin: 0,
  fontSize: "32px",
};

const subtitleStyle = {
  color: "#94a3b8",
  marginTop: "7px",
  marginBottom: 0,
};

const profileCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  backgroundColor: "#03163d",
  border: "1px solid #102a5c",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "20px",
};

const avatarStyle = {
  width: "68px",
  height: "68px",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, #60a5fa, #2563eb)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "27px",
  fontWeight: "bold",
  flexShrink: 0,
};

const profileNameStyle = {
  margin: 0,
  fontSize: "21px",
};

const profileEmailStyle = {
  margin: "5px 0 9px",
  color: "#94a3b8",
  fontSize: "14px",
};

const studentBadgeStyle = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: "20px",
  backgroundColor: "#0b2454",
  color: "#60a5fa",
  fontSize: "12px",
  fontWeight: "bold",
};

const settingsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(400px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  backgroundColor: "#03163d",
  border: "1px solid #102a5c",
  borderRadius: "16px",
  padding: "22px",
};

const sectionHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "22px",
};

const sectionIconStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  backgroundColor: "#0b2454",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "17px",
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: "18px",
};

const sectionDescriptionStyle = {
  margin: "4px 0 0",
  color: "#64748b",
  fontSize: "12px",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "5px 16px",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  color: "#cbd5e1",
  marginBottom: "7px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  marginBottom: "16px",
  borderRadius: "9px",
  border: "1px solid #1e3a5f",
  backgroundColor: "#07173a",
  color: "white",
  outline: "none",
};

const securityHintStyle = {
  color: "#64748b",
  fontSize: "12px",
  lineHeight: "1.5",
  marginTop: "0",
};

const preferenceRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  padding: "16px 0",
  borderBottom: "1px solid #102a5c",
};

const preferenceTitleStyle = {
  margin: 0,
  fontSize: "14px",
};

const preferenceDescriptionStyle = {
  margin: "5px 0 0",
  color: "#64748b",
  fontSize: "12px",
  lineHeight: "1.4",
};

const toggleStyle = {
  width: "42px",
  height: "23px",
  border: "none",
  borderRadius: "20px",
  padding: "2px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  flexShrink: 0,
};

const toggleCircleStyle = {
  display: "block",
  width: "19px",
  height: "19px",
  borderRadius: "50%",
  backgroundColor: "white",
  transition: "transform 0.2s",
};

const infoRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "1px solid #102a5c",
};

const infoLabelStyle = {
  color: "#94a3b8",
  fontSize: "13px",
};

const infoValueStyle = {
  color: "white",
  fontSize: "13px",
  fontWeight: "bold",
};

const statusBadgeStyle = {
  padding: "5px 9px",
  borderRadius: "15px",
  fontSize: "11px",
  fontWeight: "bold",
};

const saveAreaStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
  padding: "18px 0",
};

const saveButtonStyle = {
  padding: "12px 25px",
  background:
    "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const dangerZoneStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  marginTop: "5px",
  marginBottom: "30px",
  padding: "20px",
  backgroundColor: "#210b12",
  border: "1px solid #7f1d1d",
  borderRadius: "16px",
};

const dangerTitleStyle = {
  margin: 0,
  color: "#f87171",
  fontSize: "17px",
};

const dangerDescriptionStyle = {
  margin: "6px 0 0",
  color: "#94a3b8",
  fontSize: "12px",
};

const deleteButtonStyle = {
  padding: "10px 16px",
  backgroundColor: "transparent",
  color: "#f87171",
  border: "1px solid #ef4444",
  borderRadius: "9px",
  cursor: "pointer",
  fontWeight: "bold",
  flexShrink: 0,
};

export default Settings;