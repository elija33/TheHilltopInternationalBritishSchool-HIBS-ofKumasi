const KEY = "hibs_logged_in_headmaster_id";

export const setLoggedInHeadmasterId = (id) => {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // ignore — e.g. private browsing with storage disabled
  }
};

export const getLoggedInHeadmasterId = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
