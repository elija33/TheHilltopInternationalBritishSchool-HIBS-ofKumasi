import React from "react";
import "./ApplicationModal.css";

const ApplicationModal = ({ onClose, onOpenApply }) => {
  return (
    <div className="app-modal-overlay" onClick={onClose}>
      <div className="app-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="app-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="app-modal-inner">
          <h4 className="app-modal-sub">FORGE YOUR OWN PATH</h4>
          <h2 className="app-modal-title">Submit your HIBS application</h2>
          <p className="app-modal-desc">
            Be part of it. We are ready to prepare you for an ever-evolving life
            and want to support you as you discover and build your own
            unstoppable momentum.
          </p>

          <div className="app-options">
            <button
              className="app-option"
              onClick={() => {
                onClose();
                onOpenApply && onOpenApply();
              }}
            >
              First-year <span className="arrow">→</span>
            </button>
            <button
              className="app-option"
              onClick={() => {
                onClose();
                onOpenApply && onOpenApply();
              }}
            >
              Transfer <span className="arrow">→</span>
            </button>
            <button
              className="app-option"
              onClick={() => {
                onClose();
                onOpenApply && onOpenApply();
              }}
            >
              Graduate <span className="arrow">→</span>
            </button>
            <button
              className="app-option"
              onClick={() => {
                onClose();
                onOpenApply && onOpenApply();
              }}
            >
              International <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
