import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { students } from "../AdminPortal/mockData";
import { teacherRecords, fullName } from "../AdminPortal/teacherData";

const MyClasses = () => {
  const { headmaster } = useOutletContext();
  const classes = headmaster.classes;

  // Re-derive the selection from the current classes list on every render
  // instead of trusting stale state, so a class that's been unassigned from
  // this headmaster mid-session (e.g. Admin edits oversight elsewhere) never
  // leaves the dropdown pointed at a class that no longer belongs to them.
  const [requestedClass, setRequestedClass] = useState(null);
  const selectedClass =
    requestedClass && classes.includes(requestedClass) ? requestedClass : classes[0] || null;

  if (classes.length === 0) {
    return (
      <div className="admin-section-card">
        <p className="portal-empty">
          You don&rsquo;t have any classes assigned to oversee yet. Contact the School
          Office if this looks wrong.
        </p>
      </div>
    );
  }

  const roster = students.filter((s) => s.class === selectedClass);
  const classTeacher = teacherRecords.find(
    (t) => t.classTeacherOf === selectedClass && t.status !== "INACTIVE",
  );
  const activeCount = roster.filter((s) => s.status === "active").length;

  return (
    <div>
      <div className="admin-section-card">
        <label htmlFor="class-select">Select class</label>
        <select
          id="class-select"
          className="portal-select"
          value={selectedClass || ""}
          onChange={(e) => setRequestedClass(e.target.value)}
        >
          {classes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-section-card">
        <div className="portal-subject-header">
          <h3>{selectedClass}</h3>
          <span className="portal-term-mark">
            {roster.length} students{roster.length !== activeCount ? ` · ${activeCount} active` : ""}
          </span>
        </div>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.9rem", color: "var(--muted)" }}>
          <strong>Class Teacher:</strong>{" "}
          {classTeacher ? fullName(classTeacher) : "Not yet assigned"}
        </p>
        {roster.length === 0 ? (
          <p className="portal-empty">No students in this class yet.</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((s, i) => (
                  <tr key={s.name}>
                    <td>{i + 1}</td>
                    <td>{s.name}</td>
                    <td>
                      <span
                        className={`portal-badge ${
                          s.status === "active" ? "status-present" : "status-not_recorded"
                        }`}
                      >
                        {s.status === "active" ? "Active" : "Past student"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClasses;
