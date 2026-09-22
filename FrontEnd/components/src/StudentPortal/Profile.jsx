import React, { useState } from "react";
import { profile } from "./mockData";

const Profile = () => {
  const [phone, setPhone] = useState(profile.phone);
  const [emergencyName, setEmergencyName] = useState(profile.emergencyContactName);
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergencyContactPhone);
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);

  const handleSaveContact = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordMessage({ type: "error", text: "Enter your current and new password." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    setPasswordMessage({ type: "success", text: "Password updated." });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <div className="portal-card">
        <h2>School-managed details</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          These details are controlled by the school. To change them, contact the office.
        </p>
        <div className="portal-field">
          <label>Full name</label>
          <p className="readonly-value">{profile.fullName}</p>
        </div>
        <div className="portal-field">
          <label>Student ID</label>
          <p className="readonly-value">{profile.studentId}</p>
        </div>
        <div className="portal-field">
          <label>Class</label>
          <p className="readonly-value">{profile.currentClass}</p>
        </div>
        <div className="portal-field">
          <label>Enrolled since</label>
          <p className="readonly-value">{profile.enrollmentDate}</p>
        </div>
      </div>

      <div className="portal-card">
        <h2>Contact details</h2>
        <form onSubmit={handleSaveContact}>
          <div className="portal-field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setSaved(false);
              }}
              placeholder="Optional"
            />
            <span className="hint">Optional — leave blank if you don't have your own phone.</span>
          </div>
          <div className="portal-field">
            <label htmlFor="emergency-name">Emergency contact name</label>
            <input
              id="emergency-name"
              type="text"
              value={emergencyName}
              onChange={(e) => {
                setEmergencyName(e.target.value);
                setSaved(false);
              }}
            />
          </div>
          <div className="portal-field">
            <label htmlFor="emergency-phone">Emergency contact phone</label>
            <input
              id="emergency-phone"
              type="tel"
              value={emergencyPhone}
              onChange={(e) => {
                setEmergencyPhone(e.target.value);
                setSaved(false);
              }}
            />
          </div>
          <button type="submit" className="portal-link-btn">
            Save changes
          </button>
          {saved && <p className="portal-success">Saved.</p>}
        </form>
      </div>

      <div className="portal-card">
        <h2>Change password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="portal-field">
            <label htmlFor="current-password">Current password</label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="portal-field">
            <label htmlFor="new-password">New password</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="portal-field">
            <label htmlFor="confirm-password">Confirm new password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="portal-link-btn">
            Update password
          </button>
          {passwordMessage && (
            <p
              className={
                passwordMessage.type === "error" ? "portal-notice" : "portal-success"
              }
              style={{ marginTop: "0.75rem" }}
            >
              {passwordMessage.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
