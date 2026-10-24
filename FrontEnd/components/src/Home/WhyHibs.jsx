import React, { useEffect, useState } from "react";
import { getApprovedPhotosForCard, subscribeToWhyHibsPhotos } from "../AdminPortal/whyHibsPhotos";
import gradPhoto1 from "../../image/img-0866.jpg";
import gradPhoto2 from "../../image/img-0111.jpg";
import gradPhoto3 from "../../image/img-0084.jpg";

const CARDS = [
  {
    key: "teachers",
    photo: "teacher with a small class",
    title: "Teachers & Classes",
    items: ["Cambridge-certified tutors", "Max 25 students per class", "Well-ventilated classrooms"],
  },
  {
    key: "labs",
    photo: "students in the science lab",
    title: "Science & Computer Labs",
    items: ["Chemistry, Biology & Physics labs", "Broadband computer lab", "Hands-on practicals"],
  },
  {
    key: "sports",
    photo: "HIBS students on the field",
    title: "Sports & Clubs",
    items: ["Football and athletics", "Inter-house competitions", "Clubs and societies"],
  },
  {
    key: "igcse",
    // Shown only until an admin/sub admin uploads an approved replacement
    // for this card through the dashboard.
    fallbackPhotos: [gradPhoto1, gradPhoto2, gradPhoto3],
    title: "Cambridge IGCSE",
    items: ["Internationally recognised", "Pathway to universities abroad", "British Council partner"],
  },
];

const PHOTO_INTERVAL_MS = 4000;

const RotatingCardPhoto = ({ photos }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return undefined;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % photos.length);
    }, PHOTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [photos]);

  return (
    <div className="hp-why-card-photo">
      {photos.map((src, i) => (
        <img key={src} src={src} alt="" className={i === active ? "active" : ""} />
      ))}
    </div>
  );
};

const WhyHibs = () => {
  const [, forceRender] = useState(0);

  useEffect(() => subscribeToWhyHibsPhotos(() => forceRender((n) => n + 1)), []);

  return (
    <section className="hp-why-section">
      <div className="hp-container">
        <p className="hp-section-eyebrow">Why HIBS</p>
        <h2>Built for how children learn best</h2>
        <div className="hp-why-grid">
          {CARDS.map((c) => {
            const approved = getApprovedPhotosForCard(c.key).map((p) => p.imageDataUrl);
            return (
              <div className="hp-why-card" key={c.title}>
                {approved.length > 0 ? (
                  <RotatingCardPhoto photos={approved} />
                ) : c.fallbackPhotos ? (
                  <RotatingCardPhoto photos={c.fallbackPhotos} />
                ) : (
                  <div className="hp-photo-placeholder">PHOTO: {c.photo}</div>
                )}
                <div className="hp-why-card-body">
                  <h3>{c.title}</h3>
                  <ul>
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyHibs;
