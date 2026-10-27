import React, { useEffect, useState } from "react";
import {
  tourVisits,
  updateTourVisit,
  deleteTourVisit,
  subscribeToTourVisits,
} from "./tourVisitsStore";

const STATUS_LABELS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  DONE: "Visited",
};

const Visits = () => {
  const [, forceRender] = useState(0);

  // A visit request submitted from the public Tours & Open Days page
  // arrives in a different browser tab — subscribe so it (and changes made
  // from the other dashboard) show up here live.
  useEffect(() => subscribeToTourVisits(() => forceRender((n) => n + 1)), []);

  const setStatus = (visit, status) => {
    updateTourVisit(visit.id, { status });
    forceRender((n) => n + 1);
  };

  const remove = (id) => {
    deleteTourVisit(id);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <div className="admin-section-card">
        <h2>Tours &amp; Open Days requests</h2>
        {tourVisits.length === 0 ? (
          <p className="portal-empty">No visit requests have been submitted yet.</p>
        ) : (
          tourVisits.map((v) => (
            <div
              key={v.id}
              style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}
            >
              <div className="portal-subject-header">
                <h3>
                  {v.fullName}
                  <span
                    className={`portal-badge ${v.status === "PENDING" ? "status-late" : "status-present"}`}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    {STATUS_LABELS[v.status] || v.status}
                  </span>
                </h3>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                  Submitted {v.submittedAt}
                </span>
              </div>

              <p style={{ margin: "0 0 0.3rem" }}>
                <strong>Contact:</strong> {v.email} {v.phone ? `· ${v.phone}` : ""}
              </p>
              <p style={{ margin: "0 0 0.3rem" }}>
                <strong>Preferred visit:</strong> {v.visitDate || "—"}
                {v.preferredTime ? ` at ${v.preferredTime}` : ""}
              </p>
              {v.message && (
                <p style={{ margin: "0 0 0.75rem", lineHeight: 1.6 }}>{v.message}</p>
              )}

              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {v.status !== "CONFIRMED" && (
                  <button className="portal-link-btn" onClick={() => setStatus(v, "CONFIRMED")}>
                    Mark as confirmed
                  </button>
                )}
                {v.status !== "DONE" && (
                  <button className="portal-link-btn" onClick={() => setStatus(v, "DONE")}>
                    Mark as visited
                  </button>
                )}
                <button
                  className="portal-link-btn"
                  style={{ background: "#9a1c1c" }}
                  onClick={() => remove(v.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Visits;
