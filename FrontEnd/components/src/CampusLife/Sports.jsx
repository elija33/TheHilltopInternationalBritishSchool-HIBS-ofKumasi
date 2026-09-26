import React from "react";
import { Link } from "react-router-dom";
import "../AboutHIBS/VisitingHIBS.css";
import "./Sports.css";

const sidebarLinks = [
  { label: "Housing & Dining", to: "/housing-and-dining" },
  { label: "Clubs & Societies", to: "/clubs-and-societies" },
  { label: "Technology on Campus", to: "/technology-on-campus" },
  { label: "Sports", to: "/sports", active: true },
];

const sportsCards = [
  {
    title: "Inter-House Sports Competitions",
    to: "/clubs-and-societies",
    body: "Every student belongs to a house, and houses compete throughout the year in athletics, football and other events, building school spirit and teamwork.",
  },
  {
    title: "Physical Education",
    to: "/clubs-and-societies",
    body: "Physical education is a compulsory part of the curriculum for every student, reflecting our belief that a sound body makes a sound mind.",
  },
  {
    title: "Sports Clubs & Teams",
    to: "/clubs-and-societies",
    body: "With parental and school consent, students may join after-school sports clubs and teams, from recreational sessions to competitive fixtures against other schools.",
  },
];

const Sports = () => {
  return (
    <div className="visiting-page">
      <aside className="visiting-sidebar">
        <div className="visiting-sidebar-header">
          <h2>Campus Life</h2>
        </div>

        <Link to="/" className="visiting-back-link">
          &larr; Back to Home
        </Link>

        <nav className="visiting-sidebar-nav">
          {sidebarLinks.map((link) => (
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
      </aside>

      <div className="visiting-main">
        <div className="visiting-hero" />

        <div className="visiting-breadcrumb">
          <Link to="/">Home</Link> &raquo; <Link to="/#campuslife">Campus Life</Link>{" "}
          &raquo; <span>Sports</span>
        </div>

        <div className="sports-cards">
          {sportsCards.map((card) => (
            <div className="sports-card" key={card.title}>
              <div className="sports-card-image" />
              <Link to={card.to} className="sports-card-title">
                {card.title}
              </Link>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sports;
