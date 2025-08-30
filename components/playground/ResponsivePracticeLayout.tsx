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
import { SandpackProvider } from "@codesandbox/sandpack-react";

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
            customSetup={{ dependencies: { "lucide-react": "latest" } }}
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
        {activeView === 'description' && (
          <MobileDescriptionLayout question={question} />
        )}
        
        {activeView === 'editor' && (
          <SandpackProvider
            template="react"
            theme="auto"
            files={question.starterCode}
            customSetup={{ dependencies: { "lucide-react": "latest" } }}
            options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
            style={{ width: "100%", height: "100%" }}
          >
            <MobileEditorLayout />
          </SandpackProvider>
        )}

        {activeView === 'preview' && (
          <SandpackProvider
            template="react"
            theme="auto"
            files={question.starterCode}
            customSetup={{ dependencies: { "lucide-react": "latest" } }}
            options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
            style={{ width: "100%", height: "100%" }}
          >
            <MobilePreviewLayout />
          </SandpackProvider>
        )}
      </div>
    </div>
  );
}
