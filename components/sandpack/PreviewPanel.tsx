"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { Monitor, Terminal } from "lucide-react";

interface PreviewPanelProps {
  isConsoleVisible: boolean;
  onToggleConsole: () => void;
}

export default function PreviewPanel({
  isConsoleVisible,
  onToggleConsole,
}: PreviewPanelProps) {
  return (
    <ResizablePanel
      defaultSize={30}
      minSize={20}
      maxSize={60}
      className="bg-white"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center p-2 h-10 justify-between bg-[#252526] border-b  flex-shrink-0">
          <div className="flex items-center gap-1 text-sm select-none">
            <Monitor className="h-3 w-3 mt-0.5" />
            <span>Preview</span>
          </div>
          <button
            onClick={onToggleConsole}
            className={`flex gap-1 py-1 px-2 rounded-md items-center justify-center 
  text-sm font-medium antialiased 
  ${isConsoleVisible ? "bg-neutral-700 text-white" : "text-gray-400 hover:text-white hover:bg-neutral-600"}
`}
          >
            <Terminal className="h-4 w-4" />
            Console
          </button>

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
