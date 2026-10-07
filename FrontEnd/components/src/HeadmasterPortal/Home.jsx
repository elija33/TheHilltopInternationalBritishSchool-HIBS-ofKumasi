import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { pendingAccountRequests } from "../AdminPortal/approvals";

const Home = () => {
  const { headmaster } = useOutletContext();
  const byType = (type) => pendingAccountRequests.filter((r) => r.type === type).length;

  return (
    <div>
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-icon blue">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9l10-5 10 5-10 5-10-5z" />
              <path d="M6 11.5V17c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5.5" />
            </svg>
          </span>
          <div>
            <p className="admin-stat-value">{byType("TEACHER")}</p>
            <p className="admin-stat-label">Pending Teachers</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-icon green">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3" />
              <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
            </svg>
          </span>
          <div>
            <p className="admin-stat-value">{byType("STUDENT")}</p>
            <p className="admin-stat-label">Pending Students</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-icon purple">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l9-7 9 7" />
              <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
            </svg>
          </span>
          <div>
            <p className="admin-stat-value">{byType("PARENT")}</p>
            <p className="admin-stat-label">Pending Parents</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-icon orange">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l9 5-9 5-9-5 9-5z" />
              <path d="M3 13l9 5 9-5" />
            </svg>
          </span>
          <div>
            <p className="admin-stat-value">{headmaster.classes.length}</p>
            <p className="admin-stat-label">Classes You Oversee</p>
          </div>
        </div>
      </div>

      <div className="admin-section-card">
        <h2>Welcome, {headmaster.name}</h2>
        <p>
          {pendingAccountRequests.length > 0 ? (
            <>
              {pendingAccountRequests.length} account request
              {pendingAccountRequests.length > 1 ? "s are" : " is"} waiting for your review.{" "}
              <Link to="/portal/headmaster/approvals">Review now &rarr;</Link>
            </>
          ) : (
            "No account requests are waiting right now."
          )}
        </p>
      </div>
    </div>
  );
};

export default Home;
