"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { Monitor } from "lucide-react";

export default function PreviewPanel() {
  return (
    <ResizablePanel
      defaultSize={30}
      minSize={20}
      maxSize={60}
      className="bg-white"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center p-2 bg-[#252526] border-b border-gray-700 flex-shrink-0">
          <Monitor className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-white">Preview</span>
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
