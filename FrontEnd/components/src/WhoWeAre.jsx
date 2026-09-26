import React from "react";
import "./styles.css";
import hibsTop1 from "../image/hibs_top1.jpg";

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
              overflow: "hidden",
            }}
          >
            <img
              src={hibsTop1}
              alt="HIBS"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
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
            September 2010, The Hilltop International British School (HIBS),
            formerly The Hilltop International Science College offers to
            students the opportunity to sit for the prestigious International
            Graduate Certificate of Secondary Education (IGCSE) and the Advanced
            (A) level. HIBS is part of The Hilltop School and a member of the
            PSGN of the British Council.
          </p>

          <p>
            HIBS admits students from year four through to Upper Six Level. We
            provide a secure and progressive education environment with
            counseling and guidance services through to the university
            application level. Our students graduate and undertake undergraduate
            programmes in medicine, engineering, applied science programmes and
            business Administration in local and international universities.
          </p>

          <h3>Multicultural Community</h3>
          <p>
            A global community of 10 to 19 year olds, children from all over the
            world are welcome at the HIBS. Our community includes students from
            five different nationals including Lebanon, Equitoria Guinnea,
            Brazil, Nigeria, USA, Mali, Albania, UK and India.
          </p>

          <h3>Our Core Values</h3>
          <p>
            We believe that every child has a talent. We train them to exploit
            it in order to maximize their potential, to believe and be confident
            in themselves; and turn out to be valuable citizens in their
            society.
          </p>

          <h3>Our Motto</h3>
          <p>
            &ldquo;Excellence, Knowledge and Integrity&rdquo;. Our students aim
            to achieve academic excellence, to know and understand the
            environment and the society of abode and to be morally upright.
          </p>

          <h3>The School&rsquo;s Logo</h3>
          <p>
            Our logo which is glowing torch with black and white star in a blue
            sky over a green hill represents the school logo. The black and
            white stars symbolize the multiracial and international nature of
            the school and the green hill represents our ecological friendly
            environment.
          </p>

          <h3>Our Mission</h3>
          <p>
            We seek to provide sound holistic education for academic excellence
            in a guided and secured moral environment.
          </p>

          <h3>Our Vision</h3>
          <p>
            Our Vision is to be a leading school in Ghana and the West Africa
            sub-region which provides competitive and holistic education with
            distinction and instill ethical values and moral standards in our
            pupils and students.
          </p>
        </div>
      </main>
    </div>
  );
};

export default WhoWeAre;
