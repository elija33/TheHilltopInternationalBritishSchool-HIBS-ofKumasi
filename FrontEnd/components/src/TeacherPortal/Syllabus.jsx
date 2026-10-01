import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const SyllabusCard = ({ subject, className }) => {
  const [content, setContent] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setUpdatedAt(new Date().toISOString().split("T")[0]);
    setSaved(true);
  };

  return (
    <form className="portal-card" onSubmit={handleSave}>
      <div className="portal-subject-header">
        <h3>
          {subject} &middot; {className}
        </h3>
        <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
          {updatedAt ? `Last updated ${updatedAt}` : "Not yet uploaded"}
        </span>
      </div>
      <textarea
        rows={5}
        value={content}
        placeholder="What will this class cover this term?"
        onChange={(e) => {
          setContent(e.target.value);
          setSaved(false);
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
      <button type="submit" className="portal-link-btn" style={{ marginTop: "0.75rem" }}>
        Save syllabus
      </button>
      {saved && <p className="portal-success">Saved.</p>}
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
        <SyllabusCard key={`${p.subject}-${p.class}`} subject={p.subject} className={p.class} />
      ))}
    </div>
  );
};

export default Syllabus;
