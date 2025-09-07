// Sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SidebarClose, SidebarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPracticeSidebarTabs } from "@/components/playground/SidebarTabs";

import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { Question } from "@/types/Question";

interface SidebarProps {
  question: Question;
}

export function Sidebar({ question }: SidebarProps) {
  const {
    toggle: toggleSidebar,
    isCollapsed,
    activeTab,
    setActiveTab,
  } = useSidebar();

  const sidebarTabs = createPracticeSidebarTabs(question);
  const activeTabData = sidebarTabs.find((tab) => tab.id === activeTab);

  if (isCollapsed) {
    return (
      <div className="bg-background flex h-full flex-col border-r">
        <div className="flex h-10 items-center justify-center border-b p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hover:bg-accent h-8 w-10 flex-shrink-0 p-0"
            title="Expand Sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col space-y-1 p-1">
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
              className="hover:bg-accent h-8 w-10 flex-shrink-0 p-0"
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
      <div className="hidden h-10 items-center justify-between border-b p-3">
        <div className="flex min-w-0 flex-1 items-center space-x-2">
          <Button
            variant="ghost"
            size="sm" 
            onClick={toggleSidebar}
            className="hover:bg-accent h-6 w-6 flex-shrink-0 p-0"
            title="Collapse Sidebar"
          >
            <SidebarIcon className="h-4 w-4" />
          </Button>
          <span className="truncate text-sm font-medium">
            {activeTabData?.label}
          </span>
        </div>
      </div>

      <div className="bg-muted/30 flex overflow-x-auto border-b">
        {sidebarTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-1 items-center justify-center space-x-2 border-b-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-all duration-200",
              activeTab === tab.id
                ? "border-primary text-primary bg-background"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border-transparent",
            )}
          >
            <span className="flex h-3 w-3 items-center justify-center">
              {tab.icon}
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">{activeTabData?.content}</div>
    </div>
  );
}
