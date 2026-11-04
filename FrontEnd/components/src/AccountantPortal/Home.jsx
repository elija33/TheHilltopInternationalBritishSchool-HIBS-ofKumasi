import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tuitionRecords, subscribeToTuitionRecords } from "./tuitionStore";

const formatMoney = (n) => `₵${Number(n).toLocaleString()}`;

const Home = () => {
  const navigate = useNavigate();
  const [, forceRender] = useState(0);

  useEffect(() => subscribeToTuitionRecords(() => forceRender((n) => n + 1)), []);

  const totalBilled = tuitionRecords.reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const studentsBilled = new Set(tuitionRecords.map((r) => r.studentName)).size;

  return (
    <div>
      <div className="portal-grid">
        <div className="portal-stat">
          <p className="label">Tuition postings</p>
          <p className="value">{tuitionRecords.length}</p>
        </div>
        <div className="portal-stat">
          <p className="label">Students billed</p>
          <p className="value">{studentsBilled}</p>
        </div>
        <div className="portal-stat">
          <p className="label">Total billed</p>
          <p className="value" style={{ fontSize: "1.2rem" }}>
            {formatMoney(totalBilled)}
          </p>
        </div>
      </div>

      <div className="admin-section-card">
        <div className="portal-subject-header">
          <h2>Recent tuition postings</h2>
          <button className="portal-link-btn" onClick={() => navigate("../tuition")}>
            Post tuition
          </button>
        </div>
        {tuitionRecords.length === 0 ? (
          <p className="portal-empty">No tuition has been posted yet.</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Term</th>
                  <th>Amount</th>
                  <th>Due date</th>
                  <th>Posted</th>
                </tr>
              </thead>
              <tbody>
                {tuitionRecords.slice(0, 8).map((r) => (
                  <tr key={r.id}>
                    <td>{r.studentName}</td>
                    <td>{r.studentClass}</td>
                    <td>{r.term}</td>
                    <td>{formatMoney(r.amount)}</td>
                    <td>{r.dueDate || "—"}</td>
                    <td>{r.postedAt}</td>
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

export default Home;
