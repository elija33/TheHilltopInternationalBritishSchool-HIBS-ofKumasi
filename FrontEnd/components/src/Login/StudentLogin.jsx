import React from "react";
import LoginForm from "./LoginForm";

const StudentLogin = () => {
  return (
    <div className="login-page container">
      <h2>Student Login</h2>
      <LoginForm role="Student" />
    </div>
  );
};

export default StudentLogin;
