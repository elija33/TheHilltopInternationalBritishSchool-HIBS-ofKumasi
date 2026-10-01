import React, { useState } from "react";
import { subjectPublishing as initialRows } from "./mockData";

const Publishing = () => {
  const [rows, setRows] = useState(initialRows);

  const toggle = (id) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, published: !r.published } : r)),
    );
  };

  return (
    <div className="admin-section-card">
      <h2>Publish results by subject</h2>
      <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
        Publishing is per subject, not whole-term — a subject only becomes visible to
        its students and parents once you publish it here.
      </p>
      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.class}</td>
                <td>{r.subject}</td>
                <td>
                  <span
                    className={`portal-badge ${
                      r.published ? "status-present" : "status-not_recorded"
                    }`}
                  >
                    {r.published ? "Published" : "Not published"}
                  </span>
                  {!r.published && r.expected && (
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.78rem", color: "var(--muted)" }}>
                      Expected {r.expected}
                    </span>
                  )}
                </td>
                <td>
                  <button className="portal-link-btn" onClick={() => toggle(r.id)}>
                    {r.published ? "Unpublish" : "Publish"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Publishing;
