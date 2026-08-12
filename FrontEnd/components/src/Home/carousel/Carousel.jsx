import React, { useState, useEffect } from "react";
import "./Carousel.css";

const slides = [
  {
    title: "Welcome to HIBS",
    description:
      "A warm environment for modern learning, moral values, and academic excellence.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Science and Computer Labs",
    description:
      "Fully-equipped labs with dedicated broadband connection and modern facilities.",
    image:
      "https://images.unsplash.com/photo-1581093588401-6d5281bbf152?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Quality Teachers",
    description:
      "Cambridge certified tutors delivering personalized learning to small classes.",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80",
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
            <div className="carousel-card">
              <img
                src={slide.image}
                alt={slide.title}
                className="carousel-image"
              />
              <div className="carousel-copy">
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
