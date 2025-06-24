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
  const isInitialMount = useRef(true);

  // Track click position
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      clickPositionRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Theme change effect
  useEffect(() => {
    // Skip animation on initial mount and set initial theme
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevThemeRef.current = theme;
      return;
    }

    // Skip if no theme change or already animating
    if (!theme || theme === prevThemeRef.current || isAnimatingRef.current) {
      return;
    }

    const getThemeColors = () => {
      const currentTheme = themeGroups
        .flatMap((group) => group.themes)
        .find((t) => t.value === theme);
      return (
        currentTheme?.colors || {
          background: resolvedTheme === "dark" ? "#000000" : "#ffffff",
          primary: resolvedTheme === "dark" ? "#ffffff" : "#000000",
        }
      );
    };

    // Create or get canvas
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
      const ctx = canvas.getContext("2d", { alpha: true })!;

      // Set canvas size to match window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = getThemeColors();

      // Use click position or center of screen
      const startX = clickPositionRef.current.x || canvas.width / 2;
      const startY = clickPositionRef.current.y || canvas.height / 2;

      // Calculate max radius to cover screen
      const maxRadius = Math.sqrt(
        Math.pow(Math.max(startX, canvas.width - startX), 2) +
          Math.pow(Math.max(startY, canvas.height - startY), 2)
      );

      let frame = 0;
      let animationFrame: number;

      const render = () => {
        if (frame >= duration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          isAnimatingRef.current = false;
          prevThemeRef.current = theme;
          cancelAnimationFrame(animationFrame);
          return;
        }

        const progress = frame / duration;
        // Material Design easing curve
        const easing =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentRadius = maxRadius * easing;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(startX, startY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = colors.background;
        ctx.fill();
        ctx.restore();

        frame++;
        animationFrame = requestAnimationFrame(render);
      };

      render();
    };

    animate();

    // Cleanup
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
