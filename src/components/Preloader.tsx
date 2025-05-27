import * as React from "react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [loadingPercent, setLoadingPercent] = useState(0);

  // Text to be animated
  const text = "Powered By DigiSubs";

  useEffect(() => {
    console.log("Preloader mounted");

    // Create glitch effect on text
    const glitchText = () => {
      const textElements = document.querySelectorAll(".char");
      if (textElements.length === 0) return;

      // Random character to glitch
      const randomIndex = Math.floor(Math.random() * textElements.length);
      const element = textElements[randomIndex] as HTMLElement;

      // Apply glitch effect
      gsap.to(element, {
        y: Math.random() > 0.5 ? -10 : 10,
        x: Math.random() > 0.5 ? -5 : 5,
        opacity: 0.8,
        color: "#48c6ef",
        textShadow: "2px 0 #ff0000, -2px 0 #0000ff",
        duration: 0.1,
        onComplete: () => {
          gsap.to(element, {
            y: 0,
            x: 0,
            opacity: 1,
            color: "#48c6ef",
            textShadow: "0 0 10px rgba(72, 198, 239, 0.7)",
            duration: 0.1,
          });
        },
      });
    };

    // Glitch effect interval
    const glitchInterval = setInterval(glitchText, 300);

    // Simulate loading progress with mechanical steps
    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        // More mechanical increment pattern
        let newPercent = prev;
        if (prev < 30) newPercent += 2;
        else if (prev < 60) newPercent += 3;
        else if (prev < 85) newPercent += 1;
        else newPercent += 0.5;

        if (newPercent > 100) {
          newPercent = 100;
          // Add final glitch when reaching 100%
          document.querySelectorAll(".char").forEach((el) => {
            gsap.to(el, {
              y: Math.random() * 20 - 10,
              x: Math.random() * 10 - 5,
              opacity: Math.random() * 0.5 + 0.5,
              color: Math.random() > 0.5 ? "#48c6ef" : "#ffffff",
              textShadow: "2px 0 #ff0000, -2px 0 #0000ff",
              duration: 0.2,
              repeat: 1,
              yoyo: true,
            });
          });
        }
        return newPercent;
      });
    }, 100);

    // Split and animate text characters
    const textElements = document.querySelectorAll(".char");
    if (textElements.length > 0) {
      gsap.set(textElements, { opacity: 0 });
      gsap.to(textElements, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.03,
        ease: "steps(1)",
      });
    }

    // After reaching 100%, run exit animation
    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(glitchInterval);

      setLoadingPercent(100);
      console.log("Loading complete, starting exit animation");

      // Run smoother exit animation
      const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: "power2.inOut" },
        onComplete: () => {
          console.log("Animation complete, calling onComplete");
          onComplete();
        },
      });

      // Fade elements out gently
      tl.to(
        textElements,
        {
          opacity: 0,
          y: -20,
          stagger: 0.03,
          ease: "power1.in",
          duration: 0.6,
        },
        0
      )
        .to(
          percentRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
          },
          0.2
        )
        .to(
          barRef.current,
          {
            opacity: 0,
            duration: 0.6,
          },
          0.3
        )
        .to(
          ".scan-line",
          {
            opacity: 0,
            duration: 0.4,
          },
          0.5
        )
        .to(
          ".noise-overlay",
          {
            opacity: 0,
            duration: 0.8,
          },
          0.4
        )
        // Reveal the gradient underneath
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0.8
        );
    }, 3500);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Split text into characters for animation
  const renderAnimatedText = () => {
    return text.split("").map((char, index) => (
      <span key={index} className="char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div className="preloader" ref={containerRef}>
      <div className="scan-line"></div>
      <div className="noise-overlay"></div>
      <div className="preloader-content">
        <div className="percent" ref={percentRef}>
          <span className="percent-value">{Math.floor(loadingPercent)}</span>
          <span className="percent-symbol">%</span>
        </div>
        <div className="bar" ref={barRef}>
          <div
            className="bar__confirm"
            ref={barFillRef}
            style={{ width: `${loadingPercent}%` }}
          >
            <div className="bar-segments"></div>
          </div>
        </div>
        <div className="heading" ref={headingRef}>
          <h1 ref={textWrapperRef} className="animated-text">
            {renderAnimatedText()}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
