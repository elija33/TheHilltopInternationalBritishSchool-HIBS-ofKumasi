import React, { useState } from "react";
import { syllabus } from "./mockData";

const DocumentLink = ({ subject }) => {
  const [state, setState] = useState("idle");
  const [refreshing, setRefreshing] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    if (subject.expired && state !== "refreshed") {
      setRefreshing(true);
      // Simulates fetching a fresh signed URL instead of showing a broken file.
      setTimeout(() => {
        setRefreshing(false);
        setState("refreshed");
      }, 900);
      return;
    }
    window.alert(`Opening ${subject.subject} syllabus (demo link).`);
  };

  if (refreshing) {
    return (
      <button className="portal-link-btn" disabled>
        Link expired — fetching a new one…
      </button>
    );
  }

  return (
    <button className="portal-link-btn" onClick={handleOpen}>
      Open document
    </button>
  );
};

const Syllabus = () => {
  return (
    <div>
      {syllabus.map((s) => (
        <div className="portal-card" key={s.subject}>
          <div className="portal-subject-header">
            <h3>{s.subject}</h3>
          </div>
          <p style={{ color: "var(--muted)", margin: "0 0 0.5rem" }}>{s.teacher}</p>

          {s.type === "none" ? (
            <p className="portal-empty">
              No syllabus has been uploaded for {s.subject} yet.
            </p>
          ) : (
            <>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.75rem" }}>
                Last updated {s.updatedAt}
              </p>
              {s.type === "document" ? (
                <DocumentLink subject={s} />
              ) : (
                <p style={{ margin: 0, lineHeight: 1.7 }}>{s.content}</p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Syllabus;
