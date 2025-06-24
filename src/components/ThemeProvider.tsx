import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themes, type ThemeType } from "@/lib/themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const applyTheme = (theme: ThemeType) => {
    const root = document.documentElement;
    if (theme === "light" || theme === "dark") {
      // Reset custom theme variables
      Object.keys(themes["purple-dark"]).forEach((key) => {
        root.style.removeProperty(`--${key}`);
      });
      return;
    }

    const themeColors = themes[theme as keyof typeof themes];
    if (!themeColors) return;

    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  // Apply theme on mount and theme change
  useEffect(() => {
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem("theme") || "purple-dark";
      applyTheme(currentTheme as ThemeType);
    };

    // Initial application
    handleStorageChange();

    // Listen for theme changes
    window.addEventListener("storage", handleStorageChange);

    // Observe class changes for light/dark mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          handleStorageChange();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="purple-dark"
      storageKey="theme"
      themes={[
        "light",
        "dark",
        "purple-light",
        "purple-dark",
        "forest-light",
        "forest-dark",
        "sunset-light",
        "sunset-dark",
        "ocean-light",
        "ocean-dark",
        "golden-light",
        "golden-dark",
      ]}
      enableSystem={false}
      disableTransitionOnChange
      value={{
        light: "light",
        dark: "dark",
        "purple-light": "light",
        "purple-dark": "dark",
        "forest-light": "light",
        "forest-dark": "dark",
        "sunset-light": "light",
        "sunset-dark": "dark",
        "ocean-light": "light",
        "ocean-dark": "dark",
        "golden-light": "light",
        "golden-dark": "dark",
      }}
    >
      {children}
    </NextThemesProvider>
  );
};
