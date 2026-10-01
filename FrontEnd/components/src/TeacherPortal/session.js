// There's no real backend/auth in this demo, so "who is logged in" is just
// remembered in localStorage between the login page and the dashboard.
const KEY = "hibs_logged_in_teacher_id";

export const setLoggedInTeacherId = (id) => {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // ignore — e.g. private browsing with storage disabled
  }
};

export const getLoggedInTeacherId = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
