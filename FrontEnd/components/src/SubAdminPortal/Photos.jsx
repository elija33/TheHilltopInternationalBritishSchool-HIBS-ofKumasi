import React, { useState } from "react";
import {
  CARDS_META,
  photoSubmissions,
  submitPhotoForApproval,
  cancelPhotoSubmission,
} from "../AdminPortal/whyHibsPhotos";
import { compressImageFile } from "../AdminPortal/imageUpload";
import { getCurrentSubAdmin } from "./useCurrentSubAdmin";

const Photos = () => {
  const subAdmin = getCurrentSubAdmin();
  const [, forceRender] = useState(0);
  const [cardKey, setCardKey] = useState(CARDS_META[0].key);
  const [preview, setPreview] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSubmitted(false);
    setBusy(true);
    try {
      const dataUrl = await compressImageFile(file);
      setPreview(dataUrl);
      setCompressed(dataUrl);
    } catch (err) {
      setError(err.message);
      setPreview(null);
      setCompressed(null);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!compressed) {
      setError("Choose an image before submitting.");
      return;
    }
    const meta = CARDS_META.find((c) => c.key === cardKey);
    try {
      submitPhotoForApproval({
        cardKey,
        cardLabel: meta.label,
        imageDataUrl: compressed,
        submittedBy: subAdmin ? subAdmin.name : "Sub Admin",
      });
    } catch {
      setError("That image is too large to submit, even after compression. Try a smaller photo.");
      return;
    }
    setPreview(null);
    setCompressed(null);
    setSubmitted(true);
    forceRender((n) => n + 1);
  };

  const myPending = photoSubmissions.filter(
    (s) => s.status === "PENDING" && s.submittedBy === (subAdmin ? subAdmin.name : "Sub Admin"),
  );

  const cancel = (id) => {
    cancelPhotoSubmission(id);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>Upload a homepage photo</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          Replaces the &ldquo;Why HIBS&rdquo; card photo on the homepage once the admin
          approves it.
        </p>
        <div className="portal-field">
          <label htmlFor="photo-card">Which card</label>
          <select
            id="photo-card"
            className="portal-select"
            value={cardKey}
            onChange={(e) => setCardKey(e.target.value)}
          >
            {CARDS_META.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="portal-field">
          <label htmlFor="photo-file">Image file</label>
          <input id="photo-file" type="file" accept="image/*" onChange={handleFile} />
        </div>
        {busy && <p className="portal-notice">Processing image…</p>}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "220px",
              height: "165px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "0.75rem",
            }}
          />
        )}
        {error && <p className="portal-notice">{error}</p>}
        <button type="submit" className="portal-link-btn" disabled={busy || !compressed}>
          Submit for approval
        </button>
        {submitted && <p className="portal-success">Submitted — waiting on admin approval.</p>}
      </form>

      {myPending.length > 0 && (
        <div className="admin-section-card">
          <h2>Your pending submissions</h2>
          {myPending.map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderTop: "1px solid #eef1ee",
                padding: "0.85rem 0",
              }}
            >
              <img
                src={s.imageDataUrl}
                alt=""
                style={{ width: "72px", height: "54px", objectFit: "cover", borderRadius: "6px" }}
              />
              <div style={{ flex: 1 }}>
                <strong>{s.cardLabel}</strong>
                <span className="portal-badge status-late" style={{ marginLeft: "0.5rem" }}>
                  Pending admin approval
                </span>
              </div>
              <button className="portal-link-btn" onClick={() => cancel(s.id)}>
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Photos;
