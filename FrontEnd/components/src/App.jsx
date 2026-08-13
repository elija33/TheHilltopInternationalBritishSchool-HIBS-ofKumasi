import React from "react";
import Footer from "./Footer/Footer";
import Body from "./Home/Body/Body";
import Carousel from "./Home/carousel/Carousel";
import hibsLogo from "../image/hibs_logo.jpg";
import hibsFooterLogo from "../image/hibs_logofooter.jpg";
import "./styles.css";

const App = () => {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="top-bar">
          <div className="container header-inner">
            <a href="#" className="brand">
              <img
                src={hibsLogo}
                alt="HIBS logo"
                className="brand-logo"
                height={80}
              />
            </a>

            <div className="top-actions">
              <a href="#news" className="top-link">
                NEWS
              </a>
              <a href="#alumni" className="top-link">
                ALUMNI
              </a>
              <a href="#parents" className="top-link">
                PARENTS
              </a>
              <a href="#jobs" className="top-link">
                JOBS
              </a>
              <a href="#apply" className="apply-btn">
                APPLY
              </a>
            </div>
          </div>
        </div>

        <div className="primary-nav">
          <div className="container">
            <nav className="main-nav">
              <a href="#home">Home</a>
              <a href="#about">About HIBS</a>
              <a href="#igcse">IGCSE</a>
              <a href="#alevel">A Level</a>
              <a href="#boarding">Boarding</a>
              <a href="#faqs">FAQs</a>
              <a href="#admission">Admission</a>
              <a href="#media">Media Center</a>
              <a href="#resources">Resources</a>
              <a href="#contact">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-overlay" />
        <div className="carousel-wrapper">
          <Carousel />
        </div>
      </section>
      <main className="container main-content">
        <Body />

        <section className="partners-section">
          <div>
            <div className="partner-logo partner-logo--img">
              <img src={hibsFooterLogo} alt="HIBS footer logo" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
