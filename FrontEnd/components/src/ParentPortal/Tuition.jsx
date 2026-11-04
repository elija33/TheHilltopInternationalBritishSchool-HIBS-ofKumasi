import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { tuitionRecords, subscribeToTuitionRecords } from "../AccountantPortal/tuitionStore";

const formatMoney = (n) => `₵${Number(n).toLocaleString()}`;

const Tuition = () => {
  const { child } = useOutletContext();
  const [, forceRender] = useState(0);
  const [expandedId, setExpandedId] = useState(null);

  // The accountant posts from a different browser tab (the Accountant
  // Portal) — subscribe so a new posting or amount update shows up here live.
  useEffect(() => subscribeToTuitionRecords(() => forceRender((n) => n + 1)), []);

  const records = tuitionRecords.filter((r) => r.studentName === child.name);
  const total = records.reduce((sum, r) => sum + Number(r.amount || 0), 0);

  return (
    <div>
      <div className="portal-grid">
        <div className="portal-stat">
          <p className="label">Tuition postings</p>
          <p className="value">{records.length}</p>
        </div>
        <div className="portal-stat">
          <p className="label">Total billed — {child.name}</p>
          <p className="value" style={{ fontSize: "1.2rem" }}>
            {formatMoney(total)}
          </p>
        </div>
      </div>

      <div className="portal-card">
        <h2>Tuition from the Accounts Office</h2>
        {records.length === 0 ? (
          <p className="portal-empty">
            No tuition has been posted for {child.name} yet.
          </p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Amount</th>
                  <th>Due date</th>
                  <th>Description</th>
                  <th>Posted</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => {
                  const history = r.history || [];
                  const hasUpdates = history.length > 1;
                  const isExpanded = expandedId === r.id;
                  return (
                    <React.Fragment key={r.id}>
                      <tr>
                        <td>{r.term}</td>
                        <td>{formatMoney(r.amount)}</td>
                        <td>{r.dueDate || "—"}</td>
                        <td>{r.description || "—"}</td>
                        <td>{r.postedAt}</td>
                        <td>
                          {hasUpdates ? (
                            <button
                              className="portal-link-btn"
                              style={{ padding: "0.35rem 0.7rem", fontSize: "0.78rem" }}
                              onClick={() => setExpandedId(isExpanded ? null : r.id)}
                            >
                              {isExpanded ? "Hide history" : `History (${history.length})`}
                            </button>
                          ) : (
                            <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                              No changes yet
                            </span>
                          )}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} style={{ background: "var(--gray-bg)" }}>
                            <strong style={{ fontSize: "0.8rem" }}>Amount history</strong>
                            <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.2rem" }}>
                              {history.map((h, i) => (
                                <li key={i} style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                                  {h.date} — {formatMoney(h.amount)}
                                  {h.note ? ` · ${h.note}` : ""}
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tuition;
