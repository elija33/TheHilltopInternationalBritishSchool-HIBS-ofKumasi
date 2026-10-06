import React from "react";
import LoginForm from "./LoginForm";
import { subAdmins } from "../AdminPortal/mockData";
import { setLoggedInSubAdminId } from "../SubAdminPortal/session";

const SubAdminLogin = () => {
  // Recomputed each render so a newly granted sub admin is reachable right away.
  const activeSubAdmins = subAdmins.filter((sa) => sa.status === "ACTIVE");

  if (activeSubAdmins.length === 0) {
    return (
      <div className="login-page container">
        <h2>Sub Admin Login</h2>
        <p style={{ maxWidth: 420 }}>
          No sub admin accounts currently have access. Ask the School Office to create one
          or grant access from the Admin Dashboard&rsquo;s Sub Admin page.
        </p>
      </div>
    );
  }

  const resolveSubAdmin = (username) => {
    const match = activeSubAdmins.find(
      (sa) =>
        sa.email.toLowerCase() === username.trim().toLowerCase() ||
        sa.name.toLowerCase().includes(username.trim().toLowerCase()),
    );
    return (match || activeSubAdmins[0]).id;
  };

  return (
    <div className="login-page container">
      <h2>Sub Admin Login</h2>
      <LoginForm
        role="Sub Admin"
        redirectTo="/portal/subadmin/home"
        onBeforeNavigate={(username) => setLoggedInSubAdminId(resolveSubAdmin(username))}
      />
    </div>
  );
};

export default SubAdminLogin;
