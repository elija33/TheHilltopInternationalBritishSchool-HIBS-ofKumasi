import React from "react";
import { Link } from "react-router-dom";
import heroPhoto from "../../image/hilltop-1.jpg";

const Hero = () => (
  <section className="hp-hero">
    <div className="hp-container">
      <div>
        <p className="hp-hero-eyebrow">
          Cambridge Associate School · Since 2010
        </p>
        <h1>
          Where <span className="accent">Stars</span> are made.
        </h1>
        <p>
          A British curriculum, small classes and teachers who know every child
          by name — preparing students for IGCSE and the world beyond.
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
      <div className="hp-hero-photo">
        <img src={heroPhoto} alt="HIBS students" />
      </div>
    </div>
  </section>
);

export default Hero;
