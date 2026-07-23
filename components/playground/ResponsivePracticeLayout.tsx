"use client";

import { useMemo, memo, useRef, useEffect } from "react";
import EditorLayout from "@/components/playground/EditorLayout";
import { Question } from "@/types/Question";
import { Sidebar } from "@/components/playground/Sidebar";
import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { SandpackFiles, SandpackProvider } from "@codesandbox/sandpack-react";
import SandpackWatcher from "../sandpack/SandpackWatcher";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import type { ImperativePanelHandle } from "react-resizable-panels";

import { useResponsive } from "@/hooks/useResponsive";

function getSavedFiles(
  questionId: string,
  starterCode: SandpackFiles | undefined,
) {
  try {
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
  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

  // Synchronize sidebar collapse state via imperative API to avoid unmounting SandpackProvider
  useEffect(() => {
    const panel = sidebarPanelRef.current;
    if (!panel) return;

    if (isCollapsed) {
      panel.collapse();
    } else {
      panel.expand();
    }
  }, [isCollapsed]);

  if (!isMounted) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#FF5A26] border-t-transparent" />
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel
            ref={sidebarPanelRef}
            defaultSize={28}
            minSize={18}
            maxSize={45}
            collapsible={true}
            collapsedSize={3}
            className="min-w-0 transition-all duration-300 ease-in-out"
          >
            <Sidebar
              question={question}
              interactionDataPromise={interactionDataPromise}
            />
          </ResizablePanel>
          <ResizableHandle
            className="bg-border/40 hover:bg-[#FF5A26]/60 relative z-20 w-1 transition-colors cursor-col-resize"
          />
          <ResizablePanel defaultSize={72} className="min-w-0">
            <MemoizedSandpackProvider question={question} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }

  // Mobile View
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 bg-background">
      <div className="bg-card text-foreground flex w-full max-w-sm flex-col items-center justify-center rounded-2xl p-8 shadow-sm border border-border/60 space-y-4">
        <div className="w-12 h-12 bg-[#FF5A26]/10 rounded-xl flex items-center justify-center text-[#FF5A26]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
        </div>
        <div className="text-center space-y-1.5">
          <h2 className="text-lg font-bold tracking-tight">Desktop Optimized</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The coding playground is designed for desktop viewports. Please switch devices to start solving problems.
          </p>
        </div>
      </div>
    </div>
  );
}
