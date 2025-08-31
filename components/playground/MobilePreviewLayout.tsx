"use client";

import { SandpackPreview, SandpackLayout } from "@codesandbox/sandpack-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ConsolePanel from "@/components/sandpack/ConsolePanel";
import { useMobileView } from "@/store/MobileViewContext";

export default function MobilePreviewLayout() {
  const { isConsoleOpen, toggleConsole } = useMobileView();

  return (
    
      <div className="h-full w-full">
        <ResizablePanelGroup direction="vertical">
          {/* Preview Panel */}
          <ResizablePanel
            defaultSize={isConsoleOpen ? 70 : 100}
            minSize={30}
          >
            <SandpackPreview
              showNavigator={false}
              showRestartButton={false}
              showOpenInCodeSandbox={false}
              style={{ height: "100%", width: "100%" }}
            />
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
   
  );
}
