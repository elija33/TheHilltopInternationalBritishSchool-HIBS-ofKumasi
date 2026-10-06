// No real backend/auth exists, so "who's logged in" is just remembered in
// localStorage between the login page and the dashboard, same pattern as
// TeacherPortal/session.js.
const KEY = "hibs_logged_in_subadmin_id";

export const setLoggedInSubAdminId = (id) => {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // ignore — e.g. private browsing with storage disabled
  }
};

export const getLoggedInSubAdminId = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
