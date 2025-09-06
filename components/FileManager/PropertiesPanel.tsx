import { SandpackFile } from "@codesandbox/sandpack-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface PropertiesPanelProps {
  activeFile: string;
  fileMeta: SandpackFile | { code: string };
  fontSize: number;
  onFileUpdate: (filename: string, updates: Partial<SandpackFile>) => void;
  onFontSizeChange: (size: number) => void;
}

export const PropertiesPanel = ({
  activeFile,
  fileMeta,
  fontSize,
  onFileUpdate,
  onFontSizeChange,
}: PropertiesPanelProps) => {
  return (
    <div className="bg-muted/30 flex w-full flex-col border-t lg:w-64 lg:border-t-0 lg:border-l">
      <div className="flex items-center justify-between border-b p-2 sm:p-3">
        <div className="flex items-center gap-2">
          <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs font-medium sm:text-sm">
            File Properties
          </span>
        </div>
      </div>

      <div className="space-y-3 p-2 sm:space-y-4 sm:p-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="active" className="text-xs sm:text-sm">
            Active File
          </Label>
          <Switch
            id="active"
            checked={!!(fileMeta as SandpackFile).active}
            onCheckedChange={(checked) =>
              onFileUpdate(activeFile, { active: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="hidden" className="text-xs sm:text-sm">
            Hidden
          </Label>
          <Switch
            id="hidden"
            checked={!!(fileMeta as SandpackFile).hidden}
            onCheckedChange={(checked) =>
              onFileUpdate(activeFile, { hidden: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="readOnly" className="text-xs sm:text-sm">
            Read-only
          </Label>
          <Switch
            id="readOnly"
            checked={!!(fileMeta as SandpackFile).readOnly}
            onCheckedChange={(checked) =>
              onFileUpdate(activeFile, { readOnly: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="fontSize" className="text-xs sm:text-sm">
            Font Size
          </Label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFontSizeChange(Math.max(8, fontSize - 1))}
              className="text-muted-foreground hover:text-foreground flex h-6 w-6 items-center justify-center rounded border text-xs"
              disabled={fontSize <= 8}
            >
              -
            </button>
            <span className="w-8 text-center font-mono text-xs">
              {fontSize}
            </span>
            <button
              onClick={() => onFontSizeChange(Math.min(24, fontSize + 1))}
              className="text-muted-foreground hover:text-foreground flex h-6 w-6 items-center justify-center rounded border text-xs"
              disabled={fontSize >= 24}
            >
              +
            </button>
          </div>
        </div>

        <div className="border-t pt-2">
          <div className="text-muted-foreground space-y-1 text-xs">
            <p>Lines: {fileMeta.code.split("\\n").length}</p>
            <p>Characters: {fileMeta.code.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
