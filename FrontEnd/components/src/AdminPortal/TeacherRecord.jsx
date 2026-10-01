import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  teacherRecords,
  teacherAuditLog,
  CLASS_LIST,
  SUBJECT_LIST,
  fullName,
  assignmentAvailability,
  generateTempPassword,
} from "./teacherData";

const TABS = ["Profile", "Employment", "Assignments", "Qualifications & Documents", "Activity"];

const STATUS_LABEL = {
  ACTIVE: "Active",
  ON_LEAVE: "On leave",
  INACTIVE: "Inactive",
};

const TeacherRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const original = teacherRecords.find((t) => t.id === id);

  const [teacher, setTeacher] = useState(original);
  const [activeTab, setActiveTab] = useState("Profile");
  const [editing, setEditing] = useState(false);
  const [statusDraft, setStatusDraft] = useState(original ? original.status : "ACTIVE");
  const [changingStatus, setChangingStatus] = useState(false);
  const [tempPassword, setTempPassword] = useState(null);
  const [deactivateWarning, setDeactivateWarning] = useState(null);
  const [log, setLog] = useState([]);

  if (!teacher) {
    return (
      <div className="admin-section-card">
        <p className="portal-empty">No teacher found with this ID.</p>
        <Link to="/portal/admin/teachers">&larr; Back to teachers</Link>
      </div>
    );
  }

  const addLog = (action) => {
    setLog((prev) => [
      { action, actor: "School Office", timestamp: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
  };

  const update = (field, value) => setTeacher((prev) => ({ ...prev, [field]: value }));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setEditing(false);
    addLog("Profile details updated");
  };

  const handleChangeStatus = (e) => {
    e.preventDefault();
    const previous = teacher.status;
    setTeacher((prev) => ({ ...prev, status: statusDraft }));
    setChangingStatus(false);
    addLog(`Status changed from ${STATUS_LABEL[previous]} to ${STATUS_LABEL[statusDraft]}`);
  };

  const handleResetPassword = () => {
    setTempPassword(generateTempPassword());
    addLog("Password reset — new temporary password issued");
  };

  const handleDeactivate = () => {
    const hasAssignments = teacher.classTeacherOf || teacher.subjectAssignments.length > 0;
    if (hasAssignments) {
      setDeactivateWarning(
        "This teacher still has active assignments. Reassign their class and subjects on the Assignments tab before deactivating.",
      );
      return;
    }
    if (!window.confirm(`Deactivate ${fullName(teacher)}? They will no longer be able to log in.`)) {
      return;
    }
    setTeacher((prev) => ({
      ...prev,
      status: "INACTIVE",
      endDate: new Date().toISOString().split("T")[0],
    }));
    setDeactivateWarning(null);
    addLog("Status changed to Inactive (deactivated)");
  };

  const availability = assignmentAvailability(teacher.id);

  const updateClassTeacherOf = (value) => {
    update("classTeacherOf", value || null);
    addLog(value ? `Assigned as class teacher of ${value}` : "Removed as class teacher");
  };

  const addSubjectAssignment = () => {
    update("subjectAssignments", [
      ...teacher.subjectAssignments,
      { subject: SUBJECT_LIST[0], classes: [] },
    ]);
  };

  const updateSubjectRow = (index, field, value) => {
    const next = teacher.subjectAssignments.map((row, i) =>
      i === index ? { ...row, [field]: value } : row,
    );
    update("subjectAssignments", next);
  };

  const toggleRowClass = (index, className) => {
    const row = teacher.subjectAssignments[index];
    const has = row.classes.includes(className);
    const classes = has ? row.classes.filter((c) => c !== className) : [...row.classes, className];
    updateSubjectRow(index, "classes", classes);
  };

  const removeSubjectRow = (index) => {
    update(
      "subjectAssignments",
      teacher.subjectAssignments.filter((_, i) => i !== index),
    );
  };

  return (
    <div>
      <Link to="/portal/admin/teachers" style={{ fontSize: "0.85rem" }}>
        &larr; Back to teachers
      </Link>

      <div className="admin-section-card" style={{ marginTop: "0.75rem" }}>
        <div className="portal-subject-header">
          <div>
            <h2 style={{ marginBottom: "0.2rem" }}>{fullName(teacher)}</h2>
            <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              {teacher.staffId} &middot; {STATUS_LABEL[teacher.status]}
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button className="portal-link-btn" onClick={() => setEditing((v) => !v)}>
              {editing ? "Cancel edit" : "Edit"}
            </button>
            <button className="portal-link-btn" onClick={() => setChangingStatus((v) => !v)}>
              Change status
            </button>
            <button className="portal-link-btn" onClick={handleResetPassword}>
              Reset password
            </button>
            <button
              className="portal-link-btn"
              style={{ background: "#9a1c1c" }}
              onClick={handleDeactivate}
              disabled={teacher.status === "INACTIVE"}
            >
              Deactivate
            </button>
          </div>
        </div>

        {changingStatus && (
          <form
            onSubmit={handleChangeStatus}
            style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginTop: "1rem" }}
          >
            <select
              className="portal-select"
              value={statusDraft}
              onChange={(e) => setStatusDraft(e.target.value)}
            >
              <option value="ACTIVE">Active</option>
              <option value="ON_LEAVE">On leave</option>
              <option value="INACTIVE">Inactive</option>
            </select>
            <button type="submit" className="portal-link-btn">
              Save status
            </button>
          </form>
        )}

        {tempPassword && (
          <p className="portal-notice" style={{ marginTop: "1rem" }}>
            New temporary password (shown once): <strong>{tempPassword}</strong> — expires in 72
            hours. The teacher must set a new password on next login.
          </p>
        )}

        {deactivateWarning && (
          <p className="portal-notice" style={{ marginTop: "1rem" }}>
            {deactivateWarning}
          </p>
        )}
      </div>

      <div className="portal-tabs" style={{ display: "flex" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Profile" && (
        <form className="admin-section-card" onSubmit={handleSaveProfile}>
          <h2>Profile</h2>
          {editing ? (
            <>
              <div className="portal-field">
                <label>Email</label>
                <input value={teacher.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div className="portal-field">
                <label>Phone</label>
                <input value={teacher.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
              <div className="portal-field">
                <label>Address</label>
                <input value={teacher.address} onChange={(e) => update("address", e.target.value)} />
              </div>
              <div className="portal-field">
                <label>Emergency contact</label>
                <input
                  value={teacher.emergencyContact}
                  onChange={(e) => update("emergencyContact", e.target.value)}
                />
              </div>
              <button type="submit" className="portal-link-btn">
                Save profile
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {teacher.email}
              </p>
              <p>
                <strong>Phone:</strong> {teacher.phone}
              </p>
              <p>
                <strong>Address:</strong> {teacher.address}
              </p>
              <p>
                <strong>Emergency contact:</strong> {teacher.emergencyContact}
              </p>
            </>
          )}
        </form>
      )}

      {activeTab === "Employment" && (
        <div className="admin-section-card">
          <h2>Employment</h2>
          <p>
            <strong>Staff ID:</strong> {teacher.staffId}
          </p>
          <p>
            <strong>Employment type:</strong> {teacher.employmentType.replace("_", "-")}
          </p>
          <p>
            <strong>Status:</strong> {STATUS_LABEL[teacher.status]}
          </p>
          <p>
            <strong>Start date:</strong> {teacher.startDate}
          </p>
          {teacher.endDate && (
            <p>
              <strong>End date:</strong> {teacher.endDate}
            </p>
          )}
          <p>
            <strong>GES registration no.:</strong> {teacher.gesRegistrationNo || "—"}
          </p>
        </div>
      )}

      {activeTab === "Assignments" && (
        <div className="admin-section-card">
          <h2>Assignments — {teacher.startDate.slice(0, 4)}/{Number(teacher.startDate.slice(0, 4)) + 1} academic year</h2>

          <div className="portal-field">
            <label>Class teacher of</label>
            <select
              className="portal-select"
              value={teacher.classTeacherOf || ""}
              onChange={(e) => updateClassTeacherOf(e.target.value)}
            >
              <option value="">— Not a class teacher —</option>
              {CLASS_LIST.map((c) => (
                <option
                  key={c}
                  value={c}
                  disabled={availability.isClassTaken(c) && teacher.classTeacherOf !== c}
                >
                  {c}
                  {availability.isClassTaken(c) && teacher.classTeacherOf !== c
                    ? " (already assigned)"
                    : ""}
                </option>
              ))}
            </select>
          </div>

          <h3 style={{ marginTop: "1.25rem" }}>Subject teacher of</h3>
          {teacher.subjectAssignments.map((row, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #eef1ee",
                borderRadius: "8px",
                padding: "0.9rem",
                marginBottom: "0.75rem",
              }}
            >
              <div className="portal-field">
                <label>Subject</label>
                <select
                  className="portal-select"
                  value={row.subject}
                  onChange={(e) => updateSubjectRow(i, "subject", e.target.value)}
                >
                  {SUBJECT_LIST.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="portal-field">
                <label>Classes</label>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {CLASS_LIST.map((c) => {
                    const taken =
                      availability.isSubjectClassTaken(row.subject, c) &&
                      !row.classes.includes(c);
                    return (
                      <label key={c} style={{ fontSize: "0.85rem", opacity: taken ? 0.5 : 1 }}>
                        <input
                          type="checkbox"
                          checked={row.classes.includes(c)}
                          disabled={taken}
                          onChange={() => toggleRowClass(i, c)}
                        />{" "}
                        {c}
                        {taken ? " (taken)" : ""}
                      </label>
                    );
                  })}
                </div>
              </div>
              <button
                className="portal-link-btn"
                style={{ background: "#9a1c1c" }}
                onClick={() => removeSubjectRow(i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="portal-link-btn" onClick={addSubjectAssignment}>
            + Add another subject
          </button>
        </div>
      )}

      {activeTab === "Qualifications & Documents" && (
        <div className="admin-section-card">
          <h2>Qualifications</h2>
          {teacher.qualifications.length === 0 ? (
            <p className="portal-empty">No qualifications on file.</p>
          ) : (
            <ul style={{ paddingLeft: "1.2rem" }}>
              {teacher.qualifications.map((q, i) => (
                <li key={i}>
                  {q.title}, {q.institution} ({q.year})
                </li>
              ))}
            </ul>
          )}

          <h2 style={{ marginTop: "1.5rem" }}>Documents</h2>
          {teacher.documents.length === 0 ? (
            <p className="portal-empty">No documents uploaded.</p>
          ) : (
            <div className="portal-table-wrap">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>File</th>
                    <th>Uploaded</th>
                    <th>Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {teacher.documents.map((d, i) => (
                    <tr key={i}>
                      <td>{d.type}</td>
                      <td>{d.fileName}</td>
                      <td>{d.uploadedAt}</td>
                      <td>{d.verified ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.75rem" }}>
            Upload is not wired to real storage in this demo (pdf, jpg, png only; max 5MB in the
            real system).
          </p>
        </div>
      )}

      {activeTab === "Activity" && (
        <div className="admin-section-card">
          <h2>Activity</h2>
          <ul style={{ paddingLeft: "1.2rem" }}>
            {[
              ...log,
              ...teacherAuditLog
                .filter((a) => a.teacherId === teacher.id)
                .map((a) => ({ action: a.action, actor: a.actor, timestamp: a.timestamp })),
            ].map((entry, i) => (
              <li key={i} style={{ marginBottom: "0.4rem" }}>
                <strong>{entry.timestamp}</strong> — {entry.action} ({entry.actor})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeacherRecord;
