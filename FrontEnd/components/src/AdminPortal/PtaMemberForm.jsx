import React, { useState } from "react";
import { compressImageFile } from "./imageUpload";

const EMPTY = { name: "", role: "", roleConfirmed: true, chairperson: false, org: "" };

// Shared by Admin and Sub Admin for both "add a new member" and "propose an
// edit" — onSubmit receives {name, role, roleConfirmed, chairperson, org,
// photoDataUrl} and should throw if persisting fails (e.g. storage full),
// which this form surfaces as an inline error instead of losing the input.
const PtaMemberForm = ({ initial, submitLabel, onSubmit, onCancel }) => {
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
    if (!fields.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (fields.roleConfirmed && !fields.role.trim()) {
      setError("Enter a role, or mark it as not yet confirmed.");
      return;
    }
    setError("");
    try {
      onSubmit({
        ...fields,
        role: fields.roleConfirmed ? fields.role.trim() : "",
        photoDataUrl: preview,
      });
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
        <label htmlFor="pta-name">Full name</label>
        <input id="pta-name" value={fields.name} onChange={(e) => update("name", e.target.value)} />
      </div>
      <div className="portal-field" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="checkbox"
          id="pta-role-confirmed"
          checked={fields.roleConfirmed}
          onChange={(e) => update("roleConfirmed", e.target.checked)}
        />
        <label htmlFor="pta-role-confirmed" style={{ margin: 0, fontWeight: 400 }}>
          Role is confirmed
        </label>
      </div>
      {fields.roleConfirmed && (
        <div className="portal-field">
          <label htmlFor="pta-role">Role</label>
          <input
            id="pta-role"
            value={fields.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="e.g. Treasurer"
          />
        </div>
      )}
      <div className="portal-field">
        <label htmlFor="pta-org">
          Bio / organisation <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input
          id="pta-org"
          value={fields.org}
          onChange={(e) => update("org", e.target.value)}
          placeholder="e.g. Assistant Registrar, UEW Kumasi campus."
        />
      </div>
      <div className="portal-field" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="checkbox"
          id="pta-chairperson"
          checked={fields.chairperson}
          onChange={(e) => update("chairperson", e.target.checked)}
        />
        <label htmlFor="pta-chairperson" style={{ margin: 0, fontWeight: 400 }}>
          Feature as PTA Chairperson
        </label>
      </div>
      <div className="portal-field">
        <label htmlFor="pta-photo">
          Photo <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input id="pta-photo" type="file" accept="image/*" onChange={handleFile} />
      </div>
      {busy && <p className="portal-notice">Processing image…</p>}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "50%", marginBottom: "0.75rem" }}
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

export default PtaMemberForm;
