import React, { useState } from "react";
import { announcements } from "./mockData";

const AUDIENCE_LABEL = {
  school: "Whole school",
  class: "One class",
  teachers: "Teachers only",
  parents_fees: "Parents (fees) — never shown to students",
  main_page: "Main page (public website)",
};

const MAIN_PAGE_CATEGORIES = ["Notice", "Admissions", "Academics", "Events", "General"];

// Shared by both Admin and Sub Admin — mutating the one module-level array
// (instead of local component state) means a post from either portal shows
// up for the other, and is what the public homepage and Teacher Portal read
// from when filtering by audience.
const Announcements = () => {
  const [, forceRender] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("school");
  const [className, setClassName] = useState("");
  const [category, setCategory] = useState(MAIN_PAGE_CATEGORIES[0]);
  const [pinned, setPinned] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [image, setImage] = useState("");

  const isMainPage = audience === "main_page";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;
    announcements.unshift({
      id: `ann-${Date.now()}`,
      audience,
      class: audience === "class" ? className : undefined,
      category: isMainPage ? category : undefined,
      pinned: isMainPage ? pinned : undefined,
      urgent: isMainPage ? urgent : undefined,
      image: isMainPage && image.trim() ? image.trim() : null,
      title,
      body,
      date: new Date().toISOString().split("T")[0],
    });
    setTitle("");
    setBody("");
    setClassName("");
    setCategory(MAIN_PAGE_CATEGORIES[0]);
    setPinned(false);
    setUrgent(false);
    setImage("");
    forceRender((n) => n + 1);
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
            <option value="teachers">Teachers only</option>
            <option value="parents_fees">Parents (fees) — never shown to students</option>
            <option value="main_page">Main page (public website)</option>
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
        {isMainPage && (
          <>
            <div className="portal-field">
              <label htmlFor="ann-category">Category</label>
              <select
                id="ann-category"
                className="portal-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {MAIN_PAGE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="portal-field">
              <label htmlFor="ann-image">
                Image URL <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
              </label>
              <input
                id="ann-image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://… — leave blank to show a placeholder"
              />
            </div>
            <div className="portal-field" style={{ display: "flex", gap: "1.5rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 400 }}>
                <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
                Pin to top
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 400 }}>
                <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
                Show as urgent banner
              </label>
            </div>
          </>
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
        {announcements.length === 0 ? (
          <p className="portal-empty">No announcements have been posted yet.</p>
        ) : (
          announcements.map((a) => (
            <div key={a.id} style={{ borderTop: "1px solid #eef1ee", padding: "0.85rem 0" }}>
              <div className="portal-subject-header">
                <h3>{a.title}</h3>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{a.date}</span>
              </div>
              <p style={{ margin: "0 0 0.3rem" }}>{a.body}</p>
              <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                {AUDIENCE_LABEL[a.audience]}
                {a.class ? ` — ${a.class}` : ""}
                {a.category ? ` — ${a.category}` : ""}
                {a.pinned ? " — Pinned" : ""}
                {a.urgent ? " — Urgent banner" : ""}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
