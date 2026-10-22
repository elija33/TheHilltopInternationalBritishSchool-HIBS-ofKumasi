// Photos for the homepage "Why HIBS" cards. Sub Admin uploads sit here as
// PENDING until Admin approves or rejects them (same queue-until-approved
// shape as the grade/syllabus submissions); Admin's own uploads publish
// immediately. Backed by localStorage rather than a plain array — same
// reason as contactMessages.js: a submission is made in one browser tab
// (Sub Admin) and must reach a different tab (Admin) to be approved, which
// plain module state can't do across tabs.
const STORAGE_KEY = "hibs_why_hibs_photo_submissions";

export const CARDS_META = [
  { key: "teachers", label: "Teachers & Classes" },
  { key: "labs", label: "Science & Computer Labs" },
  { key: "sports", label: "Sports & Clubs" },
  { key: "igcse", label: "Cambridge IGCSE" },
];

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Private browsing / storage disabled — fall through to an empty list.
  }
  return [];
};

export const photoSubmissions = load();

const persist = () => {
  // Unlike contactMessages.js, this does NOT silently swallow failures —
  // an image is large enough that hitting the storage quota is a real
  // possibility, and the caller needs to know so it can tell the uploader
  // instead of quietly losing their submission.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photoSubmissions));
};

const today = () => new Date().toISOString().split("T")[0];

export const nextPhotoSubmissionId = () => `wp-${Date.now()}`;

export const getApprovedPhotoForCard = (cardKey) => {
  const approved = photoSubmissions.filter(
    (s) => s.cardKey === cardKey && s.status === "APPROVED",
  );
  if (approved.length === 0) return null;
  return approved[approved.length - 1].imageDataUrl;
};

export const submitPhotoForApproval = ({ cardKey, cardLabel, imageDataUrl, submittedBy }) => {
  photoSubmissions.push({
    id: nextPhotoSubmissionId(),
    cardKey,
    cardLabel,
    imageDataUrl,
    submittedBy,
    submittedAt: today(),
    status: "PENDING",
    decidedBy: null,
    decidedAt: null,
    rejectionNote: null,
  });
  persist();
};

export const publishPhotoDirectly = ({ cardKey, cardLabel, imageDataUrl, publishedBy }) => {
  photoSubmissions.push({
    id: nextPhotoSubmissionId(),
    cardKey,
    cardLabel,
    imageDataUrl,
    submittedBy: publishedBy,
    submittedAt: today(),
    status: "APPROVED",
    decidedBy: publishedBy,
    decidedAt: today(),
    rejectionNote: null,
  });
  persist();
};

export const cancelPhotoSubmission = (id) => {
  const idx = photoSubmissions.findIndex((s) => s.id === id);
  if (idx !== -1) photoSubmissions.splice(idx, 1);
  persist();
};

export const approvePhotoSubmission = (id, approverName) => {
  const s = photoSubmissions.find((x) => x.id === id);
  if (!s) return;
  s.status = "APPROVED";
  s.decidedBy = approverName;
  s.decidedAt = today();
  persist();
};

export const rejectPhotoSubmission = (id, approverName, note) => {
  const s = photoSubmissions.find((x) => x.id === id);
  if (!s) return;
  s.status = "REJECTED";
  s.decidedBy = approverName;
  s.decidedAt = today();
  s.rejectionNote = note;
  persist();
};

// Puts a card's "PHOTO: ..." placeholder back by retiring its current
// approved submission — the old photo stays in the history below as a
// rejected entry rather than disappearing silently.
export const revertToPlaceholder = (cardKey, actorName) => {
  photoSubmissions
    .filter((s) => s.cardKey === cardKey && s.status === "APPROVED")
    .forEach((s) => {
      s.status = "REJECTED";
      s.decidedBy = actorName;
      s.decidedAt = today();
      s.rejectionNote = "Reverted to placeholder by admin.";
    });
  persist();
};

export const subscribeToWhyHibsPhotos = (callback) => {
  const handler = (e) => {
    if (e.key !== STORAGE_KEY) return;
    const next = load();
    photoSubmissions.length = 0;
    photoSubmissions.push(...next);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
