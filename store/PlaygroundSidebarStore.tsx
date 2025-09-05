"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  isCollapsed: boolean;
  toggle: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const toggle = () => setIsCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ 
      isCollapsed, 
      toggle, 
      activeTab, 
      setActiveTab
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
}
