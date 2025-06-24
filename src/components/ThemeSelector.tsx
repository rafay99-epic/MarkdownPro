import * as React from "react";
import { Moon, Sun, Palette, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { themeGroups } from "@/lib/theme-config";

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
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {themeGroups.map((group) => (
        <div key={group.name} className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground mb-1.5">
            {group.name}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {group.themes.map((t) => (
              <button
                key={t.value}
                onClick={() => handleThemeChange(t.value)}
                className={cn(
                  "relative flex flex-col gap-2 rounded-lg border-2 border-muted bg-background p-2 hover:bg-accent hover:text-accent-foreground",
                  theme === t.value && "border-primary"
                )}
              >
                <div
                  className="h-16 rounded-md border"
                  style={{
                    background: t.colors.background,
                    borderColor: t.colors.primary,
                  }}
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
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{t.name}</span>
                  {theme === t.value && <Check className="h-3 w-3" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
