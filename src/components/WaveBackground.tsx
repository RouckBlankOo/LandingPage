import { useEffect, useRef } from "react";
import gsap from "gsap";

function WaveBackground() {
  const waveRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!waveRef.current) return;
    gsap.to(waveRef.current, {
      x: "-100",
      repeat: -1,
      yoyo: true,
      duration: 6,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="wave-bg">
      <svg
        ref={waveRef}
        viewBox="0 0 1440 320"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BFCFD4FF" />
            <stop offset="100%" stopColor="#C4CAD4FF" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGradient)"
          fillOpacity="1"
          d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  );
}

export default WaveBackground;
