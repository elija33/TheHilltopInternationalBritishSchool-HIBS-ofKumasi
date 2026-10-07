import React, { useState } from "react";
import { headmasters, headmasterClassAvailability } from "./mockData";
import { headmasterApprovalQueue } from "./approvals";

const ACTION_LABEL = { CREATE: "New headmaster", EDIT: "Edit headmaster", DELETE: "Delete headmaster" };

const HeadmasterApprovals = () => {
  const [, forceRender] = useState(0);
  const [resolved, setResolved] = useState([]);

  const approve = (req) => {
    if (req.action === "CREATE") {
      headmasters.push({ id: `hm-${Date.now()}`, ...req.proposedData });
    } else if (req.action === "EDIT") {
      const hm = headmasters.find((h) => h.id === req.targetId);
      if (hm) Object.assign(hm, req.proposedData);
    } else if (req.action === "DELETE") {
      const idx = headmasters.findIndex((h) => h.id === req.targetId);
      if (idx !== -1) headmasters.splice(idx, 1);
    }
    finish(req, "APPROVED");
  };

  const reject = (req) => finish(req, "REJECTED");

  const finish = (req, decision) => {
    const idx = headmasterApprovalQueue.findIndex((r) => r.id === req.id);
    if (idx !== -1) headmasterApprovalQueue.splice(idx, 1);
    setResolved((prev) => [{ ...req, decision }, ...prev]);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <div className="admin-section-card">
        <h2>Pending Headmaster Requests</h2>
        {headmasterApprovalQueue.length === 0 ? (
          <p className="portal-empty">No headmaster requests are waiting.</p>
        ) : (
          headmasterApprovalQueue.map((req) => {
            const target = req.targetId ? headmasters.find((h) => h.id === req.targetId) : null;
            const proposedClasses = req.proposedData ? req.proposedData.classes || [] : [];
            const availability = headmasterClassAvailability(req.targetId);
            const conflicts = proposedClasses.filter((c) => availability.isClassTaken(c));

            return (
              <div key={req.id} style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}>
                <div className="portal-subject-header">
                  <h3>
                    {ACTION_LABEL[req.action]}
                    {target ? ` — ${target.name}` : req.proposedData ? ` — ${req.proposedData.name}` : ""}
                  </h3>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                    Requested by {req.requestedBy} on {req.requestedAt}
                  </span>
                </div>

                {req.action === "DELETE" && target && (
                  <p style={{ margin: "0 0 0.5rem" }}>
                    {target.classes.length > 0
                      ? `This will leave ${target.classes.join(", ")} with no headmaster.`
                      : "This headmaster currently oversees no classes."}
                  </p>
                )}

                {(req.action === "CREATE" || req.action === "EDIT") && (
                  <>
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Title:</strong> {req.proposedData.title || "—"}
                    </p>
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Contact:</strong> {req.proposedData.email || "—"}
                      {req.proposedData.phone ? ` · ${req.proposedData.phone}` : ""}
                    </p>
                    <p style={{ margin: "0 0 0.5rem" }}>
                      <strong>Proposed to oversee:</strong>{" "}
                      {proposedClasses.length > 0 ? proposedClasses.join(", ") : "None yet"}
                    </p>
                    {conflicts.length > 0 && (
                      <p className="portal-notice">
                        Already overseen by another headmaster: {conflicts.join(", ")}. Approving
                        this will leave that conflict unresolved — check before approving.
                      </p>
                    )}
                  </>
                )}

                <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.6rem" }}>
                  <button className="portal-link-btn" onClick={() => approve(req)}>
                    Approve
                  </button>
                  <button
                    className="portal-link-btn"
                    style={{ background: "#9a1c1c" }}
                    onClick={() => reject(req)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {resolved.length > 0 && (
        <div className="admin-section-card">
          <h2>Resolved this session</h2>
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Headmaster</th>
                  <th>Decision</th>
                </tr>
              </thead>
              <tbody>
                {resolved.map((r) => (
                  <tr key={r.id}>
                    <td>{ACTION_LABEL[r.action]}</td>
                    <td>{r.proposedData ? r.proposedData.name : r.targetId}</td>
                    <td>
                      <span
                        className={`portal-badge ${
                          r.decision === "APPROVED" ? "status-present" : "status-absent"
                        }`}
                      >
                        {r.decision === "APPROVED" ? "Approved" : "Rejected"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadmasterApprovals;
