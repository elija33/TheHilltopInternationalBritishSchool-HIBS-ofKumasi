// Two separate approval queues, mirroring the existing pendingCorrections
// pattern: a request sits here — untouched by the real data arrays — until
// someone with authority approves or rejects it.
//
// headmasterApprovalQueue — SubAdmin changes to Headmaster records
// (create/edit/delete, including class oversight assignment) wait here for
// ADMIN approval, per "it should be approved by the admin before they can
// have access to the headmaster page."
//
// pendingAccountRequests — SubAdmin-created Teacher/Student/Parent accounts
// wait here for HEADMASTER approval. Only account *creation* is gated, not
// every edit, matching "approve all the teachers, students and parents
// account create by subadmin."
//
// A record never exists in the real array (teacherRecords / students /
// parents / headmasters) until approved — so a pending Teacher genuinely
// cannot log in, not just "exists but blocked."

export const headmasterApprovalQueue = [
  {
    id: "hmq-1",
    action: "CREATE",
    targetId: null,
    proposedData: {
      name: "Mrs Comfort Antwi",
      title: "Assistant Headmistress",
      email: "c.antwi@hibs.edu.gh",
      phone: "+233 24 000 3333",
      bio: "Proposed as an additional headmistress to support oversight as the school grows.",
      classes: [],
    },
    requestedBy: "Linda Owusu",
    requestedAt: "2026-09-28",
  },
];

export const pendingAccountRequests = [
  {
    id: "paq-1",
    type: "TEACHER",
    proposedData: {
      title: "Mr.",
      firstName: "Samuel",
      lastName: "Owusu",
      email: "s.owusu@hibs.edu.gh",
      phone: "+233 24 000 4444",
      employmentType: "FULL_TIME",
      startDate: "2026-10-01",
      classTeacherOf: null,
      subjectAssignments: [{ subject: "Mathematics", classes: ["Primary 5"] }],
    },
    requestedBy: "Linda Owusu",
    requestedAt: "2026-09-29",
  },
  {
    id: "paq-2",
    type: "STUDENT",
    proposedData: { name: "Kwesi Appiah", class: "JHS 2A" },
    requestedBy: "Linda Owusu",
    requestedAt: "2026-09-29",
  },
  {
    id: "paq-3",
    type: "PARENT",
    proposedData: {
      name: "Mrs Akua Boateng",
      email: "akua.boateng@gmail.com",
      phone: "+233 24 777 9999",
      children: ["Kwesi Appiah"],
    },
    requestedBy: "Linda Owusu",
    requestedAt: "2026-09-29",
  },
];
