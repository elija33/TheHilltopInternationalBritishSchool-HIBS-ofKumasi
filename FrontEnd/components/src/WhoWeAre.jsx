import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import "./Home/HomePage.css";
import "./WhoWeAre.css";
import hibsTop1 from "../image/hibs_top1.jpg";

const STATS = [
  { number: "2010", label: "Cambridge accredited" },
  { number: "Year 4–Upper Six", label: "Year groups we teach" },
  { number: "IGCSE & A Level", label: "International qualifications" },
  { number: "10+", label: "Nationalities on campus" },
];

const MOTTO = [
  {
    word: "Excellence",
    body: "We push every student to achieve academic excellence and reach their full potential.",
  },
  {
    word: "Knowledge",
    body: "We help students understand their environment and the society they live in.",
  },
  {
    word: "Integrity",
    body: "We raise young people who are morally upright in everything they do.",
  },
];

const VALUES = [
  {
    emoji: "🌱",
    title: "Potential",
    body: "Every child's talent is discovered and developed.",
  },
  {
    emoji: "💪",
    title: "Confidence",
    body: "Students learn to believe in themselves.",
  },
  {
    emoji: "🧭",
    title: "Character",
    body: "Strong moral values in a guided environment.",
  },
  {
    emoji: "🤝",
    title: "Citizenship",
    body: "Graduates who give back to their society.",
  },
];

const NATIONALITIES = [
  { flag: "🇬🇭", name: "Ghana", host: true },
  { flag: "🇱🇧", name: "Lebanon" },
  { flag: "🇬🇶", name: "Equatorial Guinea" },
  { flag: "🇧🇷", name: "Brazil" },
  { flag: "🇳🇬", name: "Nigeria" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇲🇱", name: "Mali" },
  { flag: "🇦🇱", name: "Albania" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇮🇳", name: "India" },
];

const CREST_ITEMS = [
  {
    icon: "🔥",
    title: "The Glowing Torch",
    body: "The light of knowledge we pass to every student.",
  },
  {
    icon: "⭐",
    title: "Black & White Stars",
    body: "The multiracial, international nature of our school.",
  },
  {
    icon: "☁️",
    title: "The Blue Sky",
    body: "The limitless horizons open to our students.",
  },
  {
    icon: "⛰️",
    title: "The Green Hill",
    body: "Our eco-friendly environment, and the Hilltop name.",
  },
];

const CAREERS = [
  { icon: "🩺", title: "Medicine" },
  { icon: "⚙️", title: "Engineering" },
  { icon: "🔬", title: "Applied Sciences" },
  { icon: "📊", title: "Business Administration" },
];

const WhoWeAre = () => {
  return (
    <div>
      <section className="wwa-hero">
        <div className="hp-container">
          <div className="wwa-hero-photo">
            <img src={hibsTop1} alt="HIBS staff and students" />
          </div>

          <p className="wwa-breadcrumb">
            <Link to="/">Home</Link> / About / Who We Are
          </p>

          <h1>Who We Are</h1>
          <p>
            A Cambridge-accredited British school in Kumasi, raising confident, morally
            upright young people since 2010.
          </p>
        </div>
      </section>

      <section className="wwa-story-section">
        <div className="hp-container wwa-story-grid">
          <div>
            <p className="hp-section-eyebrow">Our Story</p>
            <h2>
              Formerly The Hilltop International Science College, HIBS has prepared
              students for the IGCSE and A Levels since earning Cambridge accreditation
              in September 2010.
            </h2>
            <p>
              HIBS is part of The Hilltop School and a member of the British Council&rsquo;s
              Partner Schools Global Network (PSGN). We admit students from Year 4 through
              Upper Six, with counselling and guidance all the way to university
              applications.
            </p>
            <p>
              Our graduates go on to study medicine, engineering, applied sciences and
              business administration at universities in Ghana and abroad.
            </p>
          </div>

          <div className="wwa-stat-grid">
            {STATS.map((s) => (
              <div className="wwa-stat-card" key={s.label}>
                <p className="number">{s.number}</p>
                <p className="label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wwa-motto-section">
        <div className="hp-container">
          <div className="wwa-motto-header">
            <p className="hp-section-eyebrow">Our Motto</p>
            <h2>Three words that guide everything we do</h2>
          </div>
          <div className="wwa-motto-grid">
            {MOTTO.map((m, i) => (
              <div className="wwa-motto-card" key={m.word}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{m.word}</h3>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wwa-mv-section">
        <div className="hp-container wwa-mv-grid">
          <div className="wwa-mv-card mission">
            <div className="wwa-mv-icon">◎</div>
            <p className="hp-section-eyebrow">Our Mission</p>
            <h3>Why we exist</h3>
            <p>
              To provide sound, holistic education for academic excellence in a guided
              and secure moral environment.
            </p>
          </div>
          <div className="wwa-mv-card vision">
            <div className="wwa-mv-icon">★</div>
            <p className="hp-section-eyebrow">Our Vision</p>
            <h3>Where we&rsquo;re going</h3>
            <p>
              To be a leading school in Ghana and the West African sub-region,
              providing competitive, holistic education with distinction and instilling
              ethical values in our pupils.
            </p>
          </div>
        </div>
      </section>

      <section className="wwa-values-section">
        <div className="hp-container">
          <p className="hp-section-eyebrow">Core Values</p>
          <h2>Every child has a talent</h2>
          <p className="wwa-values-intro">
            We help each child discover and develop that talent, believe in themselves,
            and grow into a valuable member of society.
          </p>
          <div className="wwa-values-grid">
            {VALUES.map((v) => (
              <div className="wwa-value-card" key={v.title}>
                <span className="emoji">{v.emoji}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wwa-culture-section">
        <div className="hp-container wwa-culture-grid">
          <div className="hp-photo-placeholder">
            PHOTO: students from different backgrounds together (cultural day works well)
          </div>
          <div>
            <p className="hp-section-eyebrow">Multicultural Community</p>
            <h2>Children from all over the world call HIBS home</h2>
            <p>
              Our global community of 10 to 19 year olds includes students from many
              countries, learning side by side.
            </p>
            <div className="wwa-flag-pills">
              {NATIONALITIES.map((n) => (
                <span className={`wwa-flag-pill ${n.host ? "host" : ""}`} key={n.name}>
                  <span>{n.flag}</span> {n.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wwa-crest-section">
        <div className="hp-container wwa-crest-grid">
          <div className="wwa-crest-badge-wrap">
            <div className="wwa-crest-badge">
              <div className="wwa-crest-hill" />
              <span className="wwa-crest-flame">🔥</span>
            </div>
            <p className="wwa-crest-caption">Replace with the real HIBS crest (SVG)</p>
          </div>
          <div>
            <p className="hp-section-eyebrow">The School Crest</p>
            <h2>What our logo stands for</h2>
            <div className="wwa-crest-list">
              {CREST_ITEMS.map((c) => (
                <div className="wwa-crest-item" key={c.title}>
                  <span className="wwa-crest-icon">{c.icon}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wwa-careers-section">
        <div className="hp-container">
          <p className="hp-section-eyebrow">Where Our Students Go</p>
          <h2>From HIBS to universities worldwide</h2>
          <div className="wwa-careers-grid">
            {CAREERS.map((c) => (
              <div className="wwa-career-card" key={c.title}>
                <span className="icon">{c.icon}</span>
                <h3>{c.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wwa-final-cta-wrap">
        <div className="hp-container">
          <div className="hp-cta-banner">
            <div>
              <h2>Come and see who we are in person.</h2>
            </div>
            <div className="hp-cta-actions">
              <Link to="/tours-and-open-days" className="hp-hero-cta-primary">
                Book a Visit
              </Link>
              <Link to="/apply" className="hp-hero-cta-secondary">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeAre;
