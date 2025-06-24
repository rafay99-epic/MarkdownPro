import { track } from "@vercel/analytics";

// Theme changes
export const trackThemeChange = (newTheme: string) => {
  track("theme_change", { theme: newTheme });
};

// File operations
export const trackFileOperation = (
  operation: "upload" | "download" | "convert",
  fileType: string,
  success: boolean
) => {
  track("file_operation", {
    operation,
    fileType,
    success,
  });
};

// Editor actions
export const trackEditorAction = (
  action: "save" | "create" | "delete" | "edit"
) => {
  track("editor_action", { action });
};

// Feature usage
export const trackFeatureUsage = (feature: string) => {
  track("feature_usage", { feature });
};

// Navigation
export const trackNavigation = (page: string) => {
  track("page_view", { page });
};

// Error tracking
export const trackError = (error: Error, context: string) => {
  track("error", {
    message: error.message,
    context,
    stack: error.stack,
  });
};

// Conversion settings changes
export const trackSettingsChange = (
  setting: string,
  value: string | number | boolean | object
) => {
  track("settings_change", {
    setting,
    value: typeof value === "object" ? JSON.stringify(value) : value,
  });
};

// User interactions
export const trackInteraction = (element: string, action: string) => {
  track("user_interaction", {
    element,
    action,
  });
};
