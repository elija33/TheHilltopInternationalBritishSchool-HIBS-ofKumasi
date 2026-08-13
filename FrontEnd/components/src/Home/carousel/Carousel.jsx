import React, { useState, useEffect } from "react";
import "./Carousel.css";

const slides = [
  {
    title: "",
    description: "",
    image: "https://hibs.edu.gh/images/2026/04/23/slide02.jpg",
  },
  {
    // hero slide with overlay text
    title: "Hilltop International British School (HIBS)",
    description: "",
    image: "https://hibs.edu.gh/images/2026/05/08/hibs_slide01.jpg",
    hero: true,
  },
  {
    title: "",
    description: "",
    image: "https://hibs.edu.gh/images/2026/05/08/hibs_slide04.jpg",
  },
  {
    title: "",
    description: "",
    image: "https://hibs.edu.gh/images/2026/05/08/hibs_slide05.jpg",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <div className={`carousel-card ${slide.hero ? "hero-slide" : ""}`}>
              <img
                src={slide.image}
                alt={slide.title}
                className="carousel-image"
              />
              <div className="carousel-copy">
                {slide.hero && <span className="badge">WELCOME TO</span>}
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${current === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
