import React, { useState } from "react";
import { students } from "./mockData";

const Students = () => {
  const [query, setQuery] = useState("");

  const filtered = students.filter((s) =>
    `${s.name} ${s.class}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
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
