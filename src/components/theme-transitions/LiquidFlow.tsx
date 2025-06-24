import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { themeGroups } from "@/lib/theme-config";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  offset: number;
  color: string;
}

export function LiquidFlow() {
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

      const particles: Particle[] = [];
      const particleCount = 20;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.3;

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -maxRadius - Math.random() * canvas.height * 0.5,
          radius: maxRadius * (0.3 + Math.random() * 0.7),
          speed: 2 + Math.random() * 2,
          offset: Math.random() * Math.PI * 2,
          color: i % 2 === 0 ? colors.primary : colors.background,
        });
      }

      let frame = 0;
      const duration = 120;

      const render = () => {
        if (frame >= duration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          isAnimatingRef.current = false;
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
          particle.y += particle.speed;

          const wobble = Math.sin(frame * 0.05 + particle.offset) * 30;

          ctx.beginPath();
          ctx.moveTo(particle.x + wobble, particle.y);

          // Create liquid-like shape
          for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 16) {
            const distortion = Math.sin(angle * 3 + frame * 0.05) * 20;
            const x =
              particle.x +
              wobble +
              Math.cos(angle) * (particle.radius + distortion);
            const y =
              particle.y + Math.sin(angle) * (particle.radius + distortion);

            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();

          // Reset particle if it's off screen
          if (particle.y - particle.radius > canvas.height) {
            particle.y = -particle.radius;
            particle.x = Math.random() * canvas.width;
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
