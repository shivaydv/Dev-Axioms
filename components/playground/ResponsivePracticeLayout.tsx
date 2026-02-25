"use client";

import { useMemo, memo } from "react";
import EditorLayout from "@/components/playground/EditorLayout";
import { Question } from "@/types/Question";
import { Sidebar } from "@/components/playground/Sidebar";
import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { SandpackFiles, SandpackProvider } from "@codesandbox/sandpack-react";
import SandpackWatcher from "../sandpack/SandpackWatcher";
import { cn } from "@/lib/utils";


// mobile related imports
import { useResponsive } from "@/hooks/useResponsive";

function getSavedFiles(
  questionId: string,
  starterCode: SandpackFiles | undefined,
) {
  try {
    // Check if we're running in the browser
    if (typeof window === "undefined") return starterCode;

    const raw = localStorage.getItem("users-code");
    if (!raw) return starterCode;

    const parsed = JSON.parse(raw);
    if (parsed.questionId === questionId && parsed.files) {
      return parsed.files as SandpackFiles;
    }
  } catch (err) {
    console.warn("Failed to restore saved files:", err);
  }
  return starterCode;
}

// Memoized component to prevent re-renders when sidebar state changes
const MemoizedSandpackProvider = memo(function MemoizedSandpackProvider({
  question,
}: {
  question: Question;
}) {
  const initialFiles = useMemo(() => {
    return getSavedFiles(question.id, question.starterCode || undefined);
  }, [question.id, question.starterCode]);

  return (
    <SandpackProvider
      template="react"
      theme="auto"
      files={initialFiles}
      customSetup={{ dependencies: {} }}
      options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
      style={{ height: "100%", width: "100%" }}
    >
      <EditorLayout />
      <SandpackWatcher questionId={question.id} />
    </SandpackProvider>
  );
});

interface ResponsivePracticeLayoutProps {
  question: Question;
  interactionDataPromise: Promise<{
    likesCount: number;
    isLiked: boolean;
    isBookmarked: boolean;
  }>;
}

export default function ResponsivePracticeLayout({
  question,
  interactionDataPromise,
}: ResponsivePracticeLayoutProps) {
  const { isCollapsed } = useSidebar();
  const { isMobile, isMounted } = useResponsive();

  // Prevent any heavy rendering or API calls until we know the device
  if (!isMounted) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className="flex flex-1 overflow-hidden">
        <div
          className={cn(
            "flex-shrink-0 transition-all duration-300",
            isCollapsed ? "w-14" : "w-96",
          )}
        >
          <Sidebar
            question={question}
            interactionDataPromise={interactionDataPromise}
          />
        </div>
        <div className="flex-1">
          <MemoizedSandpackProvider question={question} />
        </div>
      </div>
    );
  }

  // Mobile View - Lightweight notice with no API/Sandpack overhead
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 bg-muted/5">
      <div className="bg-background text-foreground flex w-full max-w-sm flex-col items-center justify-center rounded-3xl p-10 shadow-xl border space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold tracking-tight">Desktop Only</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The playground is currently optimized for desktop. Please switch devices to start practicing.
          </p>
        </div>
      </div>
    </div>
  );
}


