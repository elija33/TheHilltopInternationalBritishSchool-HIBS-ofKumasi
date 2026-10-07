import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { students, parents } from "../AdminPortal/mockData";
import { pendingAccountRequests } from "../AdminPortal/approvals";
import {
  teacherRecords,
  teacherAuditLog,
  assignmentAvailability,
  nextStaffId,
  generateTempPassword,
} from "../AdminPortal/teacherData";

const TYPE_LABEL = { TEACHER: "Teacher", STUDENT: "Student", PARENT: "Parent" };

const teacherConflicts = (proposed) => {
  const availability = assignmentAvailability(null);
  const conflicts = [];
  if (proposed.classTeacherOf && availability.isClassTaken(proposed.classTeacherOf)) {
    conflicts.push(`Class teacher of ${proposed.classTeacherOf} is already taken`);
  }
  (proposed.subjectAssignments || []).forEach((a) => {
    a.classes.forEach((c) => {
      if (availability.isSubjectClassTaken(a.subject, c)) {
        conflicts.push(`${a.subject} · ${c} is already taken`);
      }
    });
  });
  return conflicts;
};

const Approvals = () => {
  const { headmaster } = useOutletContext();
  const [, forceRender] = useState(0);
  const [filter, setFilter] = useState("ALL");
  const [resolved, setResolved] = useState([]);
  const [tempPassword, setTempPassword] = useState(null);

  const approve = (req) => {
    if (req.type === "TEACHER") {
      const p = req.proposedData;
      const newTeacher = {
        id: `t-${Date.now()}`,
        staffId: nextStaffId(),
        title: p.title,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        phone: p.phone,
        address: "",
        emergencyContact: "",
        photoUrl: null,
        employmentType: p.employmentType,
        status: "ACTIVE",
        startDate: p.startDate,
        endDate: null,
        gesRegistrationNo: null,
        classTeacherOf: p.classTeacherOf || null,
        subjectAssignments: p.subjectAssignments || [],
        qualifications: [],
        documents: [],
      };
      teacherRecords.push(newTeacher);
      teacherAuditLog.push({
        id: `al-${Date.now()}`,
        teacherId: newTeacher.id,
        action: `Account created (requested by ${req.requestedBy})`,
        actor: headmaster.name,
        timestamp: new Date().toISOString().split("T")[0],
      });
      setTempPassword(generateTempPassword());
    } else if (req.type === "STUDENT") {
      students.push({ name: req.proposedData.name, class: req.proposedData.class, status: "active" });
    } else if (req.type === "PARENT") {
      parents.push({ ...req.proposedData });
    }
    finish(req, "APPROVED");
  };

  const reject = (req) => finish(req, "REJECTED");

  const finish = (req, decision) => {
    const idx = pendingAccountRequests.findIndex((r) => r.id === req.id);
    if (idx !== -1) pendingAccountRequests.splice(idx, 1);
    setResolved((prev) => [{ ...req, decision }, ...prev]);
    forceRender((n) => n + 1);
  };

  const visible = pendingAccountRequests.filter((r) => filter === "ALL" || r.type === filter);

  return (
    <div>
      {tempPassword && (
        <p className="portal-notice">
          Teacher approved. Temporary password (shown once): <strong>{tempPassword}</strong>{" "}
          — expires in 72 hours. The teacher must set a new password on first login.
        </p>
      )}

      <div className="admin-section-card">
        <div className="portal-toolbar" style={{ marginBottom: 0 }}>
          <div>
            <label htmlFor="type-filter">Filter</label>
            <select
              id="type-filter"
              className="portal-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">All types</option>
              <option value="TEACHER">Teachers</option>
              <option value="STUDENT">Students</option>
              <option value="PARENT">Parents</option>
            </select>
          </div>
        </div>
      </div>

      <div className="admin-section-card">
        <h2>Pending Account Requests</h2>
        {visible.length === 0 ? (
          <p className="portal-empty">No account requests are waiting.</p>
        ) : (
          visible.map((req) => {
            const p = req.proposedData;
            const conflicts = req.type === "TEACHER" ? teacherConflicts(p) : [];
            return (
              <div key={req.id} style={{ borderTop: "1px solid #eef1ee", padding: "1rem 0" }}>
                <div className="portal-subject-header">
                  <h3>
                    <span className="portal-badge status-not_assessed" style={{ marginRight: "0.5rem" }}>
                      {TYPE_LABEL[req.type]}
                    </span>
                    {req.type === "TEACHER" ? `${p.title} ${p.firstName} ${p.lastName}` : p.name}
                  </h3>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                    Requested by {req.requestedBy} on {req.requestedAt}
                  </span>
                </div>

                {req.type === "TEACHER" && (
                  <>
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Contact:</strong> {p.email} {p.phone ? `· ${p.phone}` : ""}
                    </p>
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Employment:</strong> {p.employmentType.replace("_", "-")}, starts{" "}
                      {p.startDate}
                    </p>
                    <p style={{ margin: "0 0 0.5rem" }}>
                      <strong>Role:</strong>{" "}
                      {p.classTeacherOf ? `Class teacher of ${p.classTeacherOf}. ` : ""}
                      {(p.subjectAssignments || [])
                        .map((a) => `${a.subject} · ${a.classes.join(", ")}`)
                        .join("; ") || (p.classTeacherOf ? "" : "No assignments proposed")}
                    </p>
                    {conflicts.length > 0 && (
                      <p className="portal-notice">
                        Conflicts with an existing assignment: {conflicts.join("; ")}. Approving
                        will leave this unresolved — check before approving.
                      </p>
                    )}
                  </>
                )}

                {req.type === "STUDENT" && (
                  <p style={{ margin: "0 0 0.5rem" }}>
                    <strong>Class:</strong> {p.class}
                  </p>
                )}

                {req.type === "PARENT" && (
                  <>
                    <p style={{ margin: "0 0 0.3rem" }}>
                      <strong>Contact:</strong> {p.email} {p.phone ? `· ${p.phone}` : ""}
                    </p>
                    <p style={{ margin: "0 0 0.5rem" }}>
                      <strong>Children:</strong>{" "}
                      {p.children && p.children.length > 0 ? p.children.join(", ") : "None listed"}
                    </p>
                  </>
                )}

                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <button
                    className="portal-link-btn"
                    onClick={() => {
                      setTempPassword(null);
                      approve(req);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="portal-link-btn"
                    style={{ background: "#9a1c1c" }}
                    onClick={() => {
                      setTempPassword(null);
                      reject(req);
                    }}
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
                  <th>Type</th>
                  <th>Name</th>
                  <th>Decision</th>
                </tr>
              </thead>
              <tbody>
                {resolved.map((r) => (
                  <tr key={r.id}>
                    <td>{TYPE_LABEL[r.type]}</td>
                    <td>
                      {r.type === "TEACHER"
                        ? `${r.proposedData.firstName} ${r.proposedData.lastName}`
                        : r.proposedData.name}
                    </td>
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

export default Approvals;
