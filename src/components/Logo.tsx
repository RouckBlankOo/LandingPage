import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/Logo3d.png";
import "./Logo.css";

gsap.registerPlugin(ScrollTrigger);

function AnimatedLogo({
  scale,
  zoomProgress,
}: {
  scale: number;
  zoomProgress: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, logo);

  useFrame(() => {
    if (meshRef.current) {
      // Regular breathing animation for normal state
      meshRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.5;
      meshRef.current.rotation.x = Math.cos(Date.now() * 0.00025) * 0.2;

      // Only apply floating motion when not in zoom transition
      if (zoomProgress < 0.1) {
        meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }

      // Apply scale based on scroll (for initial state and zoom effect)
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.4, 2.4]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

export default function EnhancedLogo() {
  const [scale, setScale] = useState(1);
  const [zoomProgress, setZoomProgress] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Normal zoom effect (from the original Logo.tsx)
      const start = vh * 2; // Start regular zoom after 2 screens
      const end = vh * 3; // End regular zoom at 3 screens
      const progress = Math.min(
        Math.max((scrollY - start) / (end - start), 0),
        1
      );

      // Special zoom effect for transition
      const zoomStart = vh * 3.2; // Start special zoom effect
      const zoomEnd = vh * 4; // End special zoom effect
      const zoomProgress = Math.min(
        Math.max((scrollY - zoomStart) / (zoomEnd - zoomStart), 0),
        1
      );

      // Calculate final scale - starts at 1, goes up to 5 with regular scroll, then zooms to 20 for transition
      const finalScale = 1 + progress * 4 + zoomProgress * 15;

      setScale(finalScale);
      setZoomProgress(zoomProgress);

      // Handle opacity of the logo container for fade-out effect during transition
      if (logoRef.current) {
        if (zoomProgress > 0.7) {
          logoRef.current.style.opacity = String(
            1 - (zoomProgress - 0.7) * 3.33
          ); // Fade out over the last 30% of the transition
        } else {
          logoRef.current.style.opacity = "1";
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={logoRef}
      className="logo-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 20,
        pointerEvents: "none",
        overflow: "hidden",
        transition: "opacity 0.3s ease-out",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} intensity={0.7} />
        <AnimatedLogo scale={scale} zoomProgress={zoomProgress} />
      </Canvas>
    </div>
  );
}
