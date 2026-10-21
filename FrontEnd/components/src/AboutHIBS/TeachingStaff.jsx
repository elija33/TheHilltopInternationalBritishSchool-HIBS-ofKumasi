import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../Home/HomePage.css";
import "./TeachingStaff.css";

// Add a photo URL per teacher below (photo: "...") to replace their
// initials — object-fit on .ts-staff-photo img keeps every crop consistent
// once real photos are in.
const TEACHERS = [
  {
    name: "Adomako Pius",
    subject: "Mathematics",
    category: "Mathematics",
    degree: "B.Sc. Mathematics, University of Education, Winneba",
    photo: null,
    badge: null,
  },
  {
    name: "Baba Banda Awudu",
    subject: "Art",
    category: "Arts & PE",
    degree: "B.A. Art Education, University of Education, Winneba",
    photo: null,
    badge: null,
  },
  {
    name: "Bright Arhin",
    subject: "Integrated Science",
    category: "Sciences",
    degree: "B.Sc. Integrated Science Education",
    photo: null,
    badge: null,
  },
  {
    name: "Dennis Afrane Darko",
    subject: "ICT",
    category: "ICT",
    degree: "M.Tech. Computer Science & Engineering, Vivekananda Institute of Technology, Jaipur, India",
    photo: null,
    badge: "Safeguarding Officer",
  },
  {
    name: "Dennis Frimpong Agyapong",
    subject: "Biology",
    category: "Sciences",
    degree: "B.Ed. Biology & Chemistry, University of Education, Winneba",
    photo: null,
    badge: null,
  },
  {
    name: "Edward Kwabena Osei",
    subject: "Geography",
    category: "Humanities & Business",
    degree: "B.A. Geography Education, University of Education, Winneba",
    photo: null,
    badge: null,
  },
  {
    name: "Emmanuel Agyei",
    subject: "Statistics",
    category: "Mathematics",
    degree: "B.Sc. Actuarial Science, University for Development Studies",
    photo: null,
    badge: null,
  },
  {
    name: "Faustina Nkum",
    subject: "Economics · Global Perspectives",
    category: "Humanities & Business",
    degree: "B.A. Economics Education, University of Education, Winneba",
    photo: null,
    badge: null,
  },
  {
    name: "Gabriel Dampson",
    subject: "Accounting",
    category: "Humanities & Business",
    degree: "B.Ed. Accounting Education, University of Cape Coast",
    photo: null,
    badge: null,
  },
  {
    name: "Joseph Boateng",
    subject: "PE Theory & Sports",
    category: "Arts & PE",
    degree: "B.Sc. Physical Education",
    photo: null,
    badge: null,
  },
  {
    name: "Kwame Boakye Yeboah",
    subject: "Extended, Additional & Pure Maths",
    category: "Mathematics",
    degree: "B.Sc. Mathematics",
    photo: null,
    badge: null,
  },
  {
    name: "Linda Adu-Mensah",
    subject: "Mathematics · Business",
    category: "Mathematics",
    degree: "M.Sc. Public Administration",
    photo: null,
    badge: null,
  },
  {
    name: "Mathias Kouyoli Koupokpa",
    subject: "French",
    category: "Languages",
    degree: "M.A. French Language",
    photo: null,
    badge: "Safeguarding Officer",
  },
  {
    name: "Matilda Osei Kuffour",
    subject: "English",
    category: "Languages",
    degree: "B.A. English Education",
    photo: null,
    badge: null,
  },
  {
    name: "Selom Koffi Assinyo Wilson",
    subject: "French",
    category: "Languages",
    degree: "B.Ed. French Language, University of Education, Winneba",
    photo: null,
    badge: null,
  },
  {
    name: "Stephen Ankema",
    subject: "Economics",
    category: "Humanities & Business",
    degree: "M.Phil. Economics, Kwame Nkrumah University of Science and Technology",
    photo: null,
    badge: null,
  },
  {
    name: "Theophilus Opoku Mensah",
    subject: "Science",
    category: "Sciences",
    degree: "Diploma in Nursing, Nursing and Midwifery Training College, Kumasi",
    photo: null,
    badge: "School Nurse",
  },
  {
    name: "Wisdom Yalley",
    subject: "Business Studies · Wellbeing",
    category: "Humanities & Business",
    degree: "B.Sc. Management Education, AAMUSTED, Kumasi",
    photo: null,
    badge: null,
  },
];

const CATEGORY_ORDER = [
  "Mathematics",
  "Arts & PE",
  "Sciences",
  "ICT",
  "Humanities & Business",
  "Languages",
];

const POSTGRAD_PREFIXES = ["M.", "Ph.D", "PhD"];

const isPostgraduate = (degree) =>
  POSTGRAD_PREFIXES.some((p) => degree.trim().startsWith(p));

const initials = (name) => {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const TeachingStaff = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categoryCounts = useMemo(() => {
    const counts = { All: TEACHERS.length };
    CATEGORY_ORDER.forEach((c) => {
      counts[c] = TEACHERS.filter((t) => t.category === c).length;
    });
    return counts;
  }, []);

  const postgradCount = useMemo(() => TEACHERS.filter((t) => isPostgraduate(t.degree)).length, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEACHERS.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery =
        !q || t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <section className="ts-hero">
        <div className="hp-container">
          <div className="ts-hero-photo-note">
            PHOTO: your existing staff &amp; students group shot (object-position: center
            25%)
          </div>

          <p className="ts-breadcrumb">
            <Link to="/">Home</Link> / About / Teaching Staff
          </p>
          <p className="hp-section-eyebrow" style={{ color: "#ffd83b" }}>
            Meet the Team
          </p>
          <h1>Our Teaching Staff</h1>
          <p className="ts-subtitle">
            Qualified, committed educators trained at leading universities in Ghana and
            abroad.
          </p>
        </div>
      </section>

      <div className="hp-container ts-toolbar-wrap">
        <div className="ts-toolbar">
          <div className="ts-stats">
            <div className="ts-stat">
              <p className="number">{TEACHERS.length}</p>
              <p className="label">Teachers</p>
            </div>
            <div className="ts-stat">
              <p className="number">{postgradCount}</p>
              <p className="label">Postgraduate degrees</p>
            </div>
            <div className="ts-stat">
              <p className="number">25</p>
              <p className="label">Max class size</p>
            </div>
          </div>

          <div className="ts-filters-col">
            <div className="ts-search">
              <span className="ts-search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or subject, e.g. French"
              />
            </div>

            <div className="ts-category-pills">
              <button
                type="button"
                className={`ts-category-pill ${category === "All" ? "active" : ""}`}
                onClick={() => setCategory("All")}
              >
                All <span>{categoryCounts.All}</span>
              </button>
              {CATEGORY_ORDER.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`ts-category-pill ${category === c ? "active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c} <span>{categoryCounts[c]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="ts-staff-section">
        <div className="hp-container">
          {filtered.length === 0 ? (
            <p className="ts-empty">No teachers match your search.</p>
          ) : (
            <div className="ts-staff-grid">
              {filtered.map((t) => (
                <div className="ts-staff-card" key={t.name}>
                  <div className="ts-staff-photo">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} />
                    ) : (
                      <span className="ts-staff-initials">{initials(t.name)}</span>
                    )}
                    <span className="ts-staff-category-chip">{t.category}</span>
                  </div>
                  <div className="ts-staff-body">
                    <h3>{t.name}</h3>
                    <p className="ts-staff-subject">{t.subject}</p>
                    {t.badge && (
                      <span
                        className={`ts-staff-role-badge ${
                          t.badge === "School Nurse" ? "nurse" : ""
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                    <hr className="ts-staff-divider" />
                    <p className="ts-staff-degree">{t.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeachingStaff;
