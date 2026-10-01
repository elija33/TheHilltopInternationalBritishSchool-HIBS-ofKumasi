import React, { useState } from "react";
import { pendingCorrections as initialCorrections } from "./mockData";

const GradeCorrections = () => {
  const [corrections, setCorrections] = useState(initialCorrections);
  const [resolved, setResolved] = useState([]);

  const resolve = (id, decision) => {
    const item = corrections.find((c) => c.id === id);
    setCorrections((prev) => prev.filter((c) => c.id !== id));
    setResolved((prev) => [{ ...item, decision }, ...prev]);
  };

  return (
    <div>
      <div className="admin-section-card">
        <h2>Pending requests</h2>
        {corrections.length === 0 ? (
          <p className="portal-empty">No grade correction requests are waiting.</p>
        ) : (
          corrections.map((c) => (
            <div
              key={c.id}
              style={{
                borderTop: "1px solid #eef1ee",
                padding: "1rem 0",
              }}
            >
              <div className="portal-subject-header">
                <h3>
                  {c.student} &middot; {c.subject} ({c.class})
                </h3>
              </div>
              <p style={{ margin: "0 0 0.4rem" }}>
                <strong>{c.assessment}</strong>: {c.currentValue} &rarr;{" "}
                {c.requestedValue}
              </p>
              <p style={{ margin: "0 0 0.4rem", color: "var(--muted)", fontSize: "0.88rem" }}>
                Requested by {c.requestedBy}: &ldquo;{c.reason}&rdquo;
              </p>
              <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.6rem" }}>
                <button className="portal-link-btn" onClick={() => resolve(c.id, "APPROVED")}>
                  Approve
                </button>
                <button
                  className="portal-link-btn"
                  style={{ background: "#9a1c1c" }}
                  onClick={() => resolve(c.id, "REJECTED")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {resolved.length > 0 && (
        <div className="admin-section-card">
          <h2>Resolved this session</h2>
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Decision</th>
                </tr>
              </thead>
              <tbody>
                {resolved.map((c) => (
                  <tr key={c.id}>
                    <td>{c.student}</td>
                    <td>{c.subject}</td>
                    <td>
                      <span
                        className={`portal-badge ${
                          c.decision === "APPROVED" ? "status-present" : "status-absent"
                        }`}
                      >
                        {c.decision === "APPROVED" ? "Approved" : "Rejected"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.75rem" }}>
            Approving applies the corrected mark and adds an &ldquo;updated&rdquo; note
            visible to the family — never the reason or who made the change, which stays
            here in the admin view only.
          </p>
        </div>
      )}
    </div>
  );
};

export default GradeCorrections;
