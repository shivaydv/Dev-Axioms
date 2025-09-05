// Sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPracticeSidebarTabs } from "@/components/playground/SidebarTabs";

import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { Question } from "@/types/Question";

interface SidebarProps {
    question: Question;
}

export function Sidebar({ question }: SidebarProps) {

    const { toggle: toggleSidebar, isCollapsed, activeTab, setActiveTab } = useSidebar();

    const sidebarTabs = createPracticeSidebarTabs(question);
    const activeTabData = sidebarTabs.find(tab => tab.id === activeTab);

    if (isCollapsed) {
        return (
            <div className="h-full bg-background border-r flex flex-col">
                <div className="h-10 border-b p-1 flex justify-center items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        className="w-10 h-8 p-0 hover:bg-accent flex-shrink-0"
                        title="Expand Sidebar"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex-1 flex flex-col p-1 space-y-1">
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
                            className="w-10 h-8 p-0 hover:bg-accent flex-shrink-0"
                            title={tab.label}
                        >
                            <span className="w-4 h-4 flex items-center justify-center">{tab.icon}</span>
                        </Button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-background border-r flex flex-col transition-all duration-200">
            <div className="flex items-center justify-between p-3 border-b h-10">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        className="h-6 w-6 p-0 hover:bg-accent flex-shrink-0"
                        title="Collapse Sidebar"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium truncate">
                        {activeTabData?.label}
                    </span>
                </div>
            </div>

            <div className="flex border-b bg-muted/30 overflow-x-auto">
                {sidebarTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center space-x-2 px-4 py-3 text-xs font-medium border-b-2 whitespace-nowrap flex-1 justify-center transition-all duration-200",
                            activeTab === tab.id
                                ? "border-primary text-primary bg-background"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                    >
                        <span className="w-3 h-3 flex items-center justify-center">{tab.icon}</span>
                        <span className="hidden sm:inline">
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-hidden">{activeTabData?.content}</div>
        </div>
    );
}
