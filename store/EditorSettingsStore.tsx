"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Unified editor settings type
export interface EditorSettings {
  fontSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  isConsoleVisible: boolean;
}

interface EditorSettingsContextType {
  settings: EditorSettings;
  updateSetting: <K extends keyof EditorSettings>(
    key: K,
    value: EditorSettings[K],
  ) => void;
  toggleConsole: () => void;
  resetSettings: () => void;
}

const defaultSettings: EditorSettings = {
  fontSize: 14,
  wordWrap: true,
  minimap: false,
  lineNumbers: true,
  isConsoleVisible: false,
};

const STORAGE_KEY = "editor-settings";

const EditorSettingsContext = createContext<
  EditorSettingsContextType | undefined
>(undefined);

export function EditorSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<EditorSettings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedSettings = JSON.parse(stored);
          // Merge with defaults to ensure all properties exist
          setSettings({ ...defaultSettings, ...parsedSettings });
        }
      } catch (error) {
        console.warn(
          "Failed to load editor settings from localStorage:",
          error,
        );
      } finally {
        setIsInitialized(true);
      }
    };

    loadSettings();
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.warn("Failed to save editor settings to localStorage:", error);
      }
    }
  }, [settings, isInitialized]);

  const updateSetting = <K extends keyof EditorSettings>(
    key: K,
    value: EditorSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleConsole = () => {
    setSettings((prev) => ({
      ...prev,
      isConsoleVisible: !prev.isConsoleVisible,
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value: EditorSettingsContextType = {
    settings,
    updateSetting,
    toggleConsole,
    resetSettings,
  };

  return (
    <EditorSettingsContext.Provider value={value}>
      {children}
    </EditorSettingsContext.Provider>
  );
}

export function useEditorSettings() {
  const context = useContext(EditorSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useEditorSettings must be used within an EditorSettingsProvider",
    );
  }
  return context;
}
