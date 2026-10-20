import React, { useRef, useState } from "react";

const SLIDES = [
  { photo: "students on the field", title: "Sports Day", subtitle: "Inter-house athletics" },
  { photo: "chemistry practical", title: "In the Lab", subtitle: "Hands-on science" },
  { photo: "classroom, small group", title: "Small Classes", subtitle: "Every child seen and heard" },
  { photo: "computer lab", title: "Digital Skills", subtitle: "Broadband computer lab" },
  { photo: "boarding house", title: "Boarding Life", subtitle: "A home away from home" },
  { photo: "clubs meeting", title: "Clubs & Societies", subtitle: "Find your passion" },
];

const CARD_WIDTH = 280 + 20; // flex-basis + gap, kept in sync with the CSS

const CampusLifeCarousel = () => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

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
          {SLIDES.map((s) => (
            <div className="hp-campus-card" key={s.title}>
              <div className="hp-photo-placeholder">PHOTO: {s.photo}</div>
              <div className="hp-campus-card-overlay">
                <h3>{s.title}</h3>
                <p>{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hp-campus-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
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
