import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { themeGroups } from "@/lib/theme-config";

export function GeometricShapes() {
  const { theme } = useTheme();

  const getCurrentThemeColors = () => {
    const currentTheme = themeGroups
      .flatMap((group) => group.themes)
      .find((t) => t.value === theme);
    return (
      currentTheme?.colors || { background: "#ffffff", primary: "#000000" }
    );
  };

  const colors = getCurrentThemeColors();
  const shapes = Array.from({ length: 5 }, (_, i) => i);

  return (
    <AnimatePresence mode="wait">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {shapes.map((_, i) => (
          <motion.div
            key={`${theme}-shape-${i}`}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: -180,
              x: "50%",
              y: "50%",
            }}
            animate={{
              opacity: 1,
              scale: 2,
              rotate: 0,
              x: "-50%",
              y: "-50%",
              transition: {
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              rotate: 180,
              transition: {
                duration: 0.3,
                delay: (shapes.length - i - 1) * 0.1,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100vmax",
              height: "100vmax",
              backgroundColor: i % 2 === 0 ? colors.primary : colors.background,
              clipPath: `polygon(${Math.random() * 50}% ${
                Math.random() * 50
              }%, ${50 + Math.random() * 50}% ${Math.random() * 50}%, ${
                50 + Math.random() * 50
              }% ${50 + Math.random() * 50}%, ${Math.random() * 50}% ${
                50 + Math.random() * 50
              }%)`,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
