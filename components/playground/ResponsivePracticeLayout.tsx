"use client";

import { Question } from "@/types/Question";
import { useResponsive } from "@/hooks/useResponsive";
import { useMobileView } from "@/store/MobileViewStore";
import { Sidebar } from "@/components/playground/Sidebar";
import EditorLayout from "@/components/playground/EditorLayout";
import { MobileTabNavigation } from "@/components/playground/MobileTabNavigation";
import MobileEditorLayout from "@/components/playground/MobileEditorLayout";
import MobilePreviewLayout from "@/components/playground/MobilePreviewLayout";
import MobileDescriptionLayout from "@/components/playground/MobileDescriptionLayout";
import { useSidebar } from "@/store/PlaygroundSidebarStore";
import { SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";

interface ResponsivePracticeLayoutProps {
  question: Question;
}

export default function ResponsivePracticeLayout({
  question,
}: ResponsivePracticeLayoutProps) {
  const { isMobileOrTablet, isMobile } = useResponsive();
  const { activeView, isConsoleOpen, toggleConsole } = useMobileView();
  const { isCollapsed } = useSidebar();

  // Desktop Layout
  if (!isMobile) {
    return (
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`${isCollapsed ? "w-14" : "w-80"} flex-shrink-0 transition-all duration-300`}
        >
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

  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-background text-foreground flex w-full max-w-sm flex-col items-center justify-center rounded-2xl p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">⚠️ Mobile Notice</h2>
        <p className="text-center text-sm opacity-80">
          We are still working on mobile support. Please switch to a desktop
          device.
        </p>
      </div>
    </div>
  );

  // Mobile/Tablet Layout
  // return (
  //   <div className="flex-1 overflow-hidden flex flex-col w-full">
  //     {/* Mobile Tab Navigation */}
  //     <MobileTabNavigation
  //       onToggleConsole={toggleConsole}
  //       isConsoleVisible={isConsoleOpen}
  //     />

  //     {/* Content Area */}
  //     <div className="flex-1 overflow-hidden w-full">

  //       <SandpackProvider
  //         template="react"
  //         theme="auto"
  //         files={question.starterCode}
  //         customSetup={{ dependencies: { } }}
  //         options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
  //         style={{ width: "100%", height: "100%" }}
  //       >
  //         <SandpackLayout style={{ height: "100%", width: "100%" }}>

  //           {/* Always keep them mounted, just hide/show */}
  //           <div className={activeView === "description" ? "block h-full w-full" : "hidden"}>
  //             <MobileDescriptionLayout question={question} />
  //           </div>

  //           <div className={activeView === "editor" ? "block h-full w-full" : "hidden"}>
  //             <MobileEditorLayout />
  //           </div>
  //           <div className={activeView === "preview" ? "block h-full w-full" : "hidden"}>
  //             <MobilePreviewLayout />
  //           </div>
  //         </SandpackLayout>
  //       </SandpackProvider>
  //     </div>
  //   </div>
  // );
}
