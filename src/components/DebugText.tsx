import { useEffect } from "react";

export default function DebugText() {
  useEffect(() => {
    console.log("DebugText component mounted!");
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999, // Super high z-index
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)", // Semi-transparent background
      }}
    >
      {["TECH REDUX", "DESIGN", "BLOCKCHAIN", "DEVELOPMENT", "MARKETING"].map(
        (text, index) => (
          <div
            key={index}
            style={{
              fontSize: "10vw",
              fontWeight: "bold",
              color: "white",
              textShadow: "0 0 10px red", // Red glow to make it stand out
              margin: "20px 0",
              backgroundColor: "rgba(255,0,0,0.2)", // Red background
            }}
          >
            {text}
          </div>
        )
      )}
    </div>
  );
}
