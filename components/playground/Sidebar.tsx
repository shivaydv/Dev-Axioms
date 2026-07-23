"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPracticeSidebarTabs } from "@/components/playground/SidebarTabs";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { Question } from "@/types/Question";
import { ShareModal } from "@/components/playground/ShareModal";
import { SidebarInteractionsLoader } from "@/components/playground/SidebarInteractionsLoader";
import { useState, Suspense } from "react";

interface SidebarProps {
  question: Question;
  interactionDataPromise: Promise<{
    likesCount: number;
    isLiked: boolean;
    isBookmarked: boolean;
  }>;
}

function SidebarInteractionsSkeleton() {
  return (
    <div className="flex items-center gap-1">
      <div className="bg-muted/50 h-6 w-10 animate-pulse rounded-md" />
      <div className="bg-muted/50 h-6 w-6 animate-pulse rounded-md" />
      <div className="bg-muted/50 h-6 w-6 animate-pulse rounded-md" />
    </div>
  );
}

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export function Sidebar({ question, interactionDataPromise }: SidebarProps) {
  const {
    toggle: toggleSidebar,
    isCollapsed,
    activeTab,
    setActiveTab,
  } = useSidebar();

  const [shareModalOpen, setShareModalOpen] = useState(false);

  const sidebarTabs = createPracticeSidebarTabs(question);
  const activeTabData = sidebarTabs.find((tab) => tab.id === activeTab);

  if (isCollapsed) {
    return (
      <div className="bg-card/40 flex h-full flex-col border-r border-border/50 transition-all duration-300">
        <div className="flex h-9 items-center justify-center border-b border-border/50 bg-muted/20">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-6 w-6 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
            title="Expand Sidebar"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center gap-3 py-3">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                toggleSidebar();
              }}
              className={cn(
                "group relative flex h-8 w-8 items-center justify-center rounded-md transition-all",
                activeTab === tab.id
                  ? "bg-[#FF5A26]/10 text-[#FF5A26]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              title={tab.label}
            >
              <span className="relative z-10">{tab.icon}</span>
              {activeTab === tab.id && (
                <div className="absolute -left-[1px] h-3.5 w-0.5 rounded-r-full bg-[#FF5A26]" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/30 flex h-full flex-col border-r border-border/50 select-none">
      {/* Top Header Bar matching h-9 height */}
      <div className="flex h-9 items-center justify-between border-b border-border/50 px-3 bg-muted/20 backdrop-blur-sm select-none">
        <div className="flex items-center gap-2 min-w-0">
          <Badge
            variant="outline"
            className={cn(
              "rounded-md px-1.5 py-0 text-[10px] font-semibold uppercase tracking-wider border shrink-0",
              difficultyStyles[question.difficulty],
            )}
          >
            {question.difficulty}
          </Badge>
          <span className="text-xs font-semibold text-foreground truncate" title={question.title}>
            {question.title}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-6 w-6 shrink-0 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          title="Collapse Sidebar"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Sub Header - Tab Switcher & Interaction Icons */}
      <div className="flex items-center justify-between border-b border-border/50 bg-background/40 px-3 py-1.5 select-none">
        <div className="flex items-center gap-1 bg-muted/40 p-0.5 rounded-lg border border-border/40">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all select-none",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/40"
              )}
            >
              <span className={cn("h-3.5 w-3.5", activeTab === tab.id ? "text-[#FF5A26]" : "text-muted-foreground")}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <Suspense fallback={<SidebarInteractionsSkeleton />}>
          <SidebarInteractionsLoader
            key={question.id}
            questionId={question.id}
            onShare={() => setShareModalOpen(true)}
            interactionDataPromise={interactionDataPromise}
          />
        </Suspense>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTabData?.content}
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        question={question}
      />
    </div>
  );
}
