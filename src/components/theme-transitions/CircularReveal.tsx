import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { themeGroups } from "@/lib/theme-config";

export function CircularReveal() {
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ scale: 0, borderRadius: "100%" }}
        animate={{
          scale: 2,
          borderRadius: "0%",
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        }}
        exit={{
          scale: 2,
          opacity: 0,
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        }}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "100vmax",
          height: "100vmax",
          backgroundColor: colors.background,
          transformOrigin: "center",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
    </AnimatePresence>
  );
}
