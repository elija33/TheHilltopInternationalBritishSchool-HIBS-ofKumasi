import React, { useState } from "react";
import { compressImageFile } from "./imageUpload";

const EMPTY = {
  name: "",
  positionConfirmed: true,
  position: "",
  alsoTeaches: "",
  qualifications: "",
  contactTopics: "",
  email: "",
  phone: "",
};

// Shared by Admin and Sub Admin for both "add a staff member" and "propose
// an edit" — onSubmit receives {name, positionConfirmed, position,
// alsoTeaches, qualifications, contactTopics, email, phone, photoDataUrl}
// and should throw if persisting fails (e.g. storage full), which this form
// surfaces as an inline error instead of losing the input.
const AdministrativeStaffForm = ({ initial, submitLabel, onSubmit, onCancel }) => {
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
    if (fields.positionConfirmed && !fields.position.trim()) {
      setError("Enter a position, or mark it as not yet confirmed.");
      return;
    }
    setError("");
    try {
      onSubmit({
        ...fields,
        position: fields.positionConfirmed ? fields.position.trim() : "",
        alsoTeaches: fields.alsoTeaches.trim(),
        qualifications: fields.qualifications.trim(),
        contactTopics: fields.contactTopics.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
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
        <label htmlFor="staff-name">Full name</label>
        <input id="staff-name" value={fields.name} onChange={(e) => update("name", e.target.value)} />
      </div>

      <div className="portal-field" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="checkbox"
          id="staff-position-confirmed"
          checked={fields.positionConfirmed}
          onChange={(e) => update("positionConfirmed", e.target.checked)}
        />
        <label htmlFor="staff-position-confirmed" style={{ margin: 0, fontWeight: 400 }}>
          Position is confirmed
        </label>
      </div>
      {fields.positionConfirmed && (
        <div className="portal-field">
          <label htmlFor="staff-position">
            Position(s) <span style={{ fontWeight: 400, color: "var(--muted)" }}>(comma-separated for more than one)</span>
          </label>
          <input
            id="staff-position"
            value={fields.position}
            onChange={(e) => update("position", e.target.value)}
            placeholder="e.g. CAIE Exams Officer, Coordinator, Counsellor"
          />
        </div>
      )}

      <div className="portal-field">
        <label htmlFor="staff-also-teaches">
          Also teaches <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input
          id="staff-also-teaches"
          value={fields.alsoTeaches}
          onChange={(e) => update("alsoTeaches", e.target.value)}
          placeholder="e.g. IGCSE Biology"
        />
      </div>

      <div className="portal-field">
        <label htmlFor="staff-qualifications">
          Qualifications <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional, one per line)</span>
        </label>
        <textarea
          id="staff-qualifications"
          className="portal-select"
          rows={3}
          style={{ width: "100%", maxWidth: 480, fontFamily: "inherit" }}
          value={fields.qualifications}
          onChange={(e) => update("qualifications", e.target.value)}
          placeholder={"B.A. (Hons.) Education, University of Ghana\nPostgraduate Certificate in Education, Institute of Education, London"}
        />
      </div>

      <div className="portal-field">
        <label htmlFor="staff-contact-topics">
          "Who to contact" entries{" "}
          <span style={{ fontWeight: 400, color: "var(--muted)" }}>
            (optional, one per line as "Topic | description")
          </span>
        </label>
        <textarea
          id="staff-contact-topics"
          className="portal-select"
          rows={2}
          style={{ width: "100%", maxWidth: 480, fontFamily: "inherit" }}
          value={fields.contactTopics}
          onChange={(e) => update("contactTopics", e.target.value)}
          placeholder="General school matters | Academic leadership and school life"
        />
      </div>

      <div className="portal-field">
        <label htmlFor="staff-email">
          Email <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input
          id="staff-email"
          type="email"
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="name@hibs.edu.gh"
        />
      </div>

      <div className="portal-field">
        <label htmlFor="staff-phone">
          Office phone <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input
          id="staff-phone"
          value={fields.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+233 24 000 0000"
        />
      </div>

      <div className="portal-field">
        <label htmlFor="staff-photo">
          Photo <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input id="staff-photo" type="file" accept="image/*" onChange={handleFile} />
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

export default AdministrativeStaffForm;
