import React, { useState } from "react";
import "../ContactUs/ContactUs.css";

const MESSAGE_LIMIT = 2000;

const timeOptions = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

const todayISODate = () => new Date().toISOString().split("T")[0];

const ToursAndOpenDays = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h1 className="contact-title">Tours &amp; Open Days</h1>

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
              <label htmlFor="visit-date">Preferred visit date</label>
              <input
                id="visit-date"
                type="date"
                min={todayISODate()}
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="preferred-time">Preferred time</label>
              <select
                id="preferred-time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
              >
                <option value="">Select a time</option>
                {timeOptions.map((option) => (
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
              Thanks — your tour request has been sent. We&rsquo;ll be in touch to
              confirm.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ToursAndOpenDays;
