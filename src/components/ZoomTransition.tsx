import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ZoomTransition.css";

gsap.registerPlugin(ScrollTrigger);

function ZoomTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const innerGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transitionElement = transitionRef.current;
    const circleElement = circleRef.current;
    const raysElement = raysRef.current;
    const innerGlowElement = innerGlowRef.current;

    if (
      !transitionElement ||
      !circleElement ||
      !raysElement ||
      !innerGlowElement
    )
      return;

    // Initial state - hidden
    gsap.set(transitionElement, {
      opacity: 0,
    });

    gsap.set([circleElement, raysElement, innerGlowElement], {
      scale: 0.5,
      opacity: 0,
    });

    // Create the zoom transition sequence
    const transitionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top+=250% top", // Start after text animations (2.5 screens down)
        end: "top+=350% top", // End after 3.5 screens
        scrub: true,
        // markers: true, // Uncomment for debugging
      },
    });

    // Show transition elements in sequence
    transitionTimeline
      // First make container visible
      .to(transitionElement, {
        opacity: 1,
        duration: 0.1,
      })
      // Grow the main circle
      .to(
        circleElement,
        {
          opacity: 0.8,
          scale: 1,
          duration: 0.2,
        },
        "<"
      )
      // Add rays
      .to(
        raysElement,
        {
          opacity: 0.6,
          scale: 1,
          duration: 0.3,
        },
        "<0.1"
      )
      // Add inner glow
      .to(
        innerGlowElement,
        {
          opacity: 0.9,
          scale: 1,
          duration: 0.2,
        },
        "<0.1"
      )
      // Expand all elements
      .to(
        [circleElement, raysElement],
        {
          scale: 4,
          duration: 0.4,
        },
        ">0.1"
      )
      // Grow inner glow more dramatically
      .to(
        innerGlowElement,
        {
          scale: 8,
          opacity: 1,
          duration: 0.3,
        },
        "<"
      )
      // Final flash before transition completes
      .to(
        innerGlowElement,
        {
          scale: 20,
          opacity: 0,
          duration: 0.3,
        },
        ">0.1"
      )
      // Fade out the entire effect
      .to(
        [circleElement, raysElement],
        {
          opacity: 0,
          duration: 0.2,
        },
        "<0.1"
      );

    return () => {
      transitionTimeline.kill();
    };
  }, []);

  return (
    <div className="zoom-transition-container" ref={transitionRef}>
      <div className="zoom-circle" ref={circleRef}></div>
      <div className="zoom-rays" ref={raysRef}></div>
      <div className="zoom-inner-glow" ref={innerGlowRef}></div>
    </div>
  );
}

export default ZoomTransition;
