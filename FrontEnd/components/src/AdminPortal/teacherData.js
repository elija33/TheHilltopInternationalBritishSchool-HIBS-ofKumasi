// Mock data for the Teacher Management module (spec v0.2). Roles are derived
// from assignments, not a stored field — classTeacherOf and subjectAssignments
// are the source of truth, same as section 2 of the spec describes.

export const CLASS_LIST = ["JHS 1A", "JHS 2A", "JHS 2B", "Primary 5"];
export const SUBJECT_LIST = [
  "Mathematics",
  "English Language",
  "Integrated Science",
  "Social Studies",
  "French",
];

export const teacherRecords = [
  {
    id: "t1",
    staffId: "HIBS-T-0001",
    title: "Mr.",
    firstName: "Kwabena",
    lastName: "Owusu",
    email: "k.owusu@hibs.edu.gh",
    phone: "+233 24 111 2222",
    address: "Daban, Kumasi",
    emergencyContact: "Mrs. Owusu — +233 24 111 2223",
    photoUrl: null,
    employmentType: "FULL_TIME",
    status: "ACTIVE",
    startDate: "2019-09-01",
    endDate: null,
    gesRegistrationNo: "GES-10231",
    classTeacherOf: null,
    subjectAssignments: [{ subject: "Mathematics", classes: ["JHS 2A", "JHS 2B"] }],
    qualifications: [
      { title: "B.Ed Mathematics", institution: "University of Cape Coast", year: 2015 },
    ],
    documents: [
      { type: "CV", fileName: "kwabena_owusu_cv.pdf", uploadedAt: "2019-08-20", verified: true },
      {
        type: "CERTIFICATE",
        fileName: "ges_certificate.pdf",
        uploadedAt: "2019-08-20",
        verified: true,
      },
    ],
  },
  {
    id: "t2",
    staffId: "HIBS-T-0002",
    title: "Mrs.",
    firstName: "Adjoa",
    lastName: "Mensah",
    email: "a.mensah@hibs.edu.gh",
    phone: "+233 24 222 3333",
    address: "Asokwa, Kumasi",
    emergencyContact: "Mr. Mensah — +233 24 222 3334",
    photoUrl: null,
    employmentType: "FULL_TIME",
    status: "ACTIVE",
    startDate: "2017-09-01",
    endDate: null,
    gesRegistrationNo: "GES-09876",
    classTeacherOf: "JHS 2A",
    subjectAssignments: [
      { subject: "English Language", classes: ["JHS 2B", "Primary 5"] },
    ],
    qualifications: [{ title: "B.A. English", institution: "University of Ghana", year: 2012 }],
    documents: [
      { type: "CV", fileName: "adjoa_mensah_cv.pdf", uploadedAt: "2017-08-15", verified: true },
    ],
  },
  {
    id: "t3",
    staffId: "HIBS-T-0003",
    title: "Mr.",
    firstName: "Yaw",
    lastName: "Boateng",
    email: "y.boateng@hibs.edu.gh",
    phone: "+233 24 333 4444",
    address: "Ahodwo, Kumasi",
    emergencyContact: "Mrs. Boateng — +233 24 333 4445",
    photoUrl: null,
    employmentType: "FULL_TIME",
    status: "ACTIVE",
    startDate: "2018-01-15",
    endDate: null,
    gesRegistrationNo: "GES-11023",
    classTeacherOf: "JHS 2B",
    subjectAssignments: [
      { subject: "Integrated Science", classes: ["JHS 2B", "Primary 5"] },
    ],
    qualifications: [
      { title: "B.Sc. Biology", institution: "KNUST", year: 2014 },
      { title: "PGDE", institution: "University of Education, Winneba", year: 2016 },
    ],
    documents: [
      { type: "CV", fileName: "yaw_boateng_cv.pdf", uploadedAt: "2018-01-05", verified: true },
      { type: "ID", fileName: "yaw_boateng_id.pdf", uploadedAt: "2018-01-05", verified: true },
    ],
  },
  {
    id: "t4",
    staffId: "HIBS-T-0004",
    title: "Ms.",
    firstName: "Efua",
    lastName: "Asante",
    email: "e.asante@hibs.edu.gh",
    phone: "+233 24 444 5555",
    address: "Nhyiaeso, Kumasi",
    emergencyContact: "Mr. Asante — +233 24 444 5556",
    photoUrl: null,
    employmentType: "FULL_TIME",
    status: "ACTIVE",
    startDate: "2020-09-01",
    endDate: null,
    gesRegistrationNo: "GES-12456",
    classTeacherOf: null,
    subjectAssignments: [{ subject: "Social Studies", classes: ["JHS 2A", "JHS 2B"] }],
    qualifications: [{ title: "B.A. Social Studies", institution: "University of Cape Coast", year: 2018 }],
    documents: [
      { type: "CV", fileName: "efua_asante_cv.pdf", uploadedAt: "2020-08-20", verified: true },
    ],
  },
  {
    id: "t5",
    staffId: "HIBS-T-0005",
    title: "Mme.",
    firstName: "Akosua",
    lastName: "Darko",
    email: "a.darko@hibs.edu.gh",
    phone: "+233 24 555 6666",
    address: "Bantama, Kumasi",
    emergencyContact: "Mr. Darko — +233 24 555 6667",
    photoUrl: null,
    employmentType: "PART_TIME",
    status: "ACTIVE",
    startDate: "2022-01-10",
    endDate: null,
    gesRegistrationNo: null,
    classTeacherOf: null,
    subjectAssignments: [{ subject: "French", classes: ["JHS 2B"] }],
    qualifications: [{ title: "Licence de Français", institution: "Université de Lomé", year: 2019 }],
    documents: [],
  },
  {
    id: "t6",
    staffId: "HIBS-T-0006",
    title: "Madam",
    firstName: "Comfort",
    lastName: "Appiah",
    email: "c.appiah@hibs.edu.gh",
    phone: "+233 24 666 7777",
    address: "Suame, Kumasi",
    emergencyContact: "Mr. Appiah — +233 24 666 7778",
    photoUrl: null,
    employmentType: "PART_TIME",
    status: "ON_LEAVE",
    startDate: "2021-01-10",
    endDate: null,
    gesRegistrationNo: "GES-13789",
    classTeacherOf: "Primary 5",
    subjectAssignments: [],
    qualifications: [{ title: "Diploma in Basic Education", institution: "Akrokerri College of Education", year: 2010 }],
    documents: [],
  },
  {
    id: "t7",
    staffId: "HIBS-T-0007",
    title: "Mr.",
    firstName: "Daniel",
    lastName: "Osei",
    email: "d.osei@hibs.edu.gh",
    phone: "+233 24 777 8888",
    address: "Tafo, Kumasi",
    emergencyContact: "—",
    photoUrl: null,
    employmentType: "FULL_TIME",
    status: "INACTIVE",
    startDate: "2015-09-01",
    endDate: "2019-07-31",
    gesRegistrationNo: "GES-08123",
    classTeacherOf: null,
    subjectAssignments: [],
    qualifications: [{ title: "B.Ed Mathematics", institution: "University of Education, Winneba", year: 2013 }],
    documents: [],
  },
];

export const teacherAuditLog = [
  { id: "al1", teacherId: "t1", action: "Account created", actor: "School Office", timestamp: "2019-09-01" },
  { id: "al2", teacherId: "t2", action: "Account created", actor: "School Office", timestamp: "2017-09-01" },
  { id: "al3", teacherId: "t2", action: "Assigned as class teacher of JHS 2A", actor: "School Office", timestamp: "2017-09-01" },
  { id: "al4", teacherId: "t3", action: "Account created", actor: "School Office", timestamp: "2018-01-15" },
  { id: "al5", teacherId: "t3", action: "Assigned as class teacher of JHS 2B", actor: "School Office", timestamp: "2018-01-15" },
  { id: "al6", teacherId: "t4", action: "Account created", actor: "School Office", timestamp: "2020-09-01" },
  { id: "al7", teacherId: "t5", action: "Account created", actor: "School Office", timestamp: "2022-01-10" },
  { id: "al8", teacherId: "t6", action: "Account created", actor: "School Office", timestamp: "2021-01-10" },
  { id: "al9", teacherId: "t6", action: "Status changed from ACTIVE to ON_LEAVE", actor: "School Office", timestamp: "2026-08-01" },
  { id: "al10", teacherId: "t7", action: "Account created", actor: "School Office", timestamp: "2015-09-01" },
  { id: "al11", teacherId: "t7", action: "Status changed from ACTIVE to INACTIVE", actor: "School Office", timestamp: "2019-07-31" },
];

// Shared rosters so any teacher's assigned class resolves to real students,
// regardless of whether they're that class's subject or class teacher.
export const CLASS_ROSTERS = {
  "JHS 1A": ["Abena Owusu", "Kwame Adu", "Abigail Boateng", "Yaw Nkrumah"],
  "JHS 2A": [
    "Akosua Frimpong",
    "Nana Yaw Sarpong",
    "Adjoa Antwi",
    "Kwesi Bonsu",
    "Maame Serwaa",
    "Kofi Owusu",
  ],
  "JHS 2B": [
    "Ama Serwaa Owusu",
    "Kwabena Asante",
    "Efua Mensah",
    "Yaw Darko",
    "Abena Boateng",
    "Kojo Appiah",
  ],
  "Primary 5": [
    "Kwame Mensah Owusu",
    "Esi Owusu-Ansah",
    "Kwadwo Mensah",
    "Afia Boateng",
    "Yaw Sarfo",
  ],
};

export const fullName = (t) => `${t.title} ${t.firstName} ${t.lastName}`;

export const roleBadges = (t) => {
  const badges = [];
  if (t.classTeacherOf) badges.push(`Class teacher · ${t.classTeacherOf}`);
  t.subjectAssignments.forEach((a) => {
    badges.push(`${a.subject} · ${a.classes.join(", ")}`);
  });
  return badges;
};

export const roleKind = (t) => {
  const isClassTeacher = Boolean(t.classTeacherOf);
  const isSubjectTeacher = t.subjectAssignments.length > 0;
  if (isClassTeacher && isSubjectTeacher) return "both";
  if (isClassTeacher) return "class";
  if (isSubjectTeacher) return "subject";
  return "none";
};

// Which classes already have a class teacher, and which subject+class pairs
// are already taken — used by the Add Teacher wizard to disable combinations
// already in use, per spec section 9 ("assignment uniqueness enforced").
export const assignmentAvailability = (excludeTeacherId = null) => {
  const takenClassTeacher = new Set();
  const takenSubjectClass = new Set();

  teacherRecords
    .filter((t) => t.id !== excludeTeacherId && t.status !== "INACTIVE")
    .forEach((t) => {
      if (t.classTeacherOf) takenClassTeacher.add(t.classTeacherOf);
      t.subjectAssignments.forEach((a) => {
        a.classes.forEach((c) => takenSubjectClass.add(`${a.subject}::${c}`));
      });
    });

  return {
    isClassTaken: (className) => takenClassTeacher.has(className),
    isSubjectClassTaken: (subject, className) =>
      takenSubjectClass.has(`${subject}::${className}`),
  };
};

export const nextStaffId = () => {
  const max = teacherRecords.reduce((acc, t) => {
    const n = parseInt(t.staffId.split("-").pop(), 10);
    return Number.isNaN(n) ? acc : Math.max(acc, n);
  }, 0);
  return `HIBS-T-${String(max + 1).padStart(4, "0")}`;
};

const CHARS = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
export const generateTempPassword = () => {
  let pwd = "";
  for (let i = 0; i < 11; i++) {
    pwd += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return pwd;
};
