import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";
import { useRef, useEffect, useState } from "react";
import logo from "../assets/Logo3d.png";
import "./Logo.css";

function AnimatedLogo({
  cameraZ,
  logoScale,
}: {
  cameraZ: number;
  logoScale: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ camera }) => {
    // Animate camera zoom-in
    camera.position.z = cameraZ;
    camera.updateProjectionMatrix();

    // Logo animation (optional)
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.5;
      meshRef.current.rotation.x = Math.cos(Date.now() * 0.00025) * 0.2;
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;

      // Apply scaling
      meshRef.current.scale.set(logoScale, logoScale, logoScale);
    }
  });

  const texture = useLoader(TextureLoader, logo);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.4, 2.4]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

export default function Logo() {
  const [cameraZ, setCameraZ] = useState(5);
  const [logoScale, setLogoScale] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Debug: Log scroll values
      console.log("ScrollY:", scrollY, "ViewHeight:", vh);

      // Simplified: Start scaling immediately from top
      const progress = Math.min(scrollY / (vh * 2), 1);

      console.log("Progress:", progress);

      // Camera moves from z=5 (default) to z=1 (very close)
      setCameraZ(5 - progress * 4);
      // Logo scales from 1 (normal) to 4 (4x bigger)
      setLogoScale(1 + progress * 3);

      console.log(
        "Camera Z:",
        5 - progress * 4,
        "Logo Scale:",
        1 + progress * 3
      );
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
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
      }}
    >
      <Canvas camera={{ position: [0, 0, cameraZ], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} intensity={0.7} />
        <AnimatedLogo cameraZ={cameraZ} logoScale={logoScale} />
      </Canvas>
    </div>
  );
}
