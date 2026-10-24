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
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setError("");
    setSubmitted(false);
    setBusy(true);
    try {
      const dataUrls = await Promise.all(files.map((f) => compressImageFile(f)));
      setPreviews(dataUrls);
    } catch (err) {
      setError(err.message);
      setPreviews([]);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (previews.length === 0) {
      setError("Choose at least one image before submitting.");
      return;
    }
    const meta = CARDS_META.find((c) => c.key === cardKey);
    try {
      previews.forEach((dataUrl) => {
        submitPhotoForApproval({
          cardKey,
          cardLabel: meta.label,
          imageDataUrl: dataUrl,
          submittedBy: subAdmin ? subAdmin.name : "Sub Admin",
        });
      });
    } catch {
      setError("That batch is too large to submit, even after compression. Try fewer or smaller photos.");
      return;
    }
    setPreviews([]);
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
        <h2>Upload homepage photos</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          Replaces the &ldquo;Why HIBS&rdquo; card photo on the homepage once the admin
          approves it. Select more than one file to submit several photos for the same
          card at once — they&rsquo;ll each need their own approval.
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
          <label htmlFor="photo-file">Image files</label>
          <input id="photo-file" type="file" accept="image/*" multiple onChange={handleFiles} />
        </div>
        {busy && <p className="portal-notice">Processing images…</p>}
        {previews.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.75rem" }}>
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Preview"
                style={{ width: "120px", height: "90px", objectFit: "cover", borderRadius: "8px" }}
              />
            ))}
          </div>
        )}
        {error && <p className="portal-notice">{error}</p>}
        <button type="submit" className="portal-link-btn" disabled={busy || previews.length === 0}>
          Submit {previews.length > 1 ? `${previews.length} photos` : "for approval"}
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
