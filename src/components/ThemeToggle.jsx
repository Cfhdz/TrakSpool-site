// File: src/components/ThemeToggle.jsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/theme.js";

// Same control as the admin console's: one quiet icon button, moon in dark mode, sun in light.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button className="themeToggle" onClick={toggleTheme} aria-label={label} title={label} type="button">
      {isDark ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </button>
  );
}
