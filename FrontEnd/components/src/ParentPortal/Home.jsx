import React from "react";
import { useOutletContext } from "react-router-dom";
import { children, currentTerm } from "./mockData";
import { computeAttendance } from "../StudentPortal/attendanceUtils";
import { computeTermMark } from "../StudentPortal/gradeUtils";

const formatMoney = (n) => `₵${n.toLocaleString()}`;

const Home = () => {
  const { child } = useOutletContext();
  const attendance = computeAttendance(child.attendanceDays);
  const publishedSubjects = child.subjects.filter((s) => s.published);

  const activeChildren = children.filter((c) => c.status === "active");
  const householdTotal = activeChildren.reduce((sum, c) => sum + c.feeBalance, 0);

  return (
    <div>
      <div className="portal-grid">
        <div className="portal-stat">
          <p className="label">Class</p>
          <p className="value" style={{ fontSize: "1.2rem" }}>
            {child.class}
          </p>
        </div>
        <div className="portal-stat">
          <p className="label">Attendance this term</p>
          <p className="value">
            {attendance.percentage === null ? "—" : `${attendance.percentage}%`}
          </p>
        </div>
        <div className="portal-stat">
          <p className="label">Fee balance</p>
          <p className="value" style={{ fontSize: "1.2rem" }}>
            {child.feeBalance > 0 ? formatMoney(child.feeBalance) : "No balance due"}
          </p>
          {child.feeDueDate && (
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.78rem", color: "var(--muted)" }}>
              Due {child.feeDueDate}
            </p>
          )}
        </div>
      </div>

      {activeChildren.length > 1 && (
        <div className="household-card" style={{ marginTop: "1.25rem" }}>
          <div className="fee-row">
            <div>
              <p style={{ margin: "0 0 0.3rem", color: "var(--muted)", fontSize: "0.85rem" }}>
                Household total outstanding across {activeChildren.length} children
              </p>
              <p className="total">{formatMoney(householdTotal)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="portal-card">
        <h2>Latest marks summary — {child.name}</h2>
        {publishedSubjects.length === 0 ? (
          <p className="portal-empty">
            Results for {currentTerm.label} have not been published yet.
          </p>
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
                {publishedSubjects.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{computeTermMark(s.assessments)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="portal-card">
        <h2>Recent announcements — {child.class}</h2>
        {child.announcements.length === 0 ? (
          <p className="portal-empty">There are no announcements right now.</p>
        ) : (
          child.announcements.map((a) => (
            <div key={a.id} style={{ marginBottom: "1rem" }}>
              <h3>{a.title}</h3>
              <p style={{ margin: "0 0 0.25rem", color: "var(--muted)" }}>{a.body}</p>
              <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{a.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
