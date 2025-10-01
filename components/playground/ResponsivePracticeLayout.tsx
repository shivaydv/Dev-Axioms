"use client";

import { useMemo, memo } from "react";
import EditorLayout from "@/components/playground/EditorLayout";
import { Question } from "@/types/Question";
import { Sidebar } from "@/components/playground/Sidebar";
import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { SandpackFiles, SandpackProvider } from "@codesandbox/sandpack-react";
import SandpackWatcher from "../sandpack/SandpackWatcher";

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
}

export default function ResponsivePracticeLayout({
  question,
}: ResponsivePracticeLayoutProps) {
  const { isCollapsed } = useSidebar();
  const { isMobile } = useResponsive();

  if (!isMobile) {
    return (
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`${isCollapsed ? "w-14" : "w-96"} flex-shrink-0 transition-all duration-300`}
        >
          <Sidebar question={question} />
        </div>
        <div className="flex-1">
          <MemoizedSandpackProvider question={question} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-background text-foreground flex w-full max-w-sm flex-col items-center justify-center rounded-2xl p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">⚠️ Mobile Notice</h2>
        <p className="text-center text-sm opacity-80">
          We are still working on mobile support. Please switch to a desktop
          device.
        </p>
      </div>
    </div>
  );
}
