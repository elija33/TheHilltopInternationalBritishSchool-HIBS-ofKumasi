// Images shown in the rotating homepage hero carousel. Admin manages this
// list from /portal/admin/carousel — Home/Hero.jsx just reads this array in
// order, so adding, removing or reordering a slide here changes the
// homepage immediately, no deploy needed (consistent with every other
// admin-managed content list in this app).
import seed1 from "../../image/hilltop-1.jpg";
import seed2 from "../../image/hilltop-2.jpg";
import seed3 from "../../image/hilltop-3.jpg";

export const carouselSlides = [
  { id: "cs-1", imageUrl: seed1, alt: "Students on the HIBS campus" },
  { id: "cs-2", imageUrl: seed2, alt: "HIBS students together" },
  { id: "cs-3", imageUrl: seed3, alt: "HIBS campus grounds" },
];

export const nextCarouselSlideId = () => `cs-${Date.now()}`;

export const addCarouselSlide = (slide) => {
  carouselSlides.push(slide);
};

export const removeCarouselSlide = (id) => {
  const idx = carouselSlides.findIndex((s) => s.id === id);
  if (idx !== -1) carouselSlides.splice(idx, 1);
};

export const moveCarouselSlide = (id, direction) => {
  const i = carouselSlides.findIndex((s) => s.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= carouselSlides.length) return;
  [carouselSlides[i], carouselSlides[j]] = [carouselSlides[j], carouselSlides[i]];
};
