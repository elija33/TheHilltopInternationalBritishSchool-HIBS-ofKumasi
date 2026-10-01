import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../StudentPortal/StudentPortal.css";
import { currentTerm } from "./mockData";
import { getCurrentTeacher } from "./useCurrentTeacher";
import { fullName, roleBadges } from "../AdminPortal/teacherData";

const BASE_TABS = [
  { to: "home", label: "Home" },
  { to: "classes", label: "My Classes" },
  { to: "attendance", label: "Attendance" },
  { to: "grades", label: "Grades" },
  { to: "syllabus", label: "Syllabus" },
];

const TeacherPortalLayout = () => {
  const navigate = useNavigate();
  const teacher = getCurrentTeacher();
  const badges = roleBadges(teacher);

  // Attendance is a class-teacher-only capability — a subject-only teacher
  // sees Home, My Classes, Grades and Syllabus, with no Attendance tab.
  const isClassTeacher = Boolean(teacher.classTeacherOf);
  const TABS = isClassTeacher
    ? BASE_TABS
    : BASE_TABS.filter((tab) => tab.to !== "attendance");

  return (
    <div className="portal-shell">
      <div className="portal-header">
        <div>
          <h1>{fullName(teacher)}</h1>
          <p>
            {badges.length > 0 ? badges.join(" · ") : "No assignments yet"} &middot;{" "}
            {currentTerm.label}
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

      <Outlet context={{ teacher }} />
    </div>
  );
};

export default TeacherPortalLayout;
