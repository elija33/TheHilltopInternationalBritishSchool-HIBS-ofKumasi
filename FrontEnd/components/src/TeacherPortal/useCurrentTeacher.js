import { teacherRecords } from "../AdminPortal/teacherData";
import { getLoggedInTeacherId } from "./session";

// No real backend/session exists, so "who's logged in" comes from whatever
// the Teacher Login page saved. Falls back to the first non-inactive teacher
// so direct navigation to /portal/teacher without logging in doesn't crash.
export const getCurrentTeacher = () => {
  const id = getLoggedInTeacherId();
  const found = id && teacherRecords.find((t) => t.id === id);
  return found || teacherRecords.find((t) => t.status !== "INACTIVE") || teacherRecords[0];
};
