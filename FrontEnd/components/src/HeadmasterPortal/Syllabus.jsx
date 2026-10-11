import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  syllabusSubmissions,
  approveSyllabusSubmission,
  rejectSyllabusSubmission,
} from "../AdminPortal/syllabusSubmissions";

const DECISION_LABEL = { APPROVED: "Approved", REJECTED: "Rejected" };

const Syllabus = () => {
  const { headmaster } = useOutletContext();
  const [, forceRender] = useState(0);
  const [classFilter, setClassFilter] = useState("ALL");
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [rejectError, setRejectError] = useState("");

  // Scoped strictly to classes this headmaster oversees — a submission for
  // any other class must never appear here, even in the resolved history.
  const scoped = syllabusSubmissions.filter((s) => headmaster.classes.includes(s.class));
  const pending = scoped.filter(
    (s) => s.status === "PENDING" && (classFilter === "ALL" || s.class === classFilter),
  );
  const resolved = scoped
    .filter((s) => s.status !== "PENDING")
    .slice()
    .reverse();

  if (headmaster.classes.length === 0) {
    return (
      <div className="admin-section-card">
        <p className="portal-empty">
          You don&rsquo;t oversee any classes yet, so there are no syllabus submissions to
          review. Contact the School Office if this looks wrong.
        </p>
      </div>
    );
  }

  const approve = (submission) => {
    approveSyllabusSubmission(submission, headmaster.name);
    forceRender((n) => n + 1);
  };

  const reject = (submission) => {
    const note = rejectNote.trim();
    if (!note) {
      setRejectError("Tell the teacher why you're sending this back before confirming.");
      return;
    }
    rejectSyllabusSubmission(submission, headmaster.name, note);
    setRejectingId(null);
    setRejectNote("");
    setRejectError("");
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <div className="admin-section-card">
        <label htmlFor="class-filter">Class</label>
        <select
          id="class-filter"
          className="portal-select"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="ALL">All my classes</option>
          {headmaster.classes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-section-card">
        <h2>Pending syllabus submissions</h2>
        {pending.length === 0 ? (
          <p className="portal-empty">No syllabus submissions are waiting for your approval.</p>
        ) : (
          pending.map((s) => (
            <div key={s.id} style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}>
              <div className="portal-subject-header">
                <h3>
                  {s.subject} &middot; {s.class}
                </h3>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                  Submitted by {s.teacherName} on {s.submittedAt}
                </span>
              </div>

              <p style={{ margin: "0 0 0.75rem", lineHeight: 1.6 }}>{s.content}</p>

              <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: "0 0 0.75rem" }}>
                This is read-only here — approving publishes it exactly as submitted. If
                something needs fixing, send it back to the teacher instead of approving it.
              </p>

              {rejectingId === s.id ? (
                <div>
                  <label htmlFor={`reject-note-${s.id}`}>Reason for sending back (required)</label>
                  <textarea
                    id={`reject-note-${s.id}`}
                    className="portal-select"
                    rows={2}
                    style={{ width: "100%" }}
                    value={rejectNote}
                    onChange={(e) => {
                      setRejectNote(e.target.value);
                      if (rejectError) setRejectError("");
                    }}
                  />
                  {rejectError && <p className="portal-notice">{rejectError}</p>}
                  <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.5rem" }}>
                    <button className="portal-link-btn" style={{ background: "#9a1c1c" }} onClick={() => reject(s)}>
                      Confirm reject
                    </button>
                    <button
                      className="portal-link-btn"
                      style={{ background: "#6b7280" }}
                      onClick={() => {
                        setRejectingId(null);
                        setRejectNote("");
                        setRejectError("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <button className="portal-link-btn" onClick={() => approve(s)}>
                    Approve &amp; publish to students/parents
                  </button>
                  <button
                    className="portal-link-btn"
                    style={{ background: "#9a1c1c" }}
                    onClick={() => {
                      setRejectingId(s.id);
                      setRejectNote("");
                      setRejectError("");
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {resolved.length > 0 && (
        <div className="admin-section-card">
          <h2>Resolved</h2>
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Decision</th>
                  <th>By</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {resolved.map((s) => (
                  <tr key={s.id}>
                    <td>{s.class}</td>
                    <td>{s.subject}</td>
                    <td>{s.teacherName}</td>
                    <td>
                      <span
                        className={`portal-badge ${
                          s.status === "APPROVED" ? "status-present" : "status-absent"
                        }`}
                      >
                        {DECISION_LABEL[s.status]}
                      </span>
                    </td>
                    <td>
                      {s.decidedBy} &middot; {s.decidedAt}
                    </td>
                    <td>{s.status === "REJECTED" ? s.rejectionNote : "—"}</td>
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

export default Syllabus;
