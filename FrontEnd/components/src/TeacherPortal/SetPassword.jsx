import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    navigate("/portal/teacher/home");
  };

  return (
    <div className="login-page container">
      <h2>Set a new password</h2>
      <form className="login-form" onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <p style={{ fontSize: "0.9rem", color: "#555f62" }}>
          This is your first login with a temporary password. You must set a new password
          before you can reach your dashboard.
        </p>

        {error && <p className="portal-notice">{error}</p>}

        <div className="form-group">
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm new password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Set password and continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetPassword;
