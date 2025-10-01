"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { FileIcon } from "./FileIcon";
import { Button } from "@/components/ui/button";
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
    <div className="bg-background flex h-10 items-center border-b">
      {/* File Tabs - Scrollable */}
      <div className="flex h-full min-w-0 flex-1 items-center overflow-x-auto">
        {visibleFiles.map((file) => {
          const isActive = activeFile === file;
          return (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`flex h-full flex-shrink-0 items-center gap-2 border-b-2 px-3 text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "border-primary text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:border-muted border-transparent"
              }`}
            >
              <FileIcon fileName={file} />
              <span className="truncate">
                {file.startsWith("/") ? file.slice(1) : file}
              </span>
            </button>
          );
        })}
      </div>

      {/* Editor Controls - Always Visible */}
      <div className="flex h-full flex-shrink-0 items-center gap-2 border-l px-2">
        {/* Console Toggle */}
        <Button
          onClick={toggleConsole}
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-md ${
            settings.isConsoleVisible && "bg-primary/20 text-primary"
          }`}
        >
          <Terminal className="h-4 w-4" />
          {/* Console */}
        </Button>

        {/* Settings Dropdown */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary h-8 w-8 rounded-md"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Editor Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Font Size */}
            <div className="px-3 py-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Type className="h-3 w-3" />
                  <span>Font Size</span>
                </div>
                <span className="text-muted-foreground text-xs">
                  {settings.fontSize}px
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  onClick={decreaseFontSize}
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0"
                  disabled={settings.fontSize <= 10}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="flex-1 text-center text-sm font-medium">
                  {settings.fontSize}
                </div>
                <Button
                  onClick={increaseFontSize}
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0"
                  disabled={settings.fontSize >= 24}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Other Editor Options */}
            <div className="space-y-3 px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <WrapText className="h-3 w-3" />
                  <span>Word Wrap</span>
                </div>
                <Switch
                  checked={settings.wordWrap}
                  onCheckedChange={(checked) =>
                    updateSetting("wordWrap", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="h-3 w-3" />
                  <span>Line Numbers</span>
                </div>
                <Switch
                  checked={settings.lineNumbers}
                  onCheckedChange={(checked) =>
                    updateSetting("lineNumbers", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Map className="h-3 w-3" />
                  <span>Minimap</span>
                </div>
                <Switch
                  checked={settings.minimap}
                  onCheckedChange={(checked) =>
                    updateSetting("minimap", checked)
                  }
                />
              </div>
              <Button variant={"outline"} className="w-full"
              onClick={() => {
                // Reset the code to the initial state
                localStorage.removeItem("users-code");
                sandpack.resetAllFiles();
                setIsOpen(false);

                toast.success("Code reset successfully");
              }}>
                Reset Code
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FileTabs;
