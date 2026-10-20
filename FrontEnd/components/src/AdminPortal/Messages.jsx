import React, { useEffect, useState } from "react";
import {
  contactMessages,
  updateContactMessage,
  deleteContactMessage,
  subscribeToContactMessages,
} from "./contactMessages";

const Messages = () => {
  const [, forceRender] = useState(0);

  // A message submitted from the public Contact Us page arrives in a
  // different browser tab — subscribe so it (and deletes made elsewhere)
  // show up here live instead of only after a manual refresh.
  useEffect(() => subscribeToContactMessages(() => forceRender((n) => n + 1)), []);

  const toggleRead = (msg) => {
    updateContactMessage(msg.id, { read: !msg.read });
    forceRender((n) => n + 1);
  };

  const remove = (id) => {
    deleteContactMessage(id);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <div className="admin-section-card">
        <h2>Contact Us messages</h2>
        {contactMessages.length === 0 ? (
          <p className="portal-empty">No messages have been submitted yet.</p>
        ) : (
          contactMessages.map((m) => (
            <div
              key={m.id}
              style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}
            >
              <div className="portal-subject-header">
                <h3>
                  {m.fullName}
                  {!m.read && (
                    <span className="portal-badge status-late" style={{ marginLeft: "0.5rem" }}>
                      New
                    </span>
                  )}
                </h3>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                  Submitted {m.submittedAt}
                </span>
              </div>

              <p style={{ margin: "0 0 0.3rem" }}>
                <strong>Contact:</strong> {m.email} {m.phone ? `· ${m.phone}` : ""}
              </p>
              {(m.childName || m.classApplyingFor) && (
                <p style={{ margin: "0 0 0.3rem" }}>
                  <strong>Child:</strong> {m.childName || "—"}
                  {m.classApplyingFor ? ` · Class applying for: ${m.classApplyingFor}` : ""}
                </p>
              )}
              <p style={{ margin: "0 0 0.75rem", lineHeight: 1.6 }}>{m.message}</p>

              <div style={{ display: "flex", gap: "0.6rem" }}>
                <button className="portal-link-btn" onClick={() => toggleRead(m)}>
                  {m.read ? "Mark as unread" : "Mark as read"}
                </button>
                <button
                  className="portal-link-btn"
                  style={{ background: "#9a1c1c" }}
                  onClick={() => remove(m.id)}
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

export default Messages;
