import React from "react";
import { attendanceDays, student, currentTerm } from "./mockData";
import { computeAttendance } from "./attendanceUtils";

const STATUS_LABEL = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
  EXCUSED: "Excused",
  HALF_DAY: "Half-day",
  HOLIDAY: "School closed",
  NOT_RECORDED: "Not recorded",
  UPCOMING: "Upcoming",
};

const Attendance = () => {
  const summary = computeAttendance(attendanceDays);

  return (
    <div>
      <div className="portal-card">
        <h2>{currentTerm.label} summary</h2>
        <p className="portal-notice">
          Calculated from {student.transferDate}, the day you joined {student.currentClass}.
          Attendance from {student.previousClass} is not included here.
        </p>
        <div className="portal-grid">
          <div className="portal-stat">
            <p className="label">Attendance rate</p>
            <p className="value">
              {summary.percentage === null ? "—" : `${summary.percentage}%`}
            </p>
          </div>
          <div className="portal-stat">
            <p className="label">Present</p>
            <p className="value" style={{ fontSize: "1.4rem" }}>
              {summary.present}
            </p>
          </div>
          <div className="portal-stat">
            <p className="label">Absent</p>
            <p className="value" style={{ fontSize: "1.4rem" }}>
              {summary.absent}
            </p>
          </div>
          <div className="portal-stat">
            <p className="label">Late</p>
            <p className="value" style={{ fontSize: "1.4rem" }}>
              {summary.late}
            </p>
          </div>
          <div className="portal-stat">
            <p className="label">Half-day</p>
            <p className="value" style={{ fontSize: "1.4rem" }}>
              {summary.halfDay}
            </p>
          </div>
          <div className="portal-stat">
            <p className="label">Excused</p>
            <p className="value" style={{ fontSize: "1.4rem" }}>
              {summary.excused}
            </p>
          </div>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "1rem" }}>
          Excused absences do not count against your percentage. Late and half-day
          count as present (half-day counts as half a day present).
          {summary.notRecorded > 0 &&
            ` ${summary.notRecorded} day(s) have no attendance recorded yet and are not counted.`}
        </p>
      </div>

      <div className="portal-card">
        <h2>Daily record</h2>
        <div className="portal-table-wrap">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {attendanceDays.map((d) => (
                <tr key={d.date}>
                  <td>{d.date}</td>
                  <td>
                    <span className={`portal-badge status-${d.status.toLowerCase()}`}>
                      {STATUS_LABEL[d.status]}
                    </span>
                  </td>
                  <td style={{ whiteSpace: "normal" }}>{d.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
