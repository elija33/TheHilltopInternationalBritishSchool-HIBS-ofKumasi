import React from "react";
import "../styles.css";
import "./BoardOfDirectors.css";
import hibsFooterLogo from "../../image/hibs_logofooter.jpg";

const leadership = [
  {
    name: "Cecilia Agyei-Amoako",
    role: "Proprietress, Headmistress",
    bio: "Cecilia holds M.Ed in Educational Management and Administration. A professional teacher since 1975 with experience from the USA, Papua New Guinea and Ghana.",
  },
  {
    name: "Benjamin Kofi Oteng-Amoako",
    role: "Director",
    bio: "Kofi is a Maxillofacial surgeon in Australia and New Zealand. He holds a Dental and Medical Degree and a Masters in Surgery. He is a Fellow of Australasia maxillofacial surgeons.",
  },
  {
    name: "Dr. Afua Oteng Asare — OD, MPH, PHD.",
    role: "Director",
    bio: "Assistant Professor in the Department of Ophthalmology and Visual Sciences at the University of Utah, John A. Moran Eye Center.",
  },
];

const boardMembers = [
  {
    name: "Mr Patrick Kwesi Essiam",
    role: "Board Member",
    bio: "Head of School, HIBS & Head of Boarding. Member, Board of Directors, The Hilltop School.",
  },
  {
    name: "Very Rev. Dr. Ebenezer Adu Ampong",
    role: "Board Member",
    bio: "Minister in charge of Christ the King Methodist Church, Asokwa. Journal Recorder of the Kumasi Diocesan Synod, a resource person in the Methodist Evangelists Training School. Lecturer, Christian Service College.",
  },
  {
    name: "Rev. Dr. Douglas Okona Frimpong",
    role: "Board Member",
    bio: "Past Chairperson of parent–teacher association (PTA) of Hilltop School.",
  },
  {
    name: "Mrs. Marilyn Owusu",
    role: "Board Member",
    bio: "Chief Executive Officer of ACE Consult Ltd, Board Member, The Hilltop School.",
  },
  {
    name: "Rev. David Kow Markin",
    role: "Board Member",
    bio: "Senior Associate Pastor of Gracefields Chapel. He is The Hilltop School PTA Chairperson. Board Member.",
  },
  {
    name: "Mr. Kofi Asare Asianowa",
    role: "Board Member",
    bio: "Regional Industrial Relations Officer, PSWU & Manager of the Public Services Union Centre Limited. Chairman of the Regional Council of Labour TUC. Executive Member of the PTA.",
  },
  {
    name: "Abigail Nyarko",
    role: "Board Member",
    bio: "Administrator of HIBS. Secretary to the Board.",
  },
  {
    name: "Madam Paulina Agyekum",
    role: "Board Member",
    bio: "Headmistress, The Hilltop Sch. Member, Board of Directors, The Hilltop School.",
  },
  {
    name: "Mr. Kwame Agyekum",
    role: "Board Member",
    bio: "Senior Accountant, Board Member, The Hilltop School.",
  },
  {
    name: "Mrs Anna Fordjour Esq",
    role: "Board Member",
    bio: "Partner at AB & David.",
  },
  {
    name: "Tahir Tchansante",
    role: "Board Member",
    bio: "",
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

const BoardCard = ({ member }) => (
  <div className="board-col">
    <div className="board-card">
      <Avatar />
      <div className="board-card-body">
        <h3 className="board-name">{member.name}</h3>
        <p className="board-role">/{member.role}</p>
        {member.bio && <p className="board-bio">{member.bio}</p>}
      </div>
    </div>
  </div>
);

const BoardOfDirectors = () => {
  return (
    <div className="container">
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
              src={hibsFooterLogo}
              alt="HIBS"
              style={{ height: 140, opacity: 0.95 }}
            />
          </div>
        </div>
      </section>

      <main className="container main-content">
        <h1 className="board-page-title">Board of Directors</h1>

        <div className="board-container">
          <div className="board-grid">
            {leadership.map((member) => (
              <BoardCard key={member.name} member={member} />
            ))}
          </div>

          <div className="board-grid" style={{ marginTop: "1.5rem" }}>
            {boardMembers.map((member) => (
              <BoardCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BoardOfDirectors;
