"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Timer } from "@/components/playground/Timer";
import { PanelLeftClose, PanelLeft, ChevronLeft } from "lucide-react";
import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { LogoIcon } from "@/components/global/Logo";
import { ThemeToggle } from "@/components/global/ThemeToggle";

interface PracticeHeaderProps {
  questionTitle?: string;
  timeLimit?: number;
  onTimeUp?: () => void;
  onSubmit?: () => void;
  isSidebarVisible?: boolean;
}

export default function PracticeHeader({
  questionTitle,
  timeLimit,
  onTimeUp,
  onSubmit,
  isSidebarVisible = true,
}: PracticeHeaderProps) {
  const { toggle: toggleSidebar, isCollapsed: isSidebarCollapsed } =
    useSidebar();

  return (
    <header className="sticky top-0 z-50 flex h-13 shrink-0 items-center justify-between border-b border-border/60 bg-background/80 px-3 sm:px-4 backdrop-blur-xl select-none">
      {/* Left Section - Back Button, Logo & Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        <Link
          href="/practice"
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 bg-card/50 text-muted-foreground transition-colors hover:bg-card hover:text-foreground shrink-0"
          title="Back to Questions"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        <div className="flex items-center gap-2 min-w-0">
          <LogoIcon className="shrink-0" />
          <span className="hidden sm:inline text-xs font-medium text-muted-foreground/60">/</span>
          <span className="hidden sm:inline text-xs font-medium text-muted-foreground shrink-0">Practice</span>
          {questionTitle && (
            <>
              <span className="text-xs font-medium text-muted-foreground/60">/</span>
              <span className="text-xs font-bold text-foreground truncate max-w-[180px] sm:max-w-[340px]" title={questionTitle}>
                {questionTitle}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right Section - Timer, Controls & Submit Button */}
      <div className="flex items-center gap-2 shrink-0">
        {timeLimit && (
          <div className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/40 px-2.5 py-1 text-xs font-mono">
            <Timer timeLimit={timeLimit} onTimeUp={onTimeUp} />
          </div>
        )}

        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/40 p-0.5">
          <ThemeToggle className="h-7 w-7 rounded-md hover:bg-muted" />

          <div className="h-3.5 w-[1px] bg-border/60 hidden md:block" />

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-7 w-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground hidden md:flex"
            title={isSidebarCollapsed ? "Show Problem Sidebar" : "Hide Problem Sidebar"}
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="h-3.5 w-3.5" />
            ) : (
              <PanelLeftClose className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>

        {onSubmit ? (
          <Button
            onClick={onSubmit}
            size="sm"
            className="h-8 rounded-lg bg-[#FF5A26] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#FF5A26]/90 active:scale-95 transition-all"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={() => {}}
            size="sm"
            className="h-8 rounded-lg bg-[#FF5A26] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#FF5A26]/90 active:scale-95 transition-all"
          >
            Submit
          </Button>
        )}
      </div>
    </header>
  );
}
