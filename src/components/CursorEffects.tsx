import { useState, useEffect, useCallback } from "react";
import "./CursorEffects.css";
import FluidCanvas from "./FluidCanvas"; // Adjust the path as needed

const CursorEffects = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [trails, setTrails] = useState<
    Array<{ x: number; y: number; life: number }>
  >([]);

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setHidden(false);
  }, []);

  useEffect(() => {
    const updateTrails = () => {
      setTrails((prevTrails) => {
        const newTrail = {
          x: position.x,
          y: position.y,
          life: 5,
        };

        const updatedTrails = prevTrails
          .map((trail) => ({ ...trail, life: trail.life - 1 }))
          .filter((trail) => trail.life > 0);

        return [newTrail, ...updatedTrails].slice(0, 12);
      });
    };

    const trailInterval = setInterval(updateTrails, 50);
    return () => clearInterval(trailInterval);
  }, [position]);

  useEffect(() => {
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", () => setHidden(false));
    document.addEventListener("mouseleave", () => setHidden(true));
    document.addEventListener("mousedown", () => setClicked(true));
    document.addEventListener("mouseup", () => setClicked(false));

    const addLinkHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, [role="button"]'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    setTimeout(addLinkHoverListeners, 1000);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", () => setHidden(false));
      document.removeEventListener("mouseleave", () => setHidden(true));
      document.removeEventListener("mousedown", () => setClicked(true));
      document.removeEventListener("mouseup", () => setClicked(false));
    };
  }, [updatePosition]);

  const cursorClasses = `
    cursor-main
    ${hidden ? "cursor-hidden" : ""}
    ${clicked ? "cursor-clicked" : ""}
    ${linkHovered ? "cursor-hover" : ""}
  `;

  return (
    <>
      {/* Main cursor with fluid canvas */}
      <div
        className={cursorClasses}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <FluidCanvas />
      </div>

      {/* Outer ring */}
      <div
        className={`cursor-ring ${linkHovered ? "cursor-ring-hover" : ""} ${
          clicked ? "cursor-ring-clicked" : ""
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Trailing dots */}
      {trails.map((trail, i) => (
        <div
          key={i}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: trail.life / 5,
            transform: `scale(${trail.life / 10})`,
          }}
        />
      ))}
    </>
  );
};

export default CursorEffects;
