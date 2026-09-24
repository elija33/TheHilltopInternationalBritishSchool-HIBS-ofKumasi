import React from "react";
import "../styles.css";
import "./FAQs.css";

const faqs = [
  {
    question: "What are the student and teacher ratios at HIBS",
    answer:
      "Although similar schools in Ghana pride themselves as having student to teacher ratios of 25 to 1 or 30 to 1. At HIBS we maintain student to teacher ratio of not more than 8 to 1",
  },
  {
    question: "Is the Cambridge system recognized worldwide?",
    answer: "Yes, log into to cie.org.uk/recognition for more details.",
  },
  {
    question: "Can I pay via banks since I stay outside the country?",
    answer: "Yes, the accounts office will send you our banking details upon request",
  },
  {
    question: "What is the minimum age for my ward to be accepted at the school?",
    answer:
      "It is recommended that students enroll at The Hilltop School at age two (2). Students wishing to to enroll in The British School however, should approach The HIBS at age 9.",
  },
  {
    question:
      "Will successful completion of the Cambridge IGCSE and Cambridge A-levels provide me with a pathway into local universities?",
    answer:
      "Yes, locally the National Accreditation Board (NAB) has made it clear to all universities to consider the Cambridge A-level qualifications as entry into at least level-100 courses.",
  },
  {
    question: "Does HIBS offer health insurance policies for students?",
    answer:
      "For the meantime, we offer no insurance scheme for students at HIBS. There are however a number of highly reputable organisations locally who provide that service here.",
  },
  {
    question: "Does the semester school fees include a feeding program?",
    answer:
      "No. Parents have to arrange either to provide food from home or purchase it from our professional caterer",
  },
  {
    question: "What is the minimum age for my ward to be accepted at the boarding house?",
    answer: "8 years",
  },
  {
    question:
      "Are my children able to move from studying under the GES to the Cambridge program or vice-versa?",
    answer:
      "Students may move from the GES to Cambridge program. However we discourage students moving the other way round (from the international program to the GES), due to the vast difference in curriculum structure.",
  },
  {
    question: "Does the school bus students to school?",
    answer:
      "No, parents must arrange for transportation for their wards. We may be able to assist you to obtain the contact of an honest taxi driver local to your area.",
  },
  {
    question: "Can my ward be exempted from physical education?",
    answer:
      "Hilltop believes physical education to be integral part of education program. As such students may only be excused from physical education with a doctor’s note.",
  },
  {
    question: "What are class sizes like?",
    answer: "Max class size shall not exceed 35.",
  },
];

const FAQs = () => {
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
        <div className="faqs-container">
          <h1 className="faqs-title">FAQs</h1>

          <ul className="faqs-list">
            {faqs.map((item) => (
              <li key={item.question}>
                <span className="faqs-question">{item.question}</span>
                <p className="faqs-answer">{item.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default FAQs;
