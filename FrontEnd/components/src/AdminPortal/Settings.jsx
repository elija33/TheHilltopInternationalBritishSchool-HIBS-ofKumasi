import React, { useState } from "react";
import {
  classRankingsEnabled as initialRankings,
  arrearsPolicyEnabled as initialArrearsPolicy,
  arrearsMessage as initialArrearsMessage,
} from "./mockData";

const Settings = () => {
  const [rankingsEnabled, setRankingsEnabled] = useState(initialRankings);
  const [arrearsPolicyEnabled, setArrearsPolicyEnabled] = useState(initialArrearsPolicy);
  const [arrearsMessage, setArrearsMessage] = useState(initialArrearsMessage);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={handleSave}>
      <div className="admin-section-card">
        <h2>Class rankings</h2>
        <label className="portal-toggle">
          <input
            type="checkbox"
            checked={rankingsEnabled}
            onChange={(e) => {
              setRankingsEnabled(e.target.checked);
              setSaved(false);
            }}
          />
          Show class position to students and parents
        </label>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.5rem" }}>
          Off by default. When enabled, a student&rsquo;s rank appears on their grades
          page alongside their marks.
        </p>
      </div>

      <div className="admin-section-card">
        <h2>Fee arrears policy</h2>
        <label className="portal-toggle">
          <input
            type="checkbox"
            checked={arrearsPolicyEnabled}
            onChange={(e) => {
              setArrearsPolicyEnabled(e.target.checked);
              setSaved(false);
            }}
          />
          Withhold the report card download for families in arrears
        </label>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: "0.5rem 0 1rem" }}>
          Marks always stay visible to the family — this setting only ever affects the
          report card download, and the wording below is what they&rsquo;ll see instead
          of it.
        </p>
        <div className="portal-field">
          <label htmlFor="arrears-message">Message shown to families in arrears</label>
          <textarea
            id="arrears-message"
            rows={4}
            disabled={!arrearsPolicyEnabled}
            value={arrearsMessage}
            onChange={(e) => {
              setArrearsMessage(e.target.value);
              setSaved(false);
            }}
            style={{
              width: "100%",
              padding: "0.6rem 0.75rem",
              borderRadius: "6px",
              border: "1px solid #d7dcd7",
              fontFamily: "inherit",
              fontSize: "0.92rem",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      <button type="submit" className="portal-link-btn">
        Save settings
      </button>
      {saved && <p className="portal-success">Settings saved.</p>}
    </form>
  );
};

export default Settings;
