import React from "react";
import "./Body.css";

const Body = () => {
  return (
    <>
      <section className="welcome-section" id="about">
        <div className="welcome-image">
          <img
            src={"../../../image/andrew-akwasi-oteng-amoako.jpg"}
            alt="Andrew Akwasi Oteng-Amoako"
          />
        </div>
        <div className="welcome-copy">
          <h2>Welcome</h2>
          <p>
            A child’s education is the most important legacy a parent can
            bequeath to his or her ward. At The Hilltop International British
            School (HIBS), we strive to make your child’s education the most
            important legacy and investment for him or her. We invite you as a
            parent or guardian to work with the Board, Management and our
            teachers to fulfill our great mission of providing excellence in
            education with moral values. It is therefore our hope that we all
            work together to ensure that the aspirations of THE STARS of HIBS
            are fulfilled.
          </p>
          <p>
            We invite all our stakeholders and well-wishers, especially our dear
            teachers, parents and precious pupils, to read the prospectus
            carefully and abide by its content in order for all of us to achieve
            our dreams. We welcome you to HIBS, a premier member of Platinum
            League Schools and award winner in education excellence.
          </p>
          <p>
            <strong>Andrew Akwasi Oteng-Amoako, PhD.</strong>
            <br />
            Executive Director
            <br />
            Chairman, Board of Directors
          </p>
        </div>
      </section>
      <section className="info-section gray-section">
        <div className="container info-grid">
          <div className="info-image">
            <img
              src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80"
              alt="Teachers in classroom"
            />
          </div>
          <div className="info-copy">
            <h2>Teachers and Class</h2>
            <ul>
              <li>Qualified, competent and committed tutors</li>
              <li>Cambridge certified tutors</li>
              <li>Small class size of 25 students</li>
              <li>Well-ventilated classrooms</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="info-section yellow-section">
        <div className="container info-grid info-grid-reverse">
          <div className="info-copy">
            <h2>Science &amp; Computer Labs</h2>
            <ul>
              <li>Fully-equipped Chemistry, Biology &amp; Physics Labs</li>
              <li>Computers lab with dedicated broadband connection</li>
              <li>Well-ventilated labs</li>
            </ul>
          </div>
          <div className="info-image">
            <img
              src="https://images.unsplash.com/photo-1581091012184-6b49d6b47a74?auto=format&fit=crop&w=1200&q=80"
              alt="Science lab"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Body;
