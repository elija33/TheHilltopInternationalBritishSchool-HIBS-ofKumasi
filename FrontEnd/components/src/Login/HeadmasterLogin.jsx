import React from "react";
import LoginForm from "./LoginForm";
import { headmasters } from "../AdminPortal/mockData";
import { setLoggedInHeadmasterId } from "../HeadmasterPortal/session";

const HeadmasterLogin = () => {
  // Recomputed each render so a newly admin-approved headmaster is reachable
  // right away.
  if (headmasters.length === 0) {
    return (
      <div className="login-page container">
        <h2>Headmaster Login</h2>
        <p style={{ maxWidth: 420 }}>
          No headmaster accounts have been approved yet. A sub admin can submit a
          headmaster request, and the School Office can approve it from the Admin
          Dashboard.
        </p>
      </div>
    );
  }

  const resolveHeadmaster = (username) => {
    const match = headmasters.find(
      (hm) =>
        hm.email.toLowerCase() === username.trim().toLowerCase() ||
        hm.name.toLowerCase().includes(username.trim().toLowerCase()),
    );
    return (match || headmasters[0]).id;
  };

  return (
    <div className="login-page container">
      <h2>Headmaster Login</h2>
      <LoginForm
        role="Headmaster"
        redirectTo="/portal/headmaster/home"
        onBeforeNavigate={(username) => setLoggedInHeadmasterId(resolveHeadmaster(username))}
      />
    </div>
  );
};

export default HeadmasterLogin;
