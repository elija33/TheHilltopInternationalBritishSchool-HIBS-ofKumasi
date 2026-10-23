import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../Home/HomePage.css";
import "./FAQs.css";

const WHATSAPP_URL = "https://wa.me/233322299229";

const CATEGORIES = [
  { key: "admissions", icon: "📝", label: "Admissions" },
  { key: "academics", icon: "🎓", label: "Academics" },
  { key: "fees", icon: "💳", label: "Fees & payments" },
  { key: "school-life", icon: "🏫", label: "School life" },
];

const FAQS = [
  {
    category: "admissions",
    question: "What is the minimum age to join HIBS?",
    answer:
      "It's recommended that students enrol at The Hilltop School (our sister school) from age 2. To join HIBS itself, students should apply from age 9.",
  },
  {
    category: "admissions",
    question: "What is the minimum age for boarding?",
    answer: "8 years.",
    flag: "Confirm with school before launch — policy details like this can change.",
  },
  {
    category: "admissions",
    question: "Can my child move between the GES and Cambridge programmes?",
    answer:
      "Students may move from the GES programme to the Cambridge programme. We generally discourage moving the other way, from Cambridge back to GES, because of how different the two curricula are.",
  },
  {
    category: "academics",
    question: "What is the student-to-teacher ratio?",
    answer:
      "We maintain a student-to-teacher ratio of no more than 8 to 1 — well below the 25:1 to 30:1 ratios common at similar schools in Ghana.",
  },
  {
    category: "academics",
    question: "How big are classes?",
    answer: "Our maximum class size is 25 students.",
  },
  {
    category: "academics",
    question: "Is the Cambridge qualification recognised worldwide?",
    answer: "Yes. You can confirm recognition in any country at cie.org.uk/recognition.",
  },
  {
    category: "academics",
    question: "Will Cambridge IGCSE and A Levels get my child into a Ghanaian university?",
    answer:
      "Yes. Ghana's National Accreditation Board recognises Cambridge A-Level qualifications for entry into at least level-100 courses at local universities.",
  },
  {
    category: "fees",
    question: "Can I pay fees by bank transfer from outside Ghana?",
    answer: "Yes — contact our accounts office and they'll send you our banking details.",
  },
  {
    category: "fees",
    question: "Do school fees include meals?",
    answer: "No. Parents arrange meals from home or through our on-campus caterer.",
  },
  {
    category: "fees",
    question: "Does HIBS offer health insurance for students?",
    answer:
      "We don't currently run an insurance scheme for students, though several reputable local providers can arrange this separately.",
    flag: "Confirm with school before launch — may have changed.",
  },
  {
    category: "school-life",
    question: "Does the school provide a bus?",
    answer:
      "No, parents arrange their own transport. We can help put you in touch with a trusted local driver.",
  },
  {
    category: "school-life",
    question: "Can my child be excused from physical education?",
    answer: "PE is a core part of our programme. A student can only be excused with a doctor's note.",
  },
];

const POPULAR = [
  { label: "Boarding", query: "boarding" },
  { label: "Minimum age", query: "minimum age" },
  { label: "Paying from abroad", query: "bank transfer" },
  { label: "Transport", query: "bus" },
];

const FAQs = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openKey, setOpenKey] = useState(null);

  const counts = useMemo(() => {
    const c = { all: FAQS.length };
    CATEGORIES.forEach((cat) => {
      c[cat.key] = FAQS.filter((f) => f.category === cat.key).length;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchesCategory = activeCategory === "all" || f.category === activeCategory;
      const matchesQuery =
        !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const groups = CATEGORIES.map((cat) => ({
    ...cat,
    items: filtered.filter((f) => f.category === cat.key),
  })).filter((g) => g.items.length > 0);

  const toggle = (key) => setOpenKey((k) => (k === key ? null : key));

  return (
    <div>
      <section className="fq-hero">
        <div className="hp-container">
          <p className="fq-breadcrumb">
            <Link to="/">Home</Link> / FAQs
          </p>
          <p className="hp-section-eyebrow">Help Centre</p>
          <h1>Frequently asked questions</h1>
          <p className="fq-hero-subtitle">
            Everything parents ask us about admissions, fees, academics and school life.
          </p>

          <div className="fq-search">
            <span aria-hidden="true">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, e.g. boarding, bus, fees"
            />
          </div>

          <div className="fq-popular">
            <span>Popular:</span>
            {POPULAR.map((p) => (
              <button
                type="button"
                key={p.label}
                className="fq-popular-pill"
                onClick={() => {
                  setQuery(p.query);
                  setActiveCategory("all");
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="hp-container fq-cards-wrap">
        <div className="fq-cards-grid">
          <button
            type="button"
            className={`fq-category-card ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            <span className="icon">✨</span>
            <span className="label">All questions</span>
            <span className="count">{counts.all} questions</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.key}
              className={`fq-category-card ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <span className="icon">{cat.icon}</span>
              <span className="label">{cat.label}</span>
              <span className="count">{counts[cat.key]} questions</span>
            </button>
          ))}
        </div>
      </div>

      <section className="fq-list-section">
        <div className="hp-container">
          {groups.length === 0 ? (
            <p className="fq-empty">No questions match your search.</p>
          ) : (
            groups.map((group) => (
              <div className="fq-group" key={group.key}>
                <div className="fq-group-header">
                  <span className="icon">{group.icon}</span>
                  <h2>{group.label}</h2>
                  <span className="count">{group.items.length}</span>
                </div>

                {group.items.map((item) => {
                  const key = `${group.key}-${item.question}`;
                  const open = openKey === key;
                  return (
                    <div className={`fq-item ${open ? "open" : ""}`} key={key}>
                      <button type="button" className="fq-item-question" onClick={() => toggle(key)}>
                        {item.question}
                        <span className="fq-item-toggle">+</span>
                      </button>
                      {open && (
                        <div className="fq-item-answer">
                          <p style={{ margin: 0 }}>{item.answer}</p>
                          {item.flag && <span className="fq-flag">⚠ {item.flag}</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="fq-help-wrap">
        <div className="hp-container">
          <div className="fq-help-card">
            <div>
              <p className="hp-section-eyebrow">Still have questions?</p>
              <h2>We&rsquo;re happy to help</h2>
              <p>Our admissions team usually replies within one working day.</p>
            </div>

            <div className="fq-help-contacts">
              <a href="tel:+233322299229" className="fq-contact-row">
                <span className="icon">📞</span>
                <span>
                  <span className="label">Call us</span>
                  <span className="value">+233 (0) 32 229 9229</span>
                </span>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fq-contact-row">
                <span className="icon">💬</span>
                <span>
                  <span className="label">Chat with us</span>
                  <span className="value">WhatsApp Admissions</span>
                </span>
              </a>
              <Link to="/tours-and-open-days" className="fq-contact-row">
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

export default FAQs;
