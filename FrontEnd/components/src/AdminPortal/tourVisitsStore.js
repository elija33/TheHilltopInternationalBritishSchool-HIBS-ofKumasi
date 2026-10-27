// Visit requests submitted through the public Tours & Open Days form.
// Named "tourVisitsStore" (not "tourVisits") to avoid the case-insensitive
// filesystem collision that bit applications.js/Applications.jsx earlier —
// no component should ever share this exact name.
//
// Like contactMessages.js, no approval step is needed — a visit request
// isn't granting anyone access, it's just a scheduling request for the
// School Office to read and action. Both Admin and Sub Admin can see and
// mark/delete these, same shared-visibility model as Announcements.
//
// localStorage-backed for the same reason as contactMessages.js: a visitor
// submits from one browser tab and the dashboards live in another.

const STORAGE_KEY = "hibs_tour_visits";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Private browsing / storage disabled — fall through to an empty list.
  }
  return [];
};

export const tourVisits = load();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tourVisits));
  } catch {
    // If storage is unavailable, changes just won't survive a refresh or
    // reach another tab — the in-memory list still works for this tab.
  }
};

export const nextTourVisitId = () => `visit-${Date.now()}`;

export const addTourVisit = (visit) => {
  tourVisits.unshift(visit);
  persist();
};

export const updateTourVisit = (id, updates) => {
  const visit = tourVisits.find((v) => v.id === id);
  if (visit) Object.assign(visit, updates);
  persist();
};

export const deleteTourVisit = (id) => {
  const idx = tourVisits.findIndex((v) => v.id === id);
  if (idx !== -1) tourVisits.splice(idx, 1);
  persist();
};

export const subscribeToTourVisits = (callback) => {
  const handler = (e) => {
    if (e.key !== STORAGE_KEY) return;
    const next = load();
    tourVisits.length = 0;
    tourVisits.push(...next);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
