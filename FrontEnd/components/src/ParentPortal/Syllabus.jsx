import React from "react";
import { useOutletContext } from "react-router-dom";

const Syllabus = () => {
  const { child } = useOutletContext();
  const list = child.syllabus || [];

  if (list.length === 0) {
    return (
      <div className="portal-card">
        <p className="portal-empty">No syllabus has been published for {child.name} yet.</p>
      </div>
    );
  }

  return (
    <div>
      {list.map((s) => (
        <div className="portal-card" key={s.subject}>
          <div className="portal-subject-header">
            <h3>{s.subject}</h3>
          </div>
          <p style={{ color: "var(--muted)", margin: "0 0 0.5rem" }}>{s.teacher}</p>

          {s.type === "none" || !s.content ? (
            <p className="portal-empty">No syllabus has been uploaded for {s.subject} yet.</p>
          ) : (
            <>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.75rem" }}>
                Last updated {s.updatedAt}
              </p>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{s.content}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Syllabus;
