import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <h3>⚙️ Account Settings</h3>

      {user ? (
        <div className="user-profile">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button onClick={handleLogout} className="logout-button">
            🚪 Logout
          </button>
        </div>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
}
