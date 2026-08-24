"use client";

import { useState, useRef, useEffect } from "react";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { CustomConsole } from "./CustomConsole";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Play, Columns, Rows, Maximize, Minimize, TerminalSquare, Wand2, Loader2, RotateCcw, Code2 } from "lucide-react";
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
  mobileTab?: "code" | "console";
  setMobileTab?: (tab: "code" | "console") => void;
}

function PlaygroundControls({ 
  layout, 
  setLayout, 
  isFullscreen, 
  toggleFullscreen, 
  isConsoleVisible, 
  toggleConsole, 
  onReset,
  mobileTab,
  setMobileTab 
}: PlaygroundControlsProps) {
  const { sandpack } = useSandpack();
  const [isFormatting, setIsFormatting] = useState(false);
  const { isMobile } = useResponsive();

  const formatCode = async () => {
    try {
      setIsFormatting(true);
      const prettier = await import("prettier/standalone");
      const babel = await import("prettier/plugins/babel");
      const estree = await import("prettier/plugins/estree");
      
      const code = sandpack.files[sandpack.activeFile].code;
      let parser = "babel";
      if (sandpack.activeFile.endsWith(".json")) parser = "json";
      
      const formatted = await prettier.format(code, {
        parser,
        plugins: [babel.default || babel, estree.default || estree],
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
          onClick={() => {
            sandpack.runSandpack();
            if (setMobileTab) {
              setMobileTab("console");
            }
          }} 
          className="gap-1.5 bg-[#FF5A26] hover:bg-[#FF5A26]/90 text-white shrink-0 h-8 px-2.5 sm:px-3 text-xs sm:text-sm font-medium" 
          size="sm"
        >
          <Play className="w-3.5 h-3.5 fill-current" /> 
          <span className="inline">Execute Code</span>
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
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">JavaScript Playground</span>
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

function JSPlaygroundContent({ onReset }: { onReset: () => void }) {
  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [mobileTab, setMobileTab] = useState<"code" | "console">("code");
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isMounted } = useResponsive();

  const { sandpack } = useSandpack();
  
  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("devaxioms_js_playground", JSON.stringify(sandpack.files));
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

  const showMobileView = isMounted ? isMobile : false;

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-col w-full bg-background border border-border/40 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 h-screen w-screen rounded-none border-none overflow-hidden' 
          : 'h-full rounded-xl overflow-hidden'
      } [&_.sp-pre-placeholder]:!hidden [&_.sp-placeholder]:!hidden [&_.sp-run-button]:!hidden [&_button.sp-button]:!hidden`}
    >
      <PlaygroundControls 
        layout={layout} 
        setLayout={setLayout} 
        isFullscreen={isFullscreen} 
        toggleFullscreen={toggleFullscreen} 
        isConsoleVisible={isConsoleVisible}
        toggleConsole={() => setIsConsoleVisible(!isConsoleVisible)}
        onReset={onReset}
        mobileTab={mobileTab}
        setMobileTab={setMobileTab}
      />

      <div className="flex md:hidden items-center bg-muted/60 p-1 border-b border-border/40 text-xs">
        <button
          onClick={() => setMobileTab("code")}
          className={`flex-1 py-1.5 text-center font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            mobileTab === "code" 
              ? "bg-background text-foreground shadow-xs font-semibold" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Code</span>
        </button>
        <button
          onClick={() => setMobileTab("console")}
          className={`flex-1 py-1.5 text-center font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            mobileTab === "console" 
              ? "bg-background text-foreground shadow-xs font-semibold" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <TerminalSquare className="w-3.5 h-3.5 text-[#FF5A26]" />
          <span>Console Output</span>
        </button>
      </div>
      
      <div className="flex-1 min-h-0">
        <SandpackLayout style={{ height: "100%", width: "100%", borderRadius: 0, border: "none" }}>
          {showMobileView ? (
            <div className="w-full h-full flex flex-col min-h-0">
              {mobileTab === "code" ? (
                <div className="h-full w-full relative min-h-0">
                  <div className="absolute inset-0 overflow-hidden [&_.sp-editor]:h-full [&_.sp-cm]:h-full [&_.cm-editor]:h-full [&_.cm-scroller]:h-full [&_.cm-scroller]:overflow-auto [&_.sp-file]:h-full [&_.sp-tabs]:border-b [&_.sp-tabs]:border-border/40">
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
              ) : (
                <div className="h-full w-full bg-[#151515] text-white flex flex-col">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground bg-[#1e1e1e] px-4 py-2 border-b border-[#333] font-semibold flex justify-between shrink-0">
                    <span>Terminal Output</span>
                  </div>
                  <div className="flex-1 overflow-auto [&_.sp-console]:h-full [&_.sp-console]:bg-[#151515] [&_.sp-tabs]:hidden">
                    <CustomConsole />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ResizablePanelGroup direction={layout} className="h-full w-full">
              <ResizablePanel defaultSize={isConsoleVisible ? 60 : 100} minSize={20}>
                <div className="h-full w-full relative min-h-0">
                  <div className="absolute inset-0 overflow-hidden [&_.sp-editor]:h-full [&_.sp-cm]:h-full [&_.cm-editor]:h-full [&_.cm-scroller]:h-full [&_.cm-scroller]:overflow-auto [&_.sp-file]:h-full [&_.sp-tabs]:border-b [&_.sp-tabs]:border-border/40">
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
              
              {isConsoleVisible && (
                <>
                  <ResizableHandle className={`bg-border/60 hover:bg-[#FF5A26] transition-colors relative z-20 ${layout === 'vertical' ? 'h-[2px] cursor-row-resize' : 'w-[2px] cursor-col-resize'}`} />
                  
                  <ResizablePanel defaultSize={40} minSize={20}>
                    <div className="h-full w-full bg-[#151515] text-white flex flex-col">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground bg-[#1e1e1e] px-4 py-2 border-b border-[#333] font-semibold flex justify-between">
                        <span>Terminal</span>
                      </div>
                      <div className="flex-1 overflow-auto [&_.sp-console]:h-full [&_.sp-console]:bg-[#151515] [&_.sp-tabs]:hidden">
                        <CustomConsole />
                      </div>
                    </div>
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          )}
          <div className="hidden">
            <SandpackPreview />
          </div>
        </SandpackLayout>
      </div>
    </div>
  );
}

const DEFAULT_JS_FILES = {
  "/index.js": `/**
 * Dev Axioms - JavaScript Environment
 * 
 * Write and execute Node.js scripts instantly.
 */

console.log("Welcome to the Dev Axioms JS Playground!\\n");

// Example: Array mapping and filtering
const userScores = [
  { user: "Alice", score: 85 },
  { user: "Bob", score: 92 },
  { user: "Charlie", score: 78 }
];

const topPerformers = userScores
  .filter(data => data.score >= 80)
  .map(data => \`\${data.user}: \${data.score}\`);

console.log("Top Performers:");
topPerformers.forEach(score => console.log(\`- \${score}\`));
`
};

export function JSPlayground() {
  const [mounted, setMounted] = useState(false);
  const [initialFiles, setInitialFiles] = useState(DEFAULT_JS_FILES);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("devaxioms_js_playground");
    if (saved) {
      try {
        setInitialFiles(JSON.parse(saved));
      } catch(e) {}
    }
    setMounted(true);
  }, []);

  const handleReset = () => {
    localStorage.removeItem("devaxioms_js_playground");
    setInitialFiles(DEFAULT_JS_FILES);
    setResetKey(prev => prev + 1);
  };

  if (!mounted) {
    return <div className="w-full h-full bg-background border border-border/40 rounded-xl"></div>;
  }

  return (
    <SandpackProvider
      key={resetKey}
      template="vanilla"
      theme="dark"
      options={{
        autorun: false,
        autoReload: false,
        visibleFiles: ["/index.js"],
        activeFile: "/index.js",
      }}
      files={initialFiles}
      style={{ height: "100%", width: "100%" }}
    >
      <JSPlaygroundContent onReset={handleReset} />
    </SandpackProvider>
  );
}
