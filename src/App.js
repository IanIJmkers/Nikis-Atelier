import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Gallery from "./components/Gallery/Gallery";
import About from "./components/About/About";
import Testimonials from "./components/Testimonials/Testimonials";
import Booking from "./components/Booking/Booking";
import GlobalStyle from "./styles/GlobalStyle";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <Hero />
      <Gallery />
      <Services />
      <About />
      <Testimonials />
      <Booking />
    </>
  );
}
