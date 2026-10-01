import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CLASS_ROSTERS } from "../AdminPortal/teacherData";

// Generic assessment template — this demo has no per-subject assessment
// calendar, so every subject+class pair gets the same placeholder to grade.
const ASSESSMENT = { name: "Class Test 1", weight: 20, max: 50 };

const pairKey = (subject, cls) => `${subject}::${cls}`;

const defaultEntries = (roster) =>
  Object.fromEntries(roster.map((name) => [name, { status: "SCORED", value: "" }]));

const Grades = () => {
  const { teacher } = useOutletContext();
  const pairs = teacher.subjectAssignments.flatMap((a) =>
    a.classes.map((c) => ({ subject: a.subject, class: c })),
  );

  const [selected, setSelected] = useState(pairs[0] ? pairKey(pairs[0].subject, pairs[0].class) : "");
  const [entriesByPair, setEntriesByPair] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (pairs.length === 0) {
    return (
      <div className="portal-card">
        <p className="portal-empty">
          You have no subject and class assignments to grade. Grade entry is scoped to a
          subject teacher&rsquo;s own subject + class pairs.
        </p>
      </div>
    );
  }

  const current = pairs.find((p) => pairKey(p.subject, p.class) === selected) || pairs[0];
  const roster = CLASS_ROSTERS[current.class] || [];
  const entries = entriesByPair[selected] || defaultEntries(roster);

  const updateEntry = (name, field, value) => {
    setEntriesByPair((prev) => ({
      ...prev,
      [selected]: { ...(prev[selected] || defaultEntries(roster)), [name]: { ...entries[name], [field]: value } },
    }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="portal-toolbar">
        <div>
          <label htmlFor="pair-select">Subject &amp; class</label>
          <select
            id="pair-select"
            className="portal-select"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setSubmitted(false);
            }}
          >
            {pairs.map((p) => (
              <option key={pairKey(p.subject, p.class)} value={pairKey(p.subject, p.class)}>
                {p.subject} &middot; {p.class}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form className="portal-card" onSubmit={handleSubmit}>
        <div className="portal-subject-header">
          <h2>
            {ASSESSMENT.name} &middot; {current.subject} &middot; {current.class}
          </h2>
          <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            Weight {ASSESSMENT.weight}% &middot; Max {ASSESSMENT.max}
          </span>
        </div>

        <div className="portal-table-wrap">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Status</th>
                <th>Mark (out of {ASSESSMENT.max})</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((name) => {
                const entry = entries[name] || { status: "SCORED", value: "" };
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      <select
                        className="portal-select"
                        value={entry.status}
                        onChange={(e) => updateEntry(name, "status", e.target.value)}
                      >
                        <option value="SCORED">Scored</option>
                        <option value="ABSENT">Absent</option>
                        <option value="NOT_ASSESSED">Not assessed</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max={ASSESSMENT.max}
                        disabled={entry.status !== "SCORED"}
                        value={entry.value}
                        onChange={(e) => updateEntry(name, "value", e.target.value)}
                        style={{ width: "80px" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          Submitting appends these marks as new grade records — it never overwrites a
          previously published mark.
        </p>

        <button type="submit" className="portal-link-btn">
          Submit grades
        </button>
        {submitted && <p className="portal-success">Grades submitted.</p>}
      </form>
    </div>
  );
};

export default Grades;
