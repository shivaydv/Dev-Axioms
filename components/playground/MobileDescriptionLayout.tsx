"use client";

import { createPracticeSidebarTabs } from "@/components/playground/SidebarTabs";
import { Question } from "@/types/Question";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MobileDescriptionLayoutProps {
    question: Question;
}

export default function MobileDescriptionLayout({ question }: MobileDescriptionLayoutProps) {
    const [activeTab, setActiveTab] = useState("description");
    const sidebarTabs = createPracticeSidebarTabs(question);
    const activeTabData = sidebarTabs.find(tab => tab.id === activeTab);

    return (
        <div className="h-full flex flex-col bg-background">
            {/* Modern Sub-Tab Navigation */}
            <div className="bg-muted/20  overflow-x-auto">
                <div className="flex gap-1">
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
                            <span className="inline">
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 bg-background">
                {activeTabData?.content}
            </div>
        </div>
    );
}
