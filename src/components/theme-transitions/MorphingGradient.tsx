import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { themeGroups } from "@/lib/theme-config";

export function MorphingGradient() {
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

      const points = Array.from({ length: 5 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius:
          Math.min(canvas.width, canvas.height) * (0.2 + Math.random() * 0.3),
        xSpeed: (Math.random() - 0.5) * 2,
        ySpeed: (Math.random() - 0.5) * 2,
      }));

      let progress = 0;
      let opacity = 0;
      const duration = 60;

      const render = () => {
        if (progress >= duration + 10) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          isAnimatingRef.current = false;
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (progress < 10) opacity = progress / 10;
        else if (progress > duration) opacity = 1 - (progress - duration) / 10;

        points.forEach((point) => {
          point.x += point.xSpeed;
          point.y += point.ySpeed;

          if (point.x < 0 || point.x > canvas.width) point.xSpeed *= -1;
          if (point.y < 0 || point.y > canvas.height) point.ySpeed *= -1;
        });

        ctx.globalAlpha = opacity;
        points.forEach((point, i) => {
          const gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            point.radius
          );

          const color = i % 2 === 0 ? colors.primary : colors.background;
          gradient.addColorStop(0, `${color}ff`);
          gradient.addColorStop(1, `${color}00`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        progress++;
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
