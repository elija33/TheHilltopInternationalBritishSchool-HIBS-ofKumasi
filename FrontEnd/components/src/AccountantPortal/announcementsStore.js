// Announcements posted by the Accountant. Unlike AdminPortal/announcements.js
// (the public "main_page" news feed), these are a separate, parent-only
// channel — they never appear on /news or any other portal, only on the
// Parent Portal, per "the accountant should be able to post an announcement
// to the parents page only."
//
// localStorage-backed for the same reason as tuitionStore.js: the
// accountant posts from one browser tab and the parent reads it from
// another.

const STORAGE_KEY = "hibs_accountant_parent_announcements";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Private browsing / storage disabled — fall through to an empty list.
  }
  return [];
};

export const parentAnnouncements = load();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parentAnnouncements));
  } catch {
    // If storage is unavailable, changes just won't survive a refresh or
    // reach another tab — the in-memory list still works for this tab.
  }
};

export const nextParentAnnouncementId = () => `pann-${Date.now()}`;

export const addParentAnnouncement = (announcement) => {
  parentAnnouncements.unshift(announcement);
  persist();
};

export const updateParentAnnouncement = (id, updates) => {
  const announcement = parentAnnouncements.find((a) => a.id === id);
  if (announcement) Object.assign(announcement, updates);
  persist();
};

export const deleteParentAnnouncement = (id) => {
  const idx = parentAnnouncements.findIndex((a) => a.id === id);
  if (idx !== -1) parentAnnouncements.splice(idx, 1);
  persist();
};

export const subscribeToParentAnnouncements = (callback) => {
  const handler = (e) => {
    if (e.key !== STORAGE_KEY) return;
    const next = load();
    parentAnnouncements.length = 0;
    parentAnnouncements.push(...next);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
