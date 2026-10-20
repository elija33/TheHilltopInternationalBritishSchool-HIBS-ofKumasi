import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { CLASS_ROSTERS } from "../AdminPortal/teacherData";
import { announcements } from "../AdminPortal/mockData";

const Home = () => {
  const { teacher } = useOutletContext();
  // Teachers see whole-school notices plus anything posted just for staff —
  // never the class-scoped or parents-fees ones meant for other audiences.
  const visibleAnnouncements = announcements.filter(
    (a) => a.audience === "school" || a.audience === "teachers",
  );
  const isClassTeacher = Boolean(teacher.classTeacherOf);
  const subjectClassCount = teacher.subjectAssignments.reduce(
    (sum, a) => sum + a.classes.length,
    0,
  );
  const totalStudents = new Set([
    ...(isClassTeacher ? CLASS_ROSTERS[teacher.classTeacherOf] || [] : []),
    ...teacher.subjectAssignments.flatMap((a) =>
      a.classes.flatMap((c) => CLASS_ROSTERS[c] || []),
    ),
  ]).size;

  return (
    <div>
      <div className="portal-grid">
        <div className="portal-stat">
          <p className="label">Your role</p>
          <p className="value" style={{ fontSize: "1.2rem" }}>
            {isClassTeacher && teacher.subjectAssignments.length > 0
              ? "Class & subject teacher"
              : isClassTeacher
                ? "Class teacher"
                : teacher.subjectAssignments.length > 0
                  ? "Subject teacher"
                  : "No assignments"}
          </p>
        </div>
        <div className="portal-stat">
          <p className="label">Subject + class assignments</p>
          <p className="value">{subjectClassCount}</p>
        </div>
        <div className="portal-stat">
          <p className="label">Students across your classes</p>
          <p className="value">{totalStudents}</p>
        </div>
      </div>

      <div className="portal-card">
        <h2>Announcements</h2>
        {visibleAnnouncements.length === 0 ? (
          <p className="portal-empty">There are no announcements right now.</p>
        ) : (
          visibleAnnouncements.map((a) => (
            <div key={a.id} style={{ borderTop: "1px solid #eef1ee", padding: "0.75rem 0" }}>
              <div className="portal-subject-header">
                <h3>{a.title}</h3>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{a.date}</span>
              </div>
              <p style={{ margin: 0 }}>{a.body}</p>
            </div>
          ))
        )}
      </div>

      {isClassTeacher && (
        <div className="portal-card" style={{ marginTop: "1.25rem" }}>
          <h2>As class teacher of {teacher.classTeacherOf}</h2>
          <p style={{ margin: "0 0 0.5rem" }}>
            You&rsquo;re responsible for daily attendance and compiling the final report
            card for this class.
          </p>
          <p style={{ margin: 0 }}>
            <Link to="/portal/teacher/attendance">Take today&rsquo;s attendance &rarr;</Link>
          </p>
        </div>
      )}

      {teacher.subjectAssignments.length > 0 && (
        <div className="portal-card">
          <h2>Your subjects</h2>
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Classes</th>
                </tr>
              </thead>
              <tbody>
                {teacher.subjectAssignments.map((a) => (
                  <tr key={a.subject}>
                    <td>{a.subject}</td>
                    <td>{a.classes.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: "0.75rem" }}>
            <Link to="/portal/teacher/grades">Enter grades &rarr;</Link>
          </p>
        </div>
      )}

      {!isClassTeacher && teacher.subjectAssignments.length === 0 && (
        <div className="portal-card">
          <p className="portal-empty">
            You don&rsquo;t have any class or subject assignments for this academic year
            yet. Contact the school office if this looks wrong.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
