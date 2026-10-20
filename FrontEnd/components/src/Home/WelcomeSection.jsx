import React from "react";
import { Link } from "react-router-dom";
import directorPhoto from "../../image/andrew-akwasi-oteng-amoako.jpg";

const WelcomeSection = () => (
  <section className="hp-welcome-section">
    <div className="hp-container hp-welcome-grid">
      <div className="hp-welcome-photo">
        <img src={directorPhoto} alt="Andrew Akwasi Oteng-Amoako, PhD" style={{ width: "100%", display: "block" }} />
      </div>
      <div>
        <p className="hp-section-eyebrow">Welcome from the Executive Director</p>
        <h2 className="hp-welcome-quote">
          &ldquo;A child&rsquo;s education is the most important legacy a parent can
          bequeath.&rdquo;
        </h2>
        <p className="hp-welcome-body">
          At HIBS, we work hand in hand with parents, the Board and our teachers to deliver
          excellence in education grounded in strong moral values — so that every child grows
          into one of the Stars of HIBS.
        </p>
        <p className="hp-welcome-signature">Andrew Akwasi Oteng-Amoako, PhD</p>
        <p className="hp-welcome-role">Executive Director &middot; Chairman, Board of Directors</p>
        <Link to="/who" className="hp-text-link">
          Read the full message &rarr;
        </Link>
      </div>
    </div>
  </section>
);

export default WelcomeSection;
