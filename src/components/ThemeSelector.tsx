import * as React from "react";
import { Moon, Sun, Palette, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { themeGroups } from "@/lib/theme-config";
import { motion } from "framer-motion";

interface ThemeSelectorProps {
  onThemeSelect?: (theme: string) => void;
  className?: string;
}

export function ThemeSelector({
  onThemeSelect,
  className,
}: ThemeSelectorProps) {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "theme",
        newValue: newTheme,
        storageArea: localStorage,
      })
    );
    onThemeSelect?.(newTheme);
  };

  return (
    <motion.div
      className={cn("grid grid-cols-2 gap-3", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {themeGroups.map((group, groupIndex) => (
        <motion.div
          key={group.name}
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1, duration: 0.2 }}
        >
          <p className="text-xs font-medium text-muted-foreground mb-1.5">
            {group.name}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {group.themes.map((t, themeIndex) => (
              <motion.button
                key={t.value}
                onClick={() => handleThemeChange(t.value)}
                className={cn(
                  "relative flex flex-col gap-2 rounded-lg border-2 border-muted bg-background p-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-300",
                  theme === t.value && "border-primary"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: groupIndex * 0.1 + themeIndex * 0.05,
                  duration: 0.2,
                }}
              >
                <motion.div
                  className="h-16 rounded-md border"
                  style={{
                    background: t.colors.background,
                    borderColor: t.colors.primary,
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="flex h-full items-center justify-center"
                    style={{ color: t.colors.text }}
                  >
                    <div
                      className="rounded-md px-2 py-1"
                      style={{
                        backgroundColor: t.colors.primary,
                        color: t.colors.background,
                      }}
                    >
                      Aa
                    </div>
                  </div>
                </motion.div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{t.name}</span>
                  {theme === t.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.3 }}
                    >
                      <Check className="h-3 w-3" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
