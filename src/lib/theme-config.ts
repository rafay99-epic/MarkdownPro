import { Moon, Sun, Palette } from "lucide-react";

export const themeGroups = [
  {
    name: "System",
    themes: [
      {
        name: "Light",
        value: "light",
        icon: Sun,
        colors: {
          primary: "#0284c7",
          background: "#ffffff",
          text: "#020617",
        },
      },
      {
        name: "Dark",
        value: "dark",
        icon: Moon,
        colors: {
          primary: "#0ea5e9",
          background: "#020617",
          text: "#ffffff",
        },
      },
    ],
  },
  {
    name: "Purple Dream",
    themes: [
      {
        name: "Light",
        value: "purple-light",
        icon: Palette,
        colors: {
          primary: "#9333ea",
          background: "#faf5ff",
          text: "#3b0764",
        },
      },
      {
        name: "Dark",
        value: "purple-dark",
        icon: Palette,
        colors: {
          primary: "#a855f7",
          background: "#2e1065",
          text: "#f3e8ff",
        },
      },
    ],
  },
  {
    name: "Forest Mint",
    themes: [
      {
        name: "Light",
        value: "forest-light",
        icon: Palette,
        colors: {
          primary: "#059669",
          background: "#f0fdf4",
          text: "#052e16",
        },
      },
      {
        name: "Dark",
        value: "forest-dark",
        icon: Palette,
        colors: {
          primary: "#10b981",
          background: "#052e16",
          text: "#ecfdf5",
        },
      },
    ],
  },
  {
    name: "Sunset Coral",
    themes: [
      {
        name: "Light",
        value: "sunset-light",
        icon: Palette,
        colors: {
          primary: "#f97316",
          background: "#fff7ed",
          text: "#431407",
        },
      },
      {
        name: "Dark",
        value: "sunset-dark",
        icon: Palette,
        colors: {
          primary: "#fb923c",
          background: "#431407",
          text: "#ffedd5",
        },
      },
    ],
  },
  {
    name: "Ocean Breeze",
    themes: [
      {
        name: "Light",
        value: "ocean-light",
        icon: Palette,
        colors: {
          primary: "#0891b2",
          background: "#ecfeff",
          text: "#164e63",
        },
      },
      {
        name: "Dark",
        value: "ocean-dark",
        icon: Palette,
        colors: {
          primary: "#06b6d4",
          background: "#164e63",
          text: "#cffafe",
        },
      },
    ],
  },
  {
    name: "Golden Hour",
    themes: [
      {
        name: "Light",
        value: "golden-light",
        icon: Palette,
        colors: {
          primary: "#d97706",
          background: "#fffbeb",
          text: "#451a03",
        },
      },
      {
        name: "Dark",
        value: "golden-dark",
        icon: Palette,
        colors: {
          primary: "#f59e0b",
          background: "#451a03",
          text: "#fef3c7",
        },
      },
    ],
  },
];
