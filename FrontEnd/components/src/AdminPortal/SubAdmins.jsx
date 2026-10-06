import React, { useState } from "react";
import { subAdmins } from "./mockData";

const SubAdmins = () => {
  const [, forceRender] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [added, setAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    subAdmins.push({
      id: `sa-${Date.now()}`,
      name,
      email,
      status: "ACTIVE",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setName("");
    setEmail("");
    setAdded(true);
    forceRender((n) => n + 1);
  };

  const toggleStatus = (id) => {
    const sa = subAdmins.find((s) => s.id === id);
    sa.status = sa.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>New Sub Admin</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          Sub admins can only create and view Students — nothing else in this dashboard is
          available to them.
        </p>
        <div className="portal-field">
          <label htmlFor="subadmin-name">Full name</label>
          <input
            id="subadmin-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setAdded(false);
            }}
            placeholder="e.g. Linda Owusu"
          />
        </div>
        <div className="portal-field">
          <label htmlFor="subadmin-email">Email</label>
          <input
            id="subadmin-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setAdded(false);
            }}
            placeholder="name@hibs.edu.gh"
          />
        </div>
        <button type="submit" className="portal-link-btn">
          Create sub admin
        </button>
        {added && <p className="portal-success">Sub admin created and granted access.</p>}
      </form>

      <div className="admin-section-card">
        <h2>Existing Sub Admins</h2>
        {subAdmins.length === 0 ? (
          <p className="portal-empty">No sub admins yet.</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subAdmins.map((sa) => (
                  <tr key={sa.id}>
                    <td>{sa.name}</td>
                    <td>{sa.email}</td>
                    <td>
                      <span
                        className={`portal-badge ${
                          sa.status === "ACTIVE" ? "status-present" : "status-not_recorded"
                        }`}
                      >
                        {sa.status === "ACTIVE" ? "Access granted" : "Access revoked"}
                      </span>
                    </td>
                    <td>{sa.createdAt}</td>
                    <td>
                      <button
                        className="portal-link-btn"
                        style={{
                          background: sa.status === "ACTIVE" ? "#9a1c1c" : "#179636",
                        }}
                        onClick={() => toggleStatus(sa.id)}
                      >
                        {sa.status === "ACTIVE" ? "Revoke access" : "Grant access"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          Revoking access here immediately signs them out of the Sub Admin portal — they
          won&rsquo;t be able to log in again, or stay logged in, until access is granted
          back.
        </p>
      </div>
    </div>
  );
};

export default SubAdmins;
