import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../Home/HomePage.css";
import "./PTA.css";
import { ptaMembers, subscribeToPtaMembers } from "../AdminPortal/ptaMembers";

const TITLE_TOKENS = new Set(["mr", "mrs", "ms", "dr", "rev", "very", "madam", "prof"]);

// Strips honorifics (Mr./Dr./Rev./Madam…) and takes the first letter of the
// first remaining word and the first letter of the last — same helper as
// Board of Directors, duplicated here rather than shared across pages.
const initials = (rawName) => {
  const base = rawName.split("—")[0].split(",")[0].trim();
  const words = base
    .split(/\s+/)
    .map((w) => w.replace(/\./g, ""))
    .filter((w) => w && !TITLE_TOKENS.has(w.toLowerCase()));
  if (words.length === 0) return "";
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const STATS = [
  { number: "12", label: "Elected executive members, chosen by all PTA members" },
  { number: "6", label: "Years maximum on the executive" },
  { number: "2", label: "Co-opted members: the Executive Director and the Proprietress" },
];

const INFO_CARDS = [
  {
    icon: "🤝",
    title: "A voice for parents",
    body: "Bringing parents' ideas and concerns to the Board and management.",
  },
  {
    icon: "🎓",
    title: "Supporting learning",
    body: "Backing projects that improve teaching, facilities and student life.",
  },
  {
    icon: "🎉",
    title: "Building community",
    body: "Bringing families together through meetings and school events.",
  },
];

const NEXT_MEETING = { day: "24", month: "Oct", title: "PTA General Meeting", meta: "Main Hall · 10:00 am" };

const PTA = () => {
  const [, forceRender] = useState(0);

  useEffect(() => subscribeToPtaMembers(() => forceRender((n) => n + 1)), []);

  const chair = ptaMembers.find((m) => m.chairperson);
  const others = ptaMembers.filter((m) => m !== chair);

  return (
    <div>
      <section className="pta-hero">
        <div className="hp-container">
          <p className="pta-breadcrumb">
            <Link to="/">Home</Link> / About / Our PTA
          </p>
          <h1>Our PTA</h1>
          <p>
            Parents and teachers working together with the Board and management to give
            every child an excellent education.
          </p>
        </div>
      </section>

      <div className="hp-container pta-stats-wrap">
        <div className="pta-stats-card">
          {STATS.map((s) => (
            <div className="pta-stat" key={s.label}>
              <p className="number">{s.number}</p>
              <p className="label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="pta-about-section">
        <div className="hp-container pta-about-grid">
          <div>
            <p className="hp-section-eyebrow">About the PTA</p>
            <h2>
              Every HIBS parent is part of a vibrant, supportive community that helps
              shape the school.
            </h2>
            <p>
              Our PTA works closely with the Board of Directors and school management to
              promote excellence in education for every student.
            </p>
            <p>
              The executive is elected by the whole association, and members serve for up
              to six years.
            </p>
          </div>

          <div className="pta-info-cards">
            {INFO_CARDS.map((c) => (
              <div className="pta-info-card" key={c.title}>
                <span className="pta-info-icon">{c.icon}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pta-exec-section">
        <div className="hp-container">
          <div className="pta-exec-header">
            <p className="hp-section-eyebrow">Executive Committee</p>
            <h2>Meet the PTA executive</h2>
            <p>The elected parents and staff who lead our association.</p>
          </div>

          {chair && (
            <div className="pta-chair-banner">
              <div className="pta-chair-avatar">
                {chair.photoDataUrl ? <img src={chair.photoDataUrl} alt={chair.name} /> : initials(chair.name)}
              </div>
              <div className="pta-chair-body">
                <span className="pta-chair-badge">{chair.role || "PTA Chairperson"}</span>
                <h3>{chair.name}</h3>
                {chair.org && <p>{chair.org}</p>}
              </div>
            </div>
          )}

          <p className="pta-subsection-label">Officers &amp; Members</p>

          <div className="pta-member-grid">
            {others.map((m) => (
              <div className="pta-member-card" key={m.id}>
                <div className="pta-member-avatar">
                  {m.photoDataUrl ? <img src={m.photoDataUrl} alt={m.name} /> : initials(m.name)}
                </div>
                <span className={`pta-role-badge ${m.roleConfirmed && m.role ? "" : "unconfirmed"}`}>
                  {m.roleConfirmed && m.role ? m.role : "Role to confirm"}
                </span>
                <h3>{m.name}</h3>
                {m.org && <p className="pta-org">{m.org}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pta-involved-wrap">
        <div className="hp-container pta-involved-banner">
          <div className="pta-involved-left">
            <p className="hp-section-eyebrow">Get Involved</p>
            <h2>Every parent is a member.</h2>
            <p>
              Come to our general meetings, share your ideas, and help make HIBS even
              better for every child.
            </p>
            <div className="pta-involved-actions">
              <Link to="/contact-us" className="hp-hero-cta-primary">
                Contact the PTA
              </Link>
              <Link to="/tours-and-open-days" className="hp-hero-cta-secondary">
                See school calendar
              </Link>
            </div>
          </div>

          <div className="pta-meeting-card">
            <p className="hp-section-eyebrow">Next General Meeting</p>
            <div className="pta-meeting-row">
              <div className="pta-meeting-date">
                <span className="day">{NEXT_MEETING.day}</span>
                <span className="month">{NEXT_MEETING.month}</span>
              </div>
              <div>
                <h4>{NEXT_MEETING.title}</h4>
                <p>{NEXT_MEETING.meta}</p>
              </div>
            </div>
            <button type="button" className="pta-meeting-btn">
              Add to calendar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PTA;
