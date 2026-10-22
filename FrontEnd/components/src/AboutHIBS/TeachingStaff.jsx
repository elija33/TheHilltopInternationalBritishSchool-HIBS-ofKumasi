import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../Home/HomePage.css";
import "./TeachingStaff.css";
import {
  teachingStaffCards,
  CATEGORY_LIST,
  subscribeToTeachingStaff,
} from "../AdminPortal/teachingStaffCards";

const POSTGRAD_PREFIXES = ["M.", "Ph.D", "PhD"];

const isPostgraduate = (degree) => POSTGRAD_PREFIXES.some((p) => degree.trim().startsWith(p));

const initials = (name) => {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const TeachingStaff = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tick, setTick] = useState(0);

  useEffect(() => subscribeToTeachingStaff(() => setTick((n) => n + 1)), []);

  const categoryCounts = useMemo(() => {
    const counts = { All: teachingStaffCards.length };
    CATEGORY_LIST.forEach((c) => {
      counts[c] = teachingStaffCards.filter((t) => t.category === c).length;
    });
    return counts;
  }, [tick]);

  const postgradCount = useMemo(
    () => teachingStaffCards.filter((t) => isPostgraduate(t.degree)).length,
    [tick],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teachingStaffCards.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery =
        !q || t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, tick]);

  return (
    <div>
      <section className="ts-hero">
        <div className="hp-container">
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
              <p className="number">{teachingStaffCards.length}</p>
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
              {CATEGORY_LIST.map((c) => (
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
                <div className="ts-staff-card" key={t.id}>
                  <div className="ts-staff-photo">
                    {t.photoDataUrl ? (
                      <img src={t.photoDataUrl} alt={t.name} />
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
