import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingText() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Initialize with negative progress so no text shows initially
  const [scrollProgress, setScrollProgress] = useState(-0.1);
  const texts = [
    "TECH REDUX",
    "DESIGN",
    "BLOCKCHAIN",
    "DEVELOPMENT",
    "MARKETING",
  ];

  useEffect(() => {
    console.log("ScrollingText component mounted");

    // Create scroll tracker
    ScrollTrigger.create({
      trigger: ".scroll-sections",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Only update if user has actually scrolled
        setScrollProgress(self.progress);
        console.log(`Scroll progress: ${self.progress.toFixed(2)}`);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Calculate which text to show based on scroll position
  // Only show text if scrollProgress is positive
  const activeTextIndex =
    scrollProgress <= 0
      ? -1
      : Math.min(Math.floor(scrollProgress * 5), texts.length - 1);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9000,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {texts.map((text, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            fontSize: "12vw",
            fontWeight: "bold",
            color: "white",
            textShadow: "0 0 20px rgba(0,100,255,0.5)",
            opacity: index === activeTextIndex ? 1 : 0,
            transition: "opacity 0.5s ease",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      ))}

      {/* Debug info - remove in production */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "8px",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        Scroll: {Math.round((scrollProgress < 0 ? 0 : scrollProgress) * 100)}% |
        Text: {activeTextIndex}
      </div>
    </div>
  );
}
