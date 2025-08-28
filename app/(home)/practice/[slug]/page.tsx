'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SandpackProvider, SandpackLayout } from "@codesandbox/sandpack-react";
import ResizableLayout from '@/components/sandpack/ResizableLayout';
import PracticeHeader from '@/components/sandpack/PracticeHeader';
import PracticeSidebar from '@/components/sandpack/PracticeSidebar';
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
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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
        setIsSubmitted(true);
        alert('Solution submitted! In a real implementation, this would be evaluated.');
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    if (!question) {
        return (
            <div className="min-h-screen bg-[var(--playground-bg)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-[var(--playground-text-muted)]">Loading question...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[var(--playground-bg)] flex flex-col">
            <PracticeHeader
                timeLimit={question.timeLimit}
                onTimeUp={handleTimeUp}
                onSubmit={handleSubmit}
                isSubmitted={isSubmitted}
                isSidebarVisible={isSidebarVisible}
                onToggleSidebar={toggleSidebar}
            />

            <div className="flex-1 flex overflow-hidden">
                <PracticeSidebar
                    question={question}
                    isVisible={isSidebarVisible}
                    onClose={() => setIsSidebarVisible(false)}
                    width={isSidebarVisible ? 400 : 0}
                />

                <div className="flex-1 min-w-0">
                    <SandpackProvider
                        template="react"
                        theme="dark"
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
                        <ResizableLayout />

                    </SandpackProvider>
                </div>
            </div>
        </div>
    );
}
