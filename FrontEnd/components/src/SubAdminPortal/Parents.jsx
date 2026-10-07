import React, { useState } from "react";
import { parents } from "../AdminPortal/mockData";
import { pendingAccountRequests } from "../AdminPortal/approvals";
import { getCurrentSubAdmin } from "./useCurrentSubAdmin";

const Parents = () => {
  const subAdmin = getCurrentSubAdmin();
  const [, forceRender] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    pendingAccountRequests.push({
      id: `paq-${Date.now()}`,
      type: "PARENT",
      proposedData: {
        name,
        email,
        phone,
        children: childName ? [childName] : [],
      },
      requestedBy: subAdmin ? subAdmin.name : "Sub Admin",
      requestedAt: new Date().toISOString().split("T")[0],
    });
    setName("");
    setEmail("");
    setPhone("");
    setChildName("");
    setSubmitted(true);
    forceRender((n) => n + 1);
  };

  const myPending = pendingAccountRequests.filter((r) => r.type === "PARENT");

  const cancelRequest = (id) => {
    const idx = pendingAccountRequests.findIndex((r) => r.id === id);
    if (idx !== -1) pendingAccountRequests.splice(idx, 1);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>New Parent</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          New parent accounts need headmaster approval before they take effect.
        </p>
        <div className="portal-field">
          <label htmlFor="parent-name">Full name</label>
          <input
            id="parent-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSubmitted(false);
            }}
            placeholder="e.g. Mrs. Abena Darko"
          />
        </div>
        <div className="portal-field">
          <label htmlFor="parent-email">Email</label>
          <input
            id="parent-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubmitted(false);
            }}
            placeholder="parent@gmail.com"
          />
        </div>
        <div className="portal-field">
          <label htmlFor="parent-phone">
            Phone <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
          </label>
          <input
            id="parent-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setSubmitted(false);
            }}
            placeholder="024 123 4567"
          />
        </div>
        <div className="portal-field">
          <label htmlFor="parent-child">
            Child&rsquo;s name{" "}
            <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
          </label>
          <input
            id="parent-child"
            value={childName}
            onChange={(e) => {
              setChildName(e.target.value);
              setSubmitted(false);
            }}
            placeholder="e.g. Kofi Darko"
          />
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

      <div className="admin-section-card">
        <h2>Existing Parents</h2>
        <div className="portal-table-wrap">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Children</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone || "—"}</td>
                  <td>{p.children.length > 0 ? p.children.join(", ") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Parents;
