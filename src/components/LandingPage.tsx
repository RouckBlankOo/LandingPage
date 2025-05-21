import { useRef } from "react";
import "./LandingPage.css";
import CursorEffects from "./CursorEffects";
import Logo from "./Logo";
import ScrollingText from "./ScrollingText";
function LandingPage() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="landing-page">
      {/* Custom cursor effect */}
      <CursorEffects />

      {/* Vertical scrolling text */}
      <ScrollingText />

      {/* Foreground logo */}
      <Logo />

      {/* Scroll sections to enable scrolling */}
      <div className="scroll-sections" ref={sectionsRef}>
        {/* Create multiple sections to enable scrolling */}
        <section className="scroll-section"></section>
        <section className="scroll-section"></section>
        <section className="scroll-section"></section>
        <section className="scroll-section"></section>
        <section className="scroll-section"></section>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">Scroll Down</div>
        <div className="scroll-arrow">↓</div>
      </div>
    </div>
  );
}

export default LandingPage;
