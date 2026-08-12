import React from "react";
import Footer from "./Footer/Footer";
import Body from "./Home/Body/Body";
import Carousel from "./Home/carousel/Carousel";
import "./styles.css";

const App = () => {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a href="#" className="brand">
            <img
              src="https://via.placeholder.com/60x60.png?text=H"
              alt="HIBS logo"
              className="brand-logo"
            />
            <div>
              <p className="brand-name">The Hilltop International</p>
              <p className="brand-subtitle"> British School (HIBS) of Kumasi</p>
            </div>
          </a>
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
          <div className="container partners-grid">
            <div className="partner-logo">
              Cambridge Assessment International Education
            </div>
            <div className="partner-logo">Global School Alliance</div>
            <div className="partner-logo">Project Green Schools</div>
            <div className="partner-logo">British Council</div>
            <div className="partner-logo">Partner School</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
