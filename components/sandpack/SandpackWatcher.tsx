"use client";
import { SandpackFiles, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useMemo, useRef } from "react";

interface SandpackWatcherProps {
  questionId: string;
}

export default function SandpackWatcher({ questionId }: SandpackWatcherProps) {
  const { sandpack } = useSandpack();
  const { visibleFiles, files } = sandpack;
  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const previousQuestionRef = useRef<string | undefined>(undefined);

  const visibleOnly: SandpackFiles = useMemo(() => {
    const result: SandpackFiles = {};
    for (const filePath of visibleFiles) {
      result[filePath] = files[filePath];
    }
    return result;
  }, [visibleFiles, files]);

  useEffect(() => {
  const hasQuestionChanged = previousQuestionRef.current !== questionId;
  
  if (saveTimeoutRef.current) {
    clearTimeout(saveTimeoutRef.current);
  }

  if (hasQuestionChanged) {
    // Question changed - handle immediately, no delays
    localStorage.removeItem("users-code");
    
    try {
      const dataToSave = {
        questionId,
        files: visibleOnly,
        timestamp: Date.now()
      };
      localStorage.setItem("users-code", JSON.stringify(dataToSave));
      console.log("Question changed - new files saved immediately");
    } catch (error) {
      console.warn("Failed to save files:", error);
    }
    
    previousQuestionRef.current = questionId;
    
  } else {
    // Same question - use debounce for file edits
    saveTimeoutRef.current = setTimeout(() => {
      try {
        const dataToSave = {
          questionId,
          files: visibleOnly,
          timestamp: Date.now()
        };
        localStorage.setItem("users-code", JSON.stringify(dataToSave));
      } catch (error) {
        console.warn("Failed to save files:", error);
      }
    }, 1000);
  }

  return () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
  };
}, [visibleOnly, questionId]);
  return null;
}