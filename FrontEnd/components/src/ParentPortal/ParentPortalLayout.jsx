import React from "react";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "../StudentPortal/StudentPortal.css";
import "./ParentPortal.css";
import { parent, children } from "./mockData";
import ChildSwitcher from "./ChildSwitcher";

const TABS = [
  { to: "home", label: "Home" },
  { to: "grades", label: "Grades" },
  { to: "attendance", label: "Attendance" },
];

const ParentPortalLayout = () => {
  const { childId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const child = children.find((c) => c.id === childId);

  const lastSegment = location.pathname.split("/").pop();
  const currentTab = TABS.some((t) => t.to === lastSegment) ? lastSegment : "home";

  if (!child) {
    return (
      <div className="portal-shell">
        <div className="portal-card">
          <h2>Child not found</h2>
          <p>
            This child isn't linked to your account, or the link is out of date.
            Please contact the school office if you believe this is a mistake.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-shell">
      <div className="portal-header">
        <div>
          <h1>{parent.name}</h1>
          <ChildSwitcher children={children} selectedChildId={childId} currentTab={currentTab} />
        </div>
        <button className="portal-logout" onClick={() => navigate("/")}>
          Log out
        </button>
      </div>

      {child.status === "past" && (
        <div className="past-student-banner">
          {child.name} is a past student (left {child.leftDate}). This record is
          read-only.
        </div>
      )}

      <nav className="portal-tabs">
        {TABS.map((tab) => (
          <NavLink key={tab.to} to={`/portal/parent/${childId}/${tab.to}`}>
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* key={childId} forces a full remount on child switch, so no page's
          local UI state (term dropdown, toggles) leaks from one child to the next. */}
      <Outlet key={childId} context={{ child }} />
    </div>
  );
};

export default ParentPortalLayout;
