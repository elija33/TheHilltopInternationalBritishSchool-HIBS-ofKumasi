import React, { useState } from "react";
import {
  teachingStaffCards,
  teachingStaffSubmissions,
  createCardDirectly,
  editCardDirectly,
  deleteCardDirectly,
  approveSubmission,
  rejectSubmission,
} from "./teachingStaffCards";
import TeachingStaffCardForm from "./TeachingStaffCardForm";
import { admin } from "./mockData";

const ACTION_LABEL = { CREATE: "Add", EDIT: "Edit", DELETE: "Delete" };

const TeachingStaffAdmin = () => {
  const [, forceRender] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [rejectError, setRejectError] = useState("");

  const pending = teachingStaffSubmissions.filter((s) => s.status === "PENDING");

  const approve = (s) => {
    approveSubmission(s.id, admin.name);
    forceRender((n) => n + 1);
  };

  const reject = (s) => {
    const note = rejectNote.trim();
    if (!note) {
      setRejectError("Tell the sub admin why you're rejecting this before confirming.");
      return;
    }
    rejectSubmission(s.id, admin.name, note);
    setRejectingId(null);
    setRejectNote("");
    setRejectError("");
    forceRender((n) => n + 1);
  };

  const remove = (id) => {
    deleteCardDirectly(id);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <TeachingStaffCardForm
        submitLabel="Add teacher card"
        onSubmit={(data) => {
          createCardDirectly(data);
          forceRender((n) => n + 1);
        }}
      />

      <div className="admin-section-card">
        <h2>Pending from Sub Admin</h2>
        {pending.length === 0 ? (
          <p className="portal-empty">No teaching staff requests are waiting for review.</p>
        ) : (
          pending.map((s) => {
            const existing = s.targetId ? teachingStaffCards.find((c) => c.id === s.targetId) : null;
            const preview = s.action === "DELETE" ? existing : s.proposedData;
            return (
              <div key={s.id} style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}>
                <div className="portal-subject-header">
                  <h3>
                    <span className="portal-badge status-not_assessed" style={{ marginRight: "0.5rem" }}>
                      {ACTION_LABEL[s.action]}
                    </span>
                    {preview ? preview.name : "(deleted record)"}
                  </h3>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                    Requested by {s.requestedBy} on {s.requestedAt}
                  </span>
                </div>

                {s.action !== "DELETE" && preview && (
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", margin: "0.5rem 0" }}>
                    {preview.photoDataUrl && (
                      <img
                        src={preview.photoDataUrl}
                        alt=""
                        style={{ width: "96px", height: "72px", objectFit: "cover", borderRadius: "6px" }}
                      />
                    )}
                    <div style={{ fontSize: "0.88rem" }}>
                      <p style={{ margin: "0 0 0.2rem" }}>
                        <strong>{preview.subject}</strong> · {preview.category}
                      </p>
                      <p style={{ margin: "0 0 0.2rem", color: "var(--muted)" }}>{preview.degree}</p>
                      {preview.badge && <p style={{ margin: 0 }}>Badge: {preview.badge}</p>}
                    </div>
                  </div>
                )}
                {s.action === "DELETE" && !existing && (
                  <p className="portal-notice">
                    This card was already removed — approving will have no further effect.
                  </p>
                )}

                {rejectingId === s.id ? (
                  <div style={{ marginTop: "0.75rem" }}>
                    <label htmlFor={`reject-note-${s.id}`}>Reason for rejecting (required)</label>
                    <textarea
                      id={`reject-note-${s.id}`}
                      className="portal-select"
                      rows={2}
                      style={{ width: "100%" }}
                      value={rejectNote}
                      onChange={(e) => {
                        setRejectNote(e.target.value);
                        if (rejectError) setRejectError("");
                      }}
                    />
                    {rejectError && <p className="portal-notice">{rejectError}</p>}
                    <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.5rem" }}>
                      <button className="portal-link-btn" style={{ background: "#9a1c1c" }} onClick={() => reject(s)}>
                        Confirm reject
                      </button>
                      <button
                        className="portal-link-btn"
                        style={{ background: "#6b7280" }}
                        onClick={() => {
                          setRejectingId(null);
                          setRejectNote("");
                          setRejectError("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.75rem" }}>
                    <button className="portal-link-btn" onClick={() => approve(s)}>
                      Approve
                    </button>
                    <button
                      className="portal-link-btn"
                      style={{ background: "#9a1c1c" }}
                      onClick={() => {
                        setRejectingId(s.id);
                        setRejectNote("");
                        setRejectError("");
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="admin-section-card">
        <h2>All teacher cards ({teachingStaffCards.length})</h2>
        {teachingStaffCards.map((c) =>
          editingId === c.id ? (
            <div key={c.id} style={{ borderTop: "1px solid #eef1ee", paddingTop: "1rem" }}>
              <TeachingStaffCardForm
                initial={c}
                submitLabel="Save changes"
                onCancel={() => setEditingId(null)}
                onSubmit={(data) => {
                  editCardDirectly(c.id, data);
                  setEditingId(null);
                  forceRender((n) => n + 1);
                }}
              />
            </div>
          ) : (
            <div
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderTop: "1px solid #eef1ee",
                padding: "0.85rem 0",
              }}
            >
              {c.photoDataUrl ? (
                <img
                  src={c.photoDataUrl}
                  alt=""
                  style={{ width: "72px", height: "54px", objectFit: "cover", borderRadius: "6px" }}
                />
              ) : (
                <div style={{ width: "72px", height: "54px", borderRadius: "6px", background: "#eef3ee", flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <strong>{c.name}</strong>
                <span style={{ marginLeft: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                  {c.subject} · {c.category}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button className="portal-link-btn" onClick={() => setEditingId(c.id)}>
                  Edit
                </button>
                <button className="portal-link-btn" style={{ background: "#9a1c1c" }} onClick={() => remove(c.id)}>
                  Delete
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default TeachingStaffAdmin;
