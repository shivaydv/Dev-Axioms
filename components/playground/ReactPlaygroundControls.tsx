"use client";

import { useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Maximize, Minimize, TerminalSquare, PanelLeft, Wand2, Loader2, RotateCcw } from "lucide-react";
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

export interface ReactPlaygroundControlsProps {
  layout: "vertical" | "horizontal";
  setLayout: React.Dispatch<React.SetStateAction<"vertical" | "horizontal">>;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  isConsoleVisible: boolean;
  toggleConsole: () => void;
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  onReset: () => void;
}

export function ReactPlaygroundControls({ layout, setLayout, isFullscreen, toggleFullscreen, isConsoleVisible, toggleConsole, isSidebarVisible, toggleSidebar, onReset }: ReactPlaygroundControlsProps) {
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
        <Button 
          variant={isSidebarVisible ? "secondary" : "outline"} 
          size="icon"
          className="w-6 h-6 shrink-0"
          onClick={toggleSidebar} 
          title="Toggle Explorer"
        >
          <PanelLeft className="w-3.5 h-3.5" />
        </Button>
      </div>
      
      <div className="hidden lg:flex items-center pointer-events-none">
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">React Playground</span>
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
