import React, { useState } from "react";
import {
  teachingStaffCards,
  teachingStaffSubmissions,
  proposeCreate,
  proposeEdit,
  proposeDelete,
  cancelSubmission,
} from "../AdminPortal/teachingStaffCards";
import TeachingStaffCardForm from "../AdminPortal/TeachingStaffCardForm";
import { getCurrentSubAdmin } from "./useCurrentSubAdmin";

const ACTION_LABEL = { CREATE: "Add", EDIT: "Edit", DELETE: "Delete" };

const TeachingStaff = () => {
  const subAdmin = getCurrentSubAdmin();
  const requesterName = subAdmin ? subAdmin.name : "Sub Admin";
  const [, forceRender] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const myPending = teachingStaffSubmissions.filter(
    (s) => s.status === "PENDING" && s.requestedBy === requesterName,
  );

  const cancel = (id) => {
    cancelSubmission(id);
    forceRender((n) => n + 1);
  };

  const deleteCard = (id) => {
    proposeDelete(id, requesterName);
    forceRender((n) => n + 1);
  };

  const pendingTargetIds = new Set(
    teachingStaffSubmissions
      .filter((s) => s.status === "PENDING" && s.targetId)
      .map((s) => s.targetId),
  );

  return (
    <div>
      <TeachingStaffCardForm
        submitLabel="Submit for approval"
        onSubmit={(data) => {
          proposeCreate(data, requesterName);
          forceRender((n) => n + 1);
        }}
      />
      <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "-1rem 0 1.25rem" }}>
        New teacher cards, edits and removals all need admin approval before they show up
        on the public Teaching Staff page.
      </p>

      {myPending.length > 0 && (
        <div className="admin-section-card">
          <h2>Your pending requests</h2>
          {myPending.map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
                borderTop: "1px solid #eef1ee",
                padding: "0.85rem 0",
              }}
            >
              <div>
                <strong>{s.proposedData ? s.proposedData.name : "Delete request"}</strong>
                <span className="portal-badge status-not_assessed" style={{ marginLeft: "0.5rem" }}>
                  {ACTION_LABEL[s.action]}
                </span>
                <span className="portal-badge status-late" style={{ marginLeft: "0.5rem" }}>
                  Pending admin approval
                </span>
              </div>
              <button className="portal-link-btn" onClick={() => cancel(s.id)}>
                Cancel request
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="admin-section-card">
        <h2>Current teacher cards ({teachingStaffCards.length})</h2>
        {teachingStaffCards.map((c) =>
          editingId === c.id ? (
            <div key={c.id} style={{ borderTop: "1px solid #eef1ee", paddingTop: "1rem" }}>
              <TeachingStaffCardForm
                initial={c}
                submitLabel="Submit edit for approval"
                onCancel={() => setEditingId(null)}
                onSubmit={(data) => {
                  proposeEdit(c.id, data, requesterName);
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
                {pendingTargetIds.has(c.id) && (
                  <span className="portal-badge status-late" style={{ marginLeft: "0.5rem" }}>
                    Pending admin approval
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button
                  className="portal-link-btn"
                  disabled={pendingTargetIds.has(c.id)}
                  onClick={() => setEditingId(c.id)}
                >
                  Edit
                </button>
                <button
                  className="portal-link-btn"
                  style={{ background: "#9a1c1c" }}
                  disabled={pendingTargetIds.has(c.id)}
                  onClick={() => deleteCard(c.id)}
                >
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

export default TeachingStaff;
