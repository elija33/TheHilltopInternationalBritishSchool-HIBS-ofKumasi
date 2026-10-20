import React from "react";
import "../HomePage.css";
import Hero from "../Hero";
import StatsBar from "../StatsBar";
import NewsSection from "../NewsSection";
import WelcomeSection from "../WelcomeSection";
import WhyHibs from "../WhyHibs";
import CampusLifeCarousel from "../CampusLifeCarousel";
import EventsCalendar from "../EventsCalendar";
import CTABanner from "../CTABanner";

const Body = () => (
  <>
    <Hero />
    <StatsBar />
    <NewsSection />
    <WelcomeSection />
    <WhyHibs />
    <CampusLifeCarousel />
    <EventsCalendar />
    <CTABanner />
  </>
);

export default Body;
