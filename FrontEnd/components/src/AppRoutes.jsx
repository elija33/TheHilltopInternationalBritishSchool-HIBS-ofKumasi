import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Body from "./Home/Body/Body";
import ApplyPage from "./ApplyPage";
import ApplicationForm from "./ApplicationForm";
import ApplyAccount from "./ApplyAccount";
import WhoWeAre from "./WhoWeAre";
import BoardOfDirectors from "./AboutHIBS/BoardOfDirectors";
import TeachingStaff from "./AboutHIBS/TeachingStaff";
import VisitingHIBS from "./AboutHIBS/VisitingHIBS";
import ToursAndOpenDays from "./AboutHIBS/ToursAndOpenDays";
import AdministrativeStaff from "./Admission/AdministrativeStaff";
import IGCSE from "./IGCSE/IGCSE";
import ALevel from "./ALevel/ALevel";
import ContactUs from "./ContactUs/ContactUs";
import AllAnnouncements from "./News/AllAnnouncements";
import FAQs from "./FAQs/FAQs";
import ClubsAndSocieties from "./CampusLife/ClubsAndSocieties";
import HousingAndDining from "./CampusLife/HousingAndDining";
import TechnologyOnCampus from "./CampusLife/TechnologyOnCampus";
import Sports from "./CampusLife/Sports";
import StudentLogin from "./Login/StudentLogin";
import TeacherLogin from "./Login/TeacherLogin";
import ParentLogin from "./Login/ParentLogin";
import StudentPortalLayout from "./StudentPortal/StudentPortalLayout";
import StudentHome from "./StudentPortal/Home";
import StudentGrades from "./StudentPortal/Grades";
import StudentAttendance from "./StudentPortal/Attendance";
import StudentSyllabus from "./StudentPortal/Syllabus";
import StudentProfile from "./StudentPortal/Profile";
import ParentPortalLayout from "./ParentPortal/ParentPortalLayout";
import ParentHome from "./ParentPortal/Home";
import ParentGrades from "./ParentPortal/Grades";
import ParentAttendance from "./ParentPortal/Attendance";
import ParentSyllabus from "./ParentPortal/Syllabus";
import TeacherPortalLayout from "./TeacherPortal/TeacherPortalLayout";
import TeacherHome from "./TeacherPortal/Home";
import TeacherMyClasses from "./TeacherPortal/MyClasses";
import TeacherAttendance from "./TeacherPortal/Attendance";
import TeacherGrades from "./TeacherPortal/Grades";
import TeacherSyllabus from "./TeacherPortal/Syllabus";
import TeacherSetPassword from "./TeacherPortal/SetPassword";
import AdminLogin from "./Login/AdminLogin";
import AdminPortalLayout from "./AdminPortal/AdminPortalLayout";
import AdminHome from "./AdminPortal/Home";
import AdminStudents from "./AdminPortal/Students";
import AdminTeachers from "./AdminPortal/Teachers";
import AdminTeacherRecord from "./AdminPortal/TeacherRecord";
import AdminAddTeacherWizard from "./AdminPortal/AddTeacherWizard";
import AdminParents from "./AdminPortal/Parents";
import AdminGradeCorrections from "./AdminPortal/GradeCorrections";
import AdminPublishing from "./AdminPortal/Publishing";
import AdminAnnouncements from "./AdminPortal/Announcements";
import AdminCarousel from "./AdminPortal/Carousel";
import AdminPhotos from "./AdminPortal/Photos";
import AdminTeachingStaff from "./AdminPortal/TeachingStaffAdmin";
import AdminMessages from "./AdminPortal/Messages";
import AdminApplications from "./AdminPortal/Applications";
import AdminSettings from "./AdminPortal/Settings";
import AdminSubAdmins from "./AdminPortal/SubAdmins";
import AdminHeadmasterApprovals from "./AdminPortal/HeadmasterApprovals";
import SubAdminLogin from "./Login/SubAdminLogin";
import SubAdminPortalLayout from "./SubAdminPortal/SubAdminPortalLayout";
import SubAdminHome from "./SubAdminPortal/Home";
import SubAdminHeadmaster from "./SubAdminPortal/Headmaster";
import SubAdminStudents from "./SubAdminPortal/Students";
import SubAdminParents from "./SubAdminPortal/Parents";
import SubAdminClasses from "./SubAdminPortal/Classes";
import SubAdminPhotos from "./SubAdminPortal/Photos";
import SubAdminTeachingStaff from "./SubAdminPortal/TeachingStaff";
import { getCurrentSubAdmin } from "./SubAdminPortal/useCurrentSubAdmin";
import HeadmasterLogin from "./Login/HeadmasterLogin";
import HeadmasterPortalLayout from "./HeadmasterPortal/HeadmasterPortalLayout";
import HeadmasterHome from "./HeadmasterPortal/Home";
import HeadmasterApprovals from "./HeadmasterPortal/Approvals";
import HeadmasterMyClasses from "./HeadmasterPortal/MyClasses";
import HeadmasterGrades from "./HeadmasterPortal/Grades";
import HeadmasterSyllabus from "./HeadmasterPortal/Syllabus";

// All route definitions for the app, split out of App.jsx (which keeps the
// site header, footer and application-modal chrome shared across every
// route) so each file stays focused on one concern.
const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/news" element={<AllAnnouncements />} />

      <Route path="/apply" element={<ApplyPage onClose={() => navigate("/")} />} />
      <Route path="/apply/account/:type" element={<ApplyAccount />} />
      <Route path="/apply/form/:type" element={<ApplicationForm />} />
      <Route path="/who" element={<WhoWeAre />} />
      <Route path="/board-of-directors" element={<BoardOfDirectors />} />
      <Route path="/teaching-staff" element={<TeachingStaff />} />
      <Route path="/visiting-hibs" element={<VisitingHIBS />} />
      <Route path="/tours-and-open-days" element={<ToursAndOpenDays />} />
      <Route path="/administrative-staff" element={<AdministrativeStaff />} />
      <Route path="/igcse" element={<IGCSE />} />
      <Route path="/a-level" element={<ALevel />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/clubs-and-societies" element={<ClubsAndSocieties />} />
      <Route path="/housing-and-dining" element={<HousingAndDining />} />
      <Route path="/technology-on-campus" element={<TechnologyOnCampus />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/teacher" element={<TeacherLogin />} />
      <Route path="/login/parent" element={<ParentLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/subadmin" element={<SubAdminLogin />} />
      <Route path="/login/headmaster" element={<HeadmasterLogin />} />

      <Route path="/portal/student" element={<StudentPortalLayout />}>
        <Route index element={<StudentHome />} />
        <Route path="home" element={<StudentHome />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="syllabus" element={<StudentSyllabus />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      <Route path="/portal/parent/:childId" element={<ParentPortalLayout />}>
        <Route index element={<ParentHome />} />
        <Route path="home" element={<ParentHome />} />
        <Route path="grades" element={<ParentGrades />} />
        <Route path="attendance" element={<ParentAttendance />} />
        <Route path="syllabus" element={<ParentSyllabus />} />
      </Route>

      <Route path="/portal/teacher" element={<TeacherPortalLayout />}>
        <Route index element={<TeacherHome />} />
        <Route path="home" element={<TeacherHome />} />
        <Route path="classes" element={<TeacherMyClasses />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="grades" element={<TeacherGrades />} />
        <Route path="syllabus" element={<TeacherSyllabus />} />
      </Route>

      <Route path="/portal/teacher/set-password" element={<TeacherSetPassword />} />

      <Route path="/portal/admin" element={<AdminPortalLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="teachers/new" element={<AdminAddTeacherWizard />} />
        <Route path="teachers/:id" element={<AdminTeacherRecord />} />
        <Route path="parents" element={<AdminParents />} />
        <Route path="corrections" element={<AdminGradeCorrections />} />
        <Route path="publishing" element={<AdminPublishing />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="carousel" element={<AdminCarousel />} />
        <Route path="photos" element={<AdminPhotos />} />
        <Route path="teaching-staff" element={<AdminTeachingStaff />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="sub-admins" element={<AdminSubAdmins />} />
        <Route path="headmaster-approvals" element={<AdminHeadmasterApprovals />} />
      </Route>

      <Route path="/portal/subadmin" element={<SubAdminPortalLayout />}>
        <Route index element={<SubAdminHome />} />
        <Route path="home" element={<SubAdminHome />} />
        <Route path="headmaster" element={<SubAdminHeadmaster />} />
        <Route path="students" element={<SubAdminStudents />} />
        <Route path="parents" element={<SubAdminParents />} />
        <Route path="classes" element={<SubAdminClasses />} />
        <Route
          path="teachers"
          element={<AdminTeachers basePath="/portal/subadmin" showPendingRequests />}
        />
        <Route
          path="teachers/new"
          element={
            <AdminAddTeacherWizard
              basePath="/portal/subadmin"
              requiresApproval
              requestedBy={getCurrentSubAdmin()?.name || "Sub Admin"}
            />
          }
        />
        <Route
          path="teachers/:id"
          element={<AdminTeacherRecord basePath="/portal/subadmin" />}
        />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="photos" element={<SubAdminPhotos />} />
        <Route path="teaching-staff" element={<SubAdminTeachingStaff />} />
      </Route>

      <Route path="/portal/headmaster" element={<HeadmasterPortalLayout />}>
        <Route index element={<HeadmasterHome />} />
        <Route path="home" element={<HeadmasterHome />} />
        <Route path="approvals" element={<HeadmasterApprovals />} />
        <Route path="my-classes" element={<HeadmasterMyClasses />} />
        <Route path="grades" element={<HeadmasterGrades />} />
        <Route path="syllabus" element={<HeadmasterSyllabus />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
