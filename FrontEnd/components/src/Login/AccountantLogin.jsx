import React from "react";
import LoginForm from "./LoginForm";
import { accountants } from "../AdminPortal/mockData";
import { setLoggedInAccountantId } from "../AccountantPortal/session";

const AccountantLogin = () => {
  // Recomputed each render so a newly granted accountant is reachable right away.
  const activeAccountants = accountants.filter((a) => a.status === "ACTIVE");

  if (activeAccountants.length === 0) {
    return (
      <div className="login-page container">
        <h2>Accountant Login</h2>
        <p style={{ maxWidth: 420 }}>
          No accountant accounts currently have access. Ask the School Office to create
          one or grant access from the Admin Dashboard&rsquo;s Accountants page.
        </p>
      </div>
    );
  }

  const resolveAccountant = (username) => {
    const match = activeAccountants.find(
      (a) =>
        a.email.toLowerCase() === username.trim().toLowerCase() ||
        a.name.toLowerCase().includes(username.trim().toLowerCase()),
    );
    return (match || activeAccountants[0]).id;
  };

  return (
    <div className="login-page container">
      <h2>Accountant Login</h2>
      <LoginForm
        role="Accountant"
        redirectTo="/portal/accountant/home"
        onBeforeNavigate={(username) => setLoggedInAccountantId(resolveAccountant(username))}
      />
    </div>
  );
};

export default AccountantLogin;
