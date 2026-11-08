// File: src/context/ThemeProvider.jsx
import { useEffect, useMemo, useState } from "react";
import { STORAGE_KEY, ThemeContext } from "./theme.js";

// The inline script in index.html has already put the class on <html> before the first paint.
function initialTheme() {
  return document.documentElement.classList.contains("light-mode") ? "light" : "dark";
}

function storedTheme() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved && (saved.theme === "light" || saved.theme === "dark") ? saved.theme : null;
  } catch {
    return null;
  }
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light-mode", "dark-mode");
    root.classList.add(`${theme}-mode`);
  }, [theme]);

  // With no stored choice, follow the system setting as it changes.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      if (!storedTheme()) setTheme(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme() {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: next }));
        } catch {
          // storage blocked (private window): the choice lasts for this visit only
        }
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
