import React from "react";
import { Link } from "react-router-dom";
import "./VisitingHIBS.css";
import hilltopSquare2 from "../../image/hilltop-square2.jpg";

const visitCards = [
  {
    title: "Location & Directions",
    to: "/contact-us",
    body: "Find directions and parking information for our campus on Cecilia Agyei Amoako Road, Daban, near Dr. Asafo Adjei Hospital, off Ricky Boakye Guinness Depot.",
  },
  {
    title: "Tours & Open Days",
    to: "/tours-and-open-days",
    body: "Attend one of our guided campus tours or open days — the best way to see our classrooms, meet teaching staff and observe campus life first-hand.",
  },
  {
    title: "Boarding & Accommodation",
    to: "/#boarding",
    body: "HIBS offers on-campus boarding for students. Prospective families are welcome to tour the boarding facilities as part of a scheduled visit.",
  },
];

const sidebarLinks = [
  { label: "Who We Are", to: "/who" },
  { label: "Board of Directors", to: "/board-of-directors" },
  { label: "Teaching Staff", to: "/#staff" },
  { label: "PTA", to: "/#pta" },
  { label: "Visiting HIBS", to: "/visiting-hibs", active: true },
];

const VisitingHIBS = () => {
  return (
    <div className="visiting-page">
      <aside className="visiting-sidebar">
        <div className="visiting-sidebar-header">
          <h2>About HIBS</h2>
        </div>

        <Link to="/who" className="visiting-back-link">
          &larr; Back to About HIBS
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
        <div className="visiting-hero">
          <img src={hilltopSquare2} alt="HIBS" />
        </div>

        <div className="visiting-breadcrumb">
          <Link to="/">Home</Link> &raquo; <Link to="/who">About HIBS</Link> &raquo;{" "}
          <span>Visiting HIBS</span>
        </div>

        <div className="visiting-card">
          <h1>Seeing is Believing</h1>
          <p>
            The best way to understand HIBS is to spend time on campus. From
            prospective families touring the school to alumni returning for
            Founder&rsquo;s Day, visitors are welcome to experience the
            classrooms, boarding facilities and the community that makes
            Hilltop International British School what it is.
          </p>
          <p>
            Campus tours, open days and admissions interviews can be arranged
            through the school office. Prospective parents are encouraged to
            meet teaching staff, see a class in session and speak with
            current students before applying.
          </p>
        </div>

        <div className="visiting-cards">
          {visitCards.map((card) => (
            <div className="visiting-info-card" key={card.title}>
              <div className="visiting-info-image" />
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

export default VisitingHIBS;
