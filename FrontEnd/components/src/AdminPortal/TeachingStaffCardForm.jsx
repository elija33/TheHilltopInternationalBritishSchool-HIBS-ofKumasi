import React, { useState } from "react";
import { CATEGORY_LIST } from "./teachingStaffCards";
import { compressImageFile } from "./imageUpload";

const EMPTY = { name: "", subject: "", category: CATEGORY_LIST[0], degree: "", badge: "" };

// Shared by Admin and Sub Admin for both "add a new card" and "propose an
// edit" — onSubmit receives {name, subject, category, degree, badge,
// photoDataUrl} and should throw if persisting fails (e.g. storage full),
// which this form surfaces as an inline error instead of losing the input.
const TeachingStaffCardForm = ({ initial, submitLabel, onSubmit, onCancel }) => {
  const [fields, setFields] = useState(() => ({ ...EMPTY, ...initial }));
  const [preview, setPreview] = useState(initial?.photoDataUrl || null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const update = (key, value) => {
    setFields((f) => ({ ...f, [key]: value }));
    setDone(false);
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const dataUrl = await compressImageFile(file);
      setPreview(dataUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fields.name.trim() || !fields.subject.trim() || !fields.degree.trim()) {
      setError("Name, subject and degree are required.");
      return;
    }
    setError("");
    try {
      onSubmit({ ...fields, photoDataUrl: preview });
    } catch {
      setError("Couldn't save — that photo may be too large, even after compression.");
      return;
    }
    setDone(true);
    if (!initial) {
      setFields(EMPTY);
      setPreview(null);
    }
  };

  return (
    <form className="admin-section-card" onSubmit={handleSubmit}>
      <div className="portal-field">
        <label htmlFor="ts-name">Full name</label>
        <input id="ts-name" value={fields.name} onChange={(e) => update("name", e.target.value)} />
      </div>
      <div className="portal-field">
        <label htmlFor="ts-subject">Subject</label>
        <input
          id="ts-subject"
          value={fields.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="e.g. Mathematics"
        />
      </div>
      <div className="portal-field">
        <label htmlFor="ts-category">Category</label>
        <select
          id="ts-category"
          className="portal-select"
          value={fields.category}
          onChange={(e) => update("category", e.target.value)}
        >
          {CATEGORY_LIST.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="portal-field">
        <label htmlFor="ts-degree">Degree / qualification</label>
        <input
          id="ts-degree"
          value={fields.degree}
          onChange={(e) => update("degree", e.target.value)}
          placeholder="e.g. B.Sc. Mathematics, University of Education, Winneba"
        />
      </div>
      <div className="portal-field">
        <label htmlFor="ts-badge">
          Role badge <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input
          id="ts-badge"
          value={fields.badge}
          onChange={(e) => update("badge", e.target.value)}
          placeholder="e.g. Safeguarding Officer"
        />
      </div>
      <div className="portal-field">
        <label htmlFor="ts-photo">
          Photo <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input id="ts-photo" type="file" accept="image/*" onChange={handleFile} />
      </div>
      {busy && <p className="portal-notice">Processing image…</p>}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "120px", height: "90px", objectFit: "cover", borderRadius: "8px", marginBottom: "0.75rem" }}
        />
      )}
      {error && <p className="portal-notice">{error}</p>}
      <div style={{ display: "flex", gap: "0.6rem" }}>
        <button type="submit" className="portal-link-btn" disabled={busy}>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="portal-link-btn" style={{ background: "#6b7280" }} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
      {done && <p className="portal-success">Saved.</p>}
    </form>
  );
};

export default TeachingStaffCardForm;
