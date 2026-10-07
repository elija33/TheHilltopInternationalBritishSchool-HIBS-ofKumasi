// Centralised browser-tab title logic. Static pages are looked up directly;
// portal pages (which are nested routes like /portal/teacher/grades) are
// resolved by portal name + last path segment, so "Teacher Portal · Grades"
// updates automatically as you move between tabs.

const SITE_NAME = "HIBS";

const STATIC_TITLES = {
  "/": "Home",
  "/apply": "Apply",
  "/who": "Who We Are",
  "/board-of-directors": "Board of Directors",
  "/visiting-hibs": "Visiting HIBS",
  "/tours-and-open-days": "Tours & Open Days",
  "/administrative-staff": "Administrative Staff",
  "/igcse": "IGCSE",
  "/a-level": "A Level",
  "/contact-us": "Contact Us",
  "/faqs": "FAQs",
  "/clubs-and-societies": "Clubs & Societies",
  "/housing-and-dining": "Housing & Dining",
  "/technology-on-campus": "Technology on Campus",
  "/sports": "Sports",
  "/login/student": "Student Login",
  "/login/teacher": "Teacher Login",
  "/login/parent": "Parent / Guardian Login",
  "/login/admin": "Admin Login",
  "/login/subadmin": "Sub Admin Login",
  "/login/headmaster": "Headmaster Login",
};

const STUDENT_TAB_LABELS = {
  home: "Home",
  grades: "My Grades",
  attendance: "My Attendance",
  syllabus: "Syllabus",
  profile: "Profile",
};

const PARENT_TAB_LABELS = {
  home: "Home",
  grades: "Grades",
  attendance: "Attendance",
};

const TEACHER_TAB_LABELS = {
  home: "Home",
  classes: "My Classes",
  attendance: "Attendance",
  grades: "Grades",
  syllabus: "Syllabus",
  "set-password": "Set Password",
};

const ADMIN_TAB_LABELS = {
  home: "Dashboard",
  students: "Students",
  teachers: "Teachers",
  parents: "Parents",
  "sub-admins": "Sub Admin",
  "headmaster-approvals": "Headmaster Approvals",
  corrections: "Grade Corrections",
  publishing: "Publishing",
  announcements: "Announcements",
  settings: "Settings",
};

const SUBADMIN_TAB_LABELS = {
  home: "Dashboard",
  headmaster: "Headmaster",
  students: "Students",
  parents: "Parents",
  teachers: "Teachers",
  classes: "Classes",
};

const HEADMASTER_TAB_LABELS = {
  home: "Dashboard",
  approvals: "Approvals",
  "my-classes": "My Classes",
  grades: "Grades",
};

export const getPageTitle = (pathname) => {
  if (STATIC_TITLES[pathname]) {
    return `${STATIC_TITLES[pathname]} | ${SITE_NAME}`;
  }

  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "portal") {
    const portal = parts[1];
    const rest = parts.slice(2);

    if (portal === "student") {
      const tab = rest[0] || "home";
      return `Student Portal · ${STUDENT_TAB_LABELS[tab] || "Home"}`;
    }

    if (portal === "parent") {
      // /portal/parent/:childId/<tab>
      const tab = rest[1] || "home";
      return `Parent Portal · ${PARENT_TAB_LABELS[tab] || "Home"}`;
    }

    if (portal === "teacher") {
      const tab = rest[0] || "home";
      return `Teacher Portal · ${TEACHER_TAB_LABELS[tab] || "Home"}`;
    }

    if (portal === "admin") {
      if (rest[0] === "teachers" && rest[1] === "new") {
        return "Admin Portal · Add Teacher";
      }
      if (rest[0] === "teachers" && rest[1]) {
        return "Admin Portal · Teacher Record";
      }
      const tab = rest[0] || "home";
      return `Admin Portal · ${ADMIN_TAB_LABELS[tab] || "Dashboard"}`;
    }

    if (portal === "subadmin") {
      if (rest[0] === "teachers" && rest[1] === "new") {
        return "Sub Admin Portal · Add Teacher";
      }
      if (rest[0] === "teachers" && rest[1]) {
        return "Sub Admin Portal · Teacher Record";
      }
      const tab = rest[0] || "home";
      return `Sub Admin Portal · ${SUBADMIN_TAB_LABELS[tab] || "Dashboard"}`;
    }

    if (portal === "headmaster") {
      const tab = rest[0] || "home";
      return `Headmaster Portal · ${HEADMASTER_TAB_LABELS[tab] || "Dashboard"}`;
    }
  }

  return `The Hilltop International British School (${SITE_NAME})`;
};
