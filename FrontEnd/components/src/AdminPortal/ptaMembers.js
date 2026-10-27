// Public "Our PTA" page executive committee roster. Same
// create/edit/delete-with-approval shape as teachingStaffCards.js: Admin's
// changes apply directly to `ptaMembers`, Sub Admin's sit in
// `ptaSubmissions` as PENDING until Admin approves or rejects them. Both
// lists are localStorage-backed so a request made in one tab (Sub Admin)
// is visible for approval in another (Admin).
const MEMBERS_KEY = "hibs_pta_members";
const SUBMISSIONS_KEY = "hibs_pta_submissions";

const SEED_MEMBERS = [
  {
    id: "pta-1",
    name: "Rev. David Kow Markin",
    role: "PTA Chairperson",
    roleConfirmed: true,
    chairperson: true,
    org: "Senior Associate Pastor of Gracefields Chapel.",
    photoDataUrl: null,
  },
  {
    id: "pta-2",
    name: "Ms. Ama Anim Firempong",
    role: "Treasurer",
    roleConfirmed: true,
    chairperson: false,
    org: "Assistant Registrar, UEW Kumasi campus.",
    photoDataUrl: null,
  },
  {
    id: "pta-3",
    name: "Mr. Ebenezer Aggrey",
    role: "Board of Directors Member",
    roleConfirmed: true,
    chairperson: false,
    org: "Assistant Headmaster, The Hilltop School.",
    photoDataUrl: null,
  },
  {
    id: "pta-4",
    name: "Ms. Edith Worgbeyi",
    role: "",
    roleConfirmed: false,
    chairperson: false,
    org: "",
    photoDataUrl: null,
  },
  {
    id: "pta-5",
    name: "Madam Paulina Agyekum",
    role: "",
    roleConfirmed: false,
    chairperson: false,
    org: "Headmistress, The Hilltop School.",
    photoDataUrl: null,
  },
  {
    id: "pta-6",
    name: "Mr. Samuel Nyamekye",
    role: "",
    roleConfirmed: false,
    chairperson: false,
    org: "",
    photoDataUrl: null,
  },
];

const loadMembers = () => {
  try {
    const raw = localStorage.getItem(MEMBERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to seed
  }
  return SEED_MEMBERS;
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

export const ptaMembers = loadMembers();
export const ptaSubmissions = loadSubmissions();

// Deliberately NOT swallowed — a photo makes these large enough that
// hitting the storage quota is real, and the caller needs to know so it
// can tell the person instead of silently losing their change.
const persistMembers = () => localStorage.setItem(MEMBERS_KEY, JSON.stringify(ptaMembers));
const persistSubmissions = () =>
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(ptaSubmissions));

const today = () => new Date().toISOString().split("T")[0];

export const nextMemberId = () => `pta-${Date.now()}`;
export const nextSubmissionId = () => `ptas-${Date.now()}`;

// ---- Admin: direct actions, no approval needed ----
export const createMemberDirectly = (data) => {
  ptaMembers.push({ id: nextMemberId(), ...data });
  persistMembers();
};

export const editMemberDirectly = (id, data) => {
  const m = ptaMembers.find((x) => x.id === id);
  if (m) Object.assign(m, data);
  persistMembers();
};

export const deleteMemberDirectly = (id) => {
  const idx = ptaMembers.findIndex((x) => x.id === id);
  if (idx !== -1) ptaMembers.splice(idx, 1);
  persistMembers();
};

// ---- Sub Admin: proposals requiring Admin approval ----
const pushSubmission = (action, targetId, proposedData, requestedBy) => {
  ptaSubmissions.push({
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
  const idx = ptaSubmissions.findIndex((s) => s.id === id);
  if (idx !== -1) ptaSubmissions.splice(idx, 1);
  persistSubmissions();
};

// ---- Admin: approve/reject a Sub Admin proposal ----
export const approveSubmission = (id, approverName) => {
  const s = ptaSubmissions.find((x) => x.id === id);
  if (!s) return;

  if (s.action === "CREATE") {
    ptaMembers.push({ id: nextMemberId(), ...s.proposedData });
  } else if (s.action === "EDIT") {
    const m = ptaMembers.find((x) => x.id === s.targetId);
    if (m) Object.assign(m, s.proposedData);
  } else if (s.action === "DELETE") {
    const idx = ptaMembers.findIndex((x) => x.id === s.targetId);
    if (idx !== -1) ptaMembers.splice(idx, 1);
  }

  s.status = "APPROVED";
  s.decidedBy = approverName;
  s.decidedAt = today();
  persistMembers();
  persistSubmissions();
};

export const rejectSubmission = (id, approverName, note) => {
  const s = ptaSubmissions.find((x) => x.id === id);
  if (!s) return;
  s.status = "REJECTED";
  s.decidedBy = approverName;
  s.decidedAt = today();
  s.rejectionNote = note;
  persistSubmissions();
};

export const subscribeToPtaMembers = (callback) => {
  const handler = (e) => {
    if (e.key !== MEMBERS_KEY && e.key !== SUBMISSIONS_KEY) return;
    const nextMembers = loadMembers();
    ptaMembers.length = 0;
    ptaMembers.push(...nextMembers);
    const nextSubs = loadSubmissions();
    ptaSubmissions.length = 0;
    ptaSubmissions.push(...nextSubs);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
