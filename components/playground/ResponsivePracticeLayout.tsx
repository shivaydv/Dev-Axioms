"use client";

import { Question } from "@/types/Question";
import { useResponsive } from "@/hooks/useResponsive";
import { useMobileView } from "@/store/MobileViewContext";
import { Sidebar } from "@/components/playground/Sidebar";
import EditorLayout from "@/components/playground/EditorLayout";
import { MobileTabNavigation } from "@/components/playground/MobileTabNavigation";
import MobileEditorLayout from "@/components/playground/MobileEditorLayout";
import MobilePreviewLayout from "@/components/playground/MobilePreviewLayout";
import MobileDescriptionLayout from "@/components/playground/MobileDescriptionLayout";
import { useSidebar } from "@/store/PlaygroundSidebarContext";
import { SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";

interface ResponsivePracticeLayoutProps {
  question: Question;
}

export default function ResponsivePracticeLayout({ question }: ResponsivePracticeLayoutProps) {
  const { isMobileOrTablet } = useResponsive();
  const { activeView, isConsoleOpen, toggleConsole } = useMobileView();
  const { isCollapsed } = useSidebar();

  // Desktop Layout
  if (!isMobileOrTablet) {
    return (
      <div className="flex-1 overflow-hidden flex">
        <div className={`${isCollapsed ? 'w-14' : 'w-80'} transition-all duration-300 flex-shrink-0`}>
          <Sidebar question={question} />
        </div>
        <div className="flex-1">
          <SandpackProvider
            template="react"
            theme="auto"
            files={question.starterCode}
            customSetup={{ dependencies: {} }}
            options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
            style={{ width: "100%", height: "100%" }}
          >
            <EditorLayout />
          </SandpackProvider>
        </div>
      </div>
    );
  }

  // Mobile/Tablet Layout
  return (
    <div className="flex-1 overflow-hidden flex flex-col w-full">
      {/* Mobile Tab Navigation */}
      <MobileTabNavigation
        onToggleConsole={toggleConsole}
        isConsoleVisible={isConsoleOpen}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-hidden w-full">

        <SandpackProvider
          template="react"
          theme="auto"
          files={question.starterCode}
          customSetup={{ dependencies: { } }}
          options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
          style={{ width: "100%", height: "100%" }}
        >
          <SandpackLayout style={{ height: "100%", width: "100%" }}>

            {/* Always keep them mounted, just hide/show */}
            <div className={activeView === "description" ? "block h-full w-full" : "hidden"}>
              <MobileDescriptionLayout question={question} />
            </div>

            <div className={activeView === "editor" ? "block h-full w-full" : "hidden"}>
              <MobileEditorLayout />
            </div>
            <div className={activeView === "preview" ? "block h-full w-full" : "hidden"}>
              <MobilePreviewLayout />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}


