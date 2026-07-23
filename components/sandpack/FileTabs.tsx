"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { FileIcon } from "./FileIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MoreVertical,
  Type,
  Minus,
  Plus,
  Terminal,
  WrapText,
  Map,
  Hash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useEditorSettings } from "@/store/EditorSettingsStore";
import { useState } from "react";
import { toast } from "sonner";

const FileTabs = () => {
  const { settings, updateSetting, toggleConsole } = useEditorSettings();
  const { sandpack } = useSandpack();
  const { setActiveFile, visibleFiles, activeFile } = sandpack;
  const [isOpen, setIsOpen] = useState(false);

  const increaseFontSize = () => {
    if (settings.fontSize < 24) {
      updateSetting("fontSize", settings.fontSize + 1);
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 10) {
      updateSetting("fontSize", settings.fontSize - 1);
    }
  };

  return (
    <div className="bg-muted/20 flex h-9 items-center justify-between border-b border-border/50 px-2 select-none backdrop-blur-sm">
      {/* File Tabs */}
      <div className="flex h-full min-w-0 flex-1 items-center overflow-x-auto scrollbar-hide">
        <div className="flex h-full items-center gap-1">
          {visibleFiles.map((file) => {
            const isActive = activeFile === file;
            return (
              <button
                key={file}
                onClick={() => setActiveFile(file)}
                className={cn(
                  "relative flex h-7 items-center gap-2 rounded-md px-2.5 text-xs font-medium transition-all select-none",
                  isActive
                    ? "text-foreground bg-background border border-border/50 shadow-xs font-semibold"
                    : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                )}
              >
                <FileIcon fileName={file} className="h-3.5 w-3.5" />
                <span>
                  {file.startsWith("/") ? file.slice(1) : file}
                </span>
                {isActive && (
                  <div className="absolute -bottom-[5px] left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-[#FF5A26]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Controls */}
      <div className="flex h-full flex-shrink-0 items-center gap-1 border-l border-border/50 pl-2">
        <Button
          onClick={toggleConsole}
          variant="ghost"
          size="icon"
          className={cn(
            "h-6 w-6 rounded-md transition-colors",
            settings.isConsoleVisible
              ? "text-[#FF5A26] bg-[#FF5A26]/10"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          title="Toggle Console"
        >
          <Terminal className="h-3.5 w-3.5" />
        </Button>

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-md text-muted-foreground hover:bg-muted"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-2">
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Editor Settings</div>
            <DropdownMenuSeparator />

            <div className="px-2 py-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <Type className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Font Size</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{settings.fontSize}px</span>
              </div>
              <div className="flex items-center gap-1">
                <Button onClick={decreaseFontSize} variant="outline" size="sm" className="h-6 text-xs flex-1" disabled={settings.fontSize <= 10}>
                  <Minus className="h-3 w-3" />
                </Button>
                <Button onClick={increaseFontSize} variant="outline" size="sm" className="h-6 text-xs flex-1" disabled={settings.fontSize >= 24}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="space-y-0.5 p-1">
              {[
                { label: "Word Wrap", icon: WrapText, key: "wordWrap" as const },
                { label: "Line Numbers", icon: Hash, key: "lineNumbers" as const },
                { label: "Minimap", icon: Map, key: "minimap" as const },
              ].map((opt) => (
                <div key={opt.key} className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-muted/50 text-xs">
                  <div className="flex items-center gap-2">
                    <opt.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{opt.label}</span>
                  </div>
                  <Switch
                    checked={settings[opt.key]}
                    onCheckedChange={(checked) => updateSetting(opt.key, checked)}
                    className="scale-75"
                  />
                </div>
              ))}
            </div>

            <DropdownMenuSeparator />

            <div className="p-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 h-7 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                onClick={() => {
                  localStorage.removeItem("users-code");
                  sandpack.resetAllFiles();
                  setIsOpen(false);
                  toast.success("Workspace reset");
                }}
              >
                Reset Workspace
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FileTabs;
