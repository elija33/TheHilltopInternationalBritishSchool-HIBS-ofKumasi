import React from "react";
import "../styles.css";
import "./ALevel.css";

const subjects = [
  "English Language",
  "Business, Economics",
  "Maths (Pure Maths, Mechanics, Statistics)",
  "Accounting",
  "Economics",
];

const programRows = [
  { program: "English", year6to8: "Yes", year9: "Yes" },
  { program: "Mathemtics", year6to8: "Yes", year9: "Yes" },
  { program: "Science", year6to8: "Yes", year9: "No" },
  { program: "Global Perspectives", year6to8: "Yes", year9: "No" },
  { program: "ICT", year6to8: "Yes", year9: "Yes" },
  { program: "French", year6to8: "Yes", year9: "Yes" },
  { program: "Religious Studies", year6to8: "Yes", year9: "No" },
  { program: "Art & Design", year6to8: "Yes", year9: "No" },
  { program: "Physical Education", year6to8: "Yes", year9: "No" },
  { program: "Biology", year6to8: "No", year9: "Yes" },
  { program: "Physics", year6to8: "No", year9: "Yes" },
  { program: "Chemistry", year6to8: "No", year9: "Yes" },
  { program: "Economics", year6to8: "No", year9: "Yes" },
  { program: "Business Studies", year6to8: "No", year9: "Yes" },
  { program: "Accounting", year6to8: "No", year9: "Yes" },
];

const ALevel = () => {
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
              src="/src/image/hibs_logofooter.jpg"
              alt="HIBS"
              style={{ height: 140, opacity: 0.95 }}
            />
          </div>
        </div>
      </section>

      <main className="container main-content">
        <div className="alevel-container">
          <h1 className="alevel-title">A Level</h1>

          <p>
            The Cambridge A-level is one of the most recognized
            qualifications around the world. They are accepted as proof of
            academic ability for entry into Higher Education worldwide. The
            courses offered at the A-levels give students in-depth knowledge
            and literacy skill that prepare students for success in higher
            education and employment.
          </p>

          <p>Subjects offered at HIBS:</p>
          <ul className="alevel-subjects">
            {subjects.map((subject) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>

          <p>
            The choice of program is mainly dependent on the career
            aspirations of students. Notwithstanding, we aid our
            student&rsquo;s decision making by taking into consideration
            their abilities, academic performance, availability of
            opportunities and the parents&rsquo; financial strength.
          </p>

          <div className="alevel-table-wrap">
            <table className="alevel-table">
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Year 6 - 8</th>
                  <th>Year 9</th>
                </tr>
              </thead>
              <tbody>
                {programRows.map((row) => (
                  <tr key={row.program}>
                    <td>{row.program}</td>
                    <td>{row.year6to8}</td>
                    <td>{row.year9}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ALevel;
