import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { carouselSlides } from "../AdminPortal/carouselSlides";

const SLIDE_INTERVAL_MS = 6000;

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (carouselSlides.length < 2) return undefined;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % carouselSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hp-hero">
      {carouselSlides.length > 0 && (
        <div className="hp-hero-carousel" aria-hidden="true">
          {carouselSlides.map((s, i) => (
            <img
              key={s.id}
              src={s.imageUrl}
              alt=""
              className={`hp-hero-carousel-slide ${i === active ? "active" : ""}`}
            />
          ))}
          <div className="hp-hero-carousel-overlay" />
        </div>
      )}

      <div className="hp-container">
        <div>
          <p className="hp-hero-eyebrow">Cambridge Associate School · Since 2010</p>
          <h1>
            Where <span className="accent">Stars</span> are made.
          </h1>
          <p>
            A British curriculum, small classes and teachers who know every child by name —
            preparing students for IGCSE and the world beyond.
          </p>
          <div className="hp-hero-actions">
            <Link to="/apply" className="hp-hero-cta-primary">
              Apply Now &rarr;
            </Link>
            <Link to="/tours-and-open-days" className="hp-hero-cta-secondary">
              Book a School Visit
            </Link>
          </div>
        </div>
      </div>

      {carouselSlides.length > 1 && (
        <div className="hp-hero-dots">
          {carouselSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`hp-hero-dot ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
