import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../Home/HomePage.css";
import "./ALevel.css";

const HERO_FEATURES = [
  {
    icon: "🌐",
    title: "Recognised worldwide",
    body: "Accepted by universities across the globe",
  },
  {
    icon: "🎓",
    title: "Cambridge accredited since 2010",
    body: "Lower Six and Upper Six at HIBS",
  },
  {
    icon: "📖",
    title: "In-depth study",
    body: "Deep subject knowledge and strong academic skills",
  },
];

const SUBJECTS = [
  {
    icon: "📐",
    title: "Mathematics",
    body: "Rigorous problem solving and analytical thinking.",
    tags: ["Pure Maths", "Mechanics", "Statistics"],
  },
  {
    icon: "📈",
    title: "Economics",
    body: "How markets, governments and global economies work.",
  },
  {
    icon: "💼",
    title: "Business",
    body: "Strategy, marketing, operations and enterprise.",
  },
  {
    icon: "📒",
    title: "Accounting",
    body: "Financial reporting, analysis and decision making.",
  },
  {
    icon: "✍️",
    title: "English Language",
    body: "Advanced writing, analysis and communication skills.",
  },
];

const PATHWAYS = [
  {
    tags: ["Maths", "Economics", "Business"],
    title: "Economics & Finance",
    body: "Economics, banking, finance and data analysis degrees.",
  },
  {
    tags: ["Accounting", "Maths", "Business"],
    title: "Accounting & Business",
    body: "Accounting, business administration and management degrees.",
  },
  {
    tags: ["English", "Economics", "Business"],
    title: "Business & Communication",
    body: "Marketing, international business and public administration.",
  },
];

const GUIDANCE_STEPS = [
  {
    title: "Career aspirations",
    body: "We start with where the student wants to go.",
  },
  {
    title: "Abilities & performance",
    body: "We look at strengths and IGCSE results.",
  },
  {
    title: "Opportunities",
    body: "We match choices to university and career pathways.",
  },
  {
    title: "Family circumstances",
    body: "We plan together with parents and guardians.",
  },
];

const CURRICULUM_GROUPS = [
  {
    label: "Core Subjects",
    rows: [
      { subject: "English", year6to8: true, year9: true },
      { subject: "Mathematics", year6to8: true, year9: true },
      { subject: "ICT", year6to8: true, year9: true },
      { subject: "French", year6to8: true, year9: true },
    ],
  },
  {
    label: "Year 6–8 Foundation",
    rows: [
      { subject: "Science", year6to8: true, year9: false },
      { subject: "Global Perspectives", year6to8: true, year9: false },
      { subject: "Religious Studies", year6to8: true, year9: false },
      { subject: "Art & Design", year6to8: true, year9: false },
      { subject: "Physical Education", year6to8: true, year9: false },
    ],
  },
  {
    label: "Year 9 Specialist",
    rows: [
      { subject: "Biology", year6to8: false, year9: true },
      { subject: "Physics", year6to8: false, year9: true },
      { subject: "Chemistry", year6to8: false, year9: true },
      { subject: "Economics", year6to8: false, year9: true },
      { subject: "Business Studies", year6to8: false, year9: true },
      { subject: "Accounting", year6to8: false, year9: true },
    ],
  },
];

const ALevel = () => {
  return (
    <div>
      <section className="al-hero">
        <div className="hp-container">
          <p className="al-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/igcse">IGCSE</Link> / A Level
          </p>

          <div className="al-hero-grid">
            <div>
              <p className="hp-section-eyebrow" style={{ color: "#ffd83b" }}>
                Cambridge International A Level
              </p>
              <h1>A Level at HIBS</h1>
              <p className="al-subtitle">
                One of the world&rsquo;s most recognised qualifications, accepted by
                universities worldwide as proof of academic ability, and the bridge from
                IGCSE to higher education and employment.
              </p>
              <div className="al-hero-actions">
                <Link to="/apply" className="hp-hero-cta-primary">
                  Apply for A Level &rarr;
                </Link>
                <Link to="/contact-us" className="hp-hero-cta-secondary">
                  Talk to Admissions
                </Link>
              </div>
            </div>

            <div className="al-hero-features">
              {HERO_FEATURES.map((f) => (
                <div className="al-feature-card" key={f.title}>
                  <span className="al-feature-icon">{f.icon}</span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="al-subjects-section">
        <div className="hp-container">
          <p className="hp-section-eyebrow">Subjects Offered</p>
          <h2>Choose your A Level subjects</h2>
          <p className="al-subjects-intro">
            Our A Level subjects build the foundations for careers in business, finance,
            economics and beyond.
          </p>

          <div className="al-subjects-grid">
            {SUBJECTS.map((s) => (
              <div className="al-subject-card" key={s.title}>
                <span className="al-subject-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {s.tags && (
                  <div className="al-subject-tags">
                    {s.tags.map((t) => (
                      <span className="al-subject-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="al-subject-callout">
              <h3>Not sure which to choose?</h3>
              <p>Our counsellors help every student build the right combination.</p>
              <a href="#guidance" className="hp-hero-cta-primary">
                How we guide you &darr;
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="al-pathways-section">
        <div className="hp-container">
          <p className="hp-section-eyebrow">Example Pathways</p>
          <h2>Where your subjects can lead</h2>
          <p className="al-pathways-intro">
            Sample combinations — confirm with the school which they recommend.
          </p>

          <div className="al-pathways-grid">
            {PATHWAYS.map((p) => (
              <div className="al-pathway-card" key={p.title}>
                <div className="al-pathway-tags">
                  {p.tags.map((t, i) => (
                    <React.Fragment key={t}>
                      <span className="al-pathway-tag">{t}</span>
                      {i < p.tags.length - 1 && <span className="al-pathway-plus">+</span>}
                    </React.Fragment>
                  ))}
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-guidance-section" id="guidance">
        <div className="hp-container al-guidance-grid">
          <div>
            <p className="hp-section-eyebrow">Guidance</p>
            <h2>Helping every student choose well</h2>
            <p>
              Subject choice depends mainly on each student&rsquo;s career goals. Our
              counselling team works with students and families to find the combination
              that fits.
            </p>
          </div>

          <div className="al-guidance-steps">
            {GUIDANCE_STEPS.map((g, i) => (
              <div className="al-guidance-step" key={g.title}>
                <span className="al-guidance-num">{i + 1}</span>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-curriculum-section">
        <div className="hp-container">
          <p className="hp-section-eyebrow">Curriculum by Year</p>
          <h2>Subjects from Year 6 to Year 9</h2>

          <div className="al-curriculum-table-wrap">
            <table className="al-curriculum-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Year 6–8</th>
                  <th>Year 9</th>
                </tr>
              </thead>
              <tbody>
                {CURRICULUM_GROUPS.map((group) => (
                  <React.Fragment key={group.label}>
                    <tr className="al-curriculum-group-row">
                      <td colSpan={3}>{group.label}</td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.subject}>
                        <td>{row.subject}</td>
                        <td>
                          <span className={`al-curriculum-dot ${row.year6to8 ? "yes" : "no"}`}>
                            {row.year6to8 ? "✓" : "–"}
                          </span>
                        </td>
                        <td>
                          <span className={`al-curriculum-dot ${row.year9 ? "yes" : "no"}`}>
                            {row.year9 ? "✓" : "–"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="al-cta-wrap">
        <div className="hp-container">
          <div className="hp-cta-banner">
            <div>
              <h2>Ready for the next step after IGCSE?</h2>
              <p>Speak with our admissions team about A Level entry.</p>
            </div>
            <div className="hp-cta-actions">
              <Link to="/apply" className="hp-hero-cta-primary">
                Apply Now
              </Link>
              <Link to="/tours-and-open-days" className="hp-hero-cta-secondary">
                Book a Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ALevel;
