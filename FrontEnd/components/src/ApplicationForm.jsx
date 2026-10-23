import React, { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import "./ApplicationForm.css";
import { addApplication, nextApplicationId } from "./AdminPortal/applicationsStore";
import { getLoggedInApplicant } from "./applicantSession";

const YEAR_GROUPS = [
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12 (Lower Sixth)",
  "Year 13 (Upper Sixth)",
];

const START_TERMS = ["September Term", "January Term", "April Term"];
const RELATIONSHIPS = ["Mother", "Father", "Guardian"];
const HEARD_OPTIONS = ["Friend / family", "Social media", "Website", "Other"];

const STEPS = [
  { key: "student", label: "Student" },
  { key: "guardian", label: "Parent / Guardian" },
  { key: "documents", label: "Documents" },
  { key: "review", label: "Review & submit" },
];

const NEW_STUDENT_DOCS = [
  { key: "birthCertificate", label: "Birth certificate" },
  { key: "passportPhotos", label: "Passport photographs" },
  { key: "schoolReports", label: "Recent school reports" },
  { key: "healthRecord", label: "Health / immunisation record" },
  { key: "guardianId", label: "Parent / guardian ID" },
];

const TRANSFER_DOCS = [
  ...NEW_STUDENT_DOCS.slice(0, 3),
  { key: "transferLetter", label: "Transfer letter", sub: "Transfer students only" },
  ...NEW_STUDENT_DOCS.slice(3),
];

const EMPTY_STUDENT = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  gender: "",
  applyingFor: "",
  boarding: "",
  preferredStart: "",
  medicalNotes: "",
  howHeard: "",
};

const EMPTY_GUARDIAN = {
  fullName: "",
  relationship: "",
  phone: "",
  email: "",
  address: "",
};

const Field = ({ label, children, optional }) => (
  <div className="af-field">
    <label>
      {label} {optional && <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>}
    </label>
    {children}
  </div>
);

const ApplicationForm = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const isTransfer = type === "transfer";
  const docs = isTransfer ? TRANSFER_DOCS : NEW_STUDENT_DOCS;
  const applicant = getLoggedInApplicant();

  const [stepIndex, setStepIndex] = useState(0);
  const [student, setStudent] = useState(EMPTY_STUDENT);
  const [guardian, setGuardian] = useState(() =>
    applicant
      ? {
          ...EMPTY_GUARDIAN,
          fullName: [applicant.firstName, applicant.lastName].filter(Boolean).join(" "),
          relationship: applicant.relationship || "",
          phone: applicant.phone || "",
          email: applicant.email || "",
        }
      : EMPTY_GUARDIAN,
  );
  const [documents, setDocuments] = useState({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(null);

  if (!applicant) {
    return <Navigate to={`/apply/account/${type}`} replace />;
  }

  const step = STEPS[stepIndex];

  const updateStudent = (key, value) => setStudent((s) => ({ ...s, [key]: value }));
  const updateGuardian = (key, value) => setGuardian((g) => ({ ...g, [key]: value }));

  const validateStep = () => {
    if (step.key === "student") {
      if (!student.firstName.trim() || !student.lastName.trim() || !student.dateOfBirth) {
        return "First name, last name and date of birth are required.";
      }
      if (!student.applyingFor) return "Select the year group the student is applying for.";
    }
    if (step.key === "guardian") {
      if (!guardian.fullName.trim() || !guardian.phone.trim()) {
        return "Guardian name and phone number are required.";
      }
    }
    return "";
  };

  const goNext = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError("");
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const handleFile = (key, file) => {
    setDocuments((d) => ({ ...d, [key]: file ? file.name : null }));
  };

  const handleSubmit = () => {
    const id = nextApplicationId();
    addApplication({
      id,
      type: isTransfer ? "Transfer Student" : "New Student",
      student,
      guardian,
      documents,
      submittedAt: new Date().toISOString().split("T")[0],
      status: "NEW",
    });
    setSubmitted(id);
  };

  if (submitted) {
    return (
      <div className="af-wrap">
        <div className="af-success-wrap">
          <div className="af-success-icon">✓</div>
          <h2>Application received</h2>
          <p>
            Thank you for applying to HIBS. Our admissions team will review{" "}
            {student.firstName || "your child"}&rsquo;s application and be in touch within
            3 working days.
          </p>
          <p>
            Reference: <span className="af-success-ref">{submitted}</span>
          </p>
          <button className="af-btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => navigate("/")}>
            Back to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="af-wrap">
      <div className="af-grid">
        <aside className="af-sidebar">
          <p className="af-sidebar-eyebrow">{isTransfer ? "Transfer Student" : "New Student"}</p>
          <h2>Application Form</h2>
          <p className="af-sidebar-time">Takes about 5 minutes</p>

          <div className="af-steps-list">
            {STEPS.map((s, i) => (
              <div
                key={s.key}
                className={`af-step-item ${i === stepIndex ? "active" : ""} ${i < stepIndex ? "done" : ""}`}
              >
                <span className="af-step-badge">{i < stepIndex ? "✓" : i + 1}</span>
                {s.label}
              </div>
            ))}
          </div>

          <div className="af-sidebar-help">
            Need help? Call <a href="tel:+233322299229">+233 32 229 9229</a> or{" "}
            <a href="https://wa.me/233322299229" target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
            .
          </div>
        </aside>

        <div className="af-panel">
          <div className="af-progress-track">
            <div
              className="af-progress-fill"
              style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <p className="af-step-label">
            Step {stepIndex + 1} of {STEPS.length}
          </p>

          {step.key === "student" && (
            <>
              <h2>Tell us about the student</h2>
              <p className="af-panel-subtitle">
                Enter details exactly as they appear on the birth certificate.
              </p>

              <div className="af-row" style={{ "--af-cols": 3 }}>
                <Field label="First name">
                  <input
                    type="text"
                    value={student.firstName}
                    onChange={(e) => updateStudent("firstName", e.target.value)}
                  />
                </Field>
                <Field label="Middle name" optional>
                  <input
                    type="text"
                    value={student.middleName}
                    onChange={(e) => updateStudent("middleName", e.target.value)}
                  />
                </Field>
                <Field label="Last name">
                  <input
                    type="text"
                    value={student.lastName}
                    onChange={(e) => updateStudent("lastName", e.target.value)}
                  />
                </Field>
              </div>

              <div className="af-row">
                <Field label="Date of birth">
                  <input
                    type="date"
                    value={student.dateOfBirth}
                    onChange={(e) => updateStudent("dateOfBirth", e.target.value)}
                  />
                </Field>
                <Field label="Nationality">
                  <input
                    type="text"
                    placeholder="e.g. Ghanaian"
                    value={student.nationality}
                    onChange={(e) => updateStudent("nationality", e.target.value)}
                  />
                </Field>
              </div>

              <div className="af-field" style={{ marginBottom: "1.25rem" }}>
                <label>Gender</label>
                <div className="af-toggle-group">
                  {["Male", "Female"].map((g) => (
                    <button
                      type="button"
                      key={g}
                      className={`af-toggle-btn ${student.gender === g ? "active" : ""}`}
                      onClick={() => updateStudent("gender", g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="af-row">
                <Field label="Applying for">
                  <select
                    value={student.applyingFor}
                    onChange={(e) => updateStudent("applyingFor", e.target.value)}
                  >
                    <option value="">Select year group</option>
                    {YEAR_GROUPS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Boarding">
                  <select
                    value={student.boarding}
                    onChange={(e) => updateStudent("boarding", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Day student">Day student</option>
                    <option value="Boarding">Boarding</option>
                  </select>
                </Field>
              </div>

              <div className="af-row" style={{ "--af-cols": 1 }}>
                <Field label="Preferred start">
                  <select
                    value={student.preferredStart}
                    onChange={(e) => updateStudent("preferredStart", e.target.value)}
                  >
                    <option value="">Select</option>
                    {START_TERMS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="af-section-divider">A little more about your child</div>

              <div className="af-row" style={{ "--af-cols": 1 }}>
                <Field label="Medical, allergy or learning support needs" optional>
                  <textarea
                    rows={3}
                    placeholder="Anything that helps us care for and support your child well"
                    value={student.medicalNotes}
                    onChange={(e) => updateStudent("medicalNotes", e.target.value)}
                  />
                </Field>
              </div>

              <div className="af-field">
                <label>
                  How did you hear about HIBS?{" "}
                  <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span>
                </label>
                <div className="af-toggle-group" style={{ "--af-toggle-cols": 4 }}>
                  {HEARD_OPTIONS.map((h) => (
                    <button
                      type="button"
                      key={h}
                      className={`af-toggle-btn ${student.howHeard === h ? "active" : ""}`}
                      onClick={() => updateStudent("howHeard", h)}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step.key === "guardian" && (
            <>
              <h2>Parent / guardian details</h2>
              <p className="af-panel-subtitle">
                We&rsquo;ll use this to contact you about the application.
              </p>

              <div className="af-row" style={{ "--af-cols": 1 }}>
                <Field label="Full name">
                  <input
                    type="text"
                    value={guardian.fullName}
                    onChange={(e) => updateGuardian("fullName", e.target.value)}
                  />
                </Field>
              </div>

              <div className="af-row">
                <Field label="Relationship to student">
                  <select
                    value={guardian.relationship}
                    onChange={(e) => updateGuardian("relationship", e.target.value)}
                  >
                    <option value="">Select</option>
                    {RELATIONSHIPS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    placeholder="024 123 4567"
                    value={guardian.phone}
                    onChange={(e) => updateGuardian("phone", e.target.value)}
                  />
                </Field>
              </div>

              <div className="af-row" style={{ "--af-cols": 1 }}>
                <Field label="Email" optional>
                  <input
                    type="email"
                    value={guardian.email}
                    onChange={(e) => updateGuardian("email", e.target.value)}
                  />
                </Field>
              </div>

              <div className="af-row" style={{ "--af-cols": 1 }}>
                <Field label="Home address" optional>
                  <textarea
                    rows={3}
                    value={guardian.address}
                    onChange={(e) => updateGuardian("address", e.target.value)}
                  />
                </Field>
              </div>
            </>
          )}

          {step.key === "documents" && (
            <>
              <h2>Upload documents</h2>
              <p className="af-panel-subtitle">
                Optional for now — you can also bring these on your campus visit.
              </p>

              {docs.map((d) => (
                <div className="af-doc-row" key={d.key}>
                  <div>
                    <span className="label">{d.label}</span>
                    {d.sub && <span className="sub">{d.sub}</span>}
                  </div>
                  {documents[d.key] ? (
                    <span className="file-name">✓ {documents[d.key]}</span>
                  ) : (
                    <input type="file" onChange={(e) => handleFile(d.key, e.target.files?.[0])} />
                  )}
                </div>
              ))}
            </>
          )}

          {step.key === "review" && (
            <>
              <h2>Review &amp; submit</h2>
              <p className="af-panel-subtitle">Check everything below before you submit.</p>

              <div className="af-review-section">
                <h3>Student</h3>
                <div className="af-review-grid">
                  <div className="af-review-item">
                    <p className="k">Name</p>
                    <p className="v">
                      {[student.firstName, student.middleName, student.lastName]
                        .filter(Boolean)
                        .join(" ") || "—"}
                    </p>
                  </div>
                  <div className="af-review-item">
                    <p className="k">Date of birth</p>
                    <p className="v">{student.dateOfBirth || "—"}</p>
                  </div>
                  <div className="af-review-item">
                    <p className="k">Applying for</p>
                    <p className="v">{student.applyingFor || "—"}</p>
                  </div>
                  <div className="af-review-item">
                    <p className="k">Boarding</p>
                    <p className="v">{student.boarding || "—"}</p>
                  </div>
                </div>
              </div>

              <div className="af-review-section">
                <h3>Parent / Guardian</h3>
                <div className="af-review-grid">
                  <div className="af-review-item">
                    <p className="k">Name</p>
                    <p className="v">{guardian.fullName || "—"}</p>
                  </div>
                  <div className="af-review-item">
                    <p className="k">Phone</p>
                    <p className="v">{guardian.phone || "—"}</p>
                  </div>
                </div>
              </div>

              <div className="af-review-section">
                <h3>Documents</h3>
                <div className="af-review-grid">
                  {docs.map((d) => (
                    <div className="af-review-item" key={d.key}>
                      <p className="k">{d.label}</p>
                      <p className="v">{documents[d.key] || "Not attached yet"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {error && <p className="af-error">{error}</p>}

          <div className="af-actions">
            {stepIndex > 0 ? (
              <button type="button" className="af-btn-secondary" onClick={goBack}>
                &larr; Back
              </button>
            ) : (
              <span />
            )}
            {step.key === "review" ? (
              <button type="button" className="af-btn-primary" onClick={handleSubmit}>
                Submit application
              </button>
            ) : (
              <button type="button" className="af-btn-primary" onClick={goNext}>
                Continue &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
