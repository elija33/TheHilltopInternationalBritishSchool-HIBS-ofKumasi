import React, { useState } from "react";
import {
  carouselSlides,
  nextCarouselSlideId,
  addCarouselSlide,
  removeCarouselSlide,
  moveCarouselSlide,
} from "./carouselSlides";

const Carousel = () => {
  const [, forceRender] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      setError("Enter an image URL before adding a slide.");
      return;
    }
    setError("");
    addCarouselSlide({
      id: nextCarouselSlideId(),
      imageUrl: imageUrl.trim(),
      alt: alt.trim() || "HIBS homepage carousel image",
    });
    setImageUrl("");
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
          Slides rotate on the homepage hero in the order shown below. There&rsquo;s no
          file upload here — paste a URL to an already-hosted image.
        </p>
        <div className="portal-field">
          <label htmlFor="slide-url">Image URL</label>
          <input
            id="slide-url"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
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
        <button type="submit" className="portal-link-btn">
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
                  {s.imageUrl}
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
