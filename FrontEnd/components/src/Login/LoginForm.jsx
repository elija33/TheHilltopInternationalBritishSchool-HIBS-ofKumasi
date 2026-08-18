import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ role = "User" }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder behaviour: in real app, call API and handle auth
    console.log("Login attempt", { role, username });
    // For now, navigate to root or a dashboard placeholder
    navigate("/");
  };

  const title = `Log Into The Hilltop ${role} Portal`;

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-card-title">{title}</div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </div>

      <div className="form-links">
        <a href="#forgot-username">Forgot username</a>
        <span> · </span>
        <a href="#forgot-password">Forgot password</a>
      </div>
    </form>
  );
};

export default LoginForm;
