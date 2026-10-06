import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  teacherRecords,
  CLASS_LIST,
  SUBJECT_LIST,
  fullName,
  roleBadges,
  roleKind,
} from "./teacherData";

const STATUS_LABEL = {
  ACTIVE: "Active",
  ON_LEAVE: "On leave",
  INACTIVE: "Inactive",
};

const STATUS_BADGE = {
  ACTIVE: "status-present",
  ON_LEAVE: "status-late",
  INACTIVE: "status-not_recorded",
};

const initials = (t) => `${t.firstName[0]}${t.lastName[0]}`.toUpperCase();

const Teachers = ({ basePath = "/portal/admin" }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("VISIBLE");
  const [roleFilter, setRoleFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  const filtered = useMemo(() => {
    return teacherRecords.filter((t) => {
      if (statusFilter === "VISIBLE" && t.status === "INACTIVE") return false;
      if (statusFilter !== "VISIBLE" && statusFilter !== "ALL" && t.status !== statusFilter)
        return false;

      const kind = roleKind(t);
      if (roleFilter !== "all" && kind !== roleFilter) return false;

      if (
        subjectFilter !== "all" &&
        !t.subjectAssignments.some((a) => a.subject === subjectFilter)
      )
        return false;

      if (
        classFilter !== "all" &&
        t.classTeacherOf !== classFilter &&
        !t.subjectAssignments.some((a) => a.classes.includes(classFilter))
      )
        return false;

      const haystack = `${fullName(t)} ${t.staffId}`.toLowerCase();
      if (query && !haystack.includes(query.toLowerCase())) return false;

      return true;
    });
  }, [query, statusFilter, roleFilter, subjectFilter, classFilter]);

  return (
    <div>
      <div className="admin-section-card">
        <div className="portal-toolbar" style={{ marginBottom: 0 }}>
          <div>
            <label htmlFor="teacher-search">Search</label>
            <input
              id="teacher-search"
              className="portal-select"
              type="text"
              placeholder="Name or staff ID"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ minWidth: "200px" }}
            />
          </div>
          <div>
            <label htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              className="portal-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="VISIBLE">Active &amp; on leave</option>
              <option value="ACTIVE">Active</option>
              <option value="ON_LEAVE">On leave</option>
              <option value="INACTIVE">Inactive</option>
              <option value="ALL">All (incl. inactive)</option>
            </select>
          </div>
          <div>
            <label htmlFor="role-filter">Role</label>
            <select
              id="role-filter"
              className="portal-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All roles</option>
              <option value="class">Class teachers</option>
              <option value="subject">Subject teachers</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div>
            <label htmlFor="subject-filter">Subject</label>
            <select
              id="subject-filter"
              className="portal-select"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="all">All subjects</option>
              {SUBJECT_LIST.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="class-filter">Class</label>
            <select
              id="class-filter"
              className="portal-select"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="all">All classes</option>
              {CLASS_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button
            className="portal-link-btn"
            style={{ marginLeft: "auto" }}
            onClick={() => navigate(`${basePath}/teachers/new`)}
          >
            + Add teacher
          </button>
        </div>
      </div>

      <div className="admin-section-card">
        {filtered.length === 0 ? (
          <p className="portal-empty">No teachers match your search or filters.</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Staff ID</th>
                  <th>Roles</th>
                  <th>Status</th>
                  <th>Start date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => navigate(`${basePath}/teachers/${t.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "#e6edff",
                            color: "#2544a8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            flexShrink: 0,
                          }}
                        >
                          {initials(t)}
                        </span>
                        {fullName(t)}
                      </div>
                    </td>
                    <td>{t.staffId}</td>
                    <td style={{ whiteSpace: "normal" }}>
                      {roleBadges(t).length === 0 ? (
                        <span className="portal-empty">No assignments</span>
                      ) : (
                        roleBadges(t).map((b) => (
                          <span
                            key={b}
                            className="portal-badge status-not_assessed"
                            style={{ marginRight: "0.4rem", marginBottom: "0.25rem", display: "inline-block" }}
                          >
                            {b}
                          </span>
                        ))
                      )}
                    </td>
                    <td>
                      <span className={`portal-badge ${STATUS_BADGE[t.status]}`}>
                        {STATUS_LABEL[t.status]}
                      </span>
                    </td>
                    <td>{t.startDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
