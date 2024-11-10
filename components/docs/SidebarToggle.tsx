"use client";
import React, { useEffect, useState } from "react";
import { useSidebar } from "fumadocs-ui/provider";
import { usePathname } from "next/navigation";
import { Menu, PanelLeft, PanelLeftOpen, X } from "lucide-react";

const SidebarToggle = () => {
  const { setOpen, open } = useSidebar();
  return (
    <button
      onClick={() => setOpen(!open)}
      className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md"
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
};

const SidebarNavBtn = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showSidebarButtons = pathname?.startsWith("/docs");

  if (!mounted) return null;

  return (
    <>
      {showSidebarButtons && (
        <>
          <div className="md:hidden flex justify-center items-center">
            <SidebarToggle />
          </div>
        </>
      )}
    </>
  );
};

export { SidebarToggle, SidebarNavBtn };
