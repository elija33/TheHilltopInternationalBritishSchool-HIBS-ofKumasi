import React from "react";
import "../styles.css";
import "./ClubsAndSocieties.css";
import hibsFooterLogo from "../../image/hibs_logofooter.jpg";

const ClubsAndSocieties = () => {
  return (
    <div>
      <section className="hero" style={{ padding: 0 }}>
        <div className="carousel-wrapper">
          <div
            style={{
              width: "100%",
              height: 260,
              background: "linear-gradient(90deg,#0b9a56,#2bb673)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={hibsFooterLogo}
              alt="HIBS"
              style={{ height: 140, opacity: 0.95 }}
            />
          </div>
        </div>
      </section>

      <main className="container main-content">
        <div className="clubs-container">
          <h1 className="clubs-title">Clubs &amp; Societies</h1>
          <p>
            We believe in the Greek adage that a sound body makes a sound mind.
            Consequently, physical education and other extra curricula
            activities are integral part of the school curriculum and it is
            compulsory for all students. In addition, students with the consent
            of their parents and school authorities are free to join any of the
            following clubs and societies in the school.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ClubsAndSocieties;
