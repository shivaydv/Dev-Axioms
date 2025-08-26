"use client";

import { useState, useCallback } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import PlaygroundHeader from "@/components/sandpack/PlaygroundHeader";
import ProblemSidebar from "@/components/sandpack/ProblemSidebar";
import EditorPanel from "@/components/sandpack/EditorPanel";
import ConsolePanel from "@/components/sandpack/ConsolePanel";
import PreviewPanel from "@/components/sandpack/PreviewPanel";

interface ResizableLayoutProps {
  showSidebar?: boolean;
}

export default function ResizableLayout({ showSidebar = false }: ResizableLayoutProps) {
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(showSidebar);
  const [sidebarWidth, setSidebarWidth] = useState(350);

  const handleConsoleResize = useCallback((size: number) => {
    // If console panel is resized to less than 15% of height, hide it
    if (size < 15) {
      setIsConsoleVisible(false);
    }
  }, []);

  const toggleConsole = () => {
    setIsConsoleVisible(!isConsoleVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="h-full w-full bg-[#1e1e1e] text-white flex flex-col">
      <PlaygroundHeader
        isSidebarVisible={isSidebarVisible}
        isConsoleVisible={isConsoleVisible}
        onToggleSidebar={toggleSidebar}
        onToggleConsole={toggleConsole}
      />

      <div className="flex-1 flex min-h-0">
        <ProblemSidebar
          isVisible={isSidebarVisible}
          onClose={toggleSidebar}
          width={sidebarWidth}
        />

        <div className="flex-1 min-w-0">
          <ResizablePanelGroup direction="horizontal">
            {/* Editor section */}
            <ResizablePanel defaultSize={70} minSize={40}>
              <ResizablePanelGroup direction="vertical">
                <EditorPanel isConsoleVisible={isConsoleVisible} />
                
                {isConsoleVisible && (
                  <>
                    <ResizableHandle withHandle />
                    <ConsolePanel
                      isVisible={isConsoleVisible}
                      onClose={toggleConsole}
                      onResize={handleConsoleResize}
                    />
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>

            {/* Preview Panel */}
            <ResizableHandle withHandle />
            <PreviewPanel />
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
