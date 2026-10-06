import React, { useState } from "react";
import { students } from "../AdminPortal/mockData";
import { CLASS_LIST } from "../AdminPortal/teacherData";

const Students = () => {
  const [, forceRender] = useState(0);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState(CLASS_LIST[0]);
  const [added, setAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    students.push({ name, class: className, status: "active" });
    setName("");
    setAdded(true);
    forceRender((n) => n + 1);
  };

  const filtered = students.filter((s) =>
    `${s.name} ${s.class}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <form className="admin-section-card" onSubmit={handleSubmit}>
        <h2>New Student</h2>
        <div className="portal-field">
          <label htmlFor="student-name">Full name</label>
          <input
            id="student-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setAdded(false);
            }}
            placeholder="e.g. Kofi Darko"
          />
        </div>
        <div className="portal-field">
          <label htmlFor="student-class">Class</label>
          <select
            id="student-class"
            className="portal-select"
            value={className}
            onChange={(e) => {
              setClassName(e.target.value);
              setAdded(false);
            }}
          >
            {CLASS_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="portal-link-btn">
          Add student
        </button>
        {added && <p className="portal-success">Student added.</p>}
      </form>

      <div className="portal-toolbar">
        <div>
          <label htmlFor="student-search">Search</label>
          <input
            id="student-search"
            className="portal-select"
            type="text"
            placeholder="Search by name or class"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ minWidth: "220px" }}
          />
        </div>
      </div>

      <div className="admin-section-card">
        {filtered.length === 0 ? (
          <p className="portal-empty">No students match your search.</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.name}>
                    <td>{s.name}</td>
                    <td>{s.class}</td>
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

export default Students;
