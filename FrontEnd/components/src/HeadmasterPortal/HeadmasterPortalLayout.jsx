import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../StudentPortal/StudentPortal.css";
import "../AdminPortal/AdminPortal.css";
import {
  IconDashboard,
  IconEdit,
  IconLayers,
  IconGraduationCap,
  IconBell,
  IconLogout,
} from "../AdminPortal/icons";
import { getCurrentHeadmaster } from "./useCurrentHeadmaster";
import { pendingAccountRequests } from "../AdminPortal/approvals";

const TABS = [
  { to: "home", label: "Dashboard", Icon: IconDashboard },
  { to: "approvals", label: "Approvals", Icon: IconEdit },
  { to: "my-classes", label: "My Classes", Icon: IconLayers },
  { to: "grades", label: "Grades", Icon: IconGraduationCap },
];

const initials = (name) =>
  name
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const HeadmasterPortalLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const headmaster = getCurrentHeadmaster();
  const currentTab = TABS.find((t) => location.pathname.endsWith(t.to));

  if (!headmaster) {
    return (
      <div className="admin-shell">
        <div
          className="admin-main"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div className="admin-section-card" style={{ maxWidth: 420, margin: "2rem" }}>
            <h2>Access not available</h2>
            <p>
              Either you aren&rsquo;t logged in, or this headmaster account hasn&rsquo;t
              been approved by the School Office yet.
            </p>
            <button className="portal-link-btn" onClick={() => navigate("/login/headmaster")}>
              Go to Headmaster login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">The Hilltop International British School</div>

        <nav className="admin-sidebar-nav">
          {TABS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `admin-sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="admin-sidebar-logout" onClick={() => navigate("/")}>
          <IconLogout />
          Log Out
        </button>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <h1>{currentTab ? currentTab.label : "Dashboard"}</h1>
          <div className="admin-topbar-actions">
            <span className="admin-bell">
              <IconBell />
              {pendingAccountRequests.length > 0 && <span className="admin-bell-dot" />}
            </span>
            <div className="admin-user">
              <span className="admin-user-avatar">{initials(headmaster.name)}</span>
              <span className="admin-user-name">{headmaster.name}</span>
            </div>
            <button className="admin-logout-btn" onClick={() => navigate("/")}>
              Log out
            </button>
          </div>
        </div>

        <div className="admin-content">
          <Outlet context={{ headmaster }} />
        </div>
      </div>
    </div>
  );
};

export default HeadmasterPortalLayout;
