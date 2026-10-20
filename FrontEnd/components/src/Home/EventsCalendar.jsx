import React from "react";
import { Link } from "react-router-dom";

const EVENTS = [
  { day: "24", month: "Oct", title: "PTA General Meeting", meta: "Main Hall · 10:00 am" },
  {
    day: "31",
    month: "Oct",
    title: "Open Day for Prospective Parents",
    meta: "Campus tours · 9:00 am – 1:00 pm",
  },
  { day: "07", month: "Nov", title: "Science Fair", meta: "Science Block · All day" },
];

const ACCREDITATIONS = [
  "Cambridge Assessment",
  "Global School Alliance",
  "Green Schools",
  "British Council",
  "BC Partner School",
];

const EventsCalendar = () => (
  <>
    <section className="hp-events-section">
      <div className="hp-container">
        <div className="hp-events-header">
          <div>
            <p className="hp-section-eyebrow on-dark">Calendar</p>
            <h2>Upcoming events</h2>
          </div>
          <Link to="/tours-and-open-days" className="hp-events-view-all">
            Full calendar &rarr;
          </Link>
        </div>

        <div className="hp-events-grid">
          {EVENTS.map((e) => (
            <div className="hp-event-card" key={e.title}>
              <div className="hp-event-date">
                <span className="day">{e.day}</span>
                <span className="month">{e.month}</span>
              </div>
              <div>
                <h3>{e.title}</h3>
                <p>{e.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="hp-accreditation-strip">
      <div className="hp-container">
        <p>Accredited &amp; affiliated with</p>
        <div className="hp-accreditation-badges">
          {ACCREDITATIONS.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default EventsCalendar;
