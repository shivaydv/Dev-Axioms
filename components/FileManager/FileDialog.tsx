import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_TEMPLATES } from "./templates";

interface FileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (filename: string, template?: string) => void;
  additionalTemplates?: Record<string, string>;
}

export const FileDialog = ({
  isOpen,
  onClose,
  onSubmit,
  additionalTemplates = {},
}: FileDialogProps) => {
  const [filename, setFilename] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("none");

  // Merge default templates with additional ones
  const allTemplates = {
    ...Object.fromEntries(
      Object.entries(DEFAULT_TEMPLATES).map(([key, template]) => [
        key,
        template.content,
      ]),
    ),
    ...additionalTemplates,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filename.trim()) {
      const template =
        selectedTemplate === "none" ? undefined : selectedTemplate;
      onSubmit(filename.trim(), template);
      setFilename("");
      setSelectedTemplate("none");
      onClose();
    }
  };

  const getTemplateIcon = (templateName: string) => {
    const template =
      DEFAULT_TEMPLATES[templateName as keyof typeof DEFAULT_TEMPLATES];
    return template?.icon || FileCode;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New File</DialogTitle>
          <DialogDescription>
            Create a new file with an optional template to get started quickly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="filename">Filename</Label>
            <input
              id="filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="e.g., App.tsx, styles.css, index.html"
              className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <div className="grid max-h-60 gap-2 overflow-y-auto">
              {/* No template option */}
              <div
                className={cn(
                  "hover:bg-accent flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                  selectedTemplate === "none"
                    ? "border-primary bg-primary/5"
                    : "border-border",
                )}
                onClick={() => setSelectedTemplate("none")}
              >
                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Empty File</div>
                  <div className="text-muted-foreground text-sm">
                    Start with a blank file
                  </div>
                </div>
              </div>

              {/* Template options */}
              {Object.entries(allTemplates).map(([name, content]) => {
                const IconComponent = getTemplateIcon(name);
                return (
                  <div
                    key={name}
                    className={cn(
                      "hover:bg-accent flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                      selectedTemplate === name
                        ? "border-primary bg-primary/5"
                        : "border-border",
                    )}
                    onClick={() => setSelectedTemplate(name)}
                  >
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!filename.trim()}>
              Create File
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
