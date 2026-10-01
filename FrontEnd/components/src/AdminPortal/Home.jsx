import React from "react";
import { Link } from "react-router-dom";
import { students, teachers, pendingCorrections, subjectPublishing } from "./mockData";
import { IconPeople, IconGear, IconEdit, IconUpload } from "./icons";

const activeStudents = students.filter((s) => s.status === "active").length;
const unpublished = subjectPublishing.filter((s) => !s.published).length;

const STATS = [
  { label: "Active Students", value: activeStudents, color: "blue", Icon: IconPeople },
  { label: "Teaching Staff", value: teachers.length, color: "green", Icon: IconGear },
  {
    label: "Pending Grade Corrections",
    value: pendingCorrections.length,
    color: "orange",
    Icon: IconEdit,
  },
  { label: "Subjects Not Published", value: unpublished, color: "purple", Icon: IconUpload },
];

const Home = () => {
  return (
    <div>
      <div className="admin-stat-grid">
        {STATS.map(({ label, value, color, Icon }) => (
          <div className="admin-stat-card" key={label}>
            <span className={`admin-stat-icon ${color}`}>
              <Icon />
            </span>
            <div>
              <p className="admin-stat-value">{value}</p>
              <p className="admin-stat-label">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-section-card">
        <h2>Needs your attention</h2>
        {pendingCorrections.length > 0 && (
          <p style={{ margin: "0 0 0.5rem" }}>
            {pendingCorrections.length} grade correction request
            {pendingCorrections.length > 1 ? "s are" : " is"} waiting for review.{" "}
            <Link to="/portal/admin/corrections">Review now &rarr;</Link>
          </p>
        )}
        {unpublished > 0 && (
          <p style={{ margin: 0 }}>
            {unpublished} subject{unpublished > 1 ? "s have" : " has"} not been published
            for this term yet.{" "}
            <Link to="/portal/admin/publishing">Manage publishing &rarr;</Link>
          </p>
        )}
      </div>

      <div className="admin-section-card">
        <h2>Teaching staff</h2>
        <div className="portal-table-wrap">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.name}>
                  <td>{t.name}</td>
                  <td>{t.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
