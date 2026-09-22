import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ParentPortal.css";

const ChildSwitcher = ({ children: kids, selectedChildId, currentTab }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = kids.find((c) => c.id === selectedChildId);
  const active = kids.filter((c) => c.status === "active");
  const past = kids.filter((c) => c.status === "past");

  const goToChild = (childId) => {
    setOpen(false);
    // Switching a child reloads the SAME tab for the new child, not home.
    navigate(`/portal/parent/${childId}/${currentTab}`);
  };

  if (!selected) return null;

  // A parent with only one child still sees the name, but the switcher
  // doesn't need to open — there's nothing else to switch to.
  if (kids.length <= 1) {
    return (
      <div className="child-switcher">
        <div className="child-switcher-trigger static">
          {selected.name} &middot; {selected.class}
        </div>
      </div>
    );
  }

  return (
    <div className="child-switcher" ref={rootRef}>
      <button className="child-switcher-trigger" onClick={() => setOpen((v) => !v)}>
        {selected.name} &middot; {selected.status === "past" ? "Past student" : selected.class}
        <span className="chevron">&#9662;</span>
      </button>

      {open && (
        <div className="child-switcher-menu">
          {active.length > 0 && <div className="child-switcher-group-label">Children</div>}
          {active.map((c) => (
            <button
              key={c.id}
              className={`child-switcher-item ${c.id === selectedChildId ? "selected" : ""}`}
              onClick={() => goToChild(c.id)}
            >
              <span className="name-block">
                <span className="name">{c.name}</span>
                <span className="meta">{c.class}</span>
              </span>
              {c.feeBalance > 0 && <span className="balance-dot" title="Outstanding balance" />}
            </button>
          ))}

          {past.length > 0 && (
            <>
              <div className="child-switcher-group-label">Past students</div>
              {past.map((c) => (
                <button
                  key={c.id}
                  className={`child-switcher-item past ${c.id === selectedChildId ? "selected" : ""}`}
                  onClick={() => goToChild(c.id)}
                >
                  <span className="name-block">
                    <span className="name">{c.name}</span>
                    <span className="meta">Left {c.leftDate}</span>
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChildSwitcher;
