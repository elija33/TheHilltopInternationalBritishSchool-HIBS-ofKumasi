import React from "react";
import { Link } from "react-router-dom";

const CTABanner = () => (
  <section className="hp-cta-wrap">
    <div className="hp-container">
      <div className="hp-cta-banner">
        <div>
          <h2>Give your child a world-class start in Kumasi.</h2>
          <p>Visit the campus, meet our teachers and see HIBS for yourself.</p>
        </div>
        <div className="hp-cta-actions">
          <Link to="/apply" className="hp-hero-cta-primary">
            Apply Now
          </Link>
          <Link to="/tours-and-open-days" className="hp-hero-cta-secondary">
            Book a Visit
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CTABanner;
