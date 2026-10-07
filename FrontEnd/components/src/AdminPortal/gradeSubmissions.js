// End-of-term grade submissions, filed by a subject teacher and sitting here
// untouched until a Headmaster who oversees that class approves them — same
// queue-until-approved shape as approvals.js and pendingCorrections. A mark
// is not real, and is not shown to anyone, until someone with authority over
// that class has signed off on it.
import { subjects as studentSubjects, student as demoStudent } from "../StudentPortal/mockData";
import { children as parentChildren } from "../ParentPortal/mockData";

export const gradeSubmissions = [
  {
    id: "gsub-1",
    class: "JHS 2B",
    subject: "English Language",
    term: "Term 1, 2026/2027",
    teacherId: "t2",
    teacherName: "Mrs. Adjoa Mensah",
    submittedAt: "2026-10-02",
    status: "PENDING",
    decidedBy: null,
    decidedAt: null,
    rejectionNote: null,
    entries: [
      { studentName: "Ama Serwaa Owusu", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 41, status: "SCORED" }] },
      { studentName: "Kwabena Asante", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 33, status: "SCORED" }] },
      { studentName: "Efua Mensah", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 45, status: "SCORED" }] },
      { studentName: "Yaw Darko", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: null, status: "ABSENT" }] },
      { studentName: "Abena Boateng", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 38, status: "SCORED" }] },
      { studentName: "Kojo Appiah", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 29, status: "SCORED" }] },
    ],
  },
  {
    id: "gsub-2",
    class: "Primary 5",
    subject: "Integrated Science",
    term: "Term 1, 2026/2027",
    teacherId: "t3",
    teacherName: "Mr. Yaw Boateng",
    submittedAt: "2026-10-03",
    status: "PENDING",
    decidedBy: null,
    decidedAt: null,
    rejectionNote: null,
    entries: [
      { studentName: "Kwame Mensah Owusu", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 31, status: "SCORED" }] },
      { studentName: "Esi Owusu-Ansah", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 40, status: "SCORED" }] },
      { studentName: "Kwadwo Mensah", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 22, status: "SCORED" }] },
      { studentName: "Afia Boateng", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: 36, status: "SCORED" }] },
      { studentName: "Yaw Sarfo", assessments: [{ name: "Class Test 1", weight: 20, max: 50, value: null, status: "NOT_ASSESSED" }] },
    ],
  },
];

export const nextSubmissionId = () => `gsub-${Date.now()}`;

const mergeAssessmentsIntoSubjectList = (subjectList, subjectName, teacherName, assessments) => {
  const existing = subjectList.find((s) => s.name === subjectName);
  if (existing) {
    existing.published = true;
    assessments.forEach((a) => {
      const idx = existing.assessments.findIndex((ea) => ea.name === a.name);
      if (idx !== -1) existing.assessments[idx] = { ...a };
      else existing.assessments.push({ ...a });
    });
  } else {
    subjectList.push({
      id: subjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: subjectName,
      teacher: teacherName,
      published: true,
      assessments: assessments.map((a) => ({ ...a })),
    });
  }
};

// Copies one student's newly-approved marks into their own Student/Parent
// portal view only, matched by name (the only identifier the demo student
// and the parent's children share) — a classmate whose name doesn't match
// is never touched, and a child no longer enrolled (status !== "active")
// never has marks added to a record that's already closed out.
const publishEntryToPortals = (studentName, subjectName, teacherName, assessments) => {
  if (studentName === demoStudent.name) {
    mergeAssessmentsIntoSubjectList(studentSubjects, subjectName, teacherName, assessments);
  }
  const child = parentChildren.find((c) => c.name === studentName && c.status === "active");
  if (child) {
    mergeAssessmentsIntoSubjectList(child.subjects, subjectName, teacherName, assessments);
  }
};

export const approveSubmission = (submission, approverName) => {
  submission.status = "APPROVED";
  submission.decidedBy = approverName;
  submission.decidedAt = new Date().toISOString().split("T")[0];
  submission.entries.forEach((entry) => {
    publishEntryToPortals(entry.studentName, submission.subject, submission.teacherName, entry.assessments);
  });
};

export const rejectSubmission = (submission, approverName, note) => {
  submission.status = "REJECTED";
  submission.decidedBy = approverName;
  submission.decidedAt = new Date().toISOString().split("T")[0];
  submission.rejectionNote = note || null;
};
