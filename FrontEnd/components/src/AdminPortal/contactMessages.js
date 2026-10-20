// Messages submitted through the public Contact Us form. No approval is
// needed here — unlike the account/grade/syllabus queues, a contact message
// isn't granting anyone access to anything, it's just mail for the School
// Office to read and action.
//
// This store is backed by localStorage rather than a plain in-memory array,
// unlike the rest of this mock app. Every other queue only ever needs to be
// seen by whoever is already looking at the one browser tab that changed
// it, but a contact message is submitted by a visitor in one tab and must
// reach an admin in a completely different tab (or browser session) —
// plain module state can't cross that boundary, since each tab runs its
// own separate copy of the JS. localStorage is shared per browser profile,
// so it survives refreshes and is visible to every tab on this origin.

const STORAGE_KEY = "hibs_contact_messages";

const seed = [
  {
    id: "msg-1",
    fullName: "Grace Owusu",
    email: "grace.owusu@gmail.com",
    phone: "+233 24 555 0142",
    childName: "Ama Serwaa Owusu",
    classApplyingFor: "",
    message:
      "Hi, I'd like to know the fee breakdown for JHS 2 before Term 2 starts. Thank you.",
    submittedAt: "2026-10-12",
    read: false,
  },
];

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Private browsing / storage disabled — fall through to the seed below.
  }
  return seed;
};

export const contactMessages = load();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactMessages));
  } catch {
    // If storage is unavailable, changes just won't survive a refresh or
    // reach another tab — the in-memory list still works for this tab.
  }
};

export const nextContactMessageId = () => `msg-${Date.now()}`;

export const addContactMessage = (msg) => {
  contactMessages.unshift(msg);
  persist();
};

export const updateContactMessage = (id, updates) => {
  const msg = contactMessages.find((m) => m.id === id);
  if (msg) Object.assign(msg, updates);
  persist();
};

export const deleteContactMessage = (id) => {
  const idx = contactMessages.findIndex((m) => m.id === id);
  if (idx !== -1) contactMessages.splice(idx, 1);
  persist();
};

// The browser fires a native "storage" event in every OTHER tab on this
// origin (never the tab that made the change) whenever localStorage is
// written — this is what lets an admin already sitting on the Messages
// page see a new submission land live, without needing to navigate away
// and back or refresh.
export const subscribeToContactMessages = (callback) => {
  const handler = (e) => {
    if (e.key !== STORAGE_KEY) return;
    const next = load();
    contactMessages.length = 0;
    contactMessages.push(...next);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
