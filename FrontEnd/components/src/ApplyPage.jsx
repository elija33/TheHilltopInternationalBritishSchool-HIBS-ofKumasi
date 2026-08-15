import React from "react";
import "./ApplicationModal.css";

const ApplyPage = ({ onClose }) => {
  return (
    <div className="apply-page">
      <div className="apply-panel">
        <button className="apply-back" onClick={onClose}>
          &larr; Back
        </button>
        <h4 className="app-modal-sub">FORGE YOUR OWN PATH</h4>
        <h1 className="apply-title">Submit your HIBS application</h1>
        <p className="app-modal-desc">
          The world constantly changing. Be part of it. We are ready to prepare
          you for an ever-evolving life and want to support you as you discover
          and build your own unstoppable momentum.
        </p>

        <div className="app-options" style={{ marginTop: 24 }}>
          <button className="app-option">
            First-year <span className="arrow">→</span>
          </button>
          <button className="app-option">
            Transfer <span className="arrow">→</span>
          </button>
          <button className="app-option">
            Graduate <span className="arrow">→</span>
          </button>
          <button className="app-option">
            International <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
