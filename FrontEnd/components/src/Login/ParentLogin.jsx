import React from "react";
import LoginForm from "./LoginForm";

const ParentLogin = () => {
  return (
    <div className="login-page container">
      <h2>Parent / Guardian Login</h2>
      <LoginForm role="Parent" />
    </div>
  );
};

export default ParentLogin;
