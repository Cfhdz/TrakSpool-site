// File: src/context/SettingsContext.jsx

import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

// Available font options
export const FONT_OPTIONS = [
  { 
    id: "inter", 
    name: "Inter", 
    display: "'Inter', ui-sans-serif, system-ui, sans-serif",
    description: "Professional & trustworthy"
  },
  { 
    id: "space-grotesk", 
    name: "Space Grotesk", 
    display: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
    description: "Warm & approachable"
  },
  { 
    id: "manrope", 
    name: "Manrope", 
    display: "'Manrope', ui-sans-serif, system-ui, sans-serif",
    description: "Technical but elegant"
  },
  { 
    id: "dm-sans", 
    name: "DM Sans", 
    display: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    description: "Clean & minimal"
  }
];

// Font size presets (multipliers applied to base sizes)
export const FONT_SIZES = [
  { id: "small", name: "S", multiplier: 0.875 },
  { id: "medium", name: "M", multiplier: 1.0 },
  { id: "large", name: "L", multiplier: 1.125 },
  { id: "x-large", name: "XL", multiplier: 1.25 }
];

// Default settings
const DEFAULT_SETTINGS = {
  font: "inter",
  fontSize: "medium",
  theme: "dark"
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    
    try {
      const saved = localStorage.getItem("trakspool-settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (error) {
      console.warn("Could not load settings:", error);
    }
    
    // Check system theme preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return {
      ...DEFAULT_SETTINGS,
      theme: prefersDark ? "dark" : "light"
    };
  });

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme
    root.classList.remove("light-mode", "dark-mode");
    root.classList.add(`${settings.theme}-mode`);
    
    // Apply font family
    const fontOption = FONT_OPTIONS.find(f => f.id === settings.font);
    if (fontOption) {
      root.style.setProperty("--font-display", fontOption.display);
      root.style.setProperty("--font-body", fontOption.display);
    }
    
    // Apply font size multiplier
    const sizeOption = FONT_SIZES.find(s => s.id === settings.fontSize);
    if (sizeOption) {
      root.style.setProperty("--font-size-multiplier", sizeOption.multiplier);
      
      // Apply multiplier to all text sizes
      const baseSizes = {
        xs: 0.875,
        sm: 1,
        base: 1.0625,
        md: 1.1875,
        lg: 1.375,
        xl: 1.625,
        "2xl": 1.875,
        "3xl": 2.5,
        "4xl": 3.25,
        "5xl": 4.25
      };
      
      Object.entries(baseSizes).forEach(([key, value]) => {
        const adjusted = value * sizeOption.multiplier;
        root.style.setProperty(`--text-${key}`, `${adjusted}rem`);
      });
    }
    
    // Save to localStorage
    try {
      localStorage.setItem("trakspool-settings", JSON.stringify(settings));
    } catch (error) {
      console.warn("Could not save settings:", error);
    }
  }, [settings]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e) => {
      // Only update if user hasn't manually set theme
      const saved = localStorage.getItem("trakspool-settings");
      if (!saved || !JSON.parse(saved).theme) {
        updateSetting("theme", e.matches ? "dark" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Update individual setting
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Convenience functions
  const setFont = (fontId) => updateSetting("font", fontId);
  const setFontSize = (sizeId) => updateSetting("fontSize", sizeId);
  const setTheme = (theme) => updateSetting("theme", theme);
  const toggleTheme = () => {
    setTheme(settings.theme === "light" ? "dark" : "light");
  };

  // Reset to defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      setFont,
      setFontSize,
      setTheme,
      toggleTheme,
      updateSetting,
      resetSettings,
      fontOptions: FONT_OPTIONS,
      fontSizeOptions: FONT_SIZES
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Custom hook
export function useSettings() {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  
  return context;
}
