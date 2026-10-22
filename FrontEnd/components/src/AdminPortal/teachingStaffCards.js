// Public "Teaching Staff" page roster. Sub Admin's create/edit/delete
// requests sit in `teachingStaffSubmissions` as PENDING until Admin
// approves or rejects them — same action/targetId/proposedData shape as
// the Headmaster approval queue (approvals.js). Admin's own changes apply
// directly to `teachingStaffCards`. Both lists are localStorage-backed so
// a request made in one tab (Sub Admin) is visible for approval in
// another (Admin).
const CARDS_KEY = "hibs_teaching_staff_cards";
const SUBMISSIONS_KEY = "hibs_teaching_staff_submissions";

export const CATEGORY_LIST = [
  "Mathematics",
  "Arts & PE",
  "Sciences",
  "ICT",
  "Humanities & Business",
  "Languages",
];

const SEED_CARDS = [
  { id: "ts-1", name: "Adomako Pius", subject: "Mathematics", category: "Mathematics", degree: "B.Sc. Mathematics, University of Education, Winneba", badge: "", photoDataUrl: null },
  { id: "ts-2", name: "Baba Banda Awudu", subject: "Art", category: "Arts & PE", degree: "B.A. Art Education, University of Education, Winneba", badge: "", photoDataUrl: null },
  { id: "ts-3", name: "Bright Arhin", subject: "Integrated Science", category: "Sciences", degree: "B.Sc. Integrated Science Education", badge: "", photoDataUrl: null },
  { id: "ts-4", name: "Dennis Afrane Darko", subject: "ICT", category: "ICT", degree: "M.Tech. Computer Science & Engineering, Vivekananda Institute of Technology, Jaipur, India", badge: "Safeguarding Officer", photoDataUrl: null },
  { id: "ts-5", name: "Dennis Frimpong Agyapong", subject: "Biology", category: "Sciences", degree: "B.Ed. Biology & Chemistry, University of Education, Winneba", badge: "", photoDataUrl: null },
  { id: "ts-6", name: "Edward Kwabena Osei", subject: "Geography", category: "Humanities & Business", degree: "B.A. Geography Education, University of Education, Winneba", badge: "", photoDataUrl: null },
  { id: "ts-7", name: "Emmanuel Agyei", subject: "Statistics", category: "Mathematics", degree: "B.Sc. Actuarial Science, University for Development Studies", badge: "", photoDataUrl: null },
  { id: "ts-8", name: "Faustina Nkum", subject: "Economics · Global Perspectives", category: "Humanities & Business", degree: "B.A. Economics Education, University of Education, Winneba", badge: "", photoDataUrl: null },
  { id: "ts-9", name: "Gabriel Dampson", subject: "Accounting", category: "Humanities & Business", degree: "B.Ed. Accounting Education, University of Cape Coast", badge: "", photoDataUrl: null },
  { id: "ts-10", name: "Joseph Boateng", subject: "PE Theory & Sports", category: "Arts & PE", degree: "B.Sc. Physical Education", badge: "", photoDataUrl: null },
  { id: "ts-11", name: "Kwame Boakye Yeboah", subject: "Extended, Additional & Pure Maths", category: "Mathematics", degree: "B.Sc. Mathematics", badge: "", photoDataUrl: null },
  { id: "ts-12", name: "Linda Adu-Mensah", subject: "Mathematics · Business", category: "Mathematics", degree: "M.Sc. Public Administration", badge: "", photoDataUrl: null },
  { id: "ts-13", name: "Mathias Kouyoli Koupokpa", subject: "French", category: "Languages", degree: "M.A. French Language", badge: "Safeguarding Officer", photoDataUrl: null },
  { id: "ts-14", name: "Matilda Osei Kuffour", subject: "English", category: "Languages", degree: "B.A. English Education", badge: "", photoDataUrl: null },
  { id: "ts-15", name: "Selom Koffi Assinyo Wilson", subject: "French", category: "Languages", degree: "B.Ed. French Language, University of Education, Winneba", badge: "", photoDataUrl: null },
  { id: "ts-16", name: "Stephen Ankema", subject: "Economics", category: "Humanities & Business", degree: "M.Phil. Economics, Kwame Nkrumah University of Science and Technology", badge: "", photoDataUrl: null },
  { id: "ts-17", name: "Theophilus Opoku Mensah", subject: "Science", category: "Sciences", degree: "Diploma in Nursing, Nursing and Midwifery Training College, Kumasi", badge: "School Nurse", photoDataUrl: null },
  { id: "ts-18", name: "Wisdom Yalley", subject: "Business Studies · Wellbeing", category: "Humanities & Business", degree: "B.Sc. Management Education, AAMUSTED, Kumasi", badge: "", photoDataUrl: null },
];

const loadCards = () => {
  try {
    const raw = localStorage.getItem(CARDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to seed
  }
  return SEED_CARDS;
};

const loadSubmissions = () => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to empty
  }
  return [];
};

export const teachingStaffCards = loadCards();
export const teachingStaffSubmissions = loadSubmissions();

// Deliberately NOT swallowed — a photo makes these large enough that
// hitting the storage quota is real, and the caller needs to know so it
// can tell the person instead of silently losing their change.
const persistCards = () => localStorage.setItem(CARDS_KEY, JSON.stringify(teachingStaffCards));
const persistSubmissions = () =>
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(teachingStaffSubmissions));

const today = () => new Date().toISOString().split("T")[0];

export const nextCardId = () => `ts-${Date.now()}`;
export const nextSubmissionId = () => `tss-${Date.now()}`;

// ---- Admin: direct actions, no approval needed ----
export const createCardDirectly = (data) => {
  teachingStaffCards.push({ id: nextCardId(), ...data });
  persistCards();
};

export const editCardDirectly = (id, data) => {
  const c = teachingStaffCards.find((x) => x.id === id);
  if (c) Object.assign(c, data);
  persistCards();
};

export const deleteCardDirectly = (id) => {
  const idx = teachingStaffCards.findIndex((x) => x.id === id);
  if (idx !== -1) teachingStaffCards.splice(idx, 1);
  persistCards();
};

// ---- Sub Admin: proposals requiring Admin approval ----
const pushSubmission = (action, targetId, proposedData, requestedBy) => {
  teachingStaffSubmissions.push({
    id: nextSubmissionId(),
    action,
    targetId,
    proposedData,
    requestedBy,
    requestedAt: today(),
    status: "PENDING",
    decidedBy: null,
    decidedAt: null,
    rejectionNote: null,
  });
  persistSubmissions();
};

export const proposeCreate = (data, requestedBy) => pushSubmission("CREATE", null, data, requestedBy);
export const proposeEdit = (targetId, data, requestedBy) =>
  pushSubmission("EDIT", targetId, data, requestedBy);
export const proposeDelete = (targetId, requestedBy) =>
  pushSubmission("DELETE", targetId, null, requestedBy);

export const cancelSubmission = (id) => {
  const idx = teachingStaffSubmissions.findIndex((s) => s.id === id);
  if (idx !== -1) teachingStaffSubmissions.splice(idx, 1);
  persistSubmissions();
};

// ---- Admin: approve/reject a Sub Admin proposal ----
export const approveSubmission = (id, approverName) => {
  const s = teachingStaffSubmissions.find((x) => x.id === id);
  if (!s) return;

  if (s.action === "CREATE") {
    teachingStaffCards.push({ id: nextCardId(), ...s.proposedData });
  } else if (s.action === "EDIT") {
    const c = teachingStaffCards.find((x) => x.id === s.targetId);
    if (c) Object.assign(c, s.proposedData);
  } else if (s.action === "DELETE") {
    const idx = teachingStaffCards.findIndex((x) => x.id === s.targetId);
    if (idx !== -1) teachingStaffCards.splice(idx, 1);
  }

  s.status = "APPROVED";
  s.decidedBy = approverName;
  s.decidedAt = today();
  persistCards();
  persistSubmissions();
};

export const rejectSubmission = (id, approverName, note) => {
  const s = teachingStaffSubmissions.find((x) => x.id === id);
  if (!s) return;
  s.status = "REJECTED";
  s.decidedBy = approverName;
  s.decidedAt = today();
  s.rejectionNote = note;
  persistSubmissions();
};

export const subscribeToTeachingStaff = (callback) => {
  const handler = (e) => {
    if (e.key !== CARDS_KEY && e.key !== SUBMISSIONS_KEY) return;
    const nextCards = loadCards();
    teachingStaffCards.length = 0;
    teachingStaffCards.push(...nextCards);
    const nextSubs = loadSubmissions();
    teachingStaffSubmissions.length = 0;
    teachingStaffSubmissions.push(...nextSubs);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
