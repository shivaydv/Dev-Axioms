"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { Globe, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewPanelProps {
  onToggleConsole: () => void;
}

export default function PreviewPanel({ onToggleConsole }: PreviewPanelProps) {
  return (
    <ResizablePanel
      defaultSize={40}
      minSize={20}
      maxSize={60}
      className="bg-background border-l"
    >
      <div className="flex h-full flex-col">
        <div className="bg-background flex h-10 flex-shrink-0 items-center justify-between border-b p-2">
          <div className="text-muted-foreground flex items-center gap-2 text-sm select-none">
            <Globe className="h-3 w-3" />
            <span className="text-foreground">Preview</span>
          </div>
          <Button
            onClick={onToggleConsole}
            variant={"ghost"}
            size={"sm"}
            className="rounded-md"
          >
            <Terminal className="h-4 w-4" />
            Console
          </Button>
        </div>
        <div className="min-h-0 flex-1">
          <SandpackPreview
            showNavigator={false}
            showRestartButton={false}
            showOpenInCodeSandbox={false}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </ResizablePanel>
  );
}
