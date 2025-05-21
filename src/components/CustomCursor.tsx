import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise"; // Use createNoise3D

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const noise3D = createNoise3D(); // Create noise function
    let animationFrameId: number;
    let time = 0;

    if (!canvas || !ctx) return;

    canvas.width = 64;
    canvas.height = 64;

    const draw = () => {
      time += 0.01;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const value = noise3D(x / 20, y / 20, time); // Use noise3D function
          const index = (y * canvas.width + x) * 4;
          const color = Math.floor((value + 1) * 127.5); // Normalize to [0,255]

          // Apply gradient color
          imageData.data[index] = color; // R
          imageData.data[index + 1] = 255 - color; // G
          imageData.data[index + 2] = color / 2 + 100; // B
          imageData.data[index + 3] = 150; // A
        }
      }
      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CustomCursor;
