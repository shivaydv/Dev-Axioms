import { Button } from "@/components/ui/button";
import { File, AlertTriangle, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileTabsProps {
  files: string[];
  activeFile: string;
  errors: Record<string, string | null>;
  maxFiles: number;
  allowDeleteLastFile: boolean;
  onFileSelect: (filename: string) => void;
  onFileDelete: (filename: string) => void;
  onAddFile: () => void;
}

export const FileTabs = ({
  files,
  activeFile,
  errors,
  maxFiles,
  allowDeleteLastFile,
  onFileSelect,
  onFileDelete,
  onAddFile,
}: FileTabsProps) => {
  return (
    <div className="bg-muted/40 flex items-center border-b">
      <div className="flex min-w-0 flex-1 items-center overflow-x-auto">
        {files.map((filename) => {
          const hasError = errors[filename];
          return (
            <div
              key={filename}
              className={cn(
                "group relative flex cursor-pointer items-center gap-1.5 border-b-2 px-2 py-2 text-xs transition-all sm:gap-2 sm:px-3 sm:text-sm",
                activeFile === filename
                  ? "border-primary bg-background text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border-transparent",
                hasError && "border-destructive text-destructive",
              )}
              onClick={() => onFileSelect(filename)}
            >
              <File className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />

              <span className="max-w-[100px] truncate sm:max-w-[140px]">
                {filename.startsWith("/") ? filename.slice(1) : filename}
              </span>

              {hasError && (
                <AlertTriangle className="text-destructive h-2.5 w-2.5 sm:h-3 sm:w-3" />
              )}

              {activeFile === filename && (
                <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 sm:gap-1">
                  {(allowDeleteLastFile || files.length > 1) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-destructive h-4 w-4 sm:h-5 sm:w-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileDelete(filename);
                      }}
                      title="Remove file"
                    >
                      <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-shrink-0 items-center border-l px-1.5 sm:px-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={onAddFile}
          className="h-7 gap-1 text-xs whitespace-nowrap sm:h-8 sm:gap-1.5 sm:text-sm"
          disabled={files.length >= maxFiles}
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Add File</span>
        </Button>
      </div>
    </div>
  );
};
