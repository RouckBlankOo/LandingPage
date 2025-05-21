import { useEffect } from "react";
import gsap from "gsap";

function AnimatedGradient() {
  useEffect(() => {
    const bg = document.querySelector(".animated-bg");
    if (!bg) return;

    gsap.to(bg, {
      backgroundPosition: "100% 50%",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return <div className="animated-bg"></div>;
}

export default AnimatedGradient;
