import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { currentTerm, previousTerm, arrearsPolicyEnabled, arrearsMessage } from "./mockData";
import { computeTermMark } from "../StudentPortal/gradeUtils";

const statusBadge = (status) => {
  const map = {
    SCORED: "status-scored",
    ABSENT: "status-absent",
    NOT_ASSESSED: "status-not_assessed",
  };
  const label = {
    SCORED: "Scored",
    ABSENT: "Absent",
    NOT_ASSESSED: "Not assessed",
  };
  return <span className={`portal-badge ${map[status]}`}>{label[status]}</span>;
};

const SubjectCard = ({ subject }) => {
  if (!subject.published) {
    return (
      <div className="portal-card">
        <div className="portal-subject-header">
          <h3>{subject.name}</h3>
        </div>
        <p style={{ color: "var(--muted)", margin: "0 0 0.5rem" }}>{subject.teacher}</p>
        <p className="portal-notice">
          Results for this term have not been published yet.
          {subject.publishExpected && ` Expected around ${subject.publishExpected}.`}
        </p>
      </div>
    );
  }

  const hasNotAssessed = subject.assessments.some((a) => a.status === "NOT_ASSESSED");
  const hasAbsent = subject.assessments.some((a) => a.status === "ABSENT");
  const showClassColumn = subject.assessments.some(
    (a) => a.classLabel && a.classLabel !== subject.assessments[0].classLabel,
  );

  return (
    <div className="portal-card">
      <div className="portal-subject-header">
        <h3>{subject.name}</h3>
        <span className="portal-term-mark">{computeTermMark(subject.assessments)}%</span>
      </div>
      <p style={{ color: "var(--muted)", margin: "0 0 0.75rem" }}>{subject.teacher}</p>

      {subject.crossClassNote && <p className="portal-notice">{subject.crossClassNote}</p>}

      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Assessment</th>
              {showClassColumn && <th>Class</th>}
              <th>Mark</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subject.assessments.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                {showClassColumn && <td>{a.classLabel}</td>}
                <td>
                  {a.status === "SCORED" ? `${a.value}/${a.max}` : "—"}
                  {a.corrected && (
                    <span className="portal-correction-note">Updated on {a.correctedDate}</span>
                  )}
                  {a.note && <span className="portal-correction-note">{a.note}</span>}
                </td>
                <td>{statusBadge(a.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(hasNotAssessed || hasAbsent) && (
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          {hasNotAssessed &&
            "The term mark is calculated only from the assessments taken. "}
          {hasAbsent && "An unexcused absence from an assessment counts as zero."}
        </p>
      )}
    </div>
  );
};

const Grades = () => {
  const { child } = useOutletContext();
  const [term, setTerm] = useState("current");

  const withheld = arrearsPolicyEnabled && child.arrearsWithheld;

  return (
    <div>
      <div className="portal-toolbar">
        <div>
          <label htmlFor="term-select">Term</label>
          <select
            id="term-select"
            className="portal-select"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="current">{currentTerm.label} (current)</option>
            <option value="previous">{previousTerm.label}</option>
          </select>
        </div>
      </div>

      {term === "previous" ? (
        <div className="portal-card">
          <p className="portal-notice">{previousTerm.label} — previous term, read-only.</p>
          {child.previousTermSubjects.length === 0 ? (
            <p className="portal-empty">No records from this term.</p>
          ) : (
            <div className="portal-table-wrap">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Term mark</th>
                  </tr>
                </thead>
                <tbody>
                  {child.previousTermSubjects.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.termMark}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Marks always stay visible — arrears only ever affects the
              report card download below, never the grade data itself. */}
          {child.subjects.map((s) => (
            <SubjectCard key={s.id} subject={s} />
          ))}

          <div className="portal-card">
            <h2>Report card</h2>
            {withheld ? (
              <p className="portal-notice">{arrearsMessage}</p>
            ) : (
              <button className="portal-link-btn">Download report card</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Grades;
