import React, { useEffect, useState } from "react";
import { getCurrentAccountant } from "./useCurrentAccountant";
import {
  parentAnnouncements,
  nextParentAnnouncementId,
  addParentAnnouncement,
  updateParentAnnouncement,
  deleteParentAnnouncement,
  subscribeToParentAnnouncements,
} from "./announcementsStore";

const emptyForm = { title: "", body: "" };

const Announcements = () => {
  const [, forceRender] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [posted, setPosted] = useState(false);
  const accountant = getCurrentAccountant();

  useEffect(() => subscribeToParentAnnouncements(() => forceRender((n) => n + 1)), []);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setPosted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.body) return;

    if (editingId) {
      updateParentAnnouncement(editingId, { title: form.title, body: form.body });
      setEditingId(null);
    } else {
      addParentAnnouncement({
        id: nextParentAnnouncementId(),
        title: form.title,
        body: form.body,
        postedAt: new Date().toISOString().split("T")[0],
        postedBy: accountant?.name || "Accountant",
      });
    }

    setForm(emptyForm);
    setPosted(true);
    forceRender((n) => n + 1);
  };

  const startEdit = (a) => {
    setEditingId(a.id);
    setForm({ title: a.title, body: a.body });
    setPosted(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const remove = (id) => {
    deleteParentAnnouncement(id);
    if (editingId === id) cancelEdit();
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit announcement" : "Post an announcement to parents"}</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          This is shown only on the Parent Portal, to every parent — it never appears on
          the public news page or any other portal.
        </p>

        <div className="portal-field">
          <label htmlFor="pann-title">Title</label>
          <input
            id="pann-title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Term 2 fees now due"
          />
        </div>

        <div className="portal-field">
          <label htmlFor="pann-body">Message</label>
          <textarea
            id="pann-body"
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            placeholder="Write the announcement for parents here..."
            rows={4}
            style={{
              width: "100%",
              maxWidth: 480,
              padding: "0.6rem 0.75rem",
              borderRadius: 6,
              border: "1px solid #d7dcd7",
              fontSize: "0.92rem",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button type="submit" className="portal-link-btn">
            {editingId ? "Save changes" : "Post to parents"}
          </button>
          {editingId && (
            <button
              type="button"
              className="portal-link-btn"
              style={{ background: "#6b7280" }}
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
        {posted && <p className="portal-success">Posted to the Parent Portal.</p>}
      </form>

      <div className="admin-section-card">
        <h2>Posted announcements</h2>
        {parentAnnouncements.length === 0 ? (
          <p className="portal-empty">No announcements have been posted yet.</p>
        ) : (
          parentAnnouncements.map((a) => (
            <div key={a.id} style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}>
              <div className="portal-subject-header">
                <h3>{a.title}</h3>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                  Posted {a.postedAt}
                </span>
              </div>
              <p style={{ margin: "0 0 0.75rem", lineHeight: 1.6 }}>{a.body}</p>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <button className="portal-link-btn" onClick={() => startEdit(a)}>
                  Edit
                </button>
                <button
                  className="portal-link-btn"
                  style={{ background: "#9a1c1c" }}
                  onClick={() => remove(a.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
