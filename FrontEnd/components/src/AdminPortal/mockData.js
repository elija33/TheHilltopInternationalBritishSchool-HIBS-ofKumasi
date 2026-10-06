// Mock data for the admin dashboard demo. Ties into the same families and
// classes already used in the Student, Parent and Teacher portals — e.g. the
// two "Absent" marks seeded there (Kwame's Science mid-term, Ama's Social
// Studies mid-term) show up here as the pending correction requests a
// teacher would actually file to fix them.

export const admin = { name: "School Office" };

export const currentTerm = {
  id: "term-1-2026",
  label: "Term 1, 2026/2027",
  publishedAt: null, // whole-term publish is not used — see subjectPublishing
};

export const students = [
  { name: "Ama Serwaa Owusu", class: "JHS 2B", status: "active" },
  { name: "Kwabena Asante", class: "JHS 2B", status: "active" },
  { name: "Efua Mensah", class: "JHS 2B", status: "active" },
  { name: "Yaw Darko", class: "JHS 2B", status: "active" },
  { name: "Abena Boateng", class: "JHS 2B", status: "active" },
  { name: "Kojo Appiah", class: "JHS 2B", status: "active" },
  { name: "Akosua Frimpong", class: "JHS 2A", status: "active" },
  { name: "Nana Yaw Sarpong", class: "JHS 2A", status: "active" },
  { name: "Adjoa Antwi", class: "JHS 2A", status: "active" },
  { name: "Kwesi Bonsu", class: "JHS 2A", status: "active" },
  { name: "Maame Serwaa", class: "JHS 2A", status: "active" },
  { name: "Kofi Owusu", class: "JHS 2A", status: "active" },
  { name: "Kwame Mensah Owusu", class: "Primary 5", status: "active" },
  { name: "Abena Owusu", class: "JHS 1A", status: "past" },
];

export const teachers = [
  { name: "Mr. Kwabena Owusu", subject: "Mathematics", email: "k.owusu@hibs.edu.gh" },
  { name: "Mrs. Adjoa Mensah", subject: "English Language", email: "a.mensah@hibs.edu.gh" },
  { name: "Mr. Yaw Boateng", subject: "Integrated Science", email: "y.boateng@hibs.edu.gh" },
  { name: "Ms. Efua Asante", subject: "Social Studies", email: "e.asante@hibs.edu.gh" },
  { name: "Mme. Akosua Darko", subject: "French", email: "a.darko@hibs.edu.gh" },
];

// Linked to the same family already used across the Parent Portal demo.
export const parents = [
  {
    name: "Grace Owusu",
    email: "grace.owusu@gmail.com",
    phone: "+233 24 555 0142",
    children: ["Ama Serwaa Owusu", "Kwame Mensah Owusu", "Abena Owusu"],
  },
];

// Sub-admins can only create/view Students and Parents — see
// SubAdminPortal/. Access is controlled here: only ACTIVE sub-admins can log
// in, and the School Office can revoke access at any time by flipping this.
export const subAdmins = [
  {
    id: "sa1",
    name: "Linda Owusu",
    email: "l.owusu@hibs.edu.gh",
    status: "ACTIVE",
    createdAt: "2026-02-10",
  },
];

// A school-wide default. A real deployment should ship this OFF; it's
// turned on here only for the demo, same as in the parent portal's mock data.
export const arrearsPolicyEnabled = true;
export const arrearsMessage =
  "Your child's report card is on hold until the outstanding balance is settled. This does not affect their class placement or daily lessons. Please contact the school office to arrange payment or a payment plan.";

export const classRankingsEnabled = false;

export const subjectPublishing = [
  { id: "jhs2b-math", class: "JHS 2B", subject: "Mathematics", published: true },
  {
    id: "jhs2b-eng",
    class: "JHS 2B",
    subject: "English Language",
    published: false,
    expected: "2026-10-20",
  },
  { id: "jhs2b-sci", class: "JHS 2B", subject: "Integrated Science", published: true },
  { id: "jhs2b-socstud", class: "JHS 2B", subject: "Social Studies", published: true },
  { id: "jhs2b-fr", class: "JHS 2B", subject: "French", published: true },
  {
    id: "p5-eng",
    class: "Primary 5",
    subject: "English Language",
    published: false,
    expected: "2026-10-20",
  },
  { id: "p5-sci", class: "Primary 5", subject: "Integrated Science", published: true },
];

export const pendingCorrections = [
  {
    id: "gc-1",
    student: "Kwame Mensah Owusu",
    class: "Primary 5",
    subject: "Integrated Science",
    assessment: "Mid-Term Exam",
    currentValue: "Absent",
    requestedValue: "58/100",
    requestedBy: "Mr. Yaw Boateng",
    reason:
      "Student was marked absent in error; an approved makeup exam was taken and graded on 22 Sept 2026.",
  },
  {
    id: "gc-2",
    student: "Ama Serwaa Owusu",
    class: "JHS 2B",
    subject: "Social Studies",
    assessment: "Mid-Term Exam",
    currentValue: "Absent",
    requestedValue: "62/100",
    requestedBy: "Ms. Efua Asante",
    reason:
      "Excused-absence documentation was submitted late; a makeup assessment mark is now available.",
  },
];

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
  {
    id: "a4",
    audience: "parents_fees",
    class: "JHS 2B",
    title: "Term 1 fee balance reminder",
    body: "A reminder is available in the parent portal regarding outstanding balances.",
    date: "2026-09-10",
  },
  {
    id: "k1",
    audience: "class",
    class: "Primary 5",
    title: "Primary 5 field trip",
    body: "Permission slips for the farm visit are due back by Thursday.",
    date: "2026-09-16",
  },
];
