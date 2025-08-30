"use client";

import { SandpackLayout } from "@codesandbox/sandpack-react";
import CustomEditor from "@/components/sandpack/CustomEditor";
import ConsolePanel from "@/components/sandpack/ConsolePanel";
import { useMobileView } from "@/store/MobileViewContext";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function MobileEditorLayout() {
  const { isConsoleOpen, toggleConsole } = useMobileView();

  return (
    <SandpackLayout style={{ height: "100%", width: "100%" }}>
      <div className="h-full w-full">
        <ResizablePanelGroup direction="vertical">
          {/* Editor Panel */}
          <ResizablePanel
            defaultSize={isConsoleOpen ? 70 : 100}
            minSize={30}
          >
            <CustomEditor />
          </ResizablePanel>

          {/* Console Panel */}
          {isConsoleOpen && (
            <>
              <ResizableHandle 
                withHandle
                className="h-1 bg-border hover:bg-primary/30 transition-colors duration-150"
              />
              <ResizablePanel
                defaultSize={30}
                minSize={20}
                maxSize={70}
              >
                <ConsolePanel
                  isVisible={isConsoleOpen}
                  onClose={toggleConsole}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </SandpackLayout>
  );
}
