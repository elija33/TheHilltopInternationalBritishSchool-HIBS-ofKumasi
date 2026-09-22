import React, { useState } from "react";
import {
  subjects,
  previousTermSubjects,
  currentTerm,
  previousTerm,
  settings,
  classPosition,
} from "./mockData";
import { computeTermMark } from "./gradeUtils";

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
                    <span className="portal-correction-note">
                      Updated on {a.correctedDate}
                    </span>
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
            "Your term mark is calculated only from the assessments you took. "}
          {hasAbsent && "An unexcused absence from an assessment counts as zero."}
        </p>
      )}
    </div>
  );
};

const Grades = () => {
  const [term, setTerm] = useState("current");
  const [showRanking, setShowRanking] = useState(settings.classRankingsEnabled);

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

        {term === "current" && (
          <label className="portal-toggle">
            <input
              type="checkbox"
              checked={showRanking}
              onChange={(e) => setShowRanking(e.target.checked)}
            />
            Show class position (school setting, off by default)
          </label>
        )}
      </div>

      {term === "previous" ? (
        <div className="portal-card">
          <p className="portal-notice">
            {previousTerm.label} — previous term, read-only.
          </p>
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Term mark</th>
                </tr>
              </thead>
              <tbody>
                {previousTermSubjects.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.termMark}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          {showRanking && (
            <div className="portal-card">
              <h2>Class position</h2>
              <p style={{ margin: 0 }}>
                {classPosition.rank} of {classPosition.classSize}
              </p>
            </div>
          )}
          {subjects.map((s) => (
            <SubjectCard key={s.id} subject={s} />
          ))}
        </>
      )}
    </div>
  );
};

export default Grades;
