import React from "react";
import { useTheme } from "next-themes";
import { MaterialTransition } from "./MaterialTransition";
import { ANIMATION_CONFIG } from "./config";

// Animation types available
export type TransitionType = "material" | "none";

interface ThemeTransitionProps {
  type?: TransitionType;
}

export function ThemeTransition({
  type = ANIMATION_CONFIG.type,
}: ThemeTransitionProps) {
  const { theme } = useTheme();

  // If animations are disabled, don't render anything
  if (!ANIMATION_CONFIG.enabled || type === "none") {
    return null;
  }

  // Only material transition is supported
  return (
    <MaterialTransition key={theme} duration={ANIMATION_CONFIG.duration} />
  );
}
