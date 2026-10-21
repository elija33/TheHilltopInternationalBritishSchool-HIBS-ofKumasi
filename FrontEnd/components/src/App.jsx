import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import AppRoutes from "./AppRoutes";
import { getMainPageAnnouncements } from "./Home/announcementsUtils";
import hibsLogo from "../image/hibs_logo.jpg";
import "./styles.css";
import ApplicationModal from "./ApplicationModal";
import { getPageTitle } from "./pageTitle";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    document.title = getPageTitle(location.pathname);
  }, [location.pathname]);

  const urgentAnnouncement = getMainPageAnnouncements().find((a) => a.urgent);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="hp-utility-bar">
          <div className="hp-container">
            <div className="hp-utility-contact">
              <a href="tel:+233322299229">+233 (0) 32 229 9229</a>
              <span>1 Cecilia Agyei-Amoako Road, Kumasi</span>
            </div>
            <div className="hp-utility-links">
              <Link to="/news">News</Link>
              <Link to="/login/student">Students</Link>
              <Link to="/#alumni">Alumni</Link>
              <Link to="/login/parent">Parents</Link>
              <Link to="/#jobs">Jobs</Link>
              <Link to="/igcse">IGCSE</Link>
              <div className="hp-portal-login">
                <button type="button">Portal Login &rarr;</button>
                <ul className="hp-portal-login-menu">
                  <li>
                    <Link to="/login/student">Student Login</Link>
                  </li>
                  <li>
                    <Link to="/login/teacher">Teacher Login</Link>
                  </li>
                  <li>
                    <Link to="/login/parent">Parent / Guardian Login</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {urgentAnnouncement && (
          <div className="hp-urgent-banner">
            <div className="hp-container">
              <span className="hp-urgent-badge">Urgent</span>
              <span className="hp-urgent-message">
                {urgentAnnouncement.body}
              </span>
              <Link to="/news" className="hp-urgent-link">
                Read more
              </Link>
            </div>
          </div>
        )}

        <div className="hp-main-header">
          <div className="hp-container">
            <Link to="/" className="hp-brand">
              <img src={hibsLogo} alt="HIBS logo" className="hp-brand-logo" />
            </Link>

            <nav className="hp-nav">
              <Link to="/" className="hp-nav-link">
                Home
              </Link>
              <div className="hp-nav-item">
                <a
                  href="#"
                  className="hp-nav-link"
                  onClick={(e) => e.preventDefault()}
                >
                  About
                </a>
                <ul className="hp-dropdown">
                  <li>
                    <Link to="/who">Who We Are</Link>
                  </li>
                  <li>
                    <Link to="/board-of-directors">Board of Directors</Link>
                  </li>
                  <li>
                    <Link to="/teaching-staff">Teaching Staff</Link>
                  </li>
                  <li>
                    <Link to="/#pta">PTA</Link>
                  </li>
                  <li>
                    <Link to="/visiting-hibs">Visiting HIBS</Link>
                  </li>
                </ul>
              </div>
              <div className="hp-nav-item">
                <a
                  href="#"
                  className="hp-nav-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Admissions
                </a>
                <ul className="hp-dropdown">
                  <li>
                    <Link to="/a-level">A Level</Link>
                  </li>
                  <li>
                    <Link to="/administrative-staff">Administrative Staff</Link>
                  </li>
                </ul>
              </div>
              <div className="hp-nav-item">
                <a
                  href="#"
                  className="hp-nav-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Campus Life
                </a>
                <ul className="hp-dropdown">
                  <li>
                    <Link to="/housing-and-dining">Housing & Dining</Link>
                  </li>
                  <li>
                    <Link to="/clubs-and-societies">Clubs &amp; Societies</Link>
                  </li>
                  <li>
                    <Link to="/technology-on-campus">Technology on Campus</Link>
                  </li>
                  <li>
                    <Link to="/sports">Sports</Link>
                  </li>
                </ul>
              </div>
              <Link to="/igcse" className="hp-nav-link">
                IGCSE
              </Link>
              <Link to="/faqs" className="hp-nav-link">
                FAQs
              </Link>
              <Link to="/#media" className="hp-nav-link">
                Media
              </Link>
              <Link to="/contact-us" className="hp-nav-link">
                Contact
              </Link>
            </nav>

            <Link to="/apply" className="hp-apply-btn">
              Apply Now
            </Link>
          </div>
        </div>
      </header>

      <AppRoutes />

      <Footer />

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
