import React from "react";
import "./styles.css";

const WhoWeAre = () => {
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
        <div
          style={{
            maxWidth: 920,
            margin: "0 auto",
            background: "#fff",
            padding: "32px",
            borderRadius: 8,
          }}
        >
          <h1 style={{ color: "#11672c", marginTop: 0 }}>Who We Are</h1>

          <p>
            Accredited by Cambridge Assessment International Education in
            September 2010, The Hilltop International British School (HIBS)
            provides a secure and progressive education environment with
            counselling and guidance services through to the university
            application level. HIBS admits students from year four through to
            Upper Six Level and prepares students for the International General
            Certificate of Secondary Education (IGCSE) and Advanced (A) Level
            examinations.
          </p>

          <h3>Multicultural Community</h3>
          <p>
            A global community of 10 to 19 year olds, children from all over the
            world are welcome at HIBS. Our community includes students from five
            different nationals including Lebanon, Equitoria Guinea, Brazil,
            Nigeria, USA, Mali, Albania, UK and India.
          </p>

          <h3>Our Core Values</h3>
          <p>
            We believe that every child has a talent. We train them to exploit
            it in order to maximize their potential, to believe and be confident
            in themselves, and turn out to be valuable citizens in their
            society.
          </p>

          <h3>Our Mission</h3>
          <p>
            We seek to provide sound holistic education for academic excellence
            in a guided and secured moral environment.
          </p>
        </div>
      </main>
    </div>
  );
};

export default WhoWeAre;
