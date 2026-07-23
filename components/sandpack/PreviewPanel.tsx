"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { Globe, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PreviewPanel() {
  return (
    <ResizablePanel
      defaultSize={40}
      minSize={20}
      maxSize={60}
      className="bg-background border-l border-border/50"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-9 items-center justify-between border-b border-border/50 px-3 bg-muted/20 backdrop-blur-sm select-none">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Preview</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const iframe = document.querySelector(".sp-preview-container iframe") as HTMLIFrameElement;
              if (iframe) {
                iframe.src = iframe.src;
              }
            }}
            className="h-6 w-6 rounded-md p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
            title="Refresh Preview"
          >
            <RotateCw className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex-1 overflow-hidden bg-background">
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
