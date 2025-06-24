import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { themeGroups } from "@/lib/theme-config";

interface MaterialTransitionProps {
  duration?: number;
}

export function MaterialTransition({ duration = 25 }: MaterialTransitionProps) {
  const { theme, resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isAnimatingRef = useRef(false);
  const clickPositionRef = useRef({ x: 0, y: 0 });
  const prevThemeRef = useRef<string | undefined>();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      clickPositionRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (isAnimatingRef.current || !theme || theme === prevThemeRef.current)
      return;

    const getThemeColors = (themeName?: string) => {
      const selectedTheme = themeGroups
        .flatMap((group) => group.themes)
        .find((t) => t.value === themeName);
      return (
        selectedTheme?.colors || {
          background: resolvedTheme === "dark" ? "#000000" : "#ffffff",
          primary: resolvedTheme === "dark" ? "#ffffff" : "#000000",
        }
      );
    };

    // Create a container for the old theme
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.backgroundColor = getThemeColors(
      prevThemeRef.current
    ).background;
    container.style.zIndex = "9998";
    document.body.appendChild(container);

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

    const animate = () => {
      isAnimatingRef.current = true;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = getThemeColors(theme);

      const startX = clickPositionRef.current.x || canvas.width / 2;
      const startY = clickPositionRef.current.y || canvas.height / 2;

      const maxRadius = Math.sqrt(
        Math.pow(Math.max(startX, canvas.width - startX), 2) +
          Math.pow(Math.max(startY, canvas.height - startY), 2)
      );

      let currentRadius = 0;
      let frame = 0;

      const render = () => {
        if (frame >= duration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          isAnimatingRef.current = false;
          container.remove();
          prevThemeRef.current = theme;
          return;
        }

        const progress = frame / duration;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        currentRadius = maxRadius * easeOutQuart;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(startX, startY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = colors.background;
        ctx.fill();

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
  }, [theme, duration, resolvedTheme]);

  return null;
}
