import { useState, useEffect } from "react";
import {
  getShikiState,
  getAvailableThemes,
  applyShikiTheme,
} from "@/utils/shiki-config";
import type { Monaco } from "@monaco-editor/react";

export interface UseEditorThemeReturn {
  currentTheme: string;
  availableThemes: string[];
  isShikiReady: boolean;
  hasShikiError: boolean;
  switchTheme: (theme: string, monaco?: Monaco) => Promise<void>;
}

export function useEditorTheme(
  defaultTheme: string = "dark-plus",
): UseEditorThemeReturn {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [availableThemes, setAvailableThemes] = useState<string[]>([]);
  const [isShikiReady, setIsShikiReady] = useState(false);
  const [hasShikiError, setHasShikiError] = useState(false);

  useEffect(() => {
    const updateThemeState = () => {
      const state = getShikiState();
      setIsShikiReady(state.isInitialized);
      setHasShikiError(state.hasError);
      setAvailableThemes(getAvailableThemes());
    };

    // Initial update
    updateThemeState();

    // Poll for updates (in case Shiki initializes after this hook)
    const interval = setInterval(updateThemeState, 1000);

    // Clean up after Shiki is ready
    setTimeout(() => clearInterval(interval), 10000);

    return () => clearInterval(interval);
  }, []);

  const switchTheme = async (theme: string, monaco?: Monaco) => {
    try {
      setCurrentTheme(theme);
      if (monaco) {
        await applyShikiTheme(monaco, theme);
      }
    } catch (error) {
      console.warn("Failed to switch theme:", error);
      // Revert to previous theme on error
      setCurrentTheme(currentTheme);
    }
  };

  return {
    currentTheme,
    availableThemes,
    isShikiReady,
    hasShikiError,
    switchTheme,
  };
}
