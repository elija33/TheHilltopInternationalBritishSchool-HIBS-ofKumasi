import { headmasters } from "../AdminPortal/mockData";
import { getLoggedInHeadmasterId } from "./session";

// Falls back to the first approved headmaster for quick direct access
// without logging in, same convenience as the other portals. If no
// headmaster has been approved at all, this returns null and
// HeadmasterPortalLayout shows the access-denied screen.
export const getCurrentHeadmaster = () => {
  const id = getLoggedInHeadmasterId();
  const found = id && headmasters.find((hm) => hm.id === id);
  return found || headmasters[0] || null;
};
