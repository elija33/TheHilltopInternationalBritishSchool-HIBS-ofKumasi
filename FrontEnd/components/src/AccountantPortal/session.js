const KEY = "hibs_logged_in_accountant_id";

export const setLoggedInAccountantId = (id) => {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // ignore — e.g. private browsing with storage disabled
  }
};

export const getLoggedInAccountantId = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
