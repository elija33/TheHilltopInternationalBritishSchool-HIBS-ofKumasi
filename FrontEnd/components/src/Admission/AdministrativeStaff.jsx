import React from "react";
import "../AboutHIBS/BoardOfDirectors.css";
import "./AdministrativeStaff.css";

const staff = [
  {
    name: "Mr. Patrick Kwesi Essiam",
    education:
      "B. Arts (Hons.), Education, University of Ghana Legon / Kings College London. Postgraduate Certificate in Education…",
    position: "",
  },
  {
    name: "Mr. Samuel Nyamekye",
    education:
      "M. Phil., Human Physiology, Kwame Nkrumah University of Science and Technology, (PhD Student)",
    position: "",
  },
  {
    name: "Mr. Nicholas Sakyi",
    education: "B.Sc., Chemistry Education, University of Winneba",
    position: "CAIE Exams Officer, Coordinator of Counsell…",
  },
];

const Avatar = () => (
  <div className="board-avatar" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="56" height="56" fill="#c2c8c4">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.42 3.58-7 8-7s8 2.58 8 7v1H4v-1z" />
    </svg>
  </div>
);

const StaffCard = ({ member }) => (
  <div className="board-col">
    <div className="board-card">
      <Avatar />
      <div className="board-card-body">
        <h3 className="board-name">{member.name}</h3>
        <p className="staff-field">
          <strong>Higher Level Of Education:</strong> {member.education}
        </p>
        {member.position && (
          <p className="staff-field">
            <strong>Position In The School:</strong> {member.position}
          </p>
        )}
      </div>
    </div>
  </div>
);

const AdministrativeStaff = () => {
  return (
    <div>
      <section className="hero" style={{ padding: 0 }}>
        <div className="carousel-wrapper">
          <div
            style={{
              width: "100%",
              height: 260,
              background: "linear-gradient(90deg,#0b9a56,#2bb673)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/src/image/hibs_logofooter.jpg"
              alt="HIBS"
              style={{ height: 140, opacity: 0.95 }}
            />
          </div>
        </div>
      </section>

      <main className="container main-content">
        <h1 className="board-page-title">Administrative Staff</h1>

        <div className="board-container">
          <div className="board-grid">
            {staff.map((member) => (
              <StaffCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdministrativeStaff;
