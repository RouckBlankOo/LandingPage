import { useEffect, useRef } from "react";
import "./ReliableText.css";

export default function ReliableText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textItems = [
    "TECH REDUX",
    "DESIGN",
    "BLOCKCHAIN",
    "DEVELOPMENT",
    "MARKETING",
  ];

  // No animations initially - just show static text
  useEffect(() => {
    console.log("ReliableText component mounted");
  }, []);

  return (
    <div className="reliable-text-container" ref={containerRef}>
      {textItems.map((text, index) => (
        <div
          className="reliable-text-item"
          key={index}
          style={{
            opacity: 1, // Start visible to verify rendering
            top: `${20 + index * 15}vh`, // Position them at different heights
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
