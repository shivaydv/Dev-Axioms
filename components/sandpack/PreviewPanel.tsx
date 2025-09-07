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
        {/* <div className="bg-background flex h-10 flex-shrink-0 items-center justify-between border-b p-2">
          <div className="text-muted-foreground flex items-center gap-2 text-sm select-none">
            <Globe className="h-3 w-3" />
            <span className="text-foreground">Preview</span>
          </div>
        </div> */}
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
