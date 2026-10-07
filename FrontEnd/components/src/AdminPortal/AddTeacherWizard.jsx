import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  teacherRecords,
  teacherAuditLog,
  CLASS_LIST,
  SUBJECT_LIST,
  assignmentAvailability,
  nextStaffId,
  generateTempPassword,
} from "./teacherData";
import { pendingAccountRequests } from "./approvals";

const EMPTY_SUBJECT_ROW = () => ({ subject: SUBJECT_LIST[0], classes: [] });

const AddTeacherWizard = ({ basePath = "/portal/admin", requiresApproval = false, requestedBy = "Sub Admin" }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("Mr.");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [staffId, setStaffId] = useState(nextStaffId());
  const [employmentType, setEmploymentType] = useState("FULL_TIME");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [isClassTeacher, setIsClassTeacher] = useState(false);
  const [classTeacherOf, setClassTeacherOf] = useState("");
  const [isSubjectTeacher, setIsSubjectTeacher] = useState(false);
  const [subjectRows, setSubjectRows] = useState([EMPTY_SUBJECT_ROW()]);

  const [error, setError] = useState(null);
  const [tempPassword, setTempPassword] = useState(null);
  const [copied, setCopied] = useState(false);
  const [emailed, setEmailed] = useState(false);

  const availability = assignmentAvailability();

  const toggleRowClass = (index, className) => {
    setSubjectRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;
        const has = row.classes.includes(className);
        return {
          ...row,
          classes: has ? row.classes.filter((c) => c !== className) : [...row.classes, className],
        };
      }),
    );
  };

  const goToStep2 = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError("First name, last name and email are required.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const goToStep3 = (e) => {
    e.preventDefault();
    if (!isClassTeacher && !isSubjectTeacher) {
      setError("Choose at least one role (class teacher, subject teacher, or both) to continue.");
      return;
    }
    if (isClassTeacher && !classTeacherOf) {
      setError("Pick which class this teacher will be class teacher of.");
      return;
    }
    if (isSubjectTeacher && subjectRows.every((r) => r.classes.length === 0)) {
      setError("Add at least one class for the subject(s) this teacher will teach.");
      return;
    }
    setError(null);
    setStep(3);
  };

  const createAccount = () => {
    const classTeacherOfValue = isClassTeacher ? classTeacherOf : null;
    const subjectAssignmentsValue = isSubjectTeacher
      ? subjectRows.filter((r) => r.classes.length > 0)
      : [];

    if (requiresApproval) {
      pendingAccountRequests.push({
        id: `paq-${Date.now()}`,
        type: "TEACHER",
        proposedData: {
          title,
          firstName,
          lastName,
          email,
          phone,
          employmentType,
          startDate,
          classTeacherOf: classTeacherOfValue,
          subjectAssignments: subjectAssignmentsValue,
        },
        requestedBy,
        requestedAt: new Date().toISOString().split("T")[0],
      });
      setStep(4);
      return;
    }

    const newTeacher = {
      id: `t-${Date.now()}`,
      staffId,
      title,
      firstName,
      lastName,
      email,
      phone,
      address: "",
      emergencyContact: "",
      photoUrl: null,
      employmentType,
      status: "ACTIVE",
      startDate,
      endDate: null,
      gesRegistrationNo: null,
      classTeacherOf: classTeacherOfValue,
      subjectAssignments: subjectAssignmentsValue,
      qualifications: [],
      documents: [],
    };

    teacherRecords.push(newTeacher);
    teacherAuditLog.push({
      id: `al-${Date.now()}`,
      teacherId: newTeacher.id,
      action: "Account created",
      actor: "School Office",
      timestamp: new Date().toISOString().split("T")[0],
    });

    setTempPassword(generateTempPassword());
    setStep(4);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tempPassword);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <Link to={`${basePath}/teachers`} style={{ fontSize: "0.85rem" }}>
        &larr; Back to teachers
      </Link>

      <div className="admin-section-card" style={{ marginTop: "0.75rem" }}>
        <h2>Add teacher — Step {step} of 4</h2>

        {error && <p className="portal-notice">{error}</p>}

        {step === 1 && (
          <form onSubmit={goToStep2}>
            <div className="portal-field">
              <label>Title</label>
              <select className="portal-select" value={title} onChange={(e) => setTitle(e.target.value)}>
                {["Mr.", "Mrs.", "Ms.", "Mme.", "Madam", "Dr."].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="portal-field">
              <label>First name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="portal-field">
              <label>Last name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="portal-field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="portal-field">
              <label>
                Phone <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
              </label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button type="submit" className="portal-link-btn">
              Next: Employment &amp; role
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={goToStep3}>
            {requiresApproval ? (
              <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                A staff ID will be assigned automatically once this teacher is approved.
              </p>
            ) : (
              <div className="portal-field">
                <label>Staff ID</label>
                <input value={staffId} onChange={(e) => setStaffId(e.target.value)} />
              </div>
            )}
            <div className="portal-field">
              <label>Employment type</label>
              <select
                className="portal-select"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
            <div className="portal-field">
              <label>Start date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="portal-field">
              <label>
                <input
                  type="checkbox"
                  checked={isClassTeacher}
                  onChange={(e) => setIsClassTeacher(e.target.checked)}
                />{" "}
                Class teacher
              </label>
              {isClassTeacher && (
                <select
                  className="portal-select"
                  value={classTeacherOf}
                  onChange={(e) => setClassTeacherOf(e.target.value)}
                  style={{ marginTop: "0.5rem" }}
                >
                  <option value="">Select a class</option>
                  {CLASS_LIST.map((c) => (
                    <option key={c} value={c} disabled={availability.isClassTaken(c)}>
                      {c}
                      {availability.isClassTaken(c) ? " (already assigned)" : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="portal-field">
              <label>
                <input
                  type="checkbox"
                  checked={isSubjectTeacher}
                  onChange={(e) => setIsSubjectTeacher(e.target.checked)}
                />{" "}
                Subject teacher
              </label>
              {isSubjectTeacher &&
                subjectRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #eef1ee",
                      borderRadius: "8px",
                      padding: "0.9rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <select
                      className="portal-select"
                      value={row.subject}
                      onChange={(e) =>
                        setSubjectRows((prev) =>
                          prev.map((r, idx) => (idx === i ? { ...r, subject: e.target.value } : r)),
                        )
                      }
                    >
                      {SUBJECT_LIST.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
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
                ))}
              {isSubjectTeacher && (
                <button
                  type="button"
                  className="portal-link-btn"
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => setSubjectRows((prev) => [...prev, EMPTY_SUBJECT_ROW()])}
                >
                  + Add another subject
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
              <button type="button" className="portal-link-btn" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className="portal-link-btn">
                Next: Review
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div>
            <h3>Basic details</h3>
            <p>
              {title} {firstName} {lastName} &middot; {email} &middot; {phone || "—"}
            </p>

            <h3>Employment</h3>
            <p>
              {!requiresApproval && <>{staffId} &middot; </>}
              {employmentType.replace("_", "-")} &middot; Starts {startDate}
            </p>

            <h3>Roles</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {isClassTeacher && (
                <span className="portal-badge status-not_assessed">
                  Class teacher &middot; {classTeacherOf}
                </span>
              )}
              {isSubjectTeacher &&
                subjectRows
                  .filter((r) => r.classes.length > 0)
                  .map((r) => (
                    <span key={r.subject} className="portal-badge status-not_assessed">
                      {r.subject} &middot; {r.classes.join(", ")}
                    </span>
                  ))}
            </div>

            <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.25rem" }}>
              <button className="portal-link-btn" onClick={() => setStep(2)}>
                Back
              </button>
              <button className="portal-link-btn" onClick={createAccount}>
                {requiresApproval ? "Submit for approval" : "Create account"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            {requiresApproval ? (
              <p className="portal-success">
                Submitted — {title} {firstName} {lastName} is now waiting on headmaster
                approval. They&rsquo;ll be able to log in once approved.
              </p>
            ) : (
              <>
                <p className="portal-success">
                  Account created for {title} {firstName} {lastName} ({staffId}).
                </p>
                <p className="portal-notice">
                  Temporary password (shown once — not retrievable later):{" "}
                  <strong>{tempPassword}</strong>
                  <br />
                  Expires in 72 hours. The teacher must set a new password on first login.
                </p>
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem" }}>
                  <button className="portal-link-btn" onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button className="portal-link-btn" onClick={() => setEmailed(true)}>
                    {emailed ? "Emailed" : "Email to teacher"}
                  </button>
                </div>
              </>
            )}
            <button className="portal-link-btn" onClick={() => navigate(`${basePath}/teachers`)}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTeacherWizard;
