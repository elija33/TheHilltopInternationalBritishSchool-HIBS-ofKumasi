import React from "react";
import LoginForm from "./LoginForm";

const AdminLogin = () => {
  return (
    <div className="login-page container">
      <h2>Admin Login</h2>
      <LoginForm role="Admin" redirectTo="/portal/admin/home" />
    </div>
  );
};

export default AdminLogin;
