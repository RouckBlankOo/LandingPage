import React from "react";
import "./LandingPage.css";
import CursorEffects from "./CursorEffects";
import Logo from "./Logo";
import ProjectsShowcase from "./ProjectsShowcase";
import ServicesSection from "./ServicesSection";
import TechnologiesSection from "./TechnologiesSection";
import ScrollIndicator from "./ScrollIndicator";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Custom cursor effect */}
      <CursorEffects />

      {/* Logo that zooms on scroll */}
      <Logo />

      {/* Scroll Down Indicator */}
      <ScrollIndicator />

      {/* Scrollable content */}
      <div className="scroll-sections">
        {/* Empty first section allows logo zoom to happen */}
        <div className="scroll-section first-section"></div>

        {/* Projects showcase section */}
        <ProjectsShowcase />

        {/* Services section */}
        <ServicesSection />

        {/* Technologies section */}
        <TechnologiesSection />
      </div>
    </div>
  );
}

export default LandingPage;
