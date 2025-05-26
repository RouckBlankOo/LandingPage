import { useEffect } from "react";
import gsap from "gsap";

function AnimatedGradient() {
  useEffect(() => {
    const bg = document.querySelector(".animated-bg");
    if (!bg) return;

    // Start from same position as preloader background
    gsap.set(bg, {
      backgroundPosition: "0% 50%",
    });

    // Start animation after a small delay
    setTimeout(() => {
      gsap.to(bg, {
        backgroundPosition: "100% 50%",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, 800);
  }, []);

  return <div className="animated-bg"></div>;
}

export default AnimatedGradient;
