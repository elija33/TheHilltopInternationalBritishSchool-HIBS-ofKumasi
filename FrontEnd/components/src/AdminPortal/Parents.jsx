import React, { useState } from "react";
import { parents } from "./mockData";

const Parents = () => {
  const [, forceRender] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [added, setAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    parents.push({ name, email, phone, children: childName ? [childName] : [] });
    setName("");
    setEmail("");
    setPhone("");
    setChildName("");
    setAdded(true);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>New Parent</h2>
        <div className="portal-field">
          <label htmlFor="parent-name">Full name</label>
          <input
            id="parent-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setAdded(false);
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
              setAdded(false);
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
              setAdded(false);
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
              setAdded(false);
            }}
            placeholder="e.g. Kofi Darko"
          />
        </div>
        <button type="submit" className="portal-link-btn">
          Add parent
        </button>
        {added && <p className="portal-success">Parent added.</p>}
      </form>

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
