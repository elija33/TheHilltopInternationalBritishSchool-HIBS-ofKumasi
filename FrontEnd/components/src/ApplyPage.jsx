import React from "react";
import { Link } from "react-router-dom";
import "./Home/HomePage.css";
import "./ApplyPage.css";

const WHATSAPP_URL = "https://wa.me/233322299229";

const STEPS = [
  { title: "Choose your path", body: "New student or transfer." },
  { title: "Submit the form", body: "Fill in student and parent details online." },
  { title: "Visit & assessment", body: "Tour the campus and complete an entrance assessment." },
  { title: "Receive your offer", body: "Our admissions team confirms placement." },
];

const DOCUMENTS = [
  { icon: "📄", label: "Birth certificate" },
  { icon: "📸", label: "Passport photographs" },
  { icon: "📊", label: "Recent school reports" },
  { icon: "💉", label: "Health / immunisation record" },
  { icon: "✉️", label: "Transfer letter", sub: "Transfer students only" },
  { icon: "🪪", label: "Parent / guardian ID" },
];

const ApplyPage = ({ onClose }) => {
  return (
    <div>
      <section className="ap-hero">
        <div className="hp-container">
          <button className="ap-back" onClick={onClose}>
            &larr; Back
          </button>

          <div className="ap-hero-copy">
            <p className="hp-section-eyebrow">Forge Your Own Path</p>
            <h1>Submit your HIBS application</h1>
            <p>
              The world is constantly changing. Be part of it. We&rsquo;re ready to
              prepare your child for an ever-evolving life and support them as they
              build their own unstoppable momentum.
            </p>
          </div>
        </div>
      </section>

      <div className="hp-container ap-paths-wrap">
        <div className="ap-paths-grid">
          <div className="ap-path-card">
            <span className="ap-path-badge">Most common</span>
            <div className="ap-path-icon">🌱</div>
            <h3>New Student</h3>
            <p>Starting a new school journey at HIBS, from Year 4 through Upper Six.</p>
            <ul className="ap-path-checklist">
              <li>Entry from Year 4 to Upper Six</li>
              <li>Campus tour &amp; entrance assessment</li>
              <li>Guidance on the right year group</li>
            </ul>
            <Link to="/apply/account/new" className="ap-path-cta">
              Start application <span>&rarr;</span>
            </Link>
          </div>

          <div className="ap-path-card">
            <div className="ap-path-icon">🔄</div>
            <h3>Transfer Student</h3>
            <p>Moving to HIBS from another school, in Ghana or abroad.</p>
            <ul className="ap-path-checklist">
              <li>Join mid-year or at the start of a term</li>
              <li>Previous school records reviewed</li>
              <li>Placement in the right Cambridge stage</li>
            </ul>
            <Link to="/apply/account/transfer" className="ap-path-cta">
              Start transfer <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <section className="ap-steps-section">
        <div className="hp-container">
          <p className="hp-section-eyebrow">How It Works</p>
          <h2>Four simple steps</h2>
          <div className="ap-steps-row">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className="ap-step">
                  <span className="ap-step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                {i < STEPS.length - 1 && <div className="ap-step-connector" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-help-section" id="help">
        <div className="hp-container ap-help-grid">
          <div className="ap-docs-card">
            <p className="hp-section-eyebrow">Before You Start</p>
            <h2>Documents you&rsquo;ll need</h2>
            <div className="ap-docs-grid">
              {DOCUMENTS.map((d) => (
                <div className="ap-doc-item" key={d.label}>
                  <span className="icon">{d.icon}</span>
                  <span>
                    <span className="label">{d.label}</span>
                    {d.sub && <span className="sub-label">{d.sub}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="ap-admissions-card">
            <p className="hp-section-eyebrow">Need Help?</p>
            <h2>Talk to Admissions</h2>
            <p>Questions about year groups, fees or visits? We&rsquo;re happy to help.</p>
            <div className="ap-contact-rows">
              <a href="tel:+233322299229" className="ap-contact-row">
                <span className="icon">📞</span>
                <span>
                  <span className="label">Call us</span>
                  <span className="value">+233 (0) 32 229 9229</span>
                </span>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ap-contact-row">
                <span className="icon">💬</span>
                <span>
                  <span className="label">Chat with us</span>
                  <span className="value">WhatsApp Admissions</span>
                </span>
              </a>
              <Link to="/tours-and-open-days" className="ap-contact-row">
                <span className="icon">📅</span>
                <span>
                  <span className="label">See it yourself</span>
                  <span className="value">Book a school visit</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyPage;
