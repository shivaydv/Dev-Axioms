"use client";

import { Button } from "@/components/ui/button";
import { Timer } from "@/components/playground/Timer";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";
import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { Logo } from "@/components/global/Logo";
import { ThemeToggle } from "@/components/global/ThemeToggle";

interface PracticeHeaderProps {
  timeLimit?: number;
  onTimeUp?: () => void;
  onSubmit?: () => void;
  isSidebarVisible?: boolean;
}

export default function PracticeHeader({
  timeLimit,
  onTimeUp,
  onSubmit,
  isSidebarVisible = true,
}: PracticeHeaderProps) {
  const { toggle: toggleSidebar, isCollapsed: isSidebarCollapsed } =
    useSidebar();

  const getSidebarIcon = () => {
    if (!isSidebarVisible || isSidebarCollapsed) {
      return <PanelLeft className="h-4 w-4" />;
    }
    return <PanelLeftClose className="h-4 w-4" />;
  };

  return (
    <div className="sticky top-0 z-50 flex-shrink-0 border-b bg-background/60 px-6 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center gap-6">
          <Logo />
        </div>


        <div className="flex items-center gap-4">
          {timeLimit && (
            <div className="bg-muted/30 flex items-center gap-2 rounded-lg border px-3 py-1.5">
              <Timer timeLimit={timeLimit} onTimeUp={onTimeUp} />
            </div>
          )}

          <div className="flex items-center gap-1 rounded-xl border bg-muted/20 p-1 backdrop-blur-sm">
            <ThemeToggle className="h-8 w-8 rounded-lg hover:bg-background/80" />

            <div className="mx-1 h-3 w-[1px] bg-border/50" />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8 rounded-lg transition-all hover:bg-background/80 max-md:hidden"
              title={isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
            >
              {getSidebarIcon()}
            </Button>
          </div>

          {onSubmit && (
            <Button
              onClick={onSubmit}
              variant="default"
              size="sm"
              className="relative h-9 rounded-xl bg-green-600 px-6 font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 hover:shadow-green-600/30 active:scale-95 transition-all"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
