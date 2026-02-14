// File: src/components/SettingsPanel.jsx

import { useState, useRef, useEffect } from "react";
import { Settings, X } from "lucide-react";
import { useSettings } from "../context/SettingsContext.jsx";

/**
 * Settings Panel Component
 * 
 * Floating button (ellipsis/settings icon) that opens a panel
 * for adjusting font family, font size, and theme
 */
export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  
  const {
    settings,
    setFont,
    setFontSize,
    setTheme,
    resetSettings,
    fontOptions,
    fontSizeOptions
  } = useSettings();

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Floating Settings Button */}
      <button
        ref={buttonRef}
        className="settingsButton"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open settings"
        aria-expanded={isOpen}
        type="button"
      >
        <Settings size={20} strokeWidth={2} />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="settingsPanel" ref={panelRef}>
          {/* Header */}
          <div className="settingsPanelHeader">
            <h3 className="settingsPanelTitle">Settings</h3>
            <button
              className="settingsPanelClose"
              onClick={() => setIsOpen(false)}
              aria-label="Close settings"
              type="button"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Content */}
          <div className="settingsPanelContent">
            
            {/* Theme Selection */}
            <div className="settingsSection">
              <label className="settingsLabel">Theme</label>
              <div className="settingsButtonGroup">
                <button
                  className={`settingsOption ${settings.theme === "dark" ? "settingsOption--active" : ""}`}
                  onClick={() => setTheme("dark")}
                  type="button"
                >
                  Dark
                </button>
                <button
                  className={`settingsOption ${settings.theme === "light" ? "settingsOption--active" : ""}`}
                  onClick={() => setTheme("light")}
                  type="button"
                >
                  Light
                </button>
              </div>
            </div>

            {/* Font Family Selection */}
            <div className="settingsSection">
              <label className="settingsLabel">Font Family</label>
              <div className="settingsSelect">
                {fontOptions.map(font => (
                  <button
                    key={font.id}
                    className={`settingsSelectOption ${settings.font === font.id ? "settingsSelectOption--active" : ""}`}
                    onClick={() => setFont(font.id)}
                    type="button"
                  >
                    <div className="settingsSelectOptionName">{font.name}</div>
                    <div className="settingsSelectOptionDesc">{font.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size Selection */}
            <div className="settingsSection">
              <label className="settingsLabel">Font Size</label>
              <div className="settingsButtonGroup">
                {fontSizeOptions.map(size => (
                  <button
                    key={size.id}
                    className={`settingsOption ${settings.fontSize === size.id ? "settingsOption--active" : ""}`}
                    onClick={() => setFontSize(size.id)}
                    type="button"
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="settingsSection">
              <button
                className="settingsReset"
                onClick={resetSettings}
                type="button"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
