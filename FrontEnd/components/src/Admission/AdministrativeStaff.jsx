import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../Home/HomePage.css";
import "./AdministrativeStaff.css";
import {
  administrativeStaff,
  subscribeToAdministrativeStaff,
} from "../AdminPortal/administrativeStaffDirectory";

const FRONT_OFFICE_PHONE = "+233 (0) 32 229 9229";

const TITLE_TOKENS = new Set(["mr", "mrs", "ms", "dr", "rev", "very", "madam", "prof"]);

// Strips honorifics (Mr./Dr./Rev./Madam…) and takes the first letter of the
// first remaining word and the first letter of the last — same helper as
// Board of Directors / Our PTA, duplicated here rather than shared across
// pages.
const initials = (rawName) => {
  const base = rawName.split("—")[0].split(",")[0].trim();
  const words = base
    .split(/\s+/)
    .map((w) => w.replace(/\./g, ""))
    .filter((w) => w && !TITLE_TOKENS.has(w.toLowerCase()));
  if (words.length === 0) return "";
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const CONTACT_ICONS = [
  { match: /exam/i, icon: "📝" },
  { match: /admission|record|enquir/i, icon: "📁" },
  { match: /counsel|guidance/i, icon: "🧭" },
  { match: /academic|class|timetable/i, icon: "📋" },
];
const pickContactIcon = (title) => (CONTACT_ICONS.find((c) => c.match.test(title)) || { icon: "🏫" }).icon;

// Each staff member's optional contactTopics field is "Title | description"
// lines — this flattens every member's lines into one ordered list of
// directory rows, each still linked back to that person.
const buildContactRows = (staffList) => {
  const rows = [];
  staffList.forEach((member) => {
    (member.contactTopics || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const [title, body] = line.split("|").map((s) => (s || "").trim());
        if (!title) return;
        rows.push({ title, body, member });
      });
  });
  return rows;
};

const StaffCard = ({ member }) => {
  const positions = member.positionConfirmed && member.position
    ? member.position.split(",").map((p) => p.trim()).filter(Boolean)
    : [];
  const qualifications = (member.qualifications || "")
    .split("\n")
    .map((q) => q.trim())
    .filter(Boolean);

  return (
    <div className="admstaff-card" id={member.id}>
      <div className="admstaff-card-photo">
        <div className="admstaff-avatar">
          {member.photoDataUrl ? <img src={member.photoDataUrl} alt={member.name} /> : initials(member.name)}
        </div>
      </div>
      <div className="admstaff-card-body">
        <div className="admstaff-badges">
          {positions.length > 0 ? (
            positions.map((p) => (
              <span className="admstaff-badge" key={p}>
                {p}
              </span>
            ))
          ) : (
            <span className="admstaff-badge unconfirmed">Position to confirm</span>
          )}
        </div>
        <h3>{member.name}</h3>
        {member.alsoTeaches && <p className="admstaff-also-teaches">Also teaches {member.alsoTeaches}</p>}

        <div className="admstaff-divider" />

        {qualifications.length > 0 ? (
          <ul className="admstaff-qualifications">
            {qualifications.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        ) : (
          <p className="admstaff-qualifications-empty">Qualifications to be added.</p>
        )}

        <div className="admstaff-actions">
          {member.email ? (
            <a href={`mailto:${member.email}`} className="admstaff-btn primary">
              Email
            </a>
          ) : (
            <span className="admstaff-btn primary disabled">Email</span>
          )}
          {member.phone ? (
            <a href={`tel:${member.phone.replace(/\s+/g, "")}`} className="admstaff-btn">
              Call office
            </a>
          ) : (
            <span className="admstaff-btn disabled">Call office</span>
          )}
        </div>
      </div>
    </div>
  );
};

const AdministrativeStaff = () => {
  const [, forceRender] = useState(0);

  useEffect(() => subscribeToAdministrativeStaff(() => forceRender((n) => n + 1)), []);

  const contactRows = buildContactRows(administrativeStaff);

  return (
    <div>
      <section className="admstaff-hero">
        <div className="hp-container">
          <p className="admstaff-breadcrumb">
            <Link to="/">Home</Link> / About / Administrative Staff
          </p>
          <p className="hp-section-eyebrow" style={{ color: "#ffd83b" }}>
            Our Administration
          </p>
          <h1>Administrative Staff</h1>
          <p>
            The team that keeps HIBS running, from academics and boarding to exams and
            counselling.
          </p>
        </div>
      </section>

      <section className="admstaff-grid-section">
        <div className="hp-container">
          {administrativeStaff.length === 0 ? (
            <p className="portal-empty">Administrative staff will be listed here soon.</p>
          ) : (
            <div className="admstaff-grid">
              {administrativeStaff.map((m) => (
                <StaffCard member={m} key={m.id} />
              ))}
            </div>
          )}
        </div>
      </section>

      {contactRows.length > 0 && (
        <section className="admstaff-contact-wrap">
          <div className="hp-container">
            <p className="hp-section-eyebrow">Who to contact</p>
            <h2>Not sure who to speak to?</h2>
            <p className="admstaff-contact-sub">Find the right person for your question.</p>

            <div className="admstaff-contact-card">
              {contactRows.map((row, i) => (
                <div className="admstaff-contact-row" key={i}>
                  <span className="admstaff-contact-icon">{pickContactIcon(row.title)}</span>
                  <div className="admstaff-contact-text">
                    <h4>{row.title}</h4>
                    {row.body && <p>{row.body}</p>}
                  </div>
                  <a href={`#${row.member.id}`} className="admstaff-contact-link">
                    {row.member.name} &rarr;
                  </a>
                </div>
              ))}
              <div className="admstaff-contact-row">
                <span className="admstaff-contact-icon">☎️</span>
                <div className="admstaff-contact-text">
                  <h4>Anything else</h4>
                  <p>Call the front office on {FRONT_OFFICE_PHONE}</p>
                </div>
                <a href={`tel:${FRONT_OFFICE_PHONE.replace(/[^+\d]/g, "")}`} className="admstaff-contact-link">
                  Front Office &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdministrativeStaff;
