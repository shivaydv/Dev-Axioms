"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { Globe } from "lucide-react";

export default function PreviewPanel() {
  return (
    <ResizablePanel
      defaultSize={40}
      minSize={20}
      maxSize={60}
      className="bg-background border-l"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-10 items-center border-b px-4 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span className="text-[12px] font-medium text-muted-foreground/90">Preview</span>
          </div>
        </div>
        <div className="flex-1">
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


