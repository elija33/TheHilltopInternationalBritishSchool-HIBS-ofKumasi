// Public "Administrative Staff" page roster. Same create/edit/delete-with-
// approval shape as ptaMembers.js: Admin's changes apply directly to
// `administrativeStaff`, Sub Admin's sit in `administrativeStaffSubmissions`
// as PENDING until Admin approves or rejects them. Both lists are
// localStorage-backed so a request made in one tab (Sub Admin) is visible
// for approval in another (Admin).
//
// Named "administrativeStaffDirectory" (not "administrativeStaff") to avoid
// the case-insensitive filesystem collision that bit
// applications.js/Applications.jsx earlier — no store should ever share its
// exact base name with a component in the same folder.
const STAFF_KEY = "hibs_admin_staff_directory";
const SUBMISSIONS_KEY = "hibs_admin_staff_submissions";

// contactTopics: optional "Title | one-line description" pairs, one per
// line — each becomes a row in the public page's "Who to contact" directory,
// linking back to this person. A member can have none, one, or several.
const SEED_STAFF = [
  {
    id: "staff-1",
    name: "Mr. Patrick Kwesi Essiam",
    positionConfirmed: true,
    position: "Head of School",
    alsoTeaches: "",
    qualifications:
      "B.A. (Hons.) Education, University of Ghana, Legon / King's College London\nPostgraduate Certificate in Education (Educational Management & Administration), Institute of Education, University of London",
    contactTopics: "General school matters | Academic leadership and school life",
    email: "p.essiam@hibs.edu.gh",
    phone: "+233 24 000 1111",
    photoDataUrl: null,
  },
  {
    id: "staff-2",
    name: "Mr. Samuel Nyamekye",
    positionConfirmed: true,
    position: "Assistant Head of School",
    alsoTeaches: "IGCSE Biology",
    qualifications:
      "M.Phil. Human Physiology, Kwame Nkrumah University of Science and Technology\nPhD candidate",
    contactTopics: "Day-to-day academic issues | Classes, timetables and student welfare",
    email: "s.nyamekye@hibs.edu.gh",
    phone: "",
    photoDataUrl: null,
  },
  {
    id: "staff-3",
    name: "Mr. Nicholas Sakyi",
    positionConfirmed: true,
    position: "CAIE Exams Officer, Coordinator, Counsellor",
    alsoTeaches: "Chemistry",
    qualifications: "B.Sc. Chemistry Education, University of Winneba",
    contactTopics:
      "Cambridge exams (IGCSE & A Level) | Registration, timetables and results\nCounselling & university guidance | Subject choices and applications",
    email: "n.sakyi@hibs.edu.gh",
    phone: "",
    photoDataUrl: null,
  },
  {
    id: "staff-4",
    name: "Ms. Abigail Nyarko",
    positionConfirmed: true,
    position: "Administrator",
    alsoTeaches: "",
    qualifications: "",
    contactTopics: "Admissions, records & general enquiries | Applications, documents and school administration",
    email: "",
    phone: "",
    photoDataUrl: null,
  },
  {
    id: "staff-5",
    name: "Ms. Mavis Mawusi Agbakli",
    positionConfirmed: false,
    position: "",
    alsoTeaches: "",
    qualifications: "",
    contactTopics: "",
    email: "",
    phone: "",
    photoDataUrl: null,
  },
];

const loadStaff = () => {
  try {
    const raw = localStorage.getItem(STAFF_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to seed
  }
  return SEED_STAFF;
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

export const administrativeStaff = loadStaff();
export const administrativeStaffSubmissions = loadSubmissions();

// Deliberately NOT swallowed — a photo makes these large enough that
// hitting the storage quota is real, and the caller needs to know so it
// can tell the person instead of silently losing their change.
const persistStaff = () => localStorage.setItem(STAFF_KEY, JSON.stringify(administrativeStaff));
const persistSubmissions = () =>
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(administrativeStaffSubmissions));

const today = () => new Date().toISOString().split("T")[0];

export const nextStaffId = () => `staff-${Date.now()}`;
export const nextSubmissionId = () => `staffs-${Date.now()}`;

// ---- Admin: direct actions, no approval needed ----
export const createStaffDirectly = (data) => {
  administrativeStaff.push({ id: nextStaffId(), ...data });
  persistStaff();
};

export const editStaffDirectly = (id, data) => {
  const m = administrativeStaff.find((x) => x.id === id);
  if (m) Object.assign(m, data);
  persistStaff();
};

export const deleteStaffDirectly = (id) => {
  const idx = administrativeStaff.findIndex((x) => x.id === id);
  if (idx !== -1) administrativeStaff.splice(idx, 1);
  persistStaff();
};

// ---- Sub Admin: proposals requiring Admin approval ----
const pushSubmission = (action, targetId, proposedData, requestedBy) => {
  administrativeStaffSubmissions.push({
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
  const idx = administrativeStaffSubmissions.findIndex((s) => s.id === id);
  if (idx !== -1) administrativeStaffSubmissions.splice(idx, 1);
  persistSubmissions();
};

// ---- Admin: approve/reject a Sub Admin proposal ----
export const approveSubmission = (id, approverName) => {
  const s = administrativeStaffSubmissions.find((x) => x.id === id);
  if (!s) return;

  if (s.action === "CREATE") {
    administrativeStaff.push({ id: nextStaffId(), ...s.proposedData });
  } else if (s.action === "EDIT") {
    const m = administrativeStaff.find((x) => x.id === s.targetId);
    if (m) Object.assign(m, s.proposedData);
  } else if (s.action === "DELETE") {
    const idx = administrativeStaff.findIndex((x) => x.id === s.targetId);
    if (idx !== -1) administrativeStaff.splice(idx, 1);
  }

  s.status = "APPROVED";
  s.decidedBy = approverName;
  s.decidedAt = today();
  persistStaff();
  persistSubmissions();
};

export const rejectSubmission = (id, approverName, note) => {
  const s = administrativeStaffSubmissions.find((x) => x.id === id);
  if (!s) return;
  s.status = "REJECTED";
  s.decidedBy = approverName;
  s.decidedAt = today();
  s.rejectionNote = note;
  persistSubmissions();
};

export const subscribeToAdministrativeStaff = (callback) => {
  const handler = (e) => {
    if (e.key !== STAFF_KEY && e.key !== SUBMISSIONS_KEY) return;
    const nextStaff = loadStaff();
    administrativeStaff.length = 0;
    administrativeStaff.push(...nextStaff);
    const nextSubs = loadSubmissions();
    administrativeStaffSubmissions.length = 0;
    administrativeStaffSubmissions.push(...nextSubs);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
