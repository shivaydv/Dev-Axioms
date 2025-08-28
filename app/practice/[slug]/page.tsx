'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ResizableLayout from '@/components/sandpack/ResizableLayout';
import PracticeHeader from '@/components/sandpack/PracticeHeader';
import { createPracticeSidebarTabs } from '@/components/sandpack/PracticeSidebar';
import questionsData from '@/data/practice-questions.json';

interface Question {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    timeLimit: number;
    description: string;
    requirements: string[];
    starterCode: Record<string, { code: string; active?: boolean }>;
}

export default function QuestionPage() {
    const params = useParams();
    const router = useRouter();
    const [question, setQuestion] = useState<Question | null>(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const questionId = params?.slug as string;
        const foundQuestion = questionsData.questions.find(q => q.id === questionId) as Question;

        if (foundQuestion) {
            setQuestion(foundQuestion);
        } else {
            router.push('/practice');
        }
    }, [params, router]);

    const handleTimeUp = () => {
        // alert('Time is up! Consider submitting your solution.');
        return
    };

    const handleSubmit = () => {
        alert('Solution submitted! In a real implementation, this would be evaluated.');
    };

    const toggleSidebar = () => {
        if (isSidebarCollapsed) {
            setIsSidebarCollapsed(false);
        } else {
            setIsSidebarVisible(!isSidebarVisible);
        }
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleTabClick = (tabId: string) => {
        if (isSidebarCollapsed) {
            setActiveTab(tabId);
            setIsSidebarCollapsed(false);
        } else {
            setActiveTab(tabId);
        }
    };

    if (!question) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-[var(--playground-text-muted)]">Loading question...</p>
                </div>
            </div>
        );
    }

    const sidebarTabs = createPracticeSidebarTabs(question);
    const activeTabData = sidebarTabs.find(tab => tab.id === activeTab);

    return (
        <SandpackProvider
            template="react"
            theme="auto"
            files={question.starterCode}
            customSetup={{
                dependencies: {
                    "lucide-react": "latest"
                },
            }}
            options={{
                externalResources: ["https://cdn.tailwindcss.com"],
            }}
            style={{ height: "100%", width: "100%" }}
        >
            <div className="h-screen bg-background flex flex-col">
                <PracticeHeader
                    timeLimit={question.timeLimit}
                    onTimeUp={handleTimeUp}
                    onSubmit={handleSubmit}
                    onToggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                    isSidebarVisible={isSidebarVisible}
                />

                <div className="flex-1 overflow-hidden">
                    <ResizablePanelGroup 
                        direction="horizontal" 
                        className="h-full"
                    >
                        {/* Sidebar Panel - Width changes to 0 when hidden */}
                        <ResizablePanel
                            defaultSize={!isSidebarVisible ? 0 : (isSidebarCollapsed ? 4 : 25)}
                            minSize={0}
                            maxSize={isSidebarCollapsed ? 4 : 40}
                            collapsible={true}
                            collapsedSize={0}
                        >
                            <div className={`h-full bg-background flex flex-col transition-all duration-200 ${!isSidebarVisible ? 'w-0 overflow-hidden' : 'border-r'}`}>
                                {isSidebarCollapsed ? (
                                    // Collapsed State - Icon Bar
                                    <div className="w-full h-full flex flex-col">
                                        {/* Expand Button */}
                                        <div className="p-2 border-b">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={toggleSidebarCollapse}
                                                className="w-full justify-center h-8 hover:bg-accent"
                                                title="Expand Sidebar"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {/* Tab Icons */}
                                        <div className="flex-1 flex flex-col p-1 space-y-1">
                                            {sidebarTabs.map((tab) => (
                                                <Button
                                                    key={tab.id}
                                                    variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    onClick={() => handleTabClick(tab.id)}
                                                    className="w-full justify-center h-8 hover:bg-accent"
                                                    title={tab.label}
                                                >
                                                    {tab.icon}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    // Expanded State - Full Sidebar
                                    <div className="w-full h-full flex flex-col">
                                        {/* Header with Collapse Button */}
                                        <div className="flex items-center justify-between p-2 border-b min-h-[40px]">
                                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={toggleSidebarCollapse}
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

                                        {/* Tab Navigation */}
                                        {sidebarTabs.length > 1 && (
                                            <div className="flex border-b bg-muted/30 overflow-x-auto">
                                                {sidebarTabs.map((tab) => (
                                                    <button
                                                        key={tab.id}
                                                        onClick={() => setActiveTab(tab.id)}
                                                        className={cn(
                                                            "flex items-center space-x-1 px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap",
                                                            activeTab === tab.id
                                                                ? 'border-primary text-primary bg-background'
                                                                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50'
                                                        )}
                                                    >
                                                        <span className="w-3 h-3">{tab.icon}</span>
                                                        <span>{tab.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Tab Content */}
                                        <div className="flex-1 overflow-hidden">
                                            {activeTabData?.content}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ResizablePanel>

                        {/* Resize Handle - Only show when sidebar is visible and not collapsed */}
                        {isSidebarVisible && !isSidebarCollapsed && (
                            <ResizableHandle
                                className="w-0.5 bg-border hover:bg-primary/30 transition-colors duration-150"
                            />
                        )}

                        {/* Main Content Panel */}
                        <ResizablePanel defaultSize={!isSidebarVisible ? 100 : (isSidebarCollapsed ? 96 : 75)}>
                            <div className="w-full h-full">
                                <ResizableLayout />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </div>
        </SandpackProvider>
    );
}
