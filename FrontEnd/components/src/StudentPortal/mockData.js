// Mock data for the student portal demo.
// Ama transferred from JHS 2A into JHS 2B mid-term — this single event is used to
// demonstrate both the "marks from a previous class" (4.2) and "joined mid-term"
// (4.3) edge cases with one coherent story.

export const student = {
  name: "Ama Serwaa Owusu",
  studentId: "HIBS-2024-0231",
  currentClass: "JHS 2B",
  previousClass: "JHS 2A",
  transferDate: "2026-08-10",
  today: "2026-09-21",
};

export const currentTerm = {
  id: "term-1-2026",
  label: "Term 1, 2026/2027",
  startDate: "2026-07-01",
  endDate: "2026-10-16",
};

export const previousTerm = {
  id: "term-3-2025",
  label: "Term 3, 2025/2026",
  startDate: "2026-03-02",
  endDate: "2026-06-05",
};

export const settings = {
  // Class rankings are off by default; a school turns this on explicitly.
  classRankingsEnabled: false,
};

// Announcements carry an `audience` so student-facing views can filter out
// anything meant only for parents (e.g. fee reminders) — the portal must
// never surface fee information to a student, even inside an announcement feed.
export const announcements = [
  {
    id: "a1",
    audience: "school",
    title: "Founder's Day — Monday 24 August",
    body: "School will be closed for Founder's Day. Boarding students remain on campus.",
    date: "2026-08-18",
  },
  {
    id: "a2",
    audience: "class",
    class: "JHS 2B",
    title: "Science project due",
    body: "Bring your ecosystem project models to class on Friday.",
    date: "2026-09-15",
  },
  {
    id: "a3",
    audience: "class",
    class: "JHS 2B",
    title: "Inter-house sports trials",
    body: "Trials for the inter-house athletics meet start next week after classes.",
    date: "2026-09-18",
  },
  // Not shown to students — filtered out by audience in Home.jsx.
  {
    id: "a4",
    audience: "parents_fees",
    class: "JHS 2B",
    title: "Term 1 fee balance reminder",
    body: "A reminder is available in the parent portal regarding outstanding balances.",
    date: "2026-09-10",
  },
];

// term mark is computed in Grades.jsx from the assessments below, so the
// numbers on screen always match the underlying data.
export const subjects = [
  {
    id: "math",
    name: "Mathematics",
    teacher: "Mr. Kwabena Owusu",
    published: true,
    assessments: [
      { name: "Homework 1", weight: 10, max: 20, value: 15, status: "SCORED", classLabel: "JHS 2A" },
      { name: "Class Test 1", weight: 20, max: 50, value: 44, status: "SCORED", classLabel: "JHS 2A" },
      { name: "Homework 2", weight: 10, max: 20, value: 19, status: "SCORED", classLabel: "JHS 2B" },
      { name: "Mid-Term Exam", weight: 30, max: 100, value: 78, status: "SCORED", classLabel: "JHS 2B" },
      { name: "End of Term Exam", weight: 30, max: 100, value: 84, status: "SCORED", classLabel: "JHS 2B" },
    ],
    crossClassNote:
      "Includes marks earned in JHS 2A before you transferred to JHS 2B on 10 Aug 2026.",
  },
  {
    id: "eng",
    name: "English Language",
    teacher: "Mrs. Adjoa Mensah",
    published: false,
    publishExpected: "2026-10-20",
    assessments: [],
  },
  {
    id: "sci",
    name: "Integrated Science",
    teacher: "Mr. Yaw Boateng",
    published: true,
    assessments: [
      { name: "Homework 1", weight: 10, max: 20, value: 18, status: "SCORED", classLabel: "JHS 2B" },
      {
        name: "Class Test 1",
        weight: 20,
        max: 50,
        value: null,
        status: "NOT_ASSESSED",
        classLabel: "JHS 2B",
        note: "You joined this class after this assessment was given.",
      },
      { name: "Mid-Term Exam", weight: 30, max: 100, value: 66, status: "SCORED", classLabel: "JHS 2B" },
      { name: "End of Term Exam", weight: 30, max: 100, value: 71, status: "SCORED", classLabel: "JHS 2B" },
    ],
  },
  {
    id: "socstud",
    name: "Social Studies",
    teacher: "Ms. Efua Asante",
    published: true,
    assessments: [
      { name: "Homework 1", weight: 10, max: 20, value: 16, status: "SCORED", classLabel: "JHS 2B" },
      { name: "Class Test 1", weight: 20, max: 50, value: 40, status: "SCORED", classLabel: "JHS 2B" },
      { name: "Mid-Term Exam", weight: 30, max: 100, value: null, status: "ABSENT", classLabel: "JHS 2B" },
      { name: "End of Term Exam", weight: 30, max: 100, value: 74, status: "SCORED", classLabel: "JHS 2B" },
    ],
  },
  {
    id: "fr",
    name: "French",
    teacher: "Mme. Akosua Darko",
    published: true,
    assessments: [
      { name: "Homework 1", weight: 10, max: 20, value: 17, status: "SCORED", classLabel: "JHS 2B" },
      {
        name: "Class Test 1",
        weight: 20,
        max: 50,
        value: 47,
        status: "SCORED",
        classLabel: "JHS 2B",
        corrected: true,
        correctedDate: "2026-09-05",
      },
      { name: "Mid-Term Exam", weight: 30, max: 100, value: 81, status: "SCORED", classLabel: "JHS 2B" },
      { name: "End of Term Exam", weight: 30, max: 100, value: 88, status: "SCORED", classLabel: "JHS 2B" },
    ],
  },
];

export const classPosition = { rank: 4, classSize: 28 };

// Simplified read-only snapshot for a past, already-closed term.
export const previousTermSubjects = [
  { id: "math", name: "Mathematics", termMark: 79 },
  { id: "eng", name: "English Language", termMark: 74 },
  { id: "sci", name: "Integrated Science", termMark: 82 },
  { id: "socstud", name: "Social Studies", termMark: 70 },
  { id: "fr", name: "French", termMark: 88 },
];

// Attendance is only tracked from the day Ama joined JHS 2B — days before that
// belonged to her old class and are not part of this class's record.
export const attendanceDays = [
  { date: "2026-08-10", status: "PRESENT" },
  { date: "2026-08-11", status: "PRESENT" },
  { date: "2026-08-12", status: "LATE" },
  { date: "2026-08-13", status: "ABSENT" },
  { date: "2026-08-14", status: "EXCUSED", note: "Medical appointment" },
  { date: "2026-08-17", status: "HALF_DAY", note: "Left early for a sports fixture" },
  { date: "2026-08-18", status: "PRESENT" },
  { date: "2026-08-19", status: "PRESENT" },
  { date: "2026-08-24", status: "HOLIDAY", note: "Founder's Day — school closed" },
  { date: "2026-08-25", status: "PRESENT" },
  { date: "2026-09-07", status: "PRESENT" },
  { date: "2026-09-14", status: "NOT_RECORDED" },
  { date: "2026-09-21", status: "PRESENT" },
  { date: "2026-09-28", status: "UPCOMING" },
];

export const syllabus = [
  {
    subject: "Mathematics",
    teacher: "Mr. Kwabena Owusu",
    updatedAt: "2026-08-03",
    type: "document",
    expired: false,
  },
  {
    subject: "English Language",
    teacher: "Mrs. Adjoa Mensah",
    updatedAt: "2026-07-28",
    type: "text",
    content:
      "Term 1 covers narrative writing, comprehension strategies, and an introduction to persuasive essays. Weekly vocabulary lists are shared in class.",
  },
  {
    subject: "Integrated Science",
    teacher: "Mr. Yaw Boateng",
    updatedAt: null,
    type: "none",
  },
  {
    subject: "Social Studies",
    teacher: "Ms. Efua Asante",
    updatedAt: "2026-08-15",
    type: "document",
    expired: true,
  },
  {
    subject: "French",
    teacher: "Mme. Akosua Darko",
    updatedAt: "2026-08-01",
    type: "document",
    expired: false,
  },
];

export const profile = {
  fullName: student.name,
  studentId: student.studentId,
  currentClass: student.currentClass,
  enrollmentDate: "2024-09-02",
  phone: "",
  emergencyContactName: "Grace Owusu (Mother)",
  emergencyContactPhone: "+233 24 555 0142",
};
