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

// A submission is either written content (contentType "text") or an
// uploaded file, already converted to PDF client-side before it ever
// reached this queue (contentType "document", carrying documentDataUrl +
// documentName) — see TeacherPortal/syllabusFile.js. A submission with no
// contentType at all (the seeded demo ones below) is treated as "text",
// the only kind that used to exist.
const mergeIntoSyllabusList = (list, submission) => {
  const isDocument = submission.contentType === "document";
  const existing = list.find((s) => s.subject === submission.subject);
  const fields = {
    subject: submission.subject,
    teacher: submission.teacherName,
    updatedAt: submission.decidedAt,
    type: isDocument ? "document" : "text",
    content: isDocument ? null : submission.content,
    documentDataUrl: isDocument ? submission.documentDataUrl : null,
    documentName: isDocument ? submission.documentName : null,
    expired: false,
  };
  if (existing) {
    Object.assign(existing, fields);
  } else {
    list.push(fields);
  }
};

// Publishes to the one demo student only if the submission's class matches
// their current class, and to a parent's child only if that child is the
// one actually in that class and still active — a past student's closed
// record is never touched, and no other classmate's view is ever reached.
const publishSyllabusToPortals = (submission) => {
  if (submission.class === demoStudent.currentClass) {
    mergeIntoSyllabusList(studentSyllabus, submission);
  }
  parentChildren
    .filter((c) => c.status === "active" && c.class === submission.class)
    .forEach((c) => {
      if (!c.syllabus) c.syllabus = [];
      mergeIntoSyllabusList(c.syllabus, submission);
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
