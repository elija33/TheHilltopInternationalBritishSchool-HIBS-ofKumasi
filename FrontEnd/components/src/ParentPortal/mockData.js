// Mock data for the parent portal demo. One parent (Grace Owusu) linked to
// three children, deliberately spread across the edge cases so switching
// between them exercises the full 4.2/4.3 rule set plus the arrears case.

export const parent = { name: "Grace Owusu" };

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

// A real deployment should default this school-wide setting to OFF ("must
// come from a school setting rather than being fixed in the code"). It's
// turned on here only so the demo has something to show: Kwame is flagged
// with arrearsWithheld below, so his report card is withheld while Ama's
// (not flagged) stays a normal download.
export const arrearsPolicyEnabled = true;
export const arrearsMessage =
  "Your child's report card is on hold until the outstanding balance is settled. This does not affect their class placement or daily lessons. Please contact the school office to arrange payment or a payment plan.";

export const children = [
  {
    id: "ama",
    name: "Ama Serwaa Owusu",
    class: "JHS 2B",
    status: "active",
    previousClass: "JHS 2A",
    transferDate: "2026-08-10",
    feeBalance: 0,
    feeDueDate: null,
    arrearsWithheld: false,
    subjects: [
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
          "Includes marks earned in JHS 2A before Ama transferred to JHS 2B on 10 Aug 2026.",
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
    ],
    previousTermSubjects: [
      { id: "math", name: "Mathematics", termMark: 79 },
      { id: "fr", name: "French", termMark: 88 },
    ],
    attendanceDays: [
      { date: "2026-08-10", status: "PRESENT" },
      { date: "2026-08-11", status: "PRESENT" },
      { date: "2026-08-12", status: "LATE" },
      { date: "2026-08-13", status: "ABSENT" },
      { date: "2026-08-14", status: "EXCUSED", note: "Medical appointment" },
      { date: "2026-08-17", status: "HALF_DAY", note: "Left early for a sports fixture" },
      { date: "2026-08-24", status: "HOLIDAY", note: "Founder's Day — school closed" },
      { date: "2026-09-14", status: "NOT_RECORDED" },
      { date: "2026-09-21", status: "PRESENT" },
      { date: "2026-09-28", status: "UPCOMING" },
    ],
    announcements: [
      {
        id: "a2",
        title: "Science project due",
        body: "Bring your ecosystem project models to class on Friday.",
        date: "2026-09-15",
      },
    ],
  },
  {
    id: "kwame",
    name: "Kwame Mensah Owusu",
    class: "Primary 5",
    status: "active",
    feeBalance: 850,
    feeDueDate: "2026-10-01",
    arrearsWithheld: true,
    subjects: [
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
          { name: "Homework 1", weight: 10, max: 20, value: 14, status: "SCORED", classLabel: "Primary 5" },
          {
            name: "Class Test 1",
            weight: 20,
            max: 50,
            value: null,
            status: "NOT_ASSESSED",
            classLabel: "Primary 5",
            note: "Kwame joined this class after this assessment was given.",
          },
          { name: "Mid-Term Exam", weight: 30, max: 100, value: null, status: "ABSENT", classLabel: "Primary 5" },
          { name: "End of Term Exam", weight: 30, max: 100, value: 69, status: "SCORED", classLabel: "Primary 5" },
        ],
      },
    ],
    previousTermSubjects: [
      { id: "eng", name: "English Language", termMark: 66 },
      { id: "sci", name: "Integrated Science", termMark: 72 },
    ],
    attendanceDays: [
      { date: "2026-07-01", status: "PRESENT" },
      { date: "2026-07-02", status: "PRESENT" },
      { date: "2026-07-03", status: "PRESENT" },
      { date: "2026-08-24", status: "HOLIDAY", note: "Founder's Day — school closed" },
      { date: "2026-09-14", status: "NOT_RECORDED" },
      { date: "2026-09-21", status: "PRESENT" },
      { date: "2026-09-28", status: "UPCOMING" },
    ],
    announcements: [
      {
        id: "k1",
        title: "Primary 5 field trip",
        body: "Permission slips for the farm visit are due back by Thursday.",
        date: "2026-09-16",
      },
    ],
  },
  {
    id: "abena",
    name: "Abena Owusu",
    class: "JHS 1A",
    status: "past",
    leftDate: "2025-06-20",
    feeBalance: 0,
    feeDueDate: null,
    arrearsWithheld: false,
    subjects: [
      {
        id: "math",
        name: "Mathematics",
        teacher: "Mr. Kwabena Owusu",
        published: true,
        assessments: [
          { name: "Homework 1", weight: 10, max: 20, value: 18, status: "SCORED", classLabel: "JHS 1A" },
          { name: "Mid-Term Exam", weight: 40, max: 100, value: 80, status: "SCORED", classLabel: "JHS 1A" },
          { name: "End of Term Exam", weight: 50, max: 100, value: 83, status: "SCORED", classLabel: "JHS 1A" },
        ],
      },
    ],
    previousTermSubjects: [],
    attendanceDays: [
      { date: "2026-03-02", status: "PRESENT" },
      { date: "2026-04-10", status: "ABSENT" },
      { date: "2026-06-05", status: "PRESENT" },
    ],
    announcements: [],
  },
];
