import React, { useState } from "react";
import { students, headmasters } from "../AdminPortal/mockData";
import { CLASS_LIST, teacherRecords, fullName } from "../AdminPortal/teacherData";

const Classes = () => {
  const [, forceRender] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [selectedClass, setSelectedClass] = useState(CLASS_LIST[0] || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    if (CLASS_LIST.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setError(`"${trimmed}" already exists.`);
      setAdded(false);
      return;
    }
    CLASS_LIST.push(trimmed);
    setName("");
    setError(null);
    setAdded(true);
    setSelectedClass(trimmed);
    forceRender((n) => n + 1);
  };

  const classStudents = selectedClass
    ? students.filter((s) => s.class === selectedClass)
    : [];

  const classTeacher = selectedClass
    ? teacherRecords.find(
        (t) => t.classTeacherOf === selectedClass && t.status !== "INACTIVE",
      )
    : null;

  const classHeadmaster = selectedClass
    ? headmasters.find((hm) => hm.classes.includes(selectedClass))
    : null;

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>New Class</h2>
        <div className="portal-field">
          <label htmlFor="class-name">Class name</label>
          <input
            id="class-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
              setAdded(false);
            }}
            placeholder="e.g. JHS 3A"
          />
        </div>
        <button type="submit" className="portal-link-btn">
          Add class
        </button>
        {error && <p className="portal-notice" style={{ marginTop: "0.75rem" }}>{error}</p>}
        {added && <p className="portal-success">Class added.</p>}
      </form>

      <div className="admin-section-card">
        <h2>Classes</h2>
        {CLASS_LIST.length === 0 ? (
          <p className="portal-empty">No classes yet.</p>
        ) : (
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {CLASS_LIST.map((c) => {
              const count = students.filter(
                (s) => s.class === c && s.status === "active",
              ).length;
              const isActive = c === selectedClass;
              return (
                <button
                  key={c}
                  onClick={() => setSelectedClass(c)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.55rem 1rem",
                    borderRadius: "999px",
                    border: isActive ? "1px solid #179636" : "1px solid #d7dcd7",
                    background: isActive ? "#179636" : "#fff",
                    color: isActive ? "#fff" : "#1f2937",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {c}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      opacity: 0.85,
                    }}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedClass && (
        <div className="admin-section-card">
          <h2>Students in {selectedClass}</h2>
          <p style={{ margin: "0 0 0.3rem", fontSize: "0.9rem", color: "var(--muted)" }}>
            <strong>Class Teacher:</strong>{" "}
            {classTeacher ? fullName(classTeacher) : "Not yet assigned"}
          </p>
          <p style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: "var(--muted)" }}>
            <strong>Headmaster:</strong>{" "}
            {classHeadmaster ? classHeadmaster.name : "Not yet assigned"}
          </p>
          {classStudents.length === 0 ? (
            <p className="portal-empty">No students in this class yet.</p>
          ) : (
            <div className="portal-table-wrap">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classStudents.map((s) => (
                    <tr key={s.name}>
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
      )}
    </div>
  );
};

export default Classes;
