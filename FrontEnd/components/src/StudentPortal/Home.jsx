import React from "react";
import { Link } from "react-router-dom";
import {
  student,
  currentTerm,
  announcements,
  subjects,
  attendanceDays,
  syllabus,
} from "./mockData";
import { computeAttendance } from "./attendanceUtils";
import { computeTermMark } from "./gradeUtils";

const Home = () => {
  // Only show announcements meant for students at their own school/class —
  // parent/fee-only announcements are never surfaced here.
  const visibleAnnouncements = announcements.filter(
    (a) =>
      a.audience === "school" ||
      (a.audience === "class" && a.class === student.currentClass),
  );

  const attendance = computeAttendance(attendanceDays);
  const publishedSubjects = subjects.filter((s) => s.published);
  const unpublishedSubjects = subjects.filter((s) => !s.published);

  return (
    <div>
      <div className="portal-grid">
        <div className="portal-stat">
          <p className="label">Class</p>
          <p className="value" style={{ fontSize: "1.2rem" }}>
            {student.currentClass}
          </p>
        </div>
        <div className="portal-stat">
          <p className="label">Current term</p>
          <p className="value" style={{ fontSize: "1.2rem" }}>
            {currentTerm.label}
          </p>
        </div>
        <div className="portal-stat">
          <p className="label">Attendance this term</p>
          <p className="value">
            {attendance.percentage === null ? "—" : `${attendance.percentage}%`}
          </p>
        </div>
      </div>

      <div className="portal-card" style={{ marginTop: "1.25rem" }}>
        <h2>Announcements</h2>
        {visibleAnnouncements.length === 0 ? (
          <p className="portal-empty">There are no announcements right now.</p>
        ) : (
          visibleAnnouncements.map((a) => (
            <div key={a.id} style={{ marginBottom: "1rem" }}>
              <h3>{a.title}</h3>
              <p style={{ margin: "0 0 0.25rem", color: "var(--muted)" }}>{a.body}</p>
              <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{a.date}</span>
            </div>
          ))
        )}
      </div>

      <div className="portal-card">
        <h2>Latest marks summary</h2>
        {unpublishedSubjects.length > 0 && (
          <p className="portal-notice">
            {unpublishedSubjects.map((s) => s.name).join(", ")}{" "}
            {unpublishedSubjects.length === 1 ? "has" : "have"} not been published for{" "}
            {currentTerm.label} yet.
          </p>
        )}
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
        <p style={{ marginTop: "0.75rem" }}>
          <Link to="/portal/student/grades">See full grade breakdown &rarr;</Link>
        </p>
      </div>

      <div className="portal-card">
        <h2>Syllabus</h2>
        <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
          {syllabus.map((s) => (
            <li key={s.subject} style={{ marginBottom: "0.4rem" }}>
              {s.subject}{" "}
              {s.type === "none" ? (
                <span className="portal-empty">— no syllabus uploaded yet</span>
              ) : (
                <Link to="/portal/student/syllabus">— view syllabus</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
