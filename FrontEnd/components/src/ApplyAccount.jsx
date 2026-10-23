import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ApplyAccount.css";
import hibsLogo from "../image/hibs_logo.jpg";
import { setLoggedInApplicant } from "./applicantSession";
import { createAccount, findAccountByEmail } from "./applicantAccounts";

const RELATIONSHIPS = ["Mother", "Father", "Guardian"];

const FEATURES = [
  {
    icon: "💾",
    title: "Save and continue anytime",
    body: "Pick up your application where you left off.",
  },
  {
    icon: "📍",
    title: "Track your application",
    body: "See every update, from review to offer.",
  },
  {
    icon: "👪",
    title: "Apply for more than one child",
    body: "Your details are filled in for you.",
  },
  {
    icon: "📱",
    title: "Your future parent portal",
    body: "The same login works once your child is enrolled.",
  },
];

const EMPTY_FIELDS = {
  firstName: "",
  lastName: "",
  relationship: "",
  phone: "",
  email: "",
  password: "",
  agree: false,
};

const ApplyAccount = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [view, setView] = useState("create"); // create | login
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [createdModal, setCreatedModal] = useState(null);

  const update = (key, value) => setFields((f) => ({ ...f, [key]: value }));

  const submitCreate = (e) => {
    e.preventDefault();
    if (
      !fields.firstName.trim() ||
      !fields.lastName.trim() ||
      !fields.relationship ||
      !fields.phone.trim() ||
      !fields.email.trim()
    ) {
      setError("Fill in your name, relationship, phone number and email.");
      return;
    }
    if (!fields.password || fields.password.length < 6) {
      setError("Choose a password that's at least 6 characters.");
      return;
    }
    if (!fields.agree) {
      setError("You need to agree to the Terms and Privacy Policy to continue.");
      return;
    }
    if (findAccountByEmail(fields.email)) {
      setError("An account with this email already exists. Log in instead.");
      return;
    }
    setError("");
    const account = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      relationship: fields.relationship,
      phone: fields.phone,
      email: fields.email,
      password: fields.password,
    };
    createAccount(account);
    setCreatedModal({ firstName: fields.firstName, lastName: fields.lastName, email: fields.email });
  };

  const acknowledgeCreated = () => {
    setLoginEmail(createdModal.email);
    setLoginPassword("");
    setFields(EMPTY_FIELDS);
    setCreatedModal(null);
    setError("");
    setView("login");
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      setError("Enter your email and password.");
      return;
    }
    const account = findAccountByEmail(loginEmail);
    if (!account || account.password !== loginPassword) {
      setError("Incorrect email or password.");
      return;
    }
    setError("");
    setLoggedInApplicant(account);
    navigate(`/apply/form/${type}`);
  };

  return (
    <div className="aa-wrap">
      <aside className="aa-side">
        <div className="aa-brand">
          <img src={hibsLogo} alt="HIBS logo" />
          <span>The Hilltop International British School</span>
        </div>

        <p className="aa-side-eyebrow">Admissions</p>
        <h1>Start your child&rsquo;s HIBS journey</h1>
        <p className="aa-side-subtitle">
          Create a free parent account to apply. It only takes a minute.
        </p>

        <div className="aa-features">
          {FEATURES.map((f) => (
            <div className="aa-feature" key={f.title}>
              <span className="aa-feature-icon">{f.icon}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="aa-side-help">Need help? Call +233 (0) 32 229 9229</p>
      </aside>

      <div className="aa-main">
        <div className="aa-topbar">
          <Link to="/apply">&larr; Back to Apply</Link>
          {view === "create" ? (
            <button
              type="button"
              onClick={() => {
                setView("login");
                setError("");
              }}
            >
              Have an account? <strong>Log in</strong>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setView("create");
                setError("");
              }}
            >
              New here? <strong>Create account</strong>
            </button>
          )}
        </div>

        {view === "create" && (
          <form className="aa-card" onSubmit={submitCreate}>
            <p className="aa-card-eyebrow">Parent Account</p>
            <h2>Create your account</h2>
            <p className="aa-card-subtitle">
              We&rsquo;ll use this to keep you updated on the application.
            </p>

            <div className="aa-row">
              <div className="aa-field">
                <label htmlFor="aa-first">First name</label>
                <input
                  id="aa-first"
                  value={fields.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
              </div>
              <div className="aa-field">
                <label htmlFor="aa-last">Last name</label>
                <input
                  id="aa-last"
                  value={fields.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="aa-row" style={{ "--aa-cols": 1 }}>
              <div className="aa-field">
                <label htmlFor="aa-relationship">Relationship to the child</label>
                <select
                  id="aa-relationship"
                  value={fields.relationship}
                  onChange={(e) => update("relationship", e.target.value)}
                >
                  <option value="">Select</option>
                  {RELATIONSHIPS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="aa-field" style={{ marginBottom: "1.1rem" }}>
              <label htmlFor="aa-phone">Phone number</label>
              <div className="aa-phone-group">
                <span className="aa-phone-prefix">🇬🇭 +233</span>
                <input
                  id="aa-phone"
                  type="tel"
                  placeholder="24 123 4567"
                  value={fields.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="aa-row" style={{ "--aa-cols": 1 }}>
              <div className="aa-field">
                <label htmlFor="aa-email">Email</label>
                <input
                  id="aa-email"
                  type="email"
                  placeholder="name@example.com"
                  value={fields.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
            </div>

            <div className="aa-row" style={{ "--aa-cols": 1 }}>
              <div className="aa-field">
                <label htmlFor="aa-password">Create password</label>
                <input
                  id="aa-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={fields.password}
                  onChange={(e) => update("password", e.target.value)}
                />
                <p className="aa-helper-text">You&rsquo;ll use this with your email to log in.</p>
              </div>
            </div>

            <label className="aa-checkbox-row">
              <input
                type="checkbox"
                checked={fields.agree}
                onChange={(e) => update("agree", e.target.checked)}
              />
              <span>
                I agree to the <a href="#terms">Terms</a> and{" "}
                <a href="#privacy">Privacy Policy</a>, and to HIBS contacting me about
                admissions.
              </span>
            </label>

            {error && <p className="aa-error">{error}</p>}

            <button type="submit" className="aa-submit">
              Create account
            </button>

            <p className="aa-switch-line">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setView("login");
                  setError("");
                }}
              >
                Log in
              </button>
            </p>
          </form>
        )}

        {view === "login" && (
          <form className="aa-card" onSubmit={submitLogin}>
            <p className="aa-card-eyebrow">Parent Account</p>
            <h2>Log in</h2>
            <p className="aa-card-subtitle">Use the email and password from your account.</p>

            <div className="aa-row" style={{ "--aa-cols": 1 }}>
              <div className="aa-field">
                <label htmlFor="aa-login-email">Email</label>
                <input
                  id="aa-login-email"
                  type="email"
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="aa-row" style={{ "--aa-cols": 1 }}>
              <div className="aa-field">
                <label htmlFor="aa-login-password">Password</label>
                <input
                  id="aa-login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="aa-error">{error}</p>}

            <button type="submit" className="aa-submit">
              Log in
            </button>

            <p className="aa-switch-line">
              New here?{" "}
              <button
                type="button"
                onClick={() => {
                  setView("create");
                  setError("");
                }}
              >
                Create an account
              </button>
            </p>
          </form>
        )}
      </div>

      {createdModal && (
        <div className="aa-modal-overlay">
          <div className="aa-modal">
            <div className="aa-modal-icon">✓</div>
            <h3>
              Hello {createdModal.firstName} {createdModal.lastName}
            </h3>
            <p>Your account has been created. Log in with your email and password to continue.</p>
            <button type="button" className="aa-submit" onClick={acknowledgeCreated}>
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyAccount;
