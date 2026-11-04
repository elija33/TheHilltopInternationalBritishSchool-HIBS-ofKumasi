// Tuition charges posted by the Accountant. Matched to a Parent Portal
// child by studentName (the same name used in AdminPortal/mockData.js's
// `students` list and ParentPortal/mockData.js's `children` list).
//
// localStorage-backed for the same reason as contactMessages.js/
// tourVisitsStore.js: the accountant posts from one browser tab and the
// parent reads it from another.

const STORAGE_KEY = "hibs_tuition_records";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Private browsing / storage disabled — fall through to an empty list.
  }
  return [];
};

export const tuitionRecords = load();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tuitionRecords));
  } catch {
    // If storage is unavailable, changes just won't survive a refresh or
    // reach another tab — the in-memory list still works for this tab.
  }
};

export const nextTuitionId = () => `tuition-${Date.now()}`;

// Every record carries its own amount history — the posted amount plus one
// entry per later change — so a parent can see what an amount was updated
// from/to (e.g. after a payment is recorded), not just its current value.
export const addTuitionRecord = (record) => {
  tuitionRecords.unshift({
    ...record,
    history: [{ date: record.postedAt, amount: record.amount, note: "Posted" }],
  });
  persist();
};

export const updateTuitionRecord = (id, updates) => {
  const record = tuitionRecords.find((r) => r.id === id);
  if (!record) return;

  if (updates.amount !== undefined && Number(updates.amount) !== Number(record.amount)) {
    const history = record.history ? [...record.history] : [];
    history.push({
      date: new Date().toISOString().split("T")[0],
      amount: Number(updates.amount),
      note: `Updated from ₵${Number(record.amount).toLocaleString()}`,
    });
    record.history = history;
  }

  Object.assign(record, updates);
  persist();
};

export const deleteTuitionRecord = (id) => {
  const idx = tuitionRecords.findIndex((r) => r.id === id);
  if (idx !== -1) tuitionRecords.splice(idx, 1);
  persist();
};

export const subscribeToTuitionRecords = (callback) => {
  const handler = (e) => {
    if (e.key !== STORAGE_KEY) return;
    const next = load();
    tuitionRecords.length = 0;
    tuitionRecords.push(...next);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
