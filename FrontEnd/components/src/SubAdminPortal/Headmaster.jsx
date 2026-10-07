import React, { useState } from "react";
import { headmasters, headmasterClassAvailability } from "../AdminPortal/mockData";
import { headmasterApprovalQueue } from "../AdminPortal/approvals";
import { CLASS_LIST } from "../AdminPortal/teacherData";
import { getCurrentSubAdmin } from "./useCurrentSubAdmin";

const EMPTY_FORM = { name: "", title: "", email: "", phone: "", bio: "", classes: [] };

const initials = (name) =>
  name
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ClassCheckboxes = ({ selected, onToggle, excludeId }) => {
  const availability = headmasterClassAvailability(excludeId);

  if (CLASS_LIST.length === 0) {
    return <p className="portal-empty">No classes exist yet — add one on the Classes page first.</p>;
  }

  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      {CLASS_LIST.map((c) => {
        const taken = availability.isClassTaken(c) && !selected.includes(c);
        return (
          <label key={c} style={{ fontSize: "0.85rem", opacity: taken ? 0.5 : 1 }}>
            <input
              type="checkbox"
              checked={selected.includes(c)}
              disabled={taken}
              onChange={() => onToggle(c)}
            />{" "}
            {c}
            {taken ? " (already overseen)" : ""}
          </label>
        );
      })}
    </div>
  );
};

const Headmaster = () => {
  const subAdmin = getCurrentSubAdmin();
  const [, forceRender] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  const updateNew = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const updateEdit = (field, value) => setEditForm((prev) => ({ ...prev, [field]: value }));

  const toggleNewClass = (c) => {
    setForm((prev) => ({
      ...prev,
      classes: prev.classes.includes(c)
        ? prev.classes.filter((x) => x !== c)
        : [...prev.classes, c],
    }));
  };

  const toggleEditClass = (c) => {
    setEditForm((prev) => ({
      ...prev,
      classes: prev.classes.includes(c)
        ? prev.classes.filter((x) => x !== c)
        : [...prev.classes, c],
    }));
  };

  const queueFor = (targetId) => headmasterApprovalQueue.find((r) => r.targetId === targetId);

  const handleCreate = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError("Name is required.");
      return;
    }
    headmasterApprovalQueue.push({
      id: `hmq-${Date.now()}`,
      action: "CREATE",
      targetId: null,
      proposedData: {
        name,
        title: form.title.trim() || "Headmaster",
        email: form.email.trim(),
        phone: form.phone.trim(),
        bio: form.bio.trim(),
        classes: form.classes,
      },
      requestedBy: subAdmin ? subAdmin.name : "Sub Admin",
      requestedAt: new Date().toISOString().split("T")[0],
    });
    setForm(EMPTY_FORM);
    setError(null);
    setSubmitted(true);
    forceRender((n) => n + 1);
  };

  const startEdit = (hm) => {
    setEditingId(hm.id);
    setEditForm({ ...hm, classes: [...hm.classes] });
    setSubmitted(false);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    const name = editForm.name.trim();
    if (!name) return;
    headmasterApprovalQueue.push({
      id: `hmq-${Date.now()}`,
      action: "EDIT",
      targetId: editingId,
      proposedData: { ...editForm, name },
      requestedBy: subAdmin ? subAdmin.name : "Sub Admin",
      requestedAt: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    forceRender((n) => n + 1);
  };

  const requestDelete = (hm) => {
    if (queueFor(hm.id)) return; // already has a pending request
    if (
      !window.confirm(
        `Submit a request to delete ${hm.name}? This needs admin approval before it takes effect.`,
      )
    )
      return;
    headmasterApprovalQueue.push({
      id: `hmq-${Date.now()}`,
      action: "DELETE",
      targetId: hm.id,
      proposedData: null,
      requestedBy: subAdmin ? subAdmin.name : "Sub Admin",
      requestedAt: new Date().toISOString().split("T")[0],
    });
    if (editingId === hm.id) setEditingId(null);
    forceRender((n) => n + 1);
  };

  const cancelRequest = (requestId) => {
    const idx = headmasterApprovalQueue.findIndex((r) => r.id === requestId);
    if (idx !== -1) headmasterApprovalQueue.splice(idx, 1);
    forceRender((n) => n + 1);
  };

  const myPendingCreates = headmasterApprovalQueue.filter((r) => r.action === "CREATE");

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleCreate}>
        <h2>New Headmaster</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          A headmaster oversees a set of classes — e.g. one over JHS 1, 2 and 3, another
          over Primary 1 through 6. A class can only be overseen by one headmaster at a
          time. Creating, editing or deleting a headmaster needs admin approval before it
          takes effect.
        </p>
        <div className="portal-field">
          <label>Full name</label>
          <input
            value={form.name}
            onChange={(e) => {
              updateNew("name", e.target.value);
              setError(null);
            }}
            placeholder="e.g. Mr Patrick Kwesi Essiam"
          />
        </div>
        <div className="portal-field">
          <label>
            Title <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
          </label>
          <input
            value={form.title}
            onChange={(e) => updateNew("title", e.target.value)}
            placeholder="e.g. Head of JHS"
          />
        </div>
        <div className="portal-field">
          <label>
            Email <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateNew("email", e.target.value)}
          />
        </div>
        <div className="portal-field">
          <label>
            Phone <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
          </label>
          <input value={form.phone} onChange={(e) => updateNew("phone", e.target.value)} />
        </div>
        <div className="portal-field">
          <label>Oversees</label>
          <ClassCheckboxes selected={form.classes} onToggle={toggleNewClass} excludeId={null} />
        </div>
        <button type="submit" className="portal-link-btn" style={{ marginTop: "0.5rem" }}>
          Submit for approval
        </button>
        {error && <p className="portal-notice" style={{ marginTop: "0.75rem" }}>{error}</p>}
        {submitted && (
          <p className="portal-success">Submitted — waiting on admin approval.</p>
        )}
      </form>

      {myPendingCreates.length > 0 && (
        <div className="admin-section-card">
          <h2>Your pending requests</h2>
          {myPendingCreates.map((r) => (
            <div
              key={r.id}
              style={{
                borderTop: "1px solid #eef1ee",
                padding: "0.85rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div>
                <strong>{r.proposedData.name}</strong>
                <span className="portal-badge status-late" style={{ marginLeft: "0.5rem" }}>
                  Pending admin approval
                </span>
                {r.proposedData.classes.length > 0 && (
                  <p style={{ margin: "0.3rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                    Proposed to oversee: {r.proposedData.classes.join(", ")}
                  </p>
                )}
              </div>
              <button className="portal-link-btn" onClick={() => cancelRequest(r.id)}>
                Cancel request
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="admin-section-card">
        <h2>Existing Headmasters</h2>
        {headmasters.length === 0 ? (
          <p className="portal-empty">No headmasters yet.</p>
        ) : (
          headmasters.map((hm) => {
            const pending = queueFor(hm.id);
            return (
              <div key={hm.id} style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}>
                {editingId === hm.id ? (
                  <form onSubmit={submitEdit}>
                    <div className="portal-field">
                      <label>Full name</label>
                      <input
                        value={editForm.name}
                        onChange={(e) => updateEdit("name", e.target.value)}
                      />
                    </div>
                    <div className="portal-field">
                      <label>Title</label>
                      <input
                        value={editForm.title}
                        onChange={(e) => updateEdit("title", e.target.value)}
                      />
                    </div>
                    <div className="portal-field">
                      <label>Email</label>
                      <input
                        value={editForm.email}
                        onChange={(e) => updateEdit("email", e.target.value)}
                      />
                    </div>
                    <div className="portal-field">
                      <label>Phone</label>
                      <input
                        value={editForm.phone}
                        onChange={(e) => updateEdit("phone", e.target.value)}
                      />
                    </div>
                    <div className="portal-field">
                      <label>Bio</label>
                      <textarea
                        rows={2}
                        value={editForm.bio}
                        onChange={(e) => updateEdit("bio", e.target.value)}
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
                    <div className="portal-field">
                      <label>Oversees</label>
                      <ClassCheckboxes
                        selected={editForm.classes}
                        onToggle={toggleEditClass}
                        excludeId={hm.id}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button type="submit" className="portal-link-btn">
                        Submit for approval
                      </button>
                      <button
                        type="button"
                        className="portal-link-btn"
                        style={{ background: "#6b7280" }}
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="portal-subject-header">
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.9rem" }}>
                      <span
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "#e6edff",
                          color: "#2544a8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          flexShrink: 0,
                        }}
                      >
                        {initials(hm.name)}
                      </span>
                      <div>
                        <h3 style={{ marginBottom: "0.15rem" }}>{hm.name}</h3>
                        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                          {hm.title}
                        </span>
                        <div style={{ marginTop: "0.5rem" }}>
                          {hm.classes.length === 0 ? (
                            <span className="portal-empty">No classes assigned yet</span>
                          ) : (
                            hm.classes.map((c) => (
                              <span
                                key={c}
                                className="portal-badge status-not_assessed"
                                style={{ marginRight: "0.4rem", marginBottom: "0.25rem", display: "inline-block" }}
                              >
                                {c}
                              </span>
                            ))
                          )}
                        </div>
                        {pending && (
                          <p style={{ margin: "0.5rem 0 0", fontSize: "0.82rem" }}>
                            <span className="portal-badge status-late">
                              Pending {pending.action.toLowerCase()} — awaiting admin approval
                            </span>{" "}
                            <button
                              className="portal-link-btn"
                              style={{ marginLeft: "0.5rem", padding: "0.25rem 0.6rem" }}
                              onClick={() => cancelRequest(pending.id)}
                            >
                              Cancel
                            </button>
                          </p>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                      <button
                        className="portal-link-btn"
                        onClick={() => startEdit(hm)}
                        disabled={Boolean(pending)}
                      >
                        Edit
                      </button>
                      <button
                        className="portal-link-btn"
                        style={{ background: "#9a1c1c" }}
                        onClick={() => requestDelete(hm)}
                        disabled={Boolean(pending)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Headmaster;
