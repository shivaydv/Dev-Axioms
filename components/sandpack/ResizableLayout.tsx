"use client";

import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ConsolePanel from "@/components/sandpack/ConsolePanel";
import PreviewPanel from "@/components/sandpack/PreviewPanel";
import { SandpackLayout } from "@codesandbox/sandpack-react";
import CustomEditor from "./CustomEditor";

export default function ResizableLayout() {
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const toggleConsole = () => {
    setIsConsoleVisible(!isConsoleVisible);
  };


  return (
    <SandpackLayout style={{ height: "100%", width: "100%" }}>
      <div className="h-full w-full bg-background text-white flex flex-col">
        <div className="flex-1 min-w-0">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={70} minSize={40}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  defaultSize={isConsoleVisible ? 70 : 100}
                  minSize={30}
                >
                  <CustomEditor />
                </ResizablePanel>

                {isConsoleVisible && (
                  <>
                    <ResizableHandle withHandle
                      className="w-1 bg-border hover:bg-primary/30 transition-colors duration-150"
                    />
                    <ResizablePanel
                      defaultSize={30}
                      minSize={20}
                      maxSize={70}
                    >
                      <ConsolePanel
                        isVisible={isConsoleVisible}
                        onClose={toggleConsole}
                      />
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>

            {/* Preview Panel */}
            <ResizableHandle withHandle
              className="w-0.5 bg-border hover:bg-primary/30 transition-colors duration-150"
            />
            <PreviewPanel onToggleConsole={toggleConsole} />
          </ResizablePanelGroup>
        </div>
      </div>
    </SandpackLayout>
  );
}
