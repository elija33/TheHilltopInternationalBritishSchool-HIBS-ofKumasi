import React from "react";

const CARDS = [
  {
    photo: "teacher with a small class",
    title: "Teachers & Classes",
    items: ["Cambridge-certified tutors", "Max 25 students per class", "Well-ventilated classrooms"],
  },
  {
    photo: "students in the science lab",
    title: "Science & Computer Labs",
    items: ["Chemistry, Biology & Physics labs", "Broadband computer lab", "Hands-on practicals"],
  },
  {
    photo: "HIBS students on the field",
    title: "Sports & Clubs",
    items: ["Football and athletics", "Inter-house competitions", "Clubs and societies"],
  },
  {
    photo: "graduation / certificates",
    title: "Cambridge IGCSE",
    items: ["Internationally recognised", "Pathway to universities abroad", "British Council partner"],
  },
];

const WhyHibs = () => (
  <section className="hp-why-section">
    <div className="hp-container">
      <p className="hp-section-eyebrow">Why HIBS</p>
      <h2>Built for how children learn best</h2>
      <div className="hp-why-grid">
        {CARDS.map((c) => (
          <div className="hp-why-card" key={c.title}>
            <div className="hp-photo-placeholder">PHOTO: {c.photo}</div>
            <div className="hp-why-card-body">
              <h3>{c.title}</h3>
              <ul>
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyHibs;
