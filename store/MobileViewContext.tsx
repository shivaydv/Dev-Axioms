"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type MobileViewType = 'description' | 'editor' | 'preview';

type MobileViewContextType = {
  activeView: MobileViewType;
  setActiveView: (view: MobileViewType) => void;
  isConsoleOpen: boolean;
  toggleConsole: () => void;
};

const MobileViewContext = createContext<MobileViewContextType | undefined>(undefined);

export function MobileViewProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<MobileViewType>('description');
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const toggleConsole = () => {
    setIsConsoleOpen(prev => !prev);
  };

  // Auto-open console when switching to editor view if it was previously open
  const setActiveViewWithConsole = (view: MobileViewType) => {
    setActiveView(view);
    // Don't auto-close console when switching views
  };

  return (
    <MobileViewContext.Provider value={{ 
      activeView, 
      setActiveView: setActiveViewWithConsole,
      isConsoleOpen,
      toggleConsole
    }}>
      {children}
    </MobileViewContext.Provider>
  );
}

export function useMobileView() {
  const ctx = useContext(MobileViewContext);
  if (!ctx) throw new Error("useMobileView must be used inside MobileViewProvider");
  return ctx;
}
