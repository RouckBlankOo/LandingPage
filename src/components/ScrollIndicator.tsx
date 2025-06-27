import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ScrollIndicator.css";

const ScrollIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!indicatorRef.current || !textRef.current || !arrowRef.current) return;

    // Animate the text with a fade-in effect
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 2, // Delay to appear after logo animation
      }
    );

    // Animate the arrow with a bouncing effect
    gsap.fromTo(
      arrowRef.current,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "bounce.out",
        delay: 2.5,
      }
    );

    // Continuous bouncing animation for the arrow
    gsap.to(arrowRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3,
    });

    // Hide indicator when user starts scrolling
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 200, 0);

      if (indicatorRef.current) {
        gsap.to(indicatorRef.current, {
          opacity: opacity,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-indicator" ref={indicatorRef}>
      <div className="scroll-text" ref={textRef}>
        Scroll Down
      </div>
      <div className="scroll-arrow" ref={arrowRef}>
        <div className="arrow-line"></div>
        <div className="arrow-head"></div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
