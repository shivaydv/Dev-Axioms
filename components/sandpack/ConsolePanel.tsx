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
    <div className="bg-background text-foreground h-full border-t">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">Console</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 rounded-md p-0"
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
