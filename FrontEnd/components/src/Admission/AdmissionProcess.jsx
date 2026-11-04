import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../Home/HomePage.css";
import "./AdministrativeStaff.css";
import "./AdmissionProcess.css";
import {
  administrativeStaff,
  subscribeToAdministrativeStaff,
} from "../AdminPortal/administrativeStaffDirectory";

const FRONT_OFFICE_PHONE = "+233 (0) 32 229 9229";

const STEPS = [
  { title: "Create an account", body: "Sign up with your phone number in under a minute." },
  { title: "Complete the form", body: "Add your child's details and upload documents." },
  { title: "Visit & assessment", body: "Tour the campus and sit an entrance assessment." },
  { title: "Receive your offer", body: "Our admissions team confirms placement." },
];

const TITLE_TOKENS = new Set(["mr", "mrs", "ms", "dr", "rev", "very", "madam", "prof"]);

// Strips honorifics (Mr./Dr./Rev./Madam…) and takes the first letter of the
// first remaining word and the first letter of the last — same helper as
// Board of Directors / Our PTA / Administrative Staff, duplicated here
// rather than shared across pages.
const initials = (rawName) => {
  const base = rawName.split("—")[0].split(",")[0].trim();
  const words = base
    .split(/\s+/)
    .map((w) => w.replace(/\./g, ""))
    .filter((w) => w && !TITLE_TOKENS.has(w.toLowerCase()));
  if (words.length === 0) return "";
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const AdmissionProcess = () => {
  const [, forceRender] = useState(0);

  useEffect(() => subscribeToAdministrativeStaff(() => forceRender((n) => n + 1)), []);

  // Reuses the same "Who to contact" entries the Administrative Staff page
  // builds from — whoever is flagged there for admissions is the contact
  // shown here too, so the two pages never disagree about who to ask.
  const admissionsContact = administrativeStaff.find((m) => /admission/i.test(m.contactTopics || ""));

  return (
    <div>
      <section className="adp-hero">
        <div className="hp-container">
          <p className="adp-breadcrumb">
            <Link to="/">Home</Link> / Admissions
          </p>
          <p className="hp-section-eyebrow" style={{ color: "#ffd83b" }}>
            Admissions
          </p>
          <h1>
            Be part of the best.
            <br />
            <span className="adp-hero-highlight">Don&rsquo;t settle for less.</span>
          </h1>
          <p className="adp-hero-subtitle">
            Everything you need to join HIBS: how to apply, how fees work, and what your
            child will need on day one.
          </p>
          <div className="adp-hero-actions">
            <Link to="/apply" className="hp-hero-cta-primary">
              Apply Now &rarr;
            </Link>
            <Link to="/tours-and-open-days" className="hp-hero-cta-secondary">
              Book a School Visit
            </Link>
          </div>
        </div>
      </section>

      <section className="adp-process-section">
        <div className="hp-container">
          <p className="hp-section-eyebrow">Admission Process</p>
          <h2>How to join HIBS</h2>
          <p className="adp-process-intro">Admission is competitive, so we encourage families to apply early.</p>

          <div className="adp-notice-card">
            <span className="adp-notice-icon">🌍</span>
            <div>
              <h3>Equal opportunity for every child</h3>
              <p>We welcome pupils of every ethnic, religious and racial background.</p>
            </div>
          </div>

          <div className="adp-steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className="adp-step">
                  <span className="adp-step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                {i < STEPS.length - 1 && <span className="adp-step-connector" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>

          <div className="adp-path-grid">
            <div className="adp-path-card">
              <span className="adp-path-badge new">New Students</span>
              <h3>Starting at HIBS</h3>
              <p>For children beginning their Cambridge journey with us.</p>
              <ul className="adp-checklist">
                <li>Birth certificate</li>
                <li>Passport photograph</li>
                <li>Parent or guardian ID</li>
              </ul>
            </div>
            <div className="adp-path-card">
              <span className="adp-path-badge transfer">Transfer Students</span>
              <h3>Moving from another school</h3>
              <p>Pupils joining from local or international schools must provide proven academic credentials.</p>
              <ul className="adp-checklist">
                <li>Cumulative academic records</li>
                <li>Transfer certificate</li>
                <li>Good testimonials from the previous school</li>
              </ul>
            </div>
          </div>

          {admissionsContact && (
            <div className="adp-contact-card">
              <div className="adp-contact-avatar">
                {admissionsContact.photoDataUrl ? (
                  <img src={admissionsContact.photoDataUrl} alt={admissionsContact.name} />
                ) : (
                  initials(admissionsContact.name)
                )}
              </div>
              <div className="adp-contact-body">
                <p className="hp-section-eyebrow">Talk to Admissions</p>
                <h3>{admissionsContact.name}</h3>
                <p className="adp-contact-role">
                  {admissionsContact.positionConfirmed && admissionsContact.position
                    ? admissionsContact.position
                    : "Position to confirm"}
                  {" · Your first point of contact for applications, documents and visits"}
                </p>
                <Link to="/administrative-staff" className="adp-contact-more">
                  Meet the full administrative team &rarr;
                </Link>
              </div>
              <div className="adp-contact-actions">
                {admissionsContact.email ? (
                  <a href={`mailto:${admissionsContact.email}`} className="admstaff-btn primary">
                    Email Admissions
                  </a>
                ) : (
                  <span className="admstaff-btn primary disabled">Email Admissions</span>
                )}
                <a
                  href={`tel:${(admissionsContact.phone || FRONT_OFFICE_PHONE).replace(/[^+\d]/g, "")}`}
                  className="admstaff-btn"
                >
                  {admissionsContact.phone || FRONT_OFFICE_PHONE}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="adp-final-cta">
        <div className="hp-container adp-final-cta-inner">
          <div>
            <h2>Ready to apply?</h2>
            <p>Create your parent account and start your child&rsquo;s application today.</p>
          </div>
          <div className="adp-final-cta-actions">
            <Link to="/apply" className="hp-hero-cta-primary">
              Apply Now &rarr;
            </Link>
            <Link to="/faqs" className="hp-hero-cta-secondary">
              Read the FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionProcess;
