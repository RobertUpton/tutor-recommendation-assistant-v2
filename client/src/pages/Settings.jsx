import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
const navigate = useNavigate();

 const user =
  JSON.parse(
    localStorage.getItem("user")
  ) || {};

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

 useEffect(() => {

  if (!user?.id) return;

  fetch(
    `http://localhost:5000/api/users/${user.id}`
  )
      .then((response) => response.json())
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
        console.error(error);
      });

  }, []);

  const saveSettings = async () => {

    if (
      settings.password &&
      settings.password !==
        settings.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {

      const response =
        await fetch(
          `http://localhost:5000/api/users/settings/${user.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name: settings.name,
              email: settings.email,
              phone: settings.phone,
              location: settings.location,
              password:
                settings.password,
              notifications:
                settings.notifications,
              darkMode:
                settings.darkMode,
            }),
          }
        );

      const updated =
        await response.json();

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: updated.name,
          email: updated.email,
        })
      );

      alert("Settings Saved");

    } catch (error) {

      console.log(error);

      alert(
        "Unable to save settings"
      );

    }
  };


  const deleteAccount = async () => {

  const confirmed = window.confirm(
    "Are you sure you want to delete your account? This cannot be undone."
  );

  if (!confirmed) return;

  try {

    await fetch(
      `http://localhost:5000/api/users/${user.id}`,
      {
        method: "DELETE",
      }
    );

    // Logout
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");

  } catch (error) {

    console.log(error);

    alert(
      "Unable to delete account"
    );

  }
};
  return (

    <DashboardLayout>

      {/* Header */}
      <div style={{ marginBottom: "25px" }}>

        <h1 style={{ margin: 0 }}>
          Settings
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Manage your account settings and preferences.
        </p>

      </div>

      {/* User Card */}
      <div
        style={{
          backgroundColor: "#03163d",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "25px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >

        <div
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#60a5fa,#2563eb)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          {settings.name? settings.name.charAt(0) : "U"}
        </div>

        <div>

          <h2 style={{ margin: 0 }}>
            {settings.name}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "5px",
            }}
          >
            {settings.email}
          </p>

        </div>

      </div>

      {/* Settings Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
        }}
      >

        {/* Account Settings */}
        <div style={cardStyle}>

          <h2>Account Settings</h2>

          <label>Name</label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) =>
              setSettings({
                ...settings,
                name: e.target.value,
              })
            }
            style={inputStyle}
          />

          <label>Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) =>
              setSettings({
                ...settings,
                email: e.target.value,
              })
            }
            style={inputStyle}
          />

          <label>Phone Number</label>
          <input
            type="text"
            value={settings.phone}
            onChange={(e) =>
              setSettings({
                ...settings,
                phone: e.target.value,
              })
            }
            style={inputStyle}
          />

          <label>Location</label>
          <input
            type="text"
            value={settings.location}
            onChange={(e) =>
              setSettings({
                ...settings,
                location: e.target.value,
              })
            }
            style={inputStyle}
          />

        </div>

        {/* Security */}
        <div style={cardStyle}>

          <h2>Security</h2>

          <label>New Password</label>

          <input
            type="password"
            value={settings.password}
            onChange={(e) =>
              setSettings({
                ...settings,
                password: e.target.value,
              })
            }
            style={inputStyle}
          />

          <label>Confirm Password</label>

          <input
            type="password"
            value={
              settings.confirmPassword
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                confirmPassword:
                  e.target.value,
              })
            }
            style={inputStyle}
          />

        </div>

        {/* Preferences */}
        <div style={cardStyle}>

          <h2>Preferences</h2>

          <div style={toggleRow}>
            <span>
              Email Notifications
            </span>

            <input
              type="checkbox"
              checked={
                settings.notifications
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications:
                    e.target.checked,
                })
              }
            />
          </div>

          <div style={toggleRow}>
            <span>
              Dark Mode
            </span>

            <input
              type="checkbox"
              checked={
                settings.darkMode
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  darkMode:
                    e.target.checked,
                })
              }
            />
          </div>

        </div>

        {/* Account Information */}
        <div style={cardStyle}>

          <h2>
            Account Information
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Member Since
          </p>

          <p>
            {settings.createdAt
              ? new Date(
                  settings.createdAt
                ).toLocaleDateString()
              : "Loading..."}
          </p>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Account Type
          </p>

          <p>
            Student
          </p>

        </div>

      </div>

      {/* Save Button */}
      <button
        onClick={saveSettings}
        style={{
          marginTop: "30px",
          padding: "14px 30px",
          background:
            "linear-gradient(90deg,#3b82f6,#2563eb)",
          color: "white",
          border: "none",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        Save Changes
      </button>

      {/* Danger Zone */}
      <div
        style={{
          marginTop: "30px",
          backgroundColor: "#03163d",
          padding: "25px",
          borderRadius: "20px",
          border: "1px solid #ef4444",
        }}
      >

        <h2
          style={{
            color: "#ef4444",
          }}
        >
          Danger Zone
        </h2>

        <p>
          Permanently delete your account.
        </p>

        <button
         onClick={deleteAccount}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Delete Account
        </button>

      </div>

    </DashboardLayout>

  );
}

const cardStyle = {
  backgroundColor: "#03163d",
  padding: "25px",
  borderRadius: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #1e3a5f",
  backgroundColor: "#07173a",
  color: "white",
};

const toggleRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

export default Settings;