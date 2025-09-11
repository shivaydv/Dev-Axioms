"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { SandpackFile, SandpackFiles } from "@codesandbox/sandpack-react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFileManager } from "./useFileManager";
import { DEFAULT_TEMPLATES, defaultFileNameValidator } from "./templates";
import { FileDialog } from "./FileDialog";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { FileTabs } from "./FileTabs";
import { PropertiesPanel } from "./PropertiesPanel";
import { EditorContainer } from "./EditorContainer";

interface AdvancedFileManagerProps {
  initialFiles?: SandpackFiles;
  onChange?: (files: SandpackFiles) => void;
  height?: string;
  showOutput?: boolean;
  fileTemplates?: Record<string, string>;
  showProperties?: boolean;
  className?: string;
  maxFiles?: number;
  validateFileName?: (filename: string) => string | null;
  allowDeleteLastFile?: boolean;
}

// Expose methods to parent via ref
export interface FileManagerRef {
  addFile: (filename: string, content?: string) => boolean;
  removeFile: (filename: string) => boolean;
  getFiles: () => SandpackFiles;
  setFiles: (files: SandpackFiles) => void;
}

const AdvancedFileManager = forwardRef<
  FileManagerRef,
  AdvancedFileManagerProps
>(
  (
    {
      initialFiles = {
        "/index.js": { code: "// Start coding here", active: true },
      },
      onChange,
      height = "600px",
      showOutput = false,
      fileTemplates = {},
      showProperties = true,
      className,
      maxFiles = 20,
      validateFileName = defaultFileNameValidator,
      allowDeleteLastFile = false,
    },
    ref,
  ) => {
    const [showFileDialog, setShowFileDialog] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
      isOpen: boolean;
      filename: string;
    }>({ isOpen: false, filename: "" });
    const [fontSize, setFontSize] = useState(16);

    const [state, actions] = useFileManager({
      initialFiles,
      onFilesChange: onChange,
      validateFileName,
      maxFiles,
    });

    const { files, activeFile, errors } = state;
    const { setActiveFile, updateFile, addFile, removeFile, setFiles } =
      actions;

    // Expose methods to parent component
    useImperativeHandle(
      ref,
      () => ({
        addFile: (filename: string, content?: string) =>
          addFile(filename, content),
        removeFile: (filename: string) => removeFile(filename),
        getFiles: () => files,
        setFiles: (newFiles: SandpackFiles) => setFiles(newFiles),
      }),
      [files, addFile, removeFile, setFiles],
    );

    const handleDeleteFile = (filename: string) => {
      setDeleteConfirmation({ isOpen: true, filename });
    };

    const confirmDelete = () => {
      if (deleteConfirmation.filename) {
        removeFile(deleteConfirmation.filename);
      }
    };

    const handleAddFile = (filename: string, template?: string) => {
      let content = "";

      // First check built-in templates
      if (
        template &&
        DEFAULT_TEMPLATES[template as keyof typeof DEFAULT_TEMPLATES]
      ) {
        content =
          DEFAULT_TEMPLATES[template as keyof typeof DEFAULT_TEMPLATES].content;
      }
      // Then check additional templates from props
      else if (template && fileTemplates[template]) {
        content = fileTemplates[template];
      }

      addFile(filename, content);
    };

    const currentFile = files[activeFile];
    const fileMeta =
      typeof currentFile === "string"
        ? { code: currentFile }
        : (currentFile as SandpackFile) || { code: "" };

    const filesList = Object.keys(files);
    const hasErrors = Object.values(errors).some((error) => error);

    return (
      <>
        <div
          
          className={cn(
            "bg-card flex flex-col overflow-hidden rounded-lg border shadow-sm",
            className,
          )}
          style={{ height: height }}
        >
          {/* File Tabs */}
          <FileTabs
            files={filesList}
            activeFile={activeFile}
            errors={errors}
            maxFiles={maxFiles}
            allowDeleteLastFile={allowDeleteLastFile}
            onFileSelect={setActiveFile}
            onFileDelete={handleDeleteFile}
            onAddFile={() => setShowFileDialog(true)}
          />

          {/* Error Display */}
          {hasErrors && (
            <div className="bg-destructive/10 border-b px-3 py-2">
              <div className="text-destructive flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>
                  {Object.entries(errors)
                    .filter(([, error]) => error)
                    .map(([filename, error]) => `${filename}: ${error}`)
                    .join(", ")}
                </span>
              </div>
            </div>
          )}

          {/* Editor and Properties */}
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <div className="flex min-h-0 flex-1 flex-col">
              <EditorContainer
                activeFile={activeFile}
                fileMeta={activeFile ? fileMeta : null}
                fontSize={fontSize}
                onFileChange={(filename, code) =>
                  updateFile(filename, { code })
                }
                onAddFile={() => setShowFileDialog(true)}
              />
            </div>

            {/* Properties Panel */}
            {showProperties && activeFile && fileMeta && (
              <PropertiesPanel
                activeFile={activeFile}
                fileMeta={fileMeta}
                fontSize={fontSize}
                onFileUpdate={updateFile}
                onFontSizeChange={setFontSize}
              />
            )}
          </div>
        </div>

        {/* Debug Output */}
        {showOutput && (
          <div className="bg-muted/50 mt-4 rounded-lg border p-3 sm:p-4">
            <h3 className="mb-3 text-sm font-medium">Files JSON Output:</h3>
            <pre
              lang="json"
              className="bg-background overflow-x-auto rounded border p-3 font-mono text-xs leading-relaxed whitespace-pre"
            >
              {JSON.stringify(files, null, 2)}
            </pre>
          </div>
        )}

        {/* File Dialog */}
        <FileDialog
          isOpen={showFileDialog}
          onClose={() => setShowFileDialog(false)}
          onSubmit={handleAddFile}
          additionalTemplates={fileTemplates}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={deleteConfirmation.isOpen}
          onClose={() => setDeleteConfirmation({ isOpen: false, filename: "" })}
          onConfirm={confirmDelete}
          filename={deleteConfirmation.filename}
        />
      </>
    );
  },
);

AdvancedFileManager.displayName = "AdvancedFileManager";

export default AdvancedFileManager;
