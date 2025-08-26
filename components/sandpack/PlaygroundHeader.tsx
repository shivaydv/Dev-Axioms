"use client";

import { Button } from "@/components/ui/button";
import { Terminal, X, ChevronUp, ChevronDown, BookOpen, Code } from "lucide-react";

interface PlaygroundHeaderProps {
  isSidebarVisible: boolean;
  isConsoleVisible: boolean;
  onToggleSidebar: () => void;
  onToggleConsole: () => void;
}

export default function PlaygroundHeader({
  isSidebarVisible,
  isConsoleVisible,
  onToggleSidebar,
  onToggleConsole,
}: PlaygroundHeaderProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-[#252526] border-b border-gray-700 flex-shrink-0">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className={`text-gray-400 hover:text-white hover:bg-[#2a2d2e] ${
            isSidebarVisible ? 'bg-[#2a2d2e] text-white' : ''
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Problem
        </Button>
      </div>
      
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Code className="h-3 w-3" />
        <span>Playground</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleConsole}
          className={`text-gray-400 hover:text-white hover:bg-[#2a2d2e] ${
            isConsoleVisible ? 'bg-[#2a2d2e] text-white' : ''
          }`}
        >
          <Terminal className="h-4 w-4" />
          Console
          {isConsoleVisible ? (
            <ChevronDown className="h-3 w-3 ml-1" />
          ) : (
            <ChevronUp className="h-3 w-3 ml-1" />
          )}
        </Button>
      </div>
    </div>
  );
}
