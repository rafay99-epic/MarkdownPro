import { TransitionType } from "./index";

// Animation duration reference (at 60fps):
// 30 frames = 500ms (half a second)
// 60 frames = 1000ms (1 second)
// 90 frames = 1500ms (1.5 seconds)
// 120 frames = 2000ms (2 seconds)
export const ANIMATION_CONFIG = {
  enabled: true, // Toggle animations on/off
  type: "material" as TransitionType,
  // Choose your preferred duration:
  duration: 120, // Current: 1.5 seconds (smooth and visible)
  // Other options:
  // duration: 45,  // 750ms (medium)
  // duration: 60,  // 1 second (relaxed)
  // duration: 120, // 2 seconds (very slow)
  // duration: 30,  // 500ms (quick)
  // duration: 25,  // 417ms (original fast)
};
