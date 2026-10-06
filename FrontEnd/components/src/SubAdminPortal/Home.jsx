import React from "react";
import { Link } from "react-router-dom";
import { students } from "../AdminPortal/mockData";
import { CLASS_LIST } from "../AdminPortal/teacherData";

const Home = () => {
  const activeStudents = students.filter((s) => s.status === "active");
  const pastStudents = students.filter((s) => s.status !== "active");

  const byClass = CLASS_LIST.map((c) => ({
    class: c,
    count: activeStudents.filter((s) => s.class === c).length,
  }));

  return (
    <div>
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-icon blue">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3" />
              <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
              <circle cx="17" cy="9" r="2.3" />
              <path d="M15.5 14c2.5 0 4.5 1.8 4.5 4.5" />
            </svg>
          </span>
          <div>
            <p className="admin-stat-value">{activeStudents.length}</p>
            <p className="admin-stat-label">Active Students</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-icon purple">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 4v4" />
            </svg>
          </span>
          <div>
            <p className="admin-stat-value">{pastStudents.length}</p>
            <p className="admin-stat-label">Past Students</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-icon green">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.2" />
              <rect x="14" y="3" width="7" height="7" rx="1.2" />
              <rect x="3" y="14" width="7" height="7" rx="1.2" />
              <rect x="14" y="14" width="7" height="7" rx="1.2" />
            </svg>
          </span>
          <div>
            <p className="admin-stat-value">{CLASS_LIST.length}</p>
            <p className="admin-stat-label">Classes</p>
          </div>
        </div>
      </div>

      <div className="admin-section-card">
        <h2>Students by class</h2>
        <div className="portal-table-wrap">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Active students</th>
              </tr>
            </thead>
            <tbody>
              {byClass.map((row) => (
                <tr key={row.class}>
                  <td>{row.class}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: "0.75rem" }}>
          <Link to="/portal/subadmin/students">Add or view students &rarr;</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
