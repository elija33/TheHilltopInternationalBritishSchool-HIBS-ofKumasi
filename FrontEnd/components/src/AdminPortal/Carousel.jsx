import React, { useState } from "react";
import {
  carouselSlides,
  nextCarouselSlideId,
  addCarouselSlide,
  removeCarouselSlide,
  moveCarouselSlide,
} from "./carouselSlides";
import { compressImageFile } from "./imageUpload";

const Carousel = () => {
  const [, forceRender] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [alt, setAlt] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const dataUrl = await compressImageFile(file);
      setUploadedPreview(dataUrl);
      setImageUrl("");
    } catch (err) {
      setError(err.message);
      setUploadedPreview(null);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalUrl = uploadedPreview || imageUrl.trim();
    if (!finalUrl) {
      setError("Upload an image or enter an image URL before adding a slide.");
      return;
    }
    try {
      addCarouselSlide({
        id: nextCarouselSlideId(),
        imageUrl: finalUrl,
        alt: alt.trim() || "HIBS homepage carousel image",
      });
    } catch {
      setError("That image is too large to save, even after compression. Try a smaller photo.");
      return;
    }
    setError("");
    setImageUrl("");
    setUploadedPreview(null);
    setAlt("");
    forceRender((n) => n + 1);
  };

  const remove = (id) => {
    removeCarouselSlide(id);
    forceRender((n) => n + 1);
  };

  const move = (id, direction) => {
    moveCarouselSlide(id, direction);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>Add a carousel slide</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          Slides rotate on the homepage hero in the order shown below.
        </p>

        <div className="portal-field">
          <label htmlFor="slide-file">Upload from your computer</label>
          <input id="slide-file" type="file" accept="image/*" onChange={handleFile} />
        </div>

        {busy && <p className="portal-notice">Processing image…</p>}
        {uploadedPreview && (
          <img
            src={uploadedPreview}
            alt="Preview"
            style={{ width: "160px", height: "100px", objectFit: "cover", borderRadius: "8px", marginBottom: "0.75rem" }}
          />
        )}

        <div className="portal-field">
          <label htmlFor="slide-url">
            Or image URL{" "}
            <span style={{ fontWeight: 400, color: "var(--muted)" }}>
              (used only if no file is uploaded)
            </span>
          </label>
          <input
            id="slide-url"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setUploadedPreview(null);
              setError("");
            }}
            placeholder="https://…"
          />
        </div>
        <div className="portal-field">
          <label htmlFor="slide-alt">
            Alt text <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
          </label>
          <input
            id="slide-alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="e.g. Students in the science lab"
          />
        </div>
        {error && <p className="portal-notice">{error}</p>}
        <button type="submit" className="portal-link-btn" disabled={busy}>
          Add slide
        </button>
      </form>

      <div className="admin-section-card">
        <h2>Current slides ({carouselSlides.length})</h2>
        {carouselSlides.length === 0 ? (
          <p className="portal-empty">
            No slides yet — the homepage hero will show its plain green background until
            at least one is added.
          </p>
        ) : (
          carouselSlides.map((s, i) => (
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
                src={s.imageUrl}
                alt={s.alt}
                style={{
                  width: "96px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  flexShrink: 0,
                  background: "#eef3ee",
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: "0.9rem", wordBreak: "break-all" }}>
                  {s.imageUrl.startsWith("data:") ? "Uploaded image" : s.imageUrl}
                </p>
                <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "var(--muted)" }}>
                  {s.alt}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                <button
                  type="button"
                  className="portal-link-btn"
                  disabled={i === 0}
                  onClick={() => move(s.id, "up")}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="portal-link-btn"
                  disabled={i === carouselSlides.length - 1}
                  onClick={() => move(s.id, "down")}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="portal-link-btn"
                  style={{ background: "#9a1c1c" }}
                  onClick={() => remove(s.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Carousel;
