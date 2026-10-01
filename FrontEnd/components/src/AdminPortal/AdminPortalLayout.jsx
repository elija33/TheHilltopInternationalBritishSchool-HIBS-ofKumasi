import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../StudentPortal/StudentPortal.css";
import "./AdminPortal.css";
import { admin } from "./mockData";
import {
  IconDashboard,
  IconPeople,
  IconGraduationCap,
  IconHome,
  IconEdit,
  IconUpload,
  IconMegaphone,
  IconGear,
  IconBell,
  IconLogout,
} from "./icons";

const TABS = [
  { to: "home", label: "Dashboard", Icon: IconDashboard },
  { to: "students", label: "Students", Icon: IconPeople },
  { to: "teachers", label: "Teachers", Icon: IconGraduationCap },
  { to: "parents", label: "Parents", Icon: IconHome },
  { to: "corrections", label: "Grade Corrections", Icon: IconEdit },
  { to: "publishing", label: "Publishing", Icon: IconUpload },
  { to: "announcements", label: "Announcements", Icon: IconMegaphone },
  { to: "settings", label: "Settings", Icon: IconGear },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AdminPortalLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = TABS.find((t) => location.pathname.endsWith(t.to));

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
              <span className="admin-bell-dot" />
            </span>
            <div className="admin-user">
              <span className="admin-user-avatar">{initials(admin.name)}</span>
              <span className="admin-user-name">{admin.name}</span>
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

export default AdminPortalLayout;
