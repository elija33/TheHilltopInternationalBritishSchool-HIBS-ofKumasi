// Submissions from the public /apply/form wizard. No approval workflow —
// an application isn't approved/rejected in-app, admissions staff follow
// up with the family directly — just a shared inbox so a submitted
// application doesn't vanish into the void. Same localStorage-backed
// pattern as contactMessages.js: a visitor submits in one tab, and an
// admin in a different tab/session needs to see it.
const STORAGE_KEY = "hibs_applications";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Private browsing / storage disabled — fall through to an empty list.
  }
  return [];
};

export const applications = load();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch {
    // If storage is full, the submission still shows for this tab's
    // session — it just won't survive a refresh or reach another tab.
  }
};

export const nextApplicationId = () => `app-${Date.now()}`;

export const addApplication = (application) => {
  applications.unshift(application);
  persist();
};

export const updateApplication = (id, updates) => {
  const app = applications.find((a) => a.id === id);
  if (app) Object.assign(app, updates);
  persist();
};

export const deleteApplication = (id) => {
  const idx = applications.findIndex((a) => a.id === id);
  if (idx !== -1) applications.splice(idx, 1);
  persist();
};

export const subscribeToApplications = (callback) => {
  const handler = (e) => {
    if (e.key !== STORAGE_KEY) return;
    const next = load();
    applications.length = 0;
    applications.push(...next);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
