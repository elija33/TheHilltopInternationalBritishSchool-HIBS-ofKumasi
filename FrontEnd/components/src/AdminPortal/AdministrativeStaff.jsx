import React, { useState } from "react";
import {
  administrativeStaff,
  administrativeStaffSubmissions,
  createStaffDirectly,
  editStaffDirectly,
  deleteStaffDirectly,
  approveSubmission,
  rejectSubmission,
} from "./administrativeStaffDirectory";
import AdministrativeStaffForm from "./AdministrativeStaffForm";
import { admin } from "./mockData";

const ACTION_LABEL = { CREATE: "Add", EDIT: "Edit", DELETE: "Delete" };

const AdministrativeStaffAdmin = () => {
  const [, forceRender] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [rejectError, setRejectError] = useState("");

  const pending = administrativeStaffSubmissions.filter((s) => s.status === "PENDING");

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
    deleteStaffDirectly(id);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <AdministrativeStaffForm
        submitLabel="Add staff member"
        onSubmit={(data) => {
          createStaffDirectly(data);
          forceRender((n) => n + 1);
        }}
      />

      <div className="admin-section-card">
        <h2>Pending from Sub Admin</h2>
        {pending.length === 0 ? (
          <p className="portal-empty">No administrative staff requests are waiting for review.</p>
        ) : (
          pending.map((s) => {
            const existing = s.targetId ? administrativeStaff.find((m) => m.id === s.targetId) : null;
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
                        <strong>{preview.positionConfirmed ? preview.position : "Position to confirm"}</strong>
                      </p>
                      {preview.alsoTeaches && (
                        <p style={{ margin: 0, color: "var(--muted)" }}>Also teaches {preview.alsoTeaches}</p>
                      )}
                    </div>
                  </div>
                )}
                {s.action === "DELETE" && !existing && (
                  <p className="portal-notice">
                    This staff member was already removed — approving will have no further effect.
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
        <h2>All administrative staff ({administrativeStaff.length})</h2>
        {administrativeStaff.map((m) =>
          editingId === m.id ? (
            <div key={m.id} style={{ borderTop: "1px solid #eef1ee", paddingTop: "1rem" }}>
              <AdministrativeStaffForm
                initial={m}
                submitLabel="Save changes"
                onCancel={() => setEditingId(null)}
                onSubmit={(data) => {
                  editStaffDirectly(m.id, data);
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
                  {m.positionConfirmed && m.position ? m.position : "Position to confirm"}
                  {m.alsoTeaches ? ` · Also teaches ${m.alsoTeaches}` : ""}
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

export default AdministrativeStaffAdmin;
