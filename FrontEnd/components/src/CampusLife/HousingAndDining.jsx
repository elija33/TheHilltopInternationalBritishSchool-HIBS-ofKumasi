import React from "react";
import { Link } from "react-router-dom";
import "../AboutHIBS/VisitingHIBS.css";
import room1 from "../../image/room1.jpg";

const infoCards = [
  {
    title: "Boarding Facilities",
    to: "/#boarding",
    image: room1,
    body: "HIBS provides supervised, on-campus boarding accommodation with round-the-clock pastoral care from resident staff, in a secure and family-oriented environment.",
  },
  {
    title: "Dining Services",
    to: "/contact-us",
    body: "The school works with a professional caterer to provide freshly prepared meals for boarding students throughout the day. Parents may also arrange meals from home.",
  },
];

const sidebarLinks = [
  { label: "Housing & Dining", to: "/housing-and-dining", active: true },
  { label: "Clubs & Societies", to: "/clubs-and-societies" },
  { label: "Technology on Campus", to: "/technology-on-campus" },
  { label: "Sports", to: "/sports" },
];

const HousingAndDining = () => {
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
          &raquo; <span>Housing &amp; Dining</span>
        </div>

        <div className="visiting-card">
          <h1>A Home-Like Atmosphere</h1>
          <p>
            HIBS provides comfortable, supervised boarding accommodation for
            students who live on campus, set within a secure and
            family-oriented environment. Boarders benefit from structured
            daily routines, dedicated study time and close pastoral care from
            resident staff.
          </p>
          <p>
            Living on campus helps students build independence, form lasting
            friendships and stay closely connected to school life outside the
            classroom.
          </p>

          <h2 className="visiting-subheading">Amenities</h2>
          <p>
            On-campus dining provides freshly prepared meals for boarding
            students, day students and staff. The school works with a
            professional caterer to offer a variety of nutritious options
            each day.
          </p>
        </div>

        <div className="visiting-cards">
          {infoCards.map((card) => (
            <div className="visiting-info-card" key={card.title}>
              {card.image ? (
                <img src={card.image} alt={card.title} className="visiting-info-image" />
              ) : (
                <div className="visiting-info-image" />
              )}
              <Link to={card.to} className="visiting-info-title">
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

export default HousingAndDining;
