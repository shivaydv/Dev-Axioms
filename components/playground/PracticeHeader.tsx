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
    <div className="sticky top-0 z-50 flex-shrink-0 border-b bg-background/60 px-3 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-2">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center min-w-0 flex-shrink">
          <Logo />
        </div>


        <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
          {timeLimit && (
            <div className="bg-muted/30 flex items-center gap-1.5 rounded-lg border px-2 py-1 sm:px-3 sm:py-1.5 scale-90 sm:scale-100 origin-right">
              <Timer timeLimit={timeLimit} onTimeUp={onTimeUp} />
            </div>
          )}

          <div className="flex items-center gap-1 rounded-xl border bg-muted/20 p-0.5 sm:p-1 backdrop-blur-sm">
            <ThemeToggle className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg hover:bg-background/80" />

            <div className="mx-0.5 h-3 w-[1px] bg-border/50 hidden md:block" />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8 rounded-lg transition-all hover:bg-background/80 hidden md:flex"
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
              className="relative h-8 sm:h-9 rounded-xl bg-green-600 px-3 sm:px-6 text-xs sm:text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 hover:shadow-green-600/30 active:scale-95 transition-all"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
