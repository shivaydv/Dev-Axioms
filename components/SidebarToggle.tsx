"use client";
import React, { useEffect } from "react";
import { useSidebar } from "fumadocs-ui/provider";
import { usePathname } from "next/navigation";
import { Menu, PanelLeft, PanelLeftOpen, X } from "lucide-react";

const SidebarToggle = () => {
  const { setOpen, open } = useSidebar();
  return (
    <button
      onClick={() => setOpen(!open)} className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md"
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
};
const  SidebarCollapse = () => {
  const { collapsed, setCollapsed } = useSidebar();
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setCollapsed(!collapsed);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [collapsed, setCollapsed]);
  return (
    <button
      onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md"
    >
      {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
    </button>
  );
};

const SidebarNavBtn = () => {
  const pathname = usePathname();
  const showSidebarButtons = pathname?.startsWith("/docs");
  return (
    <>
      {showSidebarButtons && (
        <>
          <div className="max-md:hidden flex justify-center items-center">
            <SidebarCollapse />
          </div>
          <div className="md:hidden flex justify-center items-center">
            <SidebarToggle />
          </div>
        </>
      )}
    </>
  );
};

export { SidebarToggle, SidebarCollapse, SidebarNavBtn };
