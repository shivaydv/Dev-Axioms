"use client";

import { Button } from "@/components/ui/button";
import { Terminal, X } from "lucide-react";
import CustomConsole from "@/components/sandpack/CustomConsole";

interface ConsolePanelProps {
  isVisible: boolean;
  onClose: () => void;
  onResize: (size: number) => void;
}

export default function ConsolePanel({ isVisible, onClose, onResize }: ConsolePanelProps) {
  if (!isVisible) return null;

  return (
    <div className="h-full bg-[#1e1e1e] border-t border-gray-700">
      <div className="flex items-center justify-between p-2 bg-[#252526] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium">Console</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      <div className="h-[calc(100%-40px)]">
        <CustomConsole />
      </div>
    </div>
  );
}
