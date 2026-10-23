import React, { useEffect, useState } from "react";
import { applications, updateApplication, deleteApplication, subscribeToApplications } from "./applicationsStore";

const Applications = () => {
  const [, forceRender] = useState(0);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => subscribeToApplications(() => forceRender((n) => n + 1)), []);

  const markReviewed = (app) => {
    updateApplication(app.id, { status: app.status === "REVIEWED" ? "NEW" : "REVIEWED" });
    forceRender((n) => n + 1);
  };

  const remove = (id) => {
    deleteApplication(id);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <div className="admin-section-card">
        <h2>Applications</h2>
        {applications.length === 0 ? (
          <p className="portal-empty">No applications have been submitted yet.</p>
        ) : (
          applications.map((app) => {
            const name = [app.student.firstName, app.student.middleName, app.student.lastName]
              .filter(Boolean)
              .join(" ");
            const expanded = expandedId === app.id;
            return (
              <div key={app.id} style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}>
                <div className="portal-subject-header">
                  <h3>
                    {name || "(no name given)"}
                    {app.status !== "REVIEWED" && (
                      <span className="portal-badge status-late" style={{ marginLeft: "0.5rem" }}>
                        New
                      </span>
                    )}
                  </h3>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                    Submitted {app.submittedAt}
                  </span>
                </div>

                <p style={{ margin: "0 0 0.3rem" }}>
                  <strong>{app.type}</strong> · Applying for {app.student.applyingFor || "—"} ·{" "}
                  {app.student.boarding || "—"}
                </p>
                <p style={{ margin: "0 0 0.75rem" }}>
                  <strong>Guardian:</strong> {app.guardian.fullName || "—"}{" "}
                  {app.guardian.phone ? `· ${app.guardian.phone}` : ""}
                  {app.guardian.email ? ` · ${app.guardian.email}` : ""}
                </p>

                <button
                  className="portal-link-btn"
                  style={{ background: "#6b7280", marginBottom: expanded ? "0.75rem" : 0 }}
                  onClick={() => setExpandedId(expanded ? null : app.id)}
                >
                  {expanded ? "Hide details" : "View full application"}
                </button>

                {expanded && (
                  <div style={{ fontSize: "0.88rem", lineHeight: 1.8 }}>
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Date of birth:</strong> {app.student.dateOfBirth || "—"} &middot;{" "}
                      <strong>Nationality:</strong> {app.student.nationality || "—"} &middot;{" "}
                      <strong>Gender:</strong> {app.student.gender || "—"}
                    </p>
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Preferred start:</strong> {app.student.preferredStart || "—"}
                    </p>
                    {app.student.medicalNotes && (
                      <p style={{ margin: "0 0 0.3rem" }}>
                        <strong>Medical / support needs:</strong> {app.student.medicalNotes}
                      </p>
                    )}
                    {app.student.howHeard && (
                      <p style={{ margin: "0 0 0.3rem" }}>
                        <strong>Heard about HIBS via:</strong> {app.student.howHeard}
                      </p>
                    )}
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Guardian relationship:</strong> {app.guardian.relationship || "—"}
                    </p>
                    {app.guardian.address && (
                      <p style={{ margin: "0 0 0.3rem" }}>
                        <strong>Address:</strong> {app.guardian.address}
                      </p>
                    )}
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Documents attached:</strong>{" "}
                      {Object.values(app.documents).filter(Boolean).length > 0
                        ? Object.entries(app.documents)
                            .filter(([, v]) => v)
                            .map(([, v]) => v)
                            .join(", ")
                        : "None yet"}
                    </p>
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.75rem" }}>
                  <button className="portal-link-btn" onClick={() => markReviewed(app)}>
                    {app.status === "REVIEWED" ? "Mark as new" : "Mark as reviewed"}
                  </button>
                  <button
                    className="portal-link-btn"
                    style={{ background: "#9a1c1c" }}
                    onClick={() => remove(app.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Applications;
