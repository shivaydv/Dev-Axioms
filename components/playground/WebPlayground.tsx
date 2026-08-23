"use client";

import { useState, useRef, useEffect } from "react";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer, useSandpack } from "@codesandbox/sandpack-react";
import { CustomConsole } from "./CustomConsole";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { RefreshCw, Maximize, Minimize, TerminalSquare, Wand2, Loader2, RotateCcw } from "lucide-react";
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

function WebPlaygroundControls({ layout, setLayout, isFullscreen, toggleFullscreen, isConsoleVisible, toggleConsole, onReset }: PlaygroundControlsProps) {
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
    <div className="flex items-center justify-between p-2 border-b bg-muted/40 gap-2 relative">
      <div className="flex items-center gap-2">
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Web Playground</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant={isConsoleVisible ? "secondary" : "outline"} 
          size="icon" 
          className="w-6 h-6 shrink-0"
          onClick={toggleConsole} 
          title="Toggle Console"
        >
          <TerminalSquare className="w-3.5 h-3.5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="w-6 h-6 shrink-0"
          onClick={formatCode} 
          disabled={isFormatting}
          title="Format Code (Prettier)"
        >
          {isFormatting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline"
              size="icon"
              className="w-6 h-6 shrink-0 text-red-500 hover:text-red-400 hover:bg-red-500/10"
              title="Reset to Defaults (Clear Storage)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
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
        <Button 
          variant="outline"
          size="icon"
          className="w-6 h-6 shrink-0 bg-[#FF5A26] hover:bg-[#FF5A26]/90 text-white border-0"
          onClick={() => sandpack.runSandpack()}
          title="Refresh Preview"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="w-6 h-6 shrink-0"
          onClick={toggleFullscreen} 
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </Button>
      </div>
    </div>
  );
}

function WebPlaygroundContent({ onReset }: { onReset: () => void }) {
  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { sandpack } = useSandpack();
  
  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("devaxioms_web_playground", JSON.stringify(sandpack.files));
    }, 1500);
    return () => clearTimeout(timer);
  }, [sandpack.files]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-col w-full h-full bg-background border border-border/40 ${isFullscreen ? 'rounded-none' : 'rounded-xl overflow-hidden'} [&_.sp-pre-placeholder]:!hidden [&_.sp-placeholder]:!hidden`}
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
                    <div className="absolute inset-0 overflow-hidden [&_.sp-editor]:h-full [&_.sp-cm]:h-full [&_.cm-editor]:h-full [&_.cm-scroller]:h-full [&_.cm-scroller]:overflow-auto [&_.sp-file]:h-full [&_.sp-tabs]:border-b [&_.sp-tabs]:border-border/40">
                      <SandpackCodeEditor 
                        showLineNumbers 
                        showTabs
                        showInlineErrors
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

  if (!mounted) {
    return <div className="w-full h-full bg-background border border-border/40 rounded-xl"></div>;
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
