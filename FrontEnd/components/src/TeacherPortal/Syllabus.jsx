import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fullName } from "../AdminPortal/teacherData";
import { syllabusSubmissions, nextSyllabusSubmissionId } from "../AdminPortal/syllabusSubmissions";

const STATUS_LABEL = {
  PENDING: "Awaiting headmaster approval.",
  APPROVED: "Approved — now visible to these students and their parents.",
  REJECTED: "Sent back by your headmaster — resubmit once corrected.",
};

const SyllabusCard = ({ subject, className, teacher }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [, forceRender] = useState(0);

  // Most recent submission for this exact subject+class — a rejected one
  // can always be superseded by submitting again, but one still awaiting a
  // decision blocks a second from piling up behind it.
  const submissionsForPair = syllabusSubmissions.filter(
    (s) => s.class === className && s.subject === subject,
  );
  const latest = submissionsForPair[submissionsForPair.length - 1];
  const blockedByPending = Boolean(latest && latest.status === "PENDING");

  const handleSave = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Enter what this class will cover before submitting.");
      return;
    }
    setError("");
    syllabusSubmissions.push({
      id: nextSyllabusSubmissionId(),
      class: className,
      subject,
      teacherId: teacher.id,
      teacherName: fullName(teacher),
      content: content.trim(),
      submittedAt: new Date().toISOString().split("T")[0],
      status: "PENDING",
      decidedBy: null,
      decidedAt: null,
      rejectionNote: null,
    });
    forceRender((n) => n + 1);
  };

  return (
    <form className="portal-card" onSubmit={handleSave}>
      <div className="portal-subject-header">
        <h3>
          {subject} &middot; {className}
        </h3>
        <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
          {latest && latest.status === "APPROVED" ? `Approved ${latest.decidedAt}` : "Not yet published"}
        </span>
      </div>

      {latest && (
        <p className={latest.status === "REJECTED" ? "portal-notice" : "portal-success"}>
          {STATUS_LABEL[latest.status]}
          {latest.status === "REJECTED" && latest.rejectionNote && ` — "${latest.rejectionNote}"`}
        </p>
      )}

      <textarea
        rows={5}
        value={content}
        placeholder="What will this class cover this term?"
        disabled={blockedByPending}
        onChange={(e) => {
          setContent(e.target.value);
          setError("");
        }}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "6px",
          border: "1px solid #d7dcd7",
          fontFamily: "inherit",
          fontSize: "0.92rem",
          boxSizing: "border-box",
        }}
      />
      {error && <p className="portal-notice">{error}</p>}

      <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: "0.5rem 0 0" }}>
        Submitting sends this to your headmaster for approval. Once submitted it can&rsquo;t
        be changed — if something needs fixing, your headmaster can send it back to you to
        resubmit.
      </p>

      <button type="submit" className="portal-link-btn" style={{ marginTop: "0.75rem" }} disabled={blockedByPending}>
        {blockedByPending ? "Awaiting approval" : "Save syllabus"}
      </button>
    </form>
  );
};

const Syllabus = () => {
  const { teacher } = useOutletContext();
  const pairs = teacher.subjectAssignments.flatMap((a) =>
    a.classes.map((c) => ({ subject: a.subject, class: c })),
  );

  if (pairs.length === 0) {
    return (
      <div className="portal-card">
        <p className="portal-empty">
          Syllabus management applies to a subject teacher&rsquo;s own subject + class
          pairs, and you don&rsquo;t currently have any.
        </p>
      </div>
    );
  }

  return (
    <div>
      {pairs.map((p) => (
        <SyllabusCard key={`${p.subject}-${p.class}`} subject={p.subject} className={p.class} teacher={teacher} />
      ))}
    </div>
  );
};

export default Syllabus;
