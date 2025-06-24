import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { themeGroups } from "@/lib/theme-config";

export function PixelTransition() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (isAnimatingRef.current) return;

    const getCurrentThemeColors = () => {
      const currentTheme = themeGroups
        .flatMap((group) => group.themes)
        .find((t) => t.value === theme);
      return (
        currentTheme?.colors || { background: "#ffffff", primary: "#000000" }
      );
    };

    if (!canvasRef.current) {
      const canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "9999";
      document.body.appendChild(canvas);
      canvasRef.current = canvas;
    }

    const animate = async () => {
      isAnimatingRef.current = true;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = getCurrentThemeColors();

      const pixelSize = 30;
      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);
      const pixels = [];

      // Create pixel grid
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          pixels.push({
            x: i * pixelSize,
            y: j * pixelSize,
            delay: Math.random() * 30,
            color: Math.random() > 0.5 ? colors.primary : colors.background,
          });
        }
      }

      let frame = 0;
      const duration = 45;

      const render = () => {
        if (frame >= duration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          isAnimatingRef.current = false;
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pixels.forEach((pixel) => {
          if (frame > pixel.delay) {
            const progress = (frame - pixel.delay) / 15;
            const size = pixelSize * Math.min(1, progress);

            ctx.fillStyle = pixel.color;
            ctx.fillRect(
              pixel.x + (pixelSize - size) / 2,
              pixel.y + (pixelSize - size) / 2,
              size,
              size
            );
          }
        });

        frame++;
        requestAnimationFrame(render);
      };

      render();
    };

    animate();

    return () => {
      if (canvasRef.current && document.body.contains(canvasRef.current)) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx)
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
      }
    };
  }, [theme]);

  return null;
}
