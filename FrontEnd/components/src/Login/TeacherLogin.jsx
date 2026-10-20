import React from "react";
import LoginForm from "./LoginForm";
import { teacherRecords } from "../AdminPortal/teacherData";
import { setLoggedInTeacherId } from "../TeacherPortal/session";

const TeacherLogin = () => {
  const resolveTeacher = (username) => {
    // Recomputed per login attempt (not a module-level constant) so a
    // teacher added via the Admin wizard during this session is reachable
    // right away.
    const eligibleTeachers = teacherRecords.filter((t) => t.status !== "INACTIVE");
    const match = eligibleTeachers.find(
      (t) =>
        t.email.toLowerCase() === username.trim().toLowerCase() ||
        `${t.firstName} ${t.lastName}`.toLowerCase().includes(username.trim().toLowerCase()),
    );
    return (match || eligibleTeachers[0])?.id;
  };

  return (
    <div className="login-page container">
      <h2>Teacher Login</h2>

      <LoginForm
        role="Teacher"
        redirectTo="/portal/teacher/home"
        onBeforeNavigate={(username) => setLoggedInTeacherId(resolveTeacher(username))}
      />
    </div>
  );
};

export default TeacherLogin;
