import React, { useState } from "react";
import { students } from "../AdminPortal/mockData";
import { pendingAccountRequests } from "../AdminPortal/approvals";
import { CLASS_LIST } from "../AdminPortal/teacherData";
import { getCurrentSubAdmin } from "./useCurrentSubAdmin";

const Students = () => {
  const subAdmin = getCurrentSubAdmin();
  const [, forceRender] = useState(0);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState(CLASS_LIST[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    pendingAccountRequests.push({
      id: `paq-${Date.now()}`,
      type: "STUDENT",
      proposedData: { name, class: className },
      requestedBy: subAdmin ? subAdmin.name : "Sub Admin",
      requestedAt: new Date().toISOString().split("T")[0],
    });
    setName("");
    setSubmitted(true);
    forceRender((n) => n + 1);
  };

  const myPending = pendingAccountRequests.filter((r) => r.type === "STUDENT");

  const cancelRequest = (id) => {
    const idx = pendingAccountRequests.findIndex((r) => r.id === id);
    if (idx !== -1) pendingAccountRequests.splice(idx, 1);
    forceRender((n) => n + 1);
  };

  const filtered = students.filter((s) =>
    `${s.name} ${s.class}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>New Student</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          New student accounts need headmaster approval before they take effect.
        </p>
        <div className="portal-field">
          <label htmlFor="student-name">Full name</label>
          <input
            id="student-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSubmitted(false);
            }}
            placeholder="e.g. Kofi Darko"
          />
        </div>
        <div className="portal-field">
          <label htmlFor="student-class">Class</label>
          <select
            id="student-class"
            className="portal-select"
            value={className}
            onChange={(e) => {
              setClassName(e.target.value);
              setSubmitted(false);
            }}
          >
            {CLASS_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="portal-link-btn">
          Submit for approval
        </button>
        {submitted && <p className="portal-success">Submitted — waiting on headmaster approval.</p>}
      </form>

      {myPending.length > 0 && (
        <div className="admin-section-card">
          <h2>Your pending requests</h2>
          {myPending.map((r) => (
            <div
              key={r.id}
              style={{
                borderTop: "1px solid #eef1ee",
                padding: "0.85rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div>
                <strong>{r.proposedData.name}</strong>
                <span style={{ marginLeft: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                  {r.proposedData.class}
                </span>
                <span className="portal-badge status-late" style={{ marginLeft: "0.5rem" }}>
                  Pending headmaster approval
                </span>
              </div>
              <button className="portal-link-btn" onClick={() => cancelRequest(r.id)}>
                Cancel request
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="portal-toolbar">
        <div>
          <label htmlFor="student-search">Search</label>
          <input
            id="student-search"
            className="portal-select"
            type="text"
            placeholder="Search by name or class"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ minWidth: "220px" }}
          />
        </div>
      </div>

      <div className="admin-section-card">
        {filtered.length === 0 ? (
          <p className="portal-empty">No students match your search.</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.name}>
                    <td>{s.name}</td>
                    <td>{s.class}</td>
                    <td>
                      <span
                        className={`portal-badge ${
                          s.status === "active" ? "status-present" : "status-not_recorded"
                        }`}
                      >
                        {s.status === "active" ? "Active" : "Past student"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
