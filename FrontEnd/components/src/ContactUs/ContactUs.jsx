import React, { useState } from "react";
import "./ContactUs.css";

const MESSAGE_LIMIT = 2000;

const classOptions = [
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12 (Lower Sixth)",
  "Year 13 (Upper Sixth)",
];

const ContactUs = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [classApplyingFor, setClassApplyingFor] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="full-name">Full name</label>
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="contact-row">
            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="phone">
                Phone <span className="contact-optional">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="024 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="contact-row">
            <div className="contact-field">
              <label htmlFor="child-name">
                Child&rsquo;s name <span className="contact-optional">(optional)</span>
              </label>
              <input
                id="child-name"
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="class-applying-for">Class applying for</label>
              <select
                id="class-applying-for"
                value={classApplyingFor}
                onChange={(e) => setClassApplyingFor(e.target.value)}
              >
                <option value="">Select a class</option>
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={6}
              maxLength={MESSAGE_LIMIT}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <span className="contact-char-count">
              {message.length}/{MESSAGE_LIMIT}
            </span>
          </div>

          <button type="submit" className="contact-submit">
            Send message
          </button>

          {sent && (
            <p className="contact-success">
              Thanks — your message has been sent. We&rsquo;ll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
