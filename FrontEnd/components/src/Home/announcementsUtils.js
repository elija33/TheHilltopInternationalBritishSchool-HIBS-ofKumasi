import { announcements } from "../AdminPortal/mockData";

// Pinned items float to the top, then newest first — used by both the
// homepage preview and the full "/news" listing so their ordering matches.
export const getMainPageAnnouncements = () =>
  announcements
    .filter((a) => a.audience === "main_page")
    .slice()
    .sort((a, b) => {
      if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
