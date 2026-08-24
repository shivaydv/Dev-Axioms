"use client";

import { useState, useRef, useEffect } from "react";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { CustomConsole } from "./CustomConsole";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { RefreshCw, Maximize, Minimize, TerminalSquare, Wand2, Loader2, RotateCcw, Columns, Rows } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

interface PlaygroundControlsProps {
  layout: "vertical" | "horizontal";
  setLayout: React.Dispatch<React.SetStateAction<"vertical" | "horizontal">>;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  isConsoleVisible: boolean;
  toggleConsole: () => void;
  onReset: () => void;
}

function WebPlaygroundControls({ 
  layout, 
  setLayout, 
  isFullscreen, 
  toggleFullscreen, 
  isConsoleVisible, 
  toggleConsole, 
  onReset,
}: PlaygroundControlsProps) {
  const { sandpack } = useSandpack();
  const [isFormatting, setIsFormatting] = useState(false);

  const formatCode = async () => {
    try {
      setIsFormatting(true);
      const prettier = await import("prettier/standalone");
      const babel = await import("prettier/plugins/babel");
      const estree = await import("prettier/plugins/estree");
      const html = await import("prettier/plugins/html");
      const postcss = await import("prettier/plugins/postcss");

      const code = sandpack.files[sandpack.activeFile].code;
      let parser = "babel";
      if (sandpack.activeFile.endsWith(".html")) parser = "html";
      if (sandpack.activeFile.endsWith(".css")) parser = "css";
      if (sandpack.activeFile.endsWith(".json")) parser = "json";

      const formatted = await prettier.format(code, {
        parser,
        plugins: [babel.default || babel, estree.default || estree, html.default || html, postcss.default || postcss],
        singleQuote: false,
      });
      sandpack.updateFile(sandpack.activeFile, formatted);
    } catch (error) {
      console.error("Format error", error);
      toast.error("Unable to format this file. Please check for syntax errors.");
    } finally {
      setIsFormatting(false);
    }
  };
  
  return (
    <div className="flex items-center justify-between p-2 border-b bg-muted/40 gap-2">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button 
          onClick={() => sandpack.runSandpack()} 
          className="gap-1.5 bg-[#FF5A26] hover:bg-[#FF5A26]/90 text-white shrink-0 h-8 px-2.5 sm:px-3 text-xs sm:text-sm font-medium" 
          size="sm"
          title="Run / Refresh Preview"
        >
          <RefreshCw className="w-3.5 h-3.5" /> 
          <span className="inline">Run Preview</span>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="w-8 h-8 shrink-0 flex"
          onClick={formatCode} 
          disabled={isFormatting}
          title="Format Code (Prettier)"
        >
          {isFormatting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="w-8 h-8 shrink-0 flex text-red-500 hover:text-red-400 hover:bg-red-500/10"
              title="Reset to Defaults (Clear Storage)"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset Playground</DialogTitle>
              <DialogDescription>
                Are you sure you want to reset this playground? All your current code and changes will be permanently deleted and the environment will return to its default state.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={onReset}>
                  Reset Everything
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="hidden lg:flex items-center pointer-events-none">
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Web Playground</span>
      </div>
      
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
          <Button 
            variant={isConsoleVisible ? "secondary" : "outline"} 
            size="sm" 
            className="gap-2 h-8 px-2.5 text-xs sm:text-sm"
            onClick={toggleConsole} 
            title="Toggle Console"
          >
            <TerminalSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Console</span>
          </Button>
          {isConsoleVisible && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 h-8 px-2.5 text-xs sm:text-sm"
              onClick={() => setLayout(layout === "vertical" ? "horizontal" : "vertical")} 
              title="Toggle Layout"
            >
              {layout === "vertical" ? <Columns className="w-4 h-4" /> : <Rows className="w-4 h-4" />}
              <span className="hidden sm:inline">{layout === "vertical" ? "Side-by-side" : "Top-bottom"}</span>
            </Button>
          )}
        </div>
        <Button 
          variant="outline" 
          size="icon"
          className="w-8 h-8 shrink-0"
          onClick={toggleFullscreen} 
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

function WebPlaygroundContent({ onReset }: { onReset: () => void }) {
  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { sandpack } = useSandpack();
  
  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("devaxioms_web_playground", JSON.stringify(sandpack.files));
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

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-col w-full bg-background border border-border/40 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 h-screen w-screen rounded-none border-none overflow-hidden' 
          : 'h-full rounded-xl overflow-hidden'
      } [&_.sp-pre-placeholder]:!hidden [&_.sp-placeholder]:!hidden [&_.sp-run-button]:!hidden [&_button.sp-button]:!hidden`}
    >
      <WebPlaygroundControls 
        layout={layout} 
        setLayout={setLayout} 
        isFullscreen={isFullscreen} 
        toggleFullscreen={toggleFullscreen} 
        isConsoleVisible={isConsoleVisible}
        toggleConsole={() => setIsConsoleVisible(!isConsoleVisible)}
        onReset={onReset}
      />
      
      <div className="flex-1 min-h-0">
        <SandpackLayout style={{ height: "100%", width: "100%", borderRadius: 0, border: "none" }}>
          <ResizablePanelGroup direction={layout} className="h-full w-full">
            <ResizablePanel defaultSize={50} minSize={20}>
              <div className="h-full w-full relative min-h-0">
                <div className="absolute inset-0 overflow-hidden [&_.sp-editor]:h-full [&_.sp-cm]:h-full [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto [&_.sp-file]:h-full [&_.sp-tabs]:border-b [&_.sp-tabs]:border-border/40">
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
            
            <ResizableHandle className={`bg-border/60 hover:bg-[#FF5A26] transition-colors relative z-20 ${layout === 'vertical' ? 'h-[2px] cursor-row-resize' : 'w-[2px] cursor-col-resize'}`} />
            
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
                    <ResizableHandle className="bg-border/60 hover:bg-[#FF5A26] transition-colors relative z-20 h-[2px] cursor-row-resize" />
                    <ResizablePanel defaultSize={30} minSize={10}>
                      <div className="h-full w-full bg-[#151515] text-white flex flex-col">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground bg-[#1e1e1e] px-4 py-2 border-b border-[#333] font-semibold flex justify-between">
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
        </SandpackLayout>
      </div>
    </div>
  );
}

const DEFAULT_WEB_FILES = {
  "/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dev Axioms</title>
</head>
<body>
  <div class="p-8 font-sans text-slate-900 min-h-screen flex flex-col justify-center items-center">
    <div class="flex items-center gap-3 mb-8">
      <img 
        src="https://devaxioms.vercel.app/images/Logo.svg" 
        alt="Dev Axioms Logo" 
        class="h-10"
      />
      <span class="text-3xl font-bold tracking-tight">Dev Axioms</span>
    </div>
    <h2 class="text-xl font-semibold mb-2">Web Playground</h2>
    <p class="text-gray-400 mb-8">HTML, CSS, and vanilla JS.</p>
    
    <div class="flex flex-col items-center">
      <p id="counter-text" class="mb-4">Interactions: 0</p>
      <button id="action-btn" class="px-6 py-2 bg-gray-200 text-black font-medium rounded hover:bg-gray-300 transition-colors">
        Trigger Action
      </button>
    </div>
  </div>
  <script src="index.js"></script>
</body>
</html>`,
  "/styles.css": `body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  background: #ffffff;
  color: #0f172a;
}`,
  "/index.js": `import "./styles.css";\n\nconsole.log("Dev Axioms Web Playground Initialized.\\n");\n\nlet count = 0;\nconst btn = document.getElementById("action-btn");\nconst text = document.getElementById("counter-text");\n\nbtn.addEventListener("click", () => {\n  count++;\n  text.textContent = \`Interactions: \${count}\`;\n  console.log(\`Button clicked! Total interactions: \${count}\`);\n});`
};

export function WebPlayground() {
  const [mounted, setMounted] = useState(false);
  const [initialFiles, setInitialFiles] = useState(DEFAULT_WEB_FILES);
  const [resetKey, setResetKey] = useState(0);
  const { isMobile, isMounted } = useResponsive();

  useEffect(() => {
    const saved = localStorage.getItem("devaxioms_web_playground");
    if (saved) {
      try {
        setInitialFiles(JSON.parse(saved));
      } catch(e) {}
    }
    setMounted(true);
  }, []);

  const handleReset = () => {
    localStorage.removeItem("devaxioms_web_playground");
    setInitialFiles(DEFAULT_WEB_FILES);
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
              The Web playground is designed for desktop viewports. Please switch devices or use a desktop screen to code.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SandpackProvider
      key={resetKey}
      template="vanilla"
      theme="dark"
      options={{
        autorun: true,
        autoReload: true,
        activeFile: "/index.html",
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
      files={initialFiles}
      style={{ height: "100%", width: "100%" }}
    >
      <WebPlaygroundContent onReset={handleReset} />
    </SandpackProvider>
  );
}
