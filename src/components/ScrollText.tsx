import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollText.css";

gsap.registerPlugin(ScrollTrigger);

function ScrollText() {
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

    const items = Array.from(
      containerRef.current.querySelectorAll(".background-text-vertical")
    );

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: "100vw", // Start from right side of screen (outside view)
        },
        {
          opacity: 1,
          x: "-100vw", // Move to left side of screen (outside view)
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${i * 160}vh top`,
            end: `top+=${(i + 1) * 160}vh top`,
            scrub: 1.5,
            onEnter: () =>
              gsap.to(item, {
                opacity: 1,
                duration: 0.6,
              }),
            onLeave: () =>
              gsap.to(item, {
                opacity: 0,
                duration: 0.6,
              }),
            onEnterBack: () =>
              gsap.to(item, {
                opacity: 1,
                duration: 0.6,
              }),
            onLeaveBack: () =>
              gsap.to(item, {
                opacity: 0,
                duration: 0.6,
              }),
          },
        }
      );
    });

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="scroll-text-container" ref={containerRef}>
        {backgroundTexts.map((text, idx) => (
          <div className="text-wrapper" key={idx}>
            <span className="background-text-vertical">{text}</span>
            {/* Add text reflection */}
            <span className="background-text-reflection">{text}</span>
          </div>
        ))}
      </div>
      <div className="scroll-text-mask"></div>
    </>
  );
}

export default ScrollText;
