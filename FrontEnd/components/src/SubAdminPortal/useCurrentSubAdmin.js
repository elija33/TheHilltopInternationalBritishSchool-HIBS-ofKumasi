import { subAdmins } from "../AdminPortal/mockData";
import { getLoggedInSubAdminId } from "./session";

// Falls back to the first ACTIVE sub admin for quick direct access without
// logging in, same convenience as the other three portals. Revocation is
// still enforced: if nobody is ACTIVE at all, this returns null and
// SubAdminPortalLayout shows the access-denied screen instead of a fallback.
export const getCurrentSubAdmin = () => {
  const id = getLoggedInSubAdminId();
  const found = id && subAdmins.find((sa) => sa.id === id && sa.status === "ACTIVE");
  return found || subAdmins.find((sa) => sa.status === "ACTIVE") || null;
};
