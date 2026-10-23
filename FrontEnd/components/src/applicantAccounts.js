// Parent accounts created via /apply/account/:type. A real backend would
// hash the password server-side; there is no backend here (same as every
// other "login" in this app — see TeacherLogin, HeadmasterLogin, etc.),
// so this just stores it for local email+password matching on login.
const KEY = "hibs_applicant_accounts";

const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Private browsing / storage disabled.
  }
  return [];
};

export const applicantAccounts = load();

const persist = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(applicantAccounts));
  } catch {
    // Account still works for this tab's session even if it can't persist.
  }
};

export const findAccountByEmail = (email) =>
  applicantAccounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());

export const createAccount = (data) => {
  applicantAccounts.push(data);
  persist();
};
