import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { teacherRecords, fullName, roleBadges } from "../AdminPortal/teacherData";
import { setLoggedInTeacherId } from "../TeacherPortal/session";

const TeacherLogin = () => {
  // Recomputed on every render (not a module-level constant) so a teacher
  // added via the Admin wizard during this session shows up immediately.
  const eligibleTeachers = teacherRecords.filter((t) => t.status !== "INACTIVE");
  const [teacherId, setTeacherId] = useState(eligibleTeachers[0]?.id || "");
  const [firstLogin, setFirstLogin] = useState(false);

  const selected = eligibleTeachers.find((t) => t.id === teacherId);

  return (
    <div className="login-page container">
      <h2>Teacher Login</h2>

      <div className="form-group" style={{ maxWidth: 420, marginBottom: "1rem" }}>
        <label htmlFor="teacher-select">
          Log in as{" "}
          <span style={{ fontWeight: 400, color: "#555f62" }}>
            (demo only — a real login wouldn&rsquo;t ask this)
          </span>
        </label>
        <select
          id="teacher-select"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem 0.75rem",
            borderRadius: "6px",
            border: "1px solid #d7dcd7",
            fontSize: "0.95rem",
          }}
        >
          {eligibleTeachers.map((t) => (
            <option key={t.id} value={t.id}>
              {fullName(t)}
            </option>
          ))}
        </select>
        {selected && (
          <p style={{ fontSize: "0.82rem", color: "#555f62", marginTop: "0.4rem" }}>
            {roleBadges(selected).length > 0
              ? roleBadges(selected).join(" · ")
              : "No assignments yet"}
          </p>
        )}
      </div>

      <LoginForm
        role="Teacher"
        redirectTo={firstLogin ? "/portal/teacher/set-password" : "/portal/teacher/home"}
        onBeforeNavigate={() => setLoggedInTeacherId(teacherId)}
      />

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.85rem",
          color: "#555f62",
          marginTop: "0.75rem",
          maxWidth: 420,
        }}
      >
        <input
          type="checkbox"
          checked={firstLogin}
          onChange={(e) => setFirstLogin(e.target.checked)}
        />
        This is my first time logging in with a temporary password
      </label>
    </div>
  );
};

export default TeacherLogin;
