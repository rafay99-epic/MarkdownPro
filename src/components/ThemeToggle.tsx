import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSelector } from "./ThemeSelector";
import { themeGroups } from "@/lib/theme-config";

export function ThemeToggle() {
  const { theme } = useTheme();

  const currentTheme =
    themeGroups
      .flatMap((group) => group.themes)
      .find((t) => t.value === theme) || themeGroups[0].themes[0];
  const Icon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[340px] p-3">
        <ThemeSelector />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
