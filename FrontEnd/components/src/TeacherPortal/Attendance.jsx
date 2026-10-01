import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CLASS_ROSTERS } from "../AdminPortal/teacherData";

const STATUS_OPTIONS = ["PRESENT", "ABSENT", "LATE", "EXCUSED", "HALF_DAY"];
const STATUS_LABEL = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
  EXCUSED: "Excused",
  HALF_DAY: "Half-day",
};

const todayLabel = () =>
  new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Attendance = () => {
  const { teacher } = useOutletContext();
  const className = teacher.classTeacherOf;
  const roster = className ? CLASS_ROSTERS[className] || [] : [];

  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(roster.map((name) => [name, "PRESENT"])),
  );
  const [submitted, setSubmitted] = useState(false);

  if (!className) {
    return (
      <div className="portal-card">
        <p className="portal-empty">
          Daily attendance is taken by a class&rsquo;s class teacher. You are not currently
          set as a class teacher, so this isn&rsquo;t available to you — only the scores for
          your own subject and class assignments, under Grades.
        </p>
      </div>
    );
  }

  const handleStatusChange = (student, status) => {
    setStatuses((prev) => ({ ...prev, [student]: status }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="portal-toolbar">
        <h2 style={{ margin: 0 }}>{className}</h2>
        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{todayLabel()}</span>
      </div>

      <form className="portal-card" onSubmit={handleSubmit}>
        <div className="portal-table-wrap">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <select
                      className="portal-select"
                      value={statuses[name]}
                      onChange={(e) => handleStatusChange(name, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit" className="portal-link-btn" style={{ marginTop: "1rem" }}>
          Submit attendance
        </button>
        {submitted && <p className="portal-success">Attendance submitted for today.</p>}
      </form>
    </div>
  );
};

export default Attendance;
