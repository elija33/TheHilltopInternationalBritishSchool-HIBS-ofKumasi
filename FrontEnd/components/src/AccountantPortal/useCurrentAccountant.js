import { accountants } from "../AdminPortal/mockData";
import { getLoggedInAccountantId } from "./session";

// Falls back to the first ACTIVE accountant for quick direct access without
// logging in, same convenience as the other portals. Revocation is still
// enforced: if nobody is ACTIVE at all, this returns null and
// AccountantPortalLayout shows the access-denied screen instead of a fallback.
export const getCurrentAccountant = () => {
  const id = getLoggedInAccountantId();
  const found = id && accountants.find((a) => a.id === id && a.status === "ACTIVE");
  return found || accountants.find((a) => a.status === "ACTIVE") || null;
};
