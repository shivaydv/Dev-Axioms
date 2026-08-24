"use client";

import { useState, useRef, useEffect } from "react";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { CustomConsole } from "./CustomConsole";
import { DependencyManager } from "./DependencyManager";
import { CustomFileExplorer } from "./CustomFileExplorer";
import { ReactPlaygroundControls } from "./ReactPlaygroundControls";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useResponsive } from "@/hooks/useResponsive";



function ReactPlaygroundContent({ onReset }: { onReset: () => void }) {
  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { sandpack } = useSandpack();
  
  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("devaxioms_react_playground", JSON.stringify(sandpack.files));
    }, 1500);
    return () => clearTimeout(timer);
  }, [sandpack.files]);

  // Listen for native exit fullscreen (e.g. Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNativeFull = !!(
        document.fullscreenElement || 
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      if (!isNativeFull && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if ((document as any).webkitFullscreenElement && (document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
      } catch (err) {
        console.warn("Native exit fullscreen error:", err);
      }
    } else {
      setIsFullscreen(true);
      try {
        const el = containerRef.current as any;
        if (el) {
          if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => {});
          } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
          }
        }
      } catch (err) {
        console.warn("Native request fullscreen error:", err);
      }
    }
  };

  const toggleConsole = () => setIsConsoleVisible(!isConsoleVisible);
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col bg-background border border-border/40 ${
        isFullscreen 
          ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none overflow-hidden" 
          : "w-full h-full rounded-xl overflow-hidden"
      } transition-all duration-300 [&_.sp-pre-placeholder]:!hidden [&_.sp-placeholder]:!hidden [&_.sp-run-button]:!hidden [&_button.sp-button]:!hidden`}
    >
      <ReactPlaygroundControls 
        layout={layout} 
        setLayout={setLayout} 
        isFullscreen={isFullscreen} 
        toggleFullscreen={toggleFullscreen}
        isConsoleVisible={isConsoleVisible}
        toggleConsole={toggleConsole}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        onReset={onReset}
      />
      
      <div className="flex-1 min-h-0 relative">
        <SandpackLayout style={{ height: "100%", width: "100%", borderRadius: 0, border: "none", overflow: 'hidden' }}>
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            
            {isSidebarVisible && (
              <>
                <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                  <ResizablePanelGroup direction="vertical" className="h-full bg-[#151515] border-r border-[#333]">
                    <ResizablePanel defaultSize={60} minSize={20}>
                      <CustomFileExplorer />
                    </ResizablePanel>
                    <ResizableHandle className="h-[1px] bg-[#333] hover:bg-[#FF5A26] cursor-row-resize relative z-20" />
                    <ResizablePanel defaultSize={40} minSize={20}>
                      <DependencyManager />
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle className="w-[1px] bg-[#333] hover:bg-[#FF5A26] cursor-col-resize relative z-20" />
              </>
            )}
            
            <ResizablePanel defaultSize={isSidebarVisible ? 80 : 100}>
              <ResizablePanelGroup direction={layout} className="h-full w-full">
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="h-full w-full relative min-h-0">
                    <div className="absolute inset-0 overflow-hidden [&_.sp-editor]:h-full [&_.sp-cm]:h-full [&_.cm-editor]:h-full [&_.cm-scroller]:h-full [&_.cm-scroller]:overflow-auto [&_.sp-file]:h-full [&_.sp-tabs]:border-b [&_.sp-tabs]:border-[#333] [&_.sp-tabs]:bg-[#1e1e1e]">
                      <SandpackCodeEditor 
                        showLineNumbers 
                        showTabs
                        showInlineErrors
                        showRunButton={false}
                        wrapContent
                        style={{ height: '100%', overflow: 'hidden' }}
                      />
                    </div>
                  </div>
                </ResizablePanel>
                
                <ResizableHandle className={`bg-[#333] hover:bg-[#FF5A26] transition-colors relative z-20 ${layout === 'vertical' ? 'h-[1px] cursor-row-resize' : 'w-[1px] cursor-col-resize'}`} />
                
                <ResizablePanel defaultSize={50} minSize={20}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={isConsoleVisible ? 70 : 100} minSize={20}>
                      <div className="h-full w-full [&_.sp-preview]:h-full [&_.sp-preview-container]:h-full">
                        <SandpackPreview 
                          showRefreshButton={false}
                          showOpenInCodeSandbox={false}
                          style={{ height: '100%' }}
                        />
                      </div>
                    </ResizablePanel>
                    
                    {isConsoleVisible && (
                      <>
                        <ResizableHandle className="bg-[#333] hover:bg-[#FF5A26] transition-colors relative z-20 h-[1px] cursor-row-resize" />
                        <ResizablePanel defaultSize={30} minSize={10}>
                          <div className="h-full w-full bg-[#151515] text-white flex flex-col">
                            <div className="text-xs uppercase tracking-wider text-muted-foreground bg-[#1e1e1e] px-4 py-2 border-b border-[#333] font-semibold flex justify-between shrink-0">
                              <span>Console Output</span>
                            </div>
                            <div className="flex-1 overflow-auto [&_.sp-console]:h-full [&_.sp-console]:bg-[#151515]">
                              <CustomConsole />
                            </div>
                          </div>
                        </ResizablePanel>
                      </>
                    )}
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </SandpackLayout>
      </div>
    </div>
  );
}

const DEFAULT_REACT_FILES = {
  "/App.js": `import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 font-sans text-slate-900 min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-center gap-3 mb-8">
        <img 
          src="https://devaxioms.vercel.app/images/Logo.svg" 
          alt="Dev Axioms Logo" 
          className="h-10"
        />
        <span className="text-3xl font-bold tracking-tight">Dev Axioms</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">React Playground</h2>
      <p className="text-gray-400 mb-8">Build stunning components dynamically.</p>
      
      <div className="flex flex-col items-center">
        <p className="mb-4">Engagement Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-6 py-2 bg-gray-200 text-black font-medium rounded hover:bg-gray-300 transition-colors"
        >
          Accelerate
        </button>
      </div>
    </div>
  );
}
`,
  "/styles.css": `body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  background: #ffffff;
  color: #0f172a;
}`,
  "/package.json": `{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "^5.0.0"
  },
  "main": "/index.js"
}`
};

export function ReactPlayground() {
  const [mounted, setMounted] = useState(false);
  const [initialFiles, setInitialFiles] = useState(DEFAULT_REACT_FILES);
  const [resetKey, setResetKey] = useState(0);
  const { isMobile, isMounted } = useResponsive();

  useEffect(() => {
    const saved = localStorage.getItem("devaxioms_react_playground");
    if (saved) {
      try {
        setInitialFiles(JSON.parse(saved));
      } catch(e) {}
    }
    setMounted(true);
  }, []);

  const handleReset = () => {
    localStorage.removeItem("devaxioms_react_playground");
    setInitialFiles(DEFAULT_REACT_FILES);
    setResetKey(prev => prev + 1);
  };

  if (!mounted || !isMounted) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background rounded-xl border border-border/40 h-full w-full">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#FF5A26] border-t-transparent" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-6 bg-background rounded-xl border border-border/40 h-full w-full min-h-[350px]">
        <div className="bg-card text-foreground flex w-full max-w-sm flex-col items-center justify-center rounded-2xl p-8 shadow-xs border border-border/60 space-y-4 text-center">
          <div className="w-12 h-12 bg-[#FF5A26]/10 rounded-xl flex items-center justify-center text-[#FF5A26]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold tracking-tight">Desktop Optimized</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The React playground is designed for desktop viewports. Please switch devices or use a desktop screen to code.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SandpackProvider
      key={resetKey}
      template="react"
      theme="dark"
      options={{
        autorun: true,
        autoReload: true,
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
      files={initialFiles}
      style={{ height: "100%", width: "100%" }}
    >
      <ReactPlaygroundContent onReset={handleReset} />
    </SandpackProvider>
  );
}
