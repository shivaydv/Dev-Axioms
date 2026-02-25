"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import ConsolePanel from "@/components/sandpack/ConsolePanel";
import PreviewPanel from "@/components/sandpack/PreviewPanel";
import { SandpackLayout } from "@codesandbox/sandpack-react";
import CustomEditor from "@/components/sandpack/CustomEditor";
import {
  EditorSettingsProvider,
  useEditorSettings,
} from "@/store/EditorSettingsStore";

function EditorLayoutContent() {
  const { settings, toggleConsole } = useEditorSettings();

  return (
    <SandpackLayout style={{ height: "100%", width: "100%" }}>
      <div className="bg-background flex h-full w-full flex-col overflow-hidden">
        <div className="min-w-0 flex-1">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={60} minSize={40}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  defaultSize={settings.isConsoleVisible ? 70 : 100}
                  minSize={30}
                >
                  <CustomEditor />
                </ResizablePanel>

                {settings.isConsoleVisible && (
                  <>
                    <ResizableHandle
                      withHandle
                      className="bg-border/40 hover:bg-primary/50 relative z-20 h-1.5 w-full transition-all duration-300"
                    />
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={70}>
                      <ConsolePanel
                        isVisible={settings.isConsoleVisible}
                        onClose={toggleConsole}
                      />
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className="bg-border/40 hover:bg-primary/50 relative z-20 w-1.5 transition-all duration-300"
            />
            <PreviewPanel />
          </ResizablePanelGroup>
        </div>
      </div>
    </SandpackLayout>
  );
}


export default function EditorLayout() {
  return (
    <EditorSettingsProvider>
      <EditorLayoutContent />
    </EditorSettingsProvider>
  );
}
