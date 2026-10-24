// Images shown in the rotating homepage hero carousel. Admin manages this
// list from /portal/admin/carousel — Home/Hero.jsx just reads this array in
// order, so adding, removing or reordering a slide here changes the
// homepage immediately, no deploy needed.
//
// Backed by localStorage (not a plain array) because uploaded slides are
// large enough that "just keep it in memory" isn't good enough — a slide
// added here needs to survive a refresh and reach the homepage even when
// it's open in a different tab, same reasoning as contactMessages.js and
// whyHibsPhotos.js.
import seed1 from "../../image/hilltop-1.jpg";
import seed2 from "../../image/hilltop-2.jpg";
import seed3 from "../../image/hilltop-3.jpg";

const STORAGE_KEY = "hibs_carousel_slides";

const SEED_SLIDES = [
  { id: "cs-1", imageUrl: seed1, alt: "Students on the HIBS campus" },
  { id: "cs-2", imageUrl: seed2, alt: "HIBS students together" },
  { id: "cs-3", imageUrl: seed3, alt: "HIBS campus grounds" },
];

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Private browsing / storage disabled — fall through to the seed below.
  }
  return SEED_SLIDES;
};

export const carouselSlides = load();

// Deliberately NOT swallowed — an uploaded slide is large enough that
// hitting the storage quota is a real possibility, and the caller needs to
// know so it can tell the admin instead of silently losing the slide.
const persist = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(carouselSlides));

export const nextCarouselSlideId = () => `cs-${Date.now()}`;

export const addCarouselSlide = (slide) => {
  carouselSlides.push(slide);
  persist();
};

export const removeCarouselSlide = (id) => {
  const idx = carouselSlides.findIndex((s) => s.id === id);
  if (idx !== -1) carouselSlides.splice(idx, 1);
  persist();
};

export const moveCarouselSlide = (id, direction) => {
  const i = carouselSlides.findIndex((s) => s.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= carouselSlides.length) return;
  [carouselSlides[i], carouselSlides[j]] = [carouselSlides[j], carouselSlides[i]];
  persist();
};

export const subscribeToCarouselSlides = (callback) => {
  const handler = (e) => {
    if (e.key !== STORAGE_KEY) return;
    const next = load();
    carouselSlides.length = 0;
    carouselSlides.push(...next);
    callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
