import React from "react";
import { useOutletContext } from "react-router-dom";
import { CLASS_ROSTERS } from "../AdminPortal/teacherData";

const RosterCard = ({ title, roster }) => (
  <div className="portal-card">
    <div className="portal-subject-header">
      <h3>{title}</h3>
      <span className="portal-term-mark">{roster.length} students</span>
    </div>
    <div className="portal-table-wrap">
      <table className="portal-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Student</th>
          </tr>
        </thead>
        <tbody>
          {roster.map((name, i) => (
            <tr key={name}>
              <td>{i + 1}</td>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MyClasses = () => {
  const { teacher } = useOutletContext();
  const hasAnything = teacher.classTeacherOf || teacher.subjectAssignments.length > 0;

  if (!hasAnything) {
    return (
      <div className="portal-card">
        <p className="portal-empty">
          You don&rsquo;t have any class or subject assignments for this academic year yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      {teacher.classTeacherOf && (
        <RosterCard
          title={`Class teacher · ${teacher.classTeacherOf}`}
          roster={CLASS_ROSTERS[teacher.classTeacherOf] || []}
        />
      )}
      {teacher.subjectAssignments.map((a) =>
        a.classes.map((c) => (
          <RosterCard
            key={`${a.subject}-${c}`}
            title={`${a.subject} · ${c}`}
            roster={CLASS_ROSTERS[c] || []}
          />
        )),
      )}
    </div>
  );
};

export default MyClasses;
