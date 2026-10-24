import React, { useEffect, useRef, useState } from "react";
import { getApprovedPhotosForCard, subscribeToWhyHibsPhotos } from "../AdminPortal/whyHibsPhotos";

const SLIDES = [
  { key: "campus-sports-day", photo: "students on the field", title: "Sports Day", subtitle: "Inter-house athletics" },
  { key: "campus-lab", photo: "chemistry practical", title: "In the Lab", subtitle: "Hands-on science" },
  { key: "campus-classes", photo: "classroom, small group", title: "Small Classes", subtitle: "Every child seen and heard" },
  { key: "campus-digital", photo: "computer lab", title: "Digital Skills", subtitle: "Broadband computer lab" },
  { key: "campus-boarding", photo: "boarding house", title: "Boarding Life", subtitle: "A home away from home" },
  { key: "campus-clubs", photo: "clubs meeting", title: "Clubs & Societies", subtitle: "Find your passion" },
];

const CARD_WIDTH = 280 + 20; // flex-basis + gap, kept in sync with the CSS
const PHOTO_INTERVAL_MS = 4000;

const CardPhoto = ({ photos }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return undefined;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % photos.length);
    }, PHOTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [photos]);

  return (
    <div className="hp-campus-card-photo">
      {photos.map((src, i) => (
        <img key={src} src={src} alt="" className={i === active ? "active" : ""} />
      ))}
    </div>
  );
};

const CampusLifeCarousel = () => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [, forceRender] = useState(0);

  useEffect(() => subscribeToWhyHibsPhotos(() => forceRender((n) => n + 1)), []);

  const scrollToIndex = (index) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, index));
    trackRef.current?.scrollTo({ left: clamped * CARD_WIDTH, behavior: "smooth" });
    setActive(clamped);
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const index = Math.round(trackRef.current.scrollLeft / CARD_WIDTH);
    setActive(Math.max(0, Math.min(SLIDES.length - 1, index)));
  };

  return (
    <section className="hp-campus-section">
      <div className="hp-container">
        <div className="hp-campus-header">
          <div>
            <p className="hp-section-eyebrow">Life at HIBS</p>
            <h2>A day on campus</h2>
          </div>
          <div className="hp-campus-nav-btns">
            <button
              type="button"
              className="hp-campus-nav-btn"
              onClick={() => scrollToIndex(active - 1)}
              aria-label="Previous"
            >
              &larr;
            </button>
            <button
              type="button"
              className="hp-campus-nav-btn"
              onClick={() => scrollToIndex(active + 1)}
              aria-label="Next"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div className="hp-campus-track" ref={trackRef} onScroll={handleScroll}>
          {SLIDES.map((s) => {
            const approved = getApprovedPhotosForCard(s.key).map((p) => p.imageDataUrl);
            return (
              <div className="hp-campus-card" key={s.key}>
                {approved.length > 0 ? (
                  <CardPhoto photos={approved} />
                ) : (
                  <div className="hp-photo-placeholder">PHOTO: {s.photo}</div>
                )}
                <div className="hp-campus-card-overlay">
                  <h3>{s.title}</h3>
                  <p>{s.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hp-campus-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              className={`hp-campus-dot ${i === active ? "active" : ""}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusLifeCarousel;
