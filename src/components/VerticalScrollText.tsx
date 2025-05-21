import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VerticalScrollText.css";

gsap.registerPlugin(ScrollTrigger);

function VerticalScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundTexts = [
    "TECH REDUX",
    "DESIGN",
    "BLOCKCHAIN",
    "DEVELOPMENT",
    "MARKETING",
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const textWrappers = Array.from(
      containerRef.current.querySelectorAll(".text-wrapper")
    );

    // Set initial state for all text wrappers
    gsap.set(textWrappers, {
      opacity: 0,
      x: "100vw", // Start from right side of screen
      y: "50vh", // Position at vertical center
    });

    // Create animation for each text wrapper
    textWrappers.forEach((wrapper, i) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${i * 80}vh top`, // Stagger start positions
          end: `top+=${(i + 1.5) * 80}vh top`, // End after scrolling
          scrub: 1, // Smooth scrubbing effect
          // markers: true, // Uncomment for debugging
        },
      });

      // Animation sequence for right-to-left movement through center:
      timeline
        // 1. Enter from right side
        .to(wrapper, {
          opacity: 1,
          x: "70vw", // Move towards center from right
          duration: 0.2,
        })
        // 2. Pass through center of screen (behind logo)
        .to(wrapper, {
          x: "0vw", // Center of screen
          duration: 0.3,
        })
        // 3. Exit to left side
        .to(wrapper, {
          x: "-70vw", // Move to left side
          duration: 0.3,
        })
        // 4. Fade out as it exits
        .to(wrapper, {
          opacity: 0,
          x: "-100vw", // Move fully off screen to left
          duration: 0.2,
        });
    });

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="vertical-scroll-container" ref={containerRef}>
        {backgroundTexts.map((text, idx) => (
          <div className="text-wrapper" key={idx}>
            <span className="background-text-vertical">{text}</span>
            {/* Text reflection */}
            <span className="background-text-reflection">{text}</span>
          </div>
        ))}
      </div>
      <div className="scroll-text-mask"></div>
    </>
  );
}

export default VerticalScrollText;
