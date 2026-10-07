import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CLASS_ROSTERS, fullName } from "../AdminPortal/teacherData";
import { currentTerm } from "../AdminPortal/mockData";
import { gradeSubmissions, nextSubmissionId } from "../AdminPortal/gradeSubmissions";

// Generic assessment template — this demo has no per-subject assessment
// calendar, so every subject+class pair gets the same placeholder to grade.
const ASSESSMENT = { name: "Class Test 1", weight: 20, max: 50 };

const pairKey = (subject, cls) => `${subject}::${cls}`;

const defaultEntries = (roster) =>
  Object.fromEntries(roster.map((name) => [name, { status: "SCORED", value: "" }]));

const STATUS_LABEL = {
  PENDING: "Awaiting headmaster approval.",
  APPROVED: "Approved — now visible to these students and their parents.",
  REJECTED: "Sent back by your headmaster — resubmit once corrected.",
};

const Grades = () => {
  const { teacher } = useOutletContext();
  const pairs = teacher.subjectAssignments.flatMap((a) =>
    a.classes.map((c) => ({ subject: a.subject, class: c })),
  );

  const [selected, setSelected] = useState(pairs[0] ? pairKey(pairs[0].subject, pairs[0].class) : "");
  const [entriesByPair, setEntriesByPair] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [, forceRender] = useState(0);

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

  // Most recent submission for this exact subject+class+term — a rejected
  // one can always be superseded by submitting again, but a submission
  // still awaiting a decision blocks a second one from piling up behind it.
  const submissionsForPair = gradeSubmissions.filter(
    (s) => s.class === current.class && s.subject === current.subject && s.term === currentTerm.label,
  );
  const latest = submissionsForPair[submissionsForPair.length - 1];
  const blockedByPending = Boolean(latest && latest.status === "PENDING");

  const updateEntry = (name, field, value) => {
    setEntriesByPair((prev) => ({
      ...prev,
      [selected]: { ...(prev[selected] || defaultEntries(roster)), [name]: { ...entries[name], [field]: value } },
    }));
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    for (const name of roster) {
      const entry = entries[name] || { status: "SCORED", value: "" };
      if (entry.status === "SCORED") {
        const n = Number(entry.value);
        if (entry.value === "" || Number.isNaN(n) || n < 0 || n > ASSESSMENT.max) {
          setError(
            `Enter a valid mark (0–${ASSESSMENT.max}) for ${name}, or mark them Absent / Not assessed.`,
          );
          return;
        }
      }
    }

    gradeSubmissions.push({
      id: nextSubmissionId(),
      class: current.class,
      subject: current.subject,
      term: currentTerm.label,
      teacherId: teacher.id,
      teacherName: fullName(teacher),
      submittedAt: new Date().toISOString().split("T")[0],
      status: "PENDING",
      decidedBy: null,
      decidedAt: null,
      rejectionNote: null,
      entries: roster.map((name) => {
        const entry = entries[name] || { status: "SCORED", value: "" };
        return {
          studentName: name,
          assessments: [
            {
              name: ASSESSMENT.name,
              weight: ASSESSMENT.weight,
              max: ASSESSMENT.max,
              value: entry.status === "SCORED" ? Number(entry.value) : null,
              status: entry.status,
            },
          ],
        };
      }),
    });

    setSubmitted(true);
    forceRender((n) => n + 1);
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
              setError("");
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

      {latest && (
        <p className={latest.status === "REJECTED" ? "portal-notice" : "portal-success"}>
          {STATUS_LABEL[latest.status]}
          {latest.status !== "PENDING" && latest.decidedAt && ` (${latest.decidedAt})`}
          {latest.status === "REJECTED" && latest.rejectionNote && ` — "${latest.rejectionNote}"`}
        </p>
      )}

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
                        disabled={blockedByPending}
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
                        disabled={blockedByPending || entry.status !== "SCORED"}
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

        {error && <p className="portal-notice">{error}</p>}

        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          Submitting sends these marks to your headmaster for approval. Once submitted they
          can&rsquo;t be changed — if something needs fixing, your headmaster can send it
          back to you to resubmit.
        </p>

        <button type="submit" className="portal-link-btn" disabled={blockedByPending}>
          {blockedByPending ? "Awaiting approval" : "Submit grades"}
        </button>
        {submitted && <p className="portal-success">Grades submitted for approval.</p>}
      </form>
    </div>
  );
};

export default Grades;
