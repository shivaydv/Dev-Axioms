// Sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
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

// Skeleton component for loading state
function SidebarInteractionsSkeleton() {
  return (
    <div className="flex justify-end gap-2">
      <div className="bg-muted h-9 w-9 animate-pulse rounded-lg" />
      <div className="bg-muted h-9 w-9 animate-pulse rounded-lg" />
      <div className="bg-muted h-9 w-9 animate-pulse rounded-lg" />
    </div>
  );
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
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
      <div className="bg-background flex h-full flex-col border-r transition-all duration-300 ease-in-out">
        <div className="flex h-16 items-center justify-center border-b border-dashed">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-9 w-9 rounded-xl hover:bg-accent transition-all duration-300"
            title="Expand Sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center space-y-4 py-8">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                toggleSidebar();
              }}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
              title={tab.label}
            >
              <span className="relative z-10">{tab.icon}</span>
              {activeTab === tab.id && (
                <div className="absolute -left-[1px] h-5 w-1 rounded-r-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="bg-background flex h-full flex-col border-r transition-all duration-300 ease-in-out">
      {/* Premium Minimal Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm">
        <div className="flex flex-col gap-5 p-6 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn(
                    "rounded-md border px-2 py-0 text-[10px] font-bold uppercase tracking-wider shadow-none",
                    difficultyColors[question.difficulty],
                  )}
                >
                  {question.difficulty}
                </Badge>
              </div>
              <h1
                className="text-foreground line-clamp-2 text-xl font-bold tracking-tight"
                title={question.title}
              >
                {question.title}
              </h1>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-accent h-8 w-8 shrink-0 rounded-lg text-muted-foreground transition-all hover:text-foreground"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between border-t border-dashed pt-4">
            <Suspense fallback={<SidebarInteractionsSkeleton />}>
              <div className="flex w-full items-center justify-between">
                <SidebarInteractionsLoader
                  key={question.id}
                  questionId={question.id}
                  onShare={() => setShareModalOpen(true)}
                  interactionDataPromise={interactionDataPromise}
                />
              </div>
            </Suspense>
          </div>
        </div>
      </div>


      {/* Tab Navigation */}
      <div className="bg-muted/20 border-b">
        <div className="flex">
          {sidebarTabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "group relative flex flex-1 items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold transition-all duration-300",
                activeTab === tab.id
                  ? "text-primary bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60",
                index === 0 && "rounded-tl-lg",
                index === sidebarTabs.length - 1 && "rounded-tr-lg",
              )}
            >
              {activeTab === tab.id && (
                <div className="bg-primary absolute inset-x-0 bottom-0 h-0.5" />
              )}

              <span className={cn(
                "flex h-4 w-4 items-center justify-center transition-transform duration-200",
                activeTab === tab.id ? "scale-110" : "group-hover:scale-105",
              )}>
                {tab.icon}
              </span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
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


