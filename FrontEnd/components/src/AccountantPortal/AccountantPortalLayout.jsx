import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../StudentPortal/StudentPortal.css";
import "../AdminPortal/AdminPortal.css";
import {
  IconDashboard,
  IconCash,
  IconMegaphone,
  IconBell,
  IconLogout,
} from "../AdminPortal/icons";
import { getCurrentAccountant } from "./useCurrentAccountant";

const TABS = [
  { to: "home", label: "Dashboard", Icon: IconDashboard },
  { to: "tuition", label: "Post Tuition", Icon: IconCash },
  { to: "announcements", label: "Announcements", Icon: IconMegaphone },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AccountantPortalLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accountant = getCurrentAccountant();
  const currentTab = TABS.find((t) => location.pathname.endsWith(t.to));

  if (!accountant) {
    return (
      <div className="admin-shell">
        <div
          className="admin-main"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div className="admin-section-card" style={{ maxWidth: 420, margin: "2rem" }}>
            <h2>Access not available</h2>
            <p>
              Either you aren&rsquo;t logged in, or the School Office has revoked your
              accountant access. Contact the School Office if you believe this is a
              mistake.
            </p>
            <button className="portal-link-btn" onClick={() => navigate("/login/accountant")}>
              Go to Accountant login
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
            </span>
            <div className="admin-user">
              <span className="admin-user-avatar">{initials(accountant.name)}</span>
              <span className="admin-user-name">{accountant.name}</span>
            </div>
            <button className="admin-logout-btn" onClick={() => navigate("/")}>
              Log out
            </button>
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountantPortalLayout;
