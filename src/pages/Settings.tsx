import React from "react";
import { ThemeSelector } from "@/components/ThemeSelector";

export default function Settings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Theme Settings */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Appearance</h2>
            <p className="text-muted-foreground">
              Choose your preferred color theme. Each theme comes with a light
              and dark variant.
            </p>
            <div className="p-6 border rounded-lg bg-background/50">
              <ThemeSelector />
            </div>
          </div>

          {/* Other settings sections can go here */}
        </div>
      </div>
    </div>
  );
}
