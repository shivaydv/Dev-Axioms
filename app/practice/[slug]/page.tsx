"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import questionsData from '@/data/practice-questions.json';
import PracticeHeader from '@/components/playground/PracticeHeader';
import { SandpackProvider } from '@codesandbox/sandpack-react';

import { Question } from '@/types/Question';
import { Sidebar } from '@/components/playground/Sidebar';
import EditorLayout from '@/components/playground/EditorLayout';
import { useSidebar } from '@/store/PlaygroundSidebarContext';




export default function Page() {
    const params = useParams();
    const router = useRouter();
    const [question, setQuestion] = useState<Question | null>(null);
    const { isCollapsed } = useSidebar();



    useEffect(() => {
        const questionId = params?.slug as string;
        const foundQuestion = questionsData.questions.find(q => q.id === questionId) as Question;
        if (foundQuestion) setQuestion(foundQuestion);
        else router.push("/practice");
    }, [params, router]);

    if (!question) return null;



    return (
        <div className="flex h-screen flex-col bg-background">
            <PracticeHeader
                timeLimit={question.timeLimit}

                isSidebarVisible={true}
            />
            <div className="flex-1 overflow-hidden flex">
                <div className={`${isCollapsed ? 'w-14' : 'w-80'} transition-all duration-300 flex-shrink-0`}>
                    <Sidebar question={question} />
                </div>
                <div className="flex-1">
                    <SandpackProvider
                        template="react"
                        theme="auto"
                        files={question.starterCode}
                        customSetup={{ dependencies: { "lucide-react": "latest" } }}
                        options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <EditorLayout />
                    </SandpackProvider>
                </div>
            </div>
        </div>
    );
}
