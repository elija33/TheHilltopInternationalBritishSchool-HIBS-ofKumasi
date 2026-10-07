import React from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconDashboard = () => (
  <svg {...base}>
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" />
  </svg>
);

export const IconPeople = () => (
  <svg {...base}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <circle cx="17" cy="9" r="2.3" />
    <path d="M15.5 14c2.5 0 4.5 1.8 4.5 4.5" />
  </svg>
);

export const IconEdit = () => (
  <svg {...base}>
    <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M14 7l3 3" />
  </svg>
);

export const IconUpload = () => (
  <svg {...base}>
    <path d="M12 15V4" />
    <path d="M7 9l5-5 5 5" />
    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

export const IconMegaphone = () => (
  <svg {...base}>
    <path d="M3 10v4a1 1 0 0 0 1 1h2l9 4V5L6 9H4a1 1 0 0 0-1 1z" />
    <path d="M17 9a4 4 0 0 1 0 6" />
  </svg>
);

export const IconGear = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13.5a1.8 1.8 0 0 0 .36 1.98l.06.06a2.17 2.17 0 1 1-3.07 3.07l-.06-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V20a2.17 2.17 0 1 1-4.33 0v-.1a1.8 1.8 0 0 0-1.18-1.65 1.8 1.8 0 0 0-1.98.36l-.06.06a2.17 2.17 0 1 1-3.07-3.07l.06-.06a1.8 1.8 0 0 0 .36-1.98 1.8 1.8 0 0 0-1.65-1.1H2.1a2.17 2.17 0 1 1 0-4.33h.1a1.8 1.8 0 0 0 1.65-1.18 1.8 1.8 0 0 0-.36-1.98l-.06-.06a2.17 2.17 0 1 1 3.07-3.07l.06.06a1.8 1.8 0 0 0 1.98.36H8.6a1.8 1.8 0 0 0 1.1-1.65V2.1a2.17 2.17 0 1 1 4.33 0v.1a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 1.98-.36l.06-.06a2.17 2.17 0 1 1 3.07 3.07l-.06.06a1.8 1.8 0 0 0-.36 1.98v.08a1.8 1.8 0 0 0 1.65 1.1H22a2.17 2.17 0 1 1 0 4.33h-.1a1.8 1.8 0 0 0-1.65 1.1z" />
  </svg>
);

export const IconGraduationCap = () => (
  <svg {...base}>
    <path d="M2 9l10-5 10 5-10 5-10-5z" />
    <path d="M6 11.5V17c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5.5" />
    <path d="M22 9v6" />
  </svg>
);

export const IconHome = () => (
  <svg {...base}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  </svg>
);

export const IconLayers = () => (
  <svg {...base}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
    <path d="M3 18l9 5 9-5" />
  </svg>
);

export const IconStar = () => (
  <svg {...base}>
    <path d="M12 2.5l2.9 6 6.6.8-4.8 4.6 1.2 6.6L12 17.3l-5.9 3.2 1.2-6.6L2.5 9.3l6.6-.8L12 2.5z" />
  </svg>
);

export const IconShield = () => (
  <svg {...base}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconBell = () => (
  <svg {...base}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const IconLogout = () => (
  <svg {...base}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);
