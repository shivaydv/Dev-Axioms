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
  DropdownMenuLabel,
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
    <div className="bg-background/80 flex h-10 items-center border-b px-2 backdrop-blur-md">
      {/* File Tabs - Scrollable */}
      <div className="flex h-full min-w-0 flex-1 items-center overflow-x-auto scrollbar-hide">
        <div className="flex h-full items-center gap-1">
          {visibleFiles.map((file) => {
            const isActive = activeFile === file;
            return (
              <button
                key={file}
                onClick={() => setActiveFile(file)}
                className={cn(
                  "relative flex h-8 items-center gap-2 rounded-md px-3 text-[12px] font-medium transition-all duration-200 select-none",
                  isActive
                    ? "text-foreground bg-accent/50"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <FileIcon fileName={file} className="h-3.5 w-3.5" />
                <span>
                  {file.startsWith("/") ? file.slice(1) : file}
                </span>
                {isActive && (
                  <div className="absolute -bottom-[5px] left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Controls */}
      <div className="flex h-full flex-shrink-0 items-center gap-1 border-l pl-2 border-border/50">
        <Button
          onClick={toggleConsole}
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7 rounded-lg transition-colors",
            settings.isConsoleVisible
              ? "text-primary bg-primary/10"
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
              className="h-7 w-7 rounded-lg text-muted-foreground hover:bg-muted"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Editor Settings</div>
            <DropdownMenuSeparator />

            <div className="px-2 py-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Type className="h-4 w-4" />
                  <span>Font Size</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{settings.fontSize}px</span>
              </div>
              <div className="flex items-center gap-1">
                <Button onClick={decreaseFontSize} variant="outline" size="sm" className="h-7 flex-1" disabled={settings.fontSize <= 10}>
                  <Minus className="h-3 w-3" />
                </Button>
                <Button onClick={increaseFontSize} variant="outline" size="sm" className="h-7 flex-1" disabled={settings.fontSize >= 24}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="space-y-1 p-1">
              {[
                { label: "Word Wrap", icon: WrapText, key: "wordWrap" as const },
                { label: "Line Numbers", icon: Hash, key: "lineNumbers" as const },
                { label: "Minimap", icon: Map, key: "minimap" as const },
              ].map((opt) => (
                <div key={opt.key} className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/50">
                  <div className="flex items-center gap-2 text-sm">
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
                className="w-full justify-start gap-2 h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
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

