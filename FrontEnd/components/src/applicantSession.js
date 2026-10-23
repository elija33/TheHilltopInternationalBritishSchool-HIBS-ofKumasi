// The "parent account" created/logged into on /apply/account/:type before
// reaching the application form. No real backend or OTP service exists —
// this just records that the mock verification step succeeded, so
// ApplicationForm.jsx can gate access and pre-fill the guardian step.
const KEY = "hibs_applicant_session";

export const setLoggedInApplicant = (data) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Private browsing / storage disabled — the session just won't persist
    // past this page view.
  }
};

export const getLoggedInApplicant = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearLoggedInApplicant = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
};
