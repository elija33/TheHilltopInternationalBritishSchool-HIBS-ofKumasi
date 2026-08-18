import React from "react";
import LoginForm from "./LoginForm";

const TeacherLogin = () => {
  return (
    <div className="login-page container">
      <h2>Teacher Login</h2>
      <LoginForm role="Teacher" />
    </div>
  );
};

export default TeacherLogin;
