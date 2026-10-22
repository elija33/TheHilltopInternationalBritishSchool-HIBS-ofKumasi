import React, { useState } from "react";
import {
  CARDS_META,
  photoSubmissions,
  publishPhotoDirectly,
  approvePhotoSubmission,
  rejectPhotoSubmission,
  getApprovedPhotoForCard,
  revertToPlaceholder,
} from "./whyHibsPhotos";
import { compressImageFile } from "./imageUpload";
import { admin } from "./mockData";

const Photos = () => {
  const [, forceRender] = useState(0);
  const [cardKey, setCardKey] = useState(CARDS_META[0].key);
  const [preview, setPreview] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [published, setPublished] = useState(false);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [rejectError, setRejectError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setPublished(false);
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

  const handlePublish = (e) => {
    e.preventDefault();
    if (!compressed) {
      setError("Choose an image before publishing.");
      return;
    }
    const meta = CARDS_META.find((c) => c.key === cardKey);
    try {
      publishPhotoDirectly({
        cardKey,
        cardLabel: meta.label,
        imageDataUrl: compressed,
        publishedBy: admin.name,
      });
    } catch {
      setError("That image is too large to save, even after compression. Try a smaller photo.");
      return;
    }
    setPreview(null);
    setCompressed(null);
    setPublished(true);
    forceRender((n) => n + 1);
  };

  const pending = photoSubmissions.filter((s) => s.status === "PENDING");

  const approve = (s) => {
    try {
      approvePhotoSubmission(s.id, admin.name);
    } catch {
      setError("Couldn't save that approval — storage may be full.");
      return;
    }
    forceRender((n) => n + 1);
  };

  const reject = (s) => {
    const note = rejectNote.trim();
    if (!note) {
      setRejectError("Tell the sub admin why you're rejecting this before confirming.");
      return;
    }
    rejectPhotoSubmission(s.id, admin.name, note);
    setRejectingId(null);
    setRejectNote("");
    setRejectError("");
    forceRender((n) => n + 1);
  };

  const revert = (cardKeyToRevert) => {
    revertToPlaceholder(cardKeyToRevert, admin.name);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handlePublish}>
        <h2>Upload a homepage photo</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          Published immediately — no approval step for admin uploads.
        </p>
        <div className="portal-field">
          <label htmlFor="admin-photo-card">Which card</label>
          <select
            id="admin-photo-card"
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
          <label htmlFor="admin-photo-file">Image file</label>
          <input id="admin-photo-file" type="file" accept="image/*" onChange={handleFile} />
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
          Publish to homepage
        </button>
        {published && <p className="portal-success">Published to the homepage.</p>}
      </form>

      <div className="admin-section-card">
        <h2>Pending from Sub Admin</h2>
        {pending.length === 0 ? (
          <p className="portal-empty">No photo submissions are waiting for review.</p>
        ) : (
          pending.map((s) => (
            <div key={s.id} style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <img
                  src={s.imageDataUrl}
                  alt=""
                  style={{ width: "140px", height: "105px", objectFit: "cover", borderRadius: "8px" }}
                />
                <div>
                  <h3 style={{ margin: "0 0 0.3rem" }}>{s.cardLabel}</h3>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>
                    Submitted by {s.submittedBy} on {s.submittedAt}
                  </p>
                </div>
              </div>

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
                    Approve &amp; publish
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
          ))
        )}
      </div>

      <div className="admin-section-card">
        <h2>Current live photos</h2>
        {CARDS_META.map((c) => {
          const photo = getApprovedPhotoForCard(c.key);
          return (
            <div
              key={c.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderTop: "1px solid #eef1ee",
                padding: "0.85rem 0",
              }}
            >
              {photo ? (
                <img
                  src={photo}
                  alt=""
                  style={{ width: "96px", height: "72px", objectFit: "cover", borderRadius: "6px" }}
                />
              ) : (
                <div
                  style={{
                    width: "96px",
                    height: "72px",
                    borderRadius: "6px",
                    background: "#eef3ee",
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <strong>{c.label}</strong>
                <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "var(--muted)" }}>
                  {photo ? "Live photo set" : "Using the placeholder"}
                </p>
              </div>
              {photo && (
                <button className="portal-link-btn" style={{ background: "#9a1c1c" }} onClick={() => revert(c.key)}>
                  Revert to placeholder
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Photos;
