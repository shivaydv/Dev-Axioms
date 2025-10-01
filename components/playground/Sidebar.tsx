// Sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  SidebarClose,
  SidebarIcon,
  Share2,
  Bookmark,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createPracticeSidebarTabs } from "@/components/playground/SidebarTabs";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { Question } from "@/types/Question";
import { ShareModal } from "@/components/playground/ShareModal";
import { useState } from "react";

interface SidebarProps {
  question: Question;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function Sidebar({ question }: SidebarProps) {
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
      <div className="bg-background flex h-full flex-col border-r">
        <div className="from-muted/10 flex h-14 items-center justify-center border-b bg-gradient-to-b to-transparent">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hover:bg-accent/80 h-9 w-9 rounded-full transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-2">
          {sidebarTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => {
                setActiveTab(tab.id);
                if (isCollapsed) {
                  toggleSidebar();
                }
              }}
              className={cn(
                "h-9 w-9 rounded-lg transition-all duration-200",
                activeTab === tab.id
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "hover:bg-accent/60",
              )}
              title={tab.label}
            >
              <span className="flex h-4 w-4 items-center justify-center">
                {tab.icon}
              </span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex h-full flex-col border-r transition-all duration-200">
      <div className="from-background to-muted/30 border-b bg-gradient-to-r">
        <div className="space-y-4 p-6">
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1 space-y-2">
              {/* Title */}
              <h1
                className="text-foreground line-clamp-2 text-xl font-semibold tracking-tight capitalize"
                title={question.title}
              >
                {question.title}
              </h1>
            </div>

            {/* Sidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-accent h-9 w-9 shrink-0 rounded-full transition-colors"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4">
            {/* Meta Row */}
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium capitalize",
                  difficultyColors[question.difficulty],
                )}
              >
                {question.difficulty}
              </Badge>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled
                className="hover:bg-accent/60 h-9 w-9 rounded-lg transition-all"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled
                className="hover:bg-accent/60 h-9 w-9 rounded-lg transition-all"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShareModalOpen(true)}
                className="hover:bg-accent/60 h-9 w-9 rounded-lg transition-all"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
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
                "group hover:bg-background/60 relative flex flex-1 items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold transition-all duration-300",
                activeTab === tab.id
                  ? "text-primary bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
                index === 0 && "rounded-tl-lg",
                index === sidebarTabs.length - 1 && "rounded-tr-lg",
              )}
            >
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="bg-primary absolute inset-x-0 bottom-0 h-0.5" />
              )}

              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center transition-transform duration-200",
                  activeTab === tab.id ? "scale-110" : "group-hover:scale-105",
                )}
              >
                {tab.icon}
              </span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">{activeTabData?.content}</div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        question={question}
      />
    </div>
  );
}
