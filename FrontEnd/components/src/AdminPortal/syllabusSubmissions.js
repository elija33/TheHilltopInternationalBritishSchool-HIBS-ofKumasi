// End-of-term syllabus submissions, filed by a subject teacher and sitting
// here untouched until a Headmaster who oversees that class approves them —
// same queue-until-approved shape as gradeSubmissions.js. A syllabus is not
// visible to anyone until someone with authority over that class has signed
// off on it, and once submitted a teacher can't silently change it — only
// resubmit after a rejection.
import { syllabus as studentSyllabus, student as demoStudent } from "../StudentPortal/mockData";
import { children as parentChildren } from "../ParentPortal/mockData";

export const syllabusSubmissions = [
  {
    id: "ssub-1",
    class: "JHS 2B",
    subject: "Integrated Science",
    teacherId: "t3",
    teacherName: "Mr. Yaw Boateng",
    content:
      "Term 1 covers ecosystems, forces and simple machines. An ecosystem project (models due mid-term) anchors the practical component, alongside weekly lab write-ups.",
    submittedAt: "2026-10-05",
    status: "PENDING",
    decidedBy: null,
    decidedAt: null,
    rejectionNote: null,
  },
  {
    id: "ssub-2",
    class: "Primary 5",
    subject: "English Language",
    teacherId: "t2",
    teacherName: "Mrs. Adjoa Mensah",
    content:
      "Term 1 focuses on narrative writing, comprehension strategies, and building a weekly vocabulary list through guided reading.",
    submittedAt: "2026-10-06",
    status: "PENDING",
    decidedBy: null,
    decidedAt: null,
    rejectionNote: null,
  },
];

export const nextSyllabusSubmissionId = () => `ssub-${Date.now()}`;

const mergeIntoSyllabusList = (list, subjectName, teacherName, content, date) => {
  const existing = list.find((s) => s.subject === subjectName);
  if (existing) {
    existing.type = "text";
    existing.content = content;
    existing.updatedAt = date;
    existing.expired = false;
  } else {
    list.push({ subject: subjectName, teacher: teacherName, updatedAt: date, type: "text", content });
  }
};

// Publishes to the one demo student only if the submission's class matches
// their current class, and to a parent's child only if that child is the
// one actually in that class and still active — a past student's closed
// record is never touched, and no other classmate's view is ever reached.
const publishSyllabusToPortals = (submission) => {
  if (submission.class === demoStudent.currentClass) {
    mergeIntoSyllabusList(
      studentSyllabus,
      submission.subject,
      submission.teacherName,
      submission.content,
      submission.decidedAt,
    );
  }
  parentChildren
    .filter((c) => c.status === "active" && c.class === submission.class)
    .forEach((c) => {
      if (!c.syllabus) c.syllabus = [];
      mergeIntoSyllabusList(c.syllabus, submission.subject, submission.teacherName, submission.content, submission.decidedAt);
    });
};

export const approveSyllabusSubmission = (submission, approverName) => {
  submission.status = "APPROVED";
  submission.decidedBy = approverName;
  submission.decidedAt = new Date().toISOString().split("T")[0];
  publishSyllabusToPortals(submission);
};

export const rejectSyllabusSubmission = (submission, approverName, note) => {
  submission.status = "REJECTED";
  submission.decidedBy = approverName;
  submission.decidedAt = new Date().toISOString().split("T")[0];
  submission.rejectionNote = note || null;
};
