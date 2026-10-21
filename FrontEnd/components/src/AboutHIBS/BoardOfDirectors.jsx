import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../Home/HomePage.css";
import "./BoardOfDirectorsPage.css";
import ceciliaPhoto from "../../image/Cecilia Agyei Oteng-Amoako.jpg";

const TITLE_TOKENS = new Set(["mr", "mrs", "ms", "dr", "rev", "very", "madam", "prof"]);

// Strips honorifics (Mr./Dr./Rev./Very Rev./Madam…) and any trailing
// credentials after a comma or em-dash, then takes the first letter of the
// first remaining word and the first letter of the last — e.g. "Rev. Dr.
// Douglas Okona Frimpong" -> "DF".
const initials = (rawName) => {
  const base = rawName.split("—")[0].split(",")[0].trim();
  const words = base
    .split(/\s+/)
    .map((w) => w.replace(/\./g, ""))
    .filter((w) => w && !TITLE_TOKENS.has(w.toLowerCase()));
  if (words.length === 0) return "";
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const topLeadership = [
  {
    name: "Dr. Andrew Akwasi Oteng-Amoako",
    role: "Chairman · Executive Director",
    credentials: "PhD",
    bio: "Executive Director of HIBS and Chairman of the Board of Directors. (Confirm bio with the school.)",
    photo: null,
  },
  {
    name: "Cecilia Agyei-Amoako",
    role: "Proprietress · Headmistress",
    credentials: "M.Ed, Educational Management & Administration",
    bio: "A professional teacher since 1975, with experience in the USA, Papua New Guinea and Ghana.",
    photo: ceciliaPhoto,
  },
];

const directors = [
  {
    name: "Benjamin Kofi Oteng-Amoako",
    credentials: "Dental & Medical Degree · Masters in Surgery",
    bio: "Maxillofacial surgeon in Australia and New Zealand, and a Fellow of the Australasian maxillofacial surgeons.",
  },
  {
    name: "Dr. Afua Oteng Asare",
    credentials: "OD, MPH, PhD",
    bio: "Assistant Professor in the Department of Ophthalmology and Visual Sciences at the University of Utah, John A. Moran Eye Center.",
  },
];

const boardMembers = [
  {
    name: "Mr. Patrick Kwesi Essiam",
    badge: "Board Member",
    bio: "Head of School and Head of Boarding at HIBS. Member, Board of Directors, The Hilltop School.",
  },
  {
    name: "Very Rev. Dr. Ebenezer Adu Ampong",
    badge: "Board Member",
    bio: "Minister in charge of Christ the King Methodist Church, Asokwa. Journal Recorder of the Kumasi Diocesan Synod, a resource person in the Methodist Evangelists Training School. Lecturer, Christian Service College.",
  },
  {
    name: "Rev. Dr. Douglas Okona Frimpong",
    badge: "Board Member",
    bio: "Past Chairperson of the Parent-Teacher Association (PTA) of The Hilltop School.",
  },
  {
    name: "Mrs. Marilyn Owusu",
    badge: "Board Member",
    bio: "Chief Executive Officer of ACE Consult Ltd. Board Member, The Hilltop School.",
  },
  {
    name: "Rev. David Kow Markin",
    badge: "Board Member",
    bio: "Senior Associate Pastor of Gracefields Chapel and PTA Chairperson of The Hilltop School. Board Member.",
  },
  {
    name: "Mr. Kofi Asare Asianowa",
    badge: "Board Member",
    bio: "Regional Industrial Relations Officer, PSWU, and Manager of the Public Services Union Centre Limited. Chairman of the Regional Council of Labour TUC. Executive Member of the PTA.",
  },
  {
    name: "Ms. Abigail Nyarko",
    badge: "Board Secretary",
    bio: "Administrator of HIBS and Secretary to the Board.",
  },
  {
    name: "Madam Paulina Agyekum",
    badge: "Board Member",
    bio: "Headmistress, The Hilltop School. Member, Board of Directors, The Hilltop School.",
  },
  {
    name: "Mr. Kwame Agyekum",
    badge: "Board Member",
    bio: "Senior Accountant. Board Member, The Hilltop School.",
  },
  {
    name: "Mrs. Anna Fordjour, Esq.",
    badge: "Board Member",
    bio: "Partner at AB & David.",
  },
  {
    name: "Mr. Tahir Tchansante",
    badge: "Board Member",
    bio: "",
  },
];

const BIO_TRUNCATE_AT = 100;

const MemberBio = ({ bio }) => {
  const [expanded, setExpanded] = useState(false);
  if (!bio) return null;
  const needsTruncation = bio.length > BIO_TRUNCATE_AT;

  return (
    <p className="bod-bio">
      {expanded || !needsTruncation ? bio : `${bio.slice(0, BIO_TRUNCATE_AT - 5).trim()}…`}
      {needsTruncation && (
        <>
          {" "}
          <button
            type="button"
            className="bod-read-more"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </>
      )}
    </p>
  );
};

const BoardOfDirectors = () => {
  return (
    <div>
      <section className="bod-hero">
        <div className="hp-container">
          <p className="bod-breadcrumb">
            <Link to="/">Home</Link> / About / Board of Directors
          </p>
          <h1>Board of Directors</h1>
          <p>
            The experienced educators, professionals and community leaders who guide the
            vision and governance of HIBS.
          </p>
        </div>
      </section>

      <div className="hp-container">
        <div className="bod-leader-grid">
          {topLeadership.map((p) => (
            <div className="bod-leader-card" key={p.name}>
              <div className="bod-leader-photo">
                <div className="bod-avatar">
                  {p.photo ? <img src={p.photo} alt={p.name} /> : initials(p.name)}
                </div>
              </div>
              <div className="bod-leader-body">
                <span className="bod-badge">{p.role}</span>
                <h3>{p.name}</h3>
                {p.credentials && <p className="bod-credentials">{p.credentials}</p>}
                <p className="bod-bio">{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="bod-section">
        <div className="hp-container">
          <div className="bod-section-header">
            <div>
              <p className="hp-section-eyebrow">Directors</p>
              <h2>Directors</h2>
            </div>
          </div>
          <div className="bod-director-grid">
            {directors.map((d) => (
              <div className="bod-director-card" key={d.name}>
                <div className="bod-avatar">{initials(d.name)}</div>
                <div>
                  <span className="bod-badge">Director</span>
                  <h3>{d.name}</h3>
                  {d.credentials && <p className="bod-credentials">{d.credentials}</p>}
                  <p className="bod-bio">{d.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bod-section alt">
        <div className="hp-container">
          <div className="bod-section-header">
            <div>
              <p className="hp-section-eyebrow">Board Members</p>
              <h2>Our Board Members</h2>
            </div>
            <span className="bod-member-count">{boardMembers.length} members</span>
          </div>
          <div className="bod-member-grid">
            {boardMembers.map((m) => (
              <div className="bod-member-card" key={m.name}>
                <div className="bod-avatar">{initials(m.name)}</div>
                <h3>{m.name}</h3>
                <span className={`bod-badge ${m.badge === "Board Secretary" ? "secretary" : ""}`}>
                  {m.badge}
                </span>
                <MemberBio bio={m.bio} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bod-governance-wrap">
        <div className="hp-container">
          <div className="bod-governance-banner">
            <div>
              <p className="hp-section-eyebrow">Governance</p>
              <h2>Working together for the Stars of HIBS</h2>
            </div>
            <div className="bod-governance-right">
              <p>
                The Board works hand in hand with management, teachers and parents to
                uphold our motto of Excellence, Knowledge and Integrity.
              </p>
              <Link to="/contact-us" className="hp-hero-cta-primary">
                Contact the Board Secretary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoardOfDirectors;
