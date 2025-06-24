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
import { motion, AnimatePresence } from "framer-motion";
import { ThemeTransition } from "./theme-transitions";

export function ThemeToggle() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentTheme =
    themeGroups
      .flatMap((group) => group.themes)
      .find((t) => t.value === theme) || themeGroups[0].themes[0];
  const Icon = currentTheme.icon;

  return (
    <>
      <ThemeTransition />
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Icon className="h-[1.2rem] w-[1.2rem]" />
              </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[340px] p-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ThemeSelector onThemeSelect={() => setIsOpen(false)} />
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
