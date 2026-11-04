import React, { useEffect, useState } from "react";
import { students, currentTerm } from "../AdminPortal/mockData";
import { getCurrentAccountant } from "./useCurrentAccountant";
import {
  tuitionRecords,
  nextTuitionId,
  addTuitionRecord,
  updateTuitionRecord,
  deleteTuitionRecord,
  subscribeToTuitionRecords,
} from "./tuitionStore";

const activeStudents = students.filter((s) => s.status === "active");
const classes = [...new Set(activeStudents.map((s) => s.class))].sort();

const formatMoney = (n) => `₵${Number(n).toLocaleString()}`;

const Tuition = () => {
  const [, forceRender] = useState(0);
  const [selectedClass, setSelectedClass] = useState(classes[0] || "");
  const [term, setTerm] = useState(currentTerm.label);
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [amounts, setAmounts] = useState({});
  const [editingStudent, setEditingStudent] = useState(null);
  const accountant = getCurrentAccountant();

  useEffect(() => subscribeToTuitionRecords(() => forceRender((n) => n + 1)), []);

  const studentsInClass = activeStudents.filter((s) => s.class === selectedClass);

  const findRecord = (studentName) =>
    tuitionRecords.find((r) => r.studentName === studentName && r.term === term);

  const setAmount = (studentName, value) =>
    setAmounts((a) => ({ ...a, [studentName]: value }));

  const post = (studentName) => {
    const amount = amounts[studentName];
    if (!amount) return;
    const existing = findRecord(studentName);

    if (existing) {
      updateTuitionRecord(existing.id, {
        amount: Number(amount),
        dueDate,
        description,
      });
    } else {
      addTuitionRecord({
        id: nextTuitionId(),
        studentName,
        studentClass: selectedClass,
        term,
        amount: Number(amount),
        dueDate,
        description,
        postedAt: new Date().toISOString().split("T")[0],
        postedBy: accountant?.name || "Accountant",
      });
    }

    setAmount(studentName, "");
    setEditingStudent(null);
    forceRender((n) => n + 1);
  };

  const startEdit = (record) => {
    setAmount(record.studentName, String(record.amount));
    setEditingStudent(record.studentName);
  };

  const remove = (record) => {
    deleteTuitionRecord(record.id);
    if (editingStudent === record.studentName) setEditingStudent(null);
    forceRender((n) => n + 1);
  };

  return (
    <div>
      <div className="admin-section-card">
        <h2>Post student tuition</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
          Pick a class to list its students, then post tuition for each one. It goes
          straight to that student&rsquo;s parent in the Parent Portal, under their Tuition
          tab.
        </p>

        <div className="portal-toolbar">
          <div className="portal-field" style={{ marginBottom: 0 }}>
            <label htmlFor="tuition-class">Class</label>
            <select
              id="tuition-class"
              className="portal-select"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setEditingStudent(null);
              }}
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="portal-field" style={{ marginBottom: 0 }}>
            <label htmlFor="tuition-term">Term</label>
            <input
              id="tuition-term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="e.g. Term 1, 2026/2027"
            />
          </div>
          <div className="portal-field" style={{ marginBottom: 0 }}>
            <label htmlFor="tuition-due">Due date</label>
            <input
              id="tuition-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="portal-field" style={{ marginBottom: 0 }}>
            <label htmlFor="tuition-desc">Description (optional)</label>
            <input
              id="tuition-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Includes boarding fees"
            />
          </div>
        </div>

        {studentsInClass.length === 0 ? (
          <p className="portal-empty">No active students in this class.</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>{term} amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {studentsInClass.map((s) => {
                  const existing = findRecord(s.name);
                  const isEditing = editingStudent === s.name;

                  if (existing && !isEditing) {
                    return (
                      <tr key={s.name}>
                        <td>{s.name}</td>
                        <td>
                          Posted: {formatMoney(existing.amount)}
                          {existing.dueDate && (
                            <span style={{ color: "var(--muted)" }}> · Due {existing.dueDate}</span>
                          )}
                        </td>
                        <td style={{ display: "flex", gap: "0.4rem" }}>
                          <button className="portal-link-btn" onClick={() => startEdit(existing)}>
                            Update
                          </button>
                          <button
                            className="portal-link-btn"
                            style={{ background: "#9a1c1c" }}
                            onClick={() => remove(existing)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={s.name}>
                      <td>{s.name}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={amounts[s.name] || ""}
                          onChange={(e) => setAmount(s.name, e.target.value)}
                          placeholder="Amount (₵)"
                          style={{ maxWidth: 160 }}
                        />
                      </td>
                      <td style={{ display: "flex", gap: "0.4rem" }}>
                        <button className="portal-link-btn" onClick={() => post(s.name)}>
                          {existing ? "Save" : "Post"}
                        </button>
                        {existing && (
                          <button
                            className="portal-link-btn"
                            style={{ background: "#6b7280" }}
                            onClick={() => setEditingStudent(null)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-section-card">
        <h2>All posted tuition</h2>
        {tuitionRecords.length === 0 ? (
          <p className="portal-empty">No tuition has been posted yet.</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Term</th>
                  <th>Amount</th>
                  <th>Due date</th>
                  <th>Posted</th>
                  <th>Changes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tuitionRecords.map((r) => (
                  <tr key={r.id}>
                    <td>{r.studentName}</td>
                    <td>{r.studentClass}</td>
                    <td>{r.term}</td>
                    <td>{formatMoney(r.amount)}</td>
                    <td>{r.dueDate || "—"}</td>
                    <td>{r.postedAt}</td>
                    <td>
                      {r.history && r.history.length > 1
                        ? `Updated ${r.history.length - 1}x`
                        : "—"}
                    </td>
                    <td>
                      <button
                        className="portal-link-btn"
                        style={{ background: "#9a1c1c" }}
                        onClick={() => remove(r)}
                      >
                        Delete
                      </button>
                    </td>
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

export default Tuition;
