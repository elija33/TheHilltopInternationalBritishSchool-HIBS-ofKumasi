import React from "react";
import "../styles.css";
import "./IGCSE.css";
import hibsFooterLogo from "../../image/hibs_logofooter.jpg";

const subjectsColumnOne = [
  "First Language English",
  "French",
  "Extended Maths",
  "Chemistry",
  "ICT",
  "Biology",
  "Additional Maths",
];

const subjectsColumnTwo = ["Physics", "Accounting", "Economics", "Geography"];

const IGCSE = () => {
  return (
    <div>
      <section className="hero" style={{ padding: 0 }}>
        <div className="carousel-wrapper">
          <div
            style={{
              width: "100%",
              height: 260,
              background: "linear-gradient(90deg,#0b9a56,#2bb673)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={hibsFooterLogo}
              alt="HIBS"
              style={{ height: 140, opacity: 0.95 }}
            />
          </div>
        </div>
      </section>

      <main className="container main-content">
        <div className="igcse-container">
          <h1 className="igcse-title">IGCSE</h1>

          <p>
            HIBS runs the Cambridge curriculum from Year 4 up to Year 13. Our
            transition Year 9 class prepares students to choose between
            Science, Arts or Business options. In Year 10 and Year 11
            students prepare for the final IGCSE by declaring an option
            chosen where they may undertake the Sciences, Accounting,
            Business Studies and Economics in addition to their cores. Year
            12 and 13 prepare students for Advanced (A) level examination,
            the preferred entry level to top-rated University education.
          </p>

          <h3>The Cambridge Curriculum</h3>
          <h4>IGCSE</h4>
          <p>
            The Cambridge curriculum is designed to support high quality
            educational performance and also to provide excellent
            preparation for further studies.
          </p>
          <p>
            Cambridge IGCSE develops learner knowledge, understanding and
            skills in:
          </p>
          <p>
            Applying knowledge and understanding to familiar and new
            situations, Intellectual enquiry, Flexibility and responsiveness
            to change.
          </p>
          <p>
            Assessments take place at the end of Year 11 (at age 16) where
            the exams include written tests, oral tests and practical
            assessments. Each learner&rsquo;s performance is benchmarked
            using International recognized grading, A* to G. HIBS offers
            on-site examinations in the May/June examination session. As
            many as twelve subjects are currently offered at our IGCSE
            level and students are required to take between five to nine
            subjects.
          </p>

          <h3>Subjects Offered:</h3>
          <div className="igcse-subjects">
            <ul>
              {subjectsColumnOne.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
            <ul>
              {subjectsColumnTwo.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IGCSE;
