import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./StudentPortal.css";
import { student, currentTerm } from "./mockData";

const TABS = [
  { to: "home", label: "Home" },
  { to: "grades", label: "My Grades" },
  { to: "attendance", label: "My Attendance" },
  { to: "syllabus", label: "Syllabus" },
  { to: "profile", label: "Profile" },
];

const StudentPortalLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="portal-shell">
      <div className="portal-header">
        <div>
          <h1>{student.name}</h1>
          <p>
            {student.currentClass} &middot; {currentTerm.label}
          </p>
        </div>
        <button className="portal-logout" onClick={() => navigate("/")}>
          Log out
        </button>
      </div>

      <nav className="portal-tabs">
        {TABS.map((tab) => (
          <NavLink key={tab.to} to={tab.to}>
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
};

export default StudentPortalLayout;
