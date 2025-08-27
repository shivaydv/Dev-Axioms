"use client";

import { useState, useCallback } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ConsolePanel from "@/components/sandpack/ConsolePanel";
import PreviewPanel from "@/components/sandpack/PreviewPanel";
import { SandpackLayout } from "@codesandbox/sandpack-react";
import CustomEditor from "./CustomEditor";

export default function ResizableLayout() {
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);

  const handleConsoleResize = useCallback((size: number) => {
    // If console panel is resized to less than 15% of height, hide it
    if (size < 15) {
      setIsConsoleVisible(false);
    }
  }, []);

  const toggleConsole = () => {
    setIsConsoleVisible(!isConsoleVisible);
  };


  return (
    <SandpackLayout style={{ height: "100%", width: "100%" }}>
      <div className="h-full w-full bg-[#1e1e1e] text-white flex flex-col">
        <div className="flex-1 min-w-0">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={70} minSize={40}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={isConsoleVisible ? 70 : 100} minSize={30}>
                  <CustomEditor />
                </ResizablePanel>

                {isConsoleVisible && (
                  <>
                    <ResizableHandle withHandle />
                    <ResizablePanel
                      defaultSize={30}
                      minSize={15}
                      maxSize={70}
                      onResize={handleConsoleResize}
                    >
                      <ConsolePanel
                        isVisible={isConsoleVisible}
                        onClose={toggleConsole}
                        onResize={handleConsoleResize}
                      />
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>

            {/* Preview Panel */}
            <ResizableHandle withHandle />
            <PreviewPanel
              isConsoleVisible={isConsoleVisible}
              onToggleConsole={toggleConsole} />
          </ResizablePanelGroup>
        </div>
      </div>
    </SandpackLayout>
  );
}
