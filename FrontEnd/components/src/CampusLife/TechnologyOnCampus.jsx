import React from "react";
import { Link } from "react-router-dom";
import "../AboutHIBS/VisitingHIBS.css";
import "./TechnologyOnCampus.css";

const sidebarSubLinks = [
  { label: "About Us" },
  { label: "Get Help" },
  { label: "Getting Started", hasSub: true },
  { label: "Our Services", hasSub: true },
  { label: "Security & Safe Computing", hasSub: true },
  { label: "Student & Parent Portals", hasSub: true },
];

const techNews = [
  { title: "Student portal maintenance window", date: "September 20th, 2026" },
  { title: "New computer lab now open", date: "September 10th, 2026" },
];

const IconEnvelope = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
    <path d="M3 6l9 7 9-7" />
  </svg>
);
const IconLogin = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5" />
    <path d="M14 8l5 4-5 4M19 12H9" />
  </svg>
);
const IconLab = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <rect x="3" y="4" width="18" height="12" rx="1.2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);
const IconQuestion = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7" />
    <circle cx="12" cy="17" r="0.6" fill="#1f2937" />
  </svg>
);
const IconWifi = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <path d="M2 8.5a15 15 0 0 1 20 0M5.5 12.2a10 10 0 0 1 13 0M9.2 16a5 5 0 0 1 5.6 0" />
    <circle cx="12" cy="19.5" r="1" fill="#1f2937" />
  </svg>
);
const IconBook = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <path d="M4 5.5C6 4.5 9 4.5 11 5.5v14c-2-1-5-1-7 0v-14zM20 5.5c-2-1-5-1-7 0v14c2-1 5-1 7 0v-14z" />
  </svg>
);
const IconStart = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <path d="M12 3v8" />
    <path d="M6.2 6.2a9 9 0 1 0 11.6 0" />
  </svg>
);
const IconNews = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <rect x="3" y="4" width="14" height="16" rx="1" />
    <path d="M17 8h3v9a2.5 2.5 0 0 1-2.5 2.5H6" />
    <path d="M6.5 8h7M6.5 11.5h7M6.5 15h4" />
  </svg>
);
const IconCamera = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" strokeWidth="1.6">
    <rect x="2.5" y="6" width="19" height="14" rx="3" />
    <circle cx="12" cy="13" r="4" />
    <circle cx="17.5" cy="9" r="0.6" fill="#1f2937" />
  </svg>
);

const quickLinks = [
  { label: "Access Student Portal", to: "/login/student", Icon: IconEnvelope },
  { label: "Access Parent Portal", to: "/login/parent", Icon: IconLogin },
  { label: "Access Teacher Portal", to: "/login/teacher", Icon: IconLogin },
  { label: "Request Tech Support", to: "/contact-us", Icon: IconQuestion },
  { label: "Computer Labs & ICT", to: "/igcse", Icon: IconLab },
  { label: "Campus Wi-Fi", to: "/contact-us", Icon: IconWifi },
  { label: "Get Started With Technology", to: "/contact-us", Icon: IconStart },
  { label: "ICT Curriculum", to: "/igcse", Icon: IconBook },
  { label: "Follow HIBS Online", to: "/", Icon: IconCamera },
];

const sidebarPageLinks = [
  { label: "Housing & Dining", to: "/housing-and-dining" },
  { label: "Clubs & Societies", to: "/clubs-and-societies" },
  { label: "Technology on Campus", to: "/technology-on-campus", active: true },
  { label: "Sports", to: "/sports" },
];

const TechnologyOnCampus = () => {
  return (
    <div className="visiting-page">
      <aside className="visiting-sidebar">
        <div className="visiting-sidebar-header">
          <h2>Technology on Campus</h2>
        </div>

        <Link to="/" className="visiting-back-link">
          &larr; Back to Home
        </Link>

        <nav className="visiting-sidebar-nav">
          {sidebarPageLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`visiting-sidebar-link ${link.active ? "active" : ""}`}
            >
              {link.label}
              {link.active && <span className="visiting-sidebar-icon">&times;</span>}
            </Link>
          ))}
        </nav>

        <div className="tech-sidebar-panel">
          <div className="tech-sidebar-panel-title">On this page</div>
          {sidebarSubLinks.map((link) => (
            <div className="tech-sidebar-sub-link" key={link.label}>
              {link.label}
              {link.hasSub && <span className="tech-sidebar-plus">+</span>}
            </div>
          ))}
        </div>

        <Link to="/login/student" className="tech-cta-banner">
          Access the Student Portal
        </Link>
        <Link to="/login/parent" className="tech-cta-banner tech-cta-banner--alt">
          Access the Parent Portal
        </Link>

        <div className="tech-news">
          <div className="tech-news-title">Tech News</div>
          {techNews.map((item) => (
            <div className="tech-news-item" key={item.title}>
              <a href="/contact-us">{item.title}</a>
              <span>{item.date}</span>
            </div>
          ))}
        </div>
      </aside>

      <div className="visiting-main">
        <div className="visiting-hero tech-hero">
          <span className="tech-hero-caption">
            The Student and Parent Portals put grades, attendance and syllabus
            information online for every family.
          </span>
        </div>

        <div className="visiting-breadcrumb">
          <Link to="/">Home</Link> &raquo; <Link to="/#campuslife">Campus Life</Link>{" "}
          &raquo; <span>Technology on Campus</span>
        </div>

        <div className="visiting-card">
          <p>
            Technology keeps HIBS connected — from classroom equipment and our
            computer labs to the online <Link to="/login/student">Student</Link> and{" "}
            <Link to="/login/parent">Parent</Link> Portals used every day by our
            community.
          </p>
          <p>
            We provide campus-wide Wi-Fi, a dedicated{" "}
            <Link to="/igcse">ICT curriculum</Link> from Year 4 through IGCSE, and
            technical support for staff, students and boarding houses. If you have a
            technology question, please <Link to="/contact-us">get in touch</Link>{" "}
            with the school office.
          </p>
        </div>

        <div className="tech-quick-grid">
          {quickLinks.map(({ label, to, Icon }) => (
            <Link to={to} className="tech-quick-tile" key={label}>
              <Icon />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyOnCampus;
