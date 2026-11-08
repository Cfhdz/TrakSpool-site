// File: src/context/theme.js
// Theme context object and hook. The provider lives in ThemeProvider.jsx (kept apart so that
// file exports only a component and Fast Refresh keeps working).
import { createContext, useContext } from "react";

// Same storage key and shape as the admin console: { theme: "dark" | "light" }.
// index.html reads it before the first paint; keep the two in step.
export const STORAGE_KEY = "trakspool-settings";

export const ThemeContext = createContext(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
