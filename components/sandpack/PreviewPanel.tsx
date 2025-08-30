"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { Globe, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewPanelProps {
  onToggleConsole: () => void;
}

export default function PreviewPanel({
  onToggleConsole,
}: PreviewPanelProps) {
  return (
    <ResizablePanel
      defaultSize={30}
      minSize={20}
      maxSize={60}
      className="bg-background border-l"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center p-2 h-10 justify-between bg-background border-b  flex-shrink-0">
          <div className="flex items-center gap-2 text-sm select-none text-muted-foreground">
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
        <div className="flex-1 min-h-0">
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
