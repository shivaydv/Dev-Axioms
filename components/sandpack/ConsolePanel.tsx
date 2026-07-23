"use client";

import { Button } from "@/components/ui/button";
import { Terminal, X } from "lucide-react";
import CustomConsole from "@/components/sandpack/CustomConsole";

interface ConsolePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ConsolePanel({
  isVisible,
  onClose,
}: ConsolePanelProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-background flex flex-col h-full border-t border-border/50">
      <div className="flex h-9 items-center justify-between border-b border-border/50 px-3 bg-muted/20 backdrop-blur-sm select-none">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-[#FF5A26]" />
          <span className="text-xs font-semibold text-foreground">Console</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 rounded-md p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex-1 overflow-hidden">
        <CustomConsole />
      </div>
    </div>
  );
}
