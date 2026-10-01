import React, { useState } from "react";
import { announcements as initialAnnouncements } from "./mockData";

const AUDIENCE_LABEL = {
  school: "Whole school",
  class: "One class",
  parents_fees: "Parents (fees) — never shown to students",
};

const Announcements = () => {
  const [items, setItems] = useState(initialAnnouncements);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("school");
  const [className, setClassName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;
    setItems((prev) => [
      {
        id: `new-${Date.now()}`,
        audience,
        class: audience === "class" ? className : undefined,
        title,
        body,
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
    setTitle("");
    setBody("");
    setClassName("");
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>New announcement</h2>
        <div className="portal-field">
          <label htmlFor="ann-title">Title</label>
          <input id="ann-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="portal-field">
          <label htmlFor="ann-audience">Audience</label>
          <select
            id="ann-audience"
            className="portal-select"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            <option value="school">Whole school</option>
            <option value="class">One class</option>
            <option value="parents_fees">Parents (fees) — never shown to students</option>
          </select>
        </div>
        {audience === "class" && (
          <div className="portal-field">
            <label htmlFor="ann-class">Class</label>
            <input
              id="ann-class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g. JHS 2B"
            />
          </div>
        )}
        <div className="portal-field">
          <label htmlFor="ann-body">Message</label>
          <textarea
            id="ann-body"
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
        <button type="submit" className="portal-link-btn">
          Post announcement
        </button>
      </form>

      <div className="admin-section-card">
        <h2>All announcements</h2>
        {items.map((a) => (
          <div key={a.id} style={{ borderTop: "1px solid #eef1ee", padding: "0.85rem 0" }}>
            <div className="portal-subject-header">
              <h3>{a.title}</h3>
              <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{a.date}</span>
            </div>
            <p style={{ margin: "0 0 0.3rem" }}>{a.body}</p>
            <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
              {AUDIENCE_LABEL[a.audience]}
              {a.class ? ` — ${a.class}` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
