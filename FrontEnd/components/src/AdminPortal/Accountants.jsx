import React, { useState } from "react";
import { accountants } from "./mockData";

const Accountants = () => {
  const [, forceRender] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [added, setAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    accountants.push({
      id: `ac-${Date.now()}`,
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
    const a = accountants.find((acc) => acc.id === id);
    a.status = a.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>New Accountant</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          Only the School Office can create an accountant account or grant them access to
          the Accountant Dashboard. Accountants can post student tuition, which is sent
          straight to the relevant parent&rsquo;s portal.
        </p>
        <div className="portal-field">
          <label htmlFor="accountant-name">Full name</label>
          <input
            id="accountant-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setAdded(false);
            }}
            placeholder="e.g. Kwaku Anane"
          />
        </div>
        <div className="portal-field">
          <label htmlFor="accountant-email">Email</label>
          <input
            id="accountant-email"
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
          Create accountant
        </button>
        {added && <p className="portal-success">Accountant created and granted access.</p>}
      </form>

      <div className="admin-section-card">
        <h2>Existing Accountants</h2>
        {accountants.length === 0 ? (
          <p className="portal-empty">No accountants yet.</p>
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
                {accountants.map((a) => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>
                      <span
                        className={`portal-badge ${
                          a.status === "ACTIVE" ? "status-present" : "status-not_recorded"
                        }`}
                      >
                        {a.status === "ACTIVE" ? "Access granted" : "Access revoked"}
                      </span>
                    </td>
                    <td>{a.createdAt}</td>
                    <td>
                      <button
                        className="portal-link-btn"
                        style={{
                          background: a.status === "ACTIVE" ? "#9a1c1c" : "#179636",
                        }}
                        onClick={() => toggleStatus(a.id)}
                      >
                        {a.status === "ACTIVE" ? "Revoke access" : "Grant access"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          Revoking access here immediately signs them out of the Accountant portal — they
          won&rsquo;t be able to log in again, or stay logged in, until access is granted
          back.
        </p>
      </div>
    </div>
  );
};

export default Accountants;
