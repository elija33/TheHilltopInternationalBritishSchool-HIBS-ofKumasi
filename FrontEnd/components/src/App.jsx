import React, { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import Body from "./Home/Body/Body";
import Carousel from "./Home/carousel/Carousel";
import hibsLogo from "../image/hibs_logo.jpg";
import hibsFooterLogo from "../image/hibs_logofooter.jpg";
import "./styles.css";
import ApplicationModal from "./ApplicationModal";
import ApplyPage from "./ApplyPage";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import WhoWeAre from "./WhoWeAre";
import BoardOfDirectors from "./AboutHIBS/BoardOfDirectors";
import VisitingHIBS from "./AboutHIBS/VisitingHIBS";
import ToursAndOpenDays from "./AboutHIBS/ToursAndOpenDays";
import AdministrativeStaff from "./Admission/AdministrativeStaff";
import IGCSE from "./IGCSE/IGCSE";
import ALevel from "./ALevel/ALevel";
import ContactUs from "./ContactUs/ContactUs";
import FAQs from "./FAQs/FAQs";
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

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="top-bar">
          <div className="container header-inner">
            <Link to="/" className="brand">
              <img
                src={hibsLogo}
                alt="HIBS logo"
                className="brand-logo"
                height={80}
              />
            </Link>

            <div className="top-actions">
              <Link to="/#news" className="top-link">
                NEWS
              </Link>
              <Link to="/login/student" className="top-link">
                STUDENTS
              </Link>
              <Link to="/#alumni" className="top-link">
                ALUMNI
              </Link>
              <Link to="/login/parent" className="top-link">
                PARENTS
              </Link>
              <Link to="/#jobs" className="top-link">
                JOBS
              </Link>
              <Link to="/igcse" className="top-link">
                IGCSE
              </Link>
              <Link to="/apply" className="apply-btn">
                APPLY
              </Link>
            </div>
          </div>
        </div>

        <div className="primary-nav">
          <div className="container">
            <nav className="main-nav">
              <Link to="/">Home</Link>
              <div className="nav-item has-dropdown">
                <Link to="/#about">About HIBS</Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/who">Who We Are</Link>
                  </li>
                  <li>
                    <Link to="/board-of-directors">Board of Directors</Link>
                  </li>
                  <li>
                    <Link to="/#staff">Teaching Staff</Link>
                  </li>
                  <li>
                    <Link to="/#pta">PTA</Link>
                  </li>
                  <li>
                    <Link to="/visiting-hibs">Visiting HIBS</Link>
                  </li>
                </ul>
              </div>
              <div className="nav-item has-dropdown">
                <Link to="/#admission">Admission</Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/a-level">A Level</Link>
                  </li>
                  <li>
                    <Link to="/administrative-staff">Administrative Staff</Link>
                  </li>
                </ul>
              </div>
              <div className="nav-item has-dropdown">
                <Link to="/#campuslife">Campus Life</Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/#boarding">Boarding</Link>
                  </li>
                  <li>
                    <Link to="/#clubs">Clubs &amp; Societies</Link>
                  </li>
                  <li>
                    <Link to="/#technology">Technology on Campus</Link>
                  </li>
                  <li>
                    <Link to="/#sports">Sports</Link>
                  </li>
                </ul>
              </div>
              <Link to="/igcse">IGCSE</Link>
              <Link to="/faqs">FAQs</Link>
              <Link to="/#media">Media Center</Link>
              <Link to="/#resources">Resources</Link>
              <Link to="/contact-us">Contact Us</Link>
            </nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero" id="home">
                <div className="hero-overlay" />
                <div className="carousel-wrapper">
                  <Carousel />
                </div>
              </section>
              <main className="container main-content">
                <Body />

                <section className="partners-section">
                  <div>
                    <div className="partner-logo partner-logo--img">
                      <img src={hibsFooterLogo} alt="HIBS footer logo" />
                    </div>
                  </div>
                </section>
              </main>
            </>
          }
        />

        <Route
          path="/apply"
          element={<ApplyPage onClose={() => navigate("/")} />}
        />
        <Route path="/who" element={<WhoWeAre />} />
        <Route path="/board-of-directors" element={<BoardOfDirectors />} />
        <Route path="/visiting-hibs" element={<VisitingHIBS />} />
        <Route path="/tours-and-open-days" element={<ToursAndOpenDays />} />
        <Route path="/administrative-staff" element={<AdministrativeStaff />} />
        <Route path="/igcse" element={<IGCSE />} />
        <Route path="/a-level" element={<ALevel />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/parent" element={<ParentLogin />} />

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
        </Route>
      </Routes>

      <Footer />

      {showModal && (
        <ApplicationModal
          onClose={() => setShowModal(false)}
          onOpenApply={() => navigate("/apply")}
        />
      )}
    </div>
  );
};

export default App;
