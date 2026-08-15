import React, { useState } from "react";
import Footer from "./Footer/Footer";
import Body from "./Home/Body/Body";
import Carousel from "./Home/carousel/Carousel";
import hibsLogo from "../image/hibs_logo.jpg";
import hibsFooterLogo from "../image/hibs_logofooter.jpg";
import "./styles.css";
import ApplicationModal from "./ApplicationModal";
import ApplyPage from "./ApplyPage";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
              <Link to="/apply" className="apply-btn">
                APPLY
              </Link>
            </div>
          </div>
        </div>

        <div className="primary-nav">
          <div className="container">
            <nav className="main-nav">
              <a href="#home">Home</a>
              <a href="#about" className="has-dropdown">
                About HIBS
              </a>
              <a href="#igcse">IGCSE</a>
              <div className="nav-item has-dropdown">
                <a href="#admission">Admission</a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#alevel">A Level</a>
                  </li>
                </ul>
              </div>
              <div className="nav-item has-dropdown">
                <a href="#campuslife">Campus Life</a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#boarding">Boarding</a>
                  </li>
                  <li>
                    <a href="#clubs">Clubs &amp; Societies</a>
                  </li>
                  <li>
                    <a href="#technology">Technology on Campus</a>
                  </li>
                  <li>
                    <a href="#sports">Clubs &amp; Societies</a>
                  </li>
                </ul>
              </div>
              <a href="#faqs">FAQs</a>
              <a href="#media">Media Center</a>
              <a href="#resources">Resources</a>
              <a href="#contact">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />

        <Route
          path="/apply"
          element={<ApplyPage onClose={() => navigate("/")} />}
        />
      </Routes>

      {showModal && (
        <ApplicationModal
          onClose={() => setShowModal(false)}
          onOpenApply={() => navigate("/apply")}
        />
      )}
    </div>
  );
};

export default App;
