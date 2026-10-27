import React, { useState } from "react";
import {
  ptaMembers,
  ptaSubmissions,
  createMemberDirectly,
  editMemberDirectly,
  deleteMemberDirectly,
  approveSubmission,
  rejectSubmission,
} from "./ptaMembers";
import PtaMemberForm from "./PtaMemberForm";
import { admin } from "./mockData";

const ACTION_LABEL = { CREATE: "Add", EDIT: "Edit", DELETE: "Delete" };

const Pta = () => {
  const [, forceRender] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [rejectError, setRejectError] = useState("");

  const pending = ptaSubmissions.filter((s) => s.status === "PENDING");

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
    deleteMemberDirectly(id);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <PtaMemberForm
        submitLabel="Add PTA member"
        onSubmit={(data) => {
          createMemberDirectly(data);
          forceRender((n) => n + 1);
        }}
      />

      <div className="admin-section-card">
        <h2>Pending from Sub Admin</h2>
        {pending.length === 0 ? (
          <p className="portal-empty">No PTA requests are waiting for review.</p>
        ) : (
          pending.map((s) => {
            const existing = s.targetId ? ptaMembers.find((m) => m.id === s.targetId) : null;
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
                        style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "50%" }}
                      />
                    )}
                    <div style={{ fontSize: "0.88rem" }}>
                      <p style={{ margin: "0 0 0.2rem" }}>
                        <strong>{preview.roleConfirmed ? preview.role : "Role to confirm"}</strong>
                        {preview.chairperson ? " · Featured as Chairperson" : ""}
                      </p>
                      {preview.org && <p style={{ margin: 0, color: "var(--muted)" }}>{preview.org}</p>}
                    </div>
                  </div>
                )}
                {s.action === "DELETE" && !existing && (
                  <p className="portal-notice">
                    This member was already removed — approving will have no further effect.
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
        <h2>All PTA members ({ptaMembers.length})</h2>
        {ptaMembers.map((m) =>
          editingId === m.id ? (
            <div key={m.id} style={{ borderTop: "1px solid #eef1ee", paddingTop: "1rem" }}>
              <PtaMemberForm
                initial={m}
                submitLabel="Save changes"
                onCancel={() => setEditingId(null)}
                onSubmit={(data) => {
                  editMemberDirectly(m.id, data);
                  setEditingId(null);
                  forceRender((n) => n + 1);
                }}
              />
            </div>
          ) : (
            <div
              key={m.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderTop: "1px solid #eef1ee",
                padding: "0.85rem 0",
              }}
            >
              {m.photoDataUrl ? (
                <img
                  src={m.photoDataUrl}
                  alt=""
                  style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#eef3ee", flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <strong>{m.name}</strong>
                <span style={{ marginLeft: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                  {m.roleConfirmed ? m.role : "Role to confirm"}
                  {m.chairperson ? " · Chairperson" : ""}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button className="portal-link-btn" onClick={() => setEditingId(m.id)}>
                  Edit
                </button>
                <button className="portal-link-btn" style={{ background: "#9a1c1c" }} onClick={() => remove(m.id)}>
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

export default Pta;
