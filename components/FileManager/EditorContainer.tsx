import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { FileText, Sun, Moon } from "lucide-react";
import { SandpackFile } from "@codesandbox/sandpack-react";
import { getLanguageFromFileName } from "@/utils/helpers";

interface EditorContainerProps {
  activeFile: string | null;
  fileMeta: SandpackFile | { code: string } | null;
  fontSize: number;
  onFileChange: (filename: string, code: string) => void;
  onAddFile: () => void;
}

const handleEditorDidMount = (editor: any, monaco: any) => {
  // disable diagnostics but keep IntelliSense
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
    noSuggestionDiagnostics: true,
  });
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
    noSuggestionDiagnostics: true,
  });
};

export const EditorContainer = ({
  activeFile,
  fileMeta,
  fontSize,
  onFileChange,
  onAddFile,
}: EditorContainerProps) => {
  if (!activeFile || !fileMeta) {
    return (
      <div className="text-muted-foreground flex h-full min-h-0 flex-1 items-center justify-center">
        <div className="text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
          <p>No file selected</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={onAddFile}
          >
            Create your first file
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-0 w-full flex-1">
      <Editor
        key={activeFile}
        value={fileMeta.code}
        language={getLanguageFromFileName(activeFile)}
        theme={"vs-dark"}
        onChange={(value) => onFileChange(activeFile, value || "")}
        onMount={handleEditorDidMount}
        width="100%"
        height="100%"
        loading={
          <div className="flex h-full w-full flex-1 items-center justify-center">
            <div className="space-y-2 text-center">
              <div className="border-primary mx-auto h-6 w-6 animate-spin rounded-full border-b-2"></div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Loading Editor...
              </p>
            </div>
          </div>
        }
        options={{
          minimap: { enabled: false },
          fontSize: fontSize,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 8, bottom: 8 },
          lineNumbers: "on",
          wordWrap: "on",
          bracketPairColorization: { enabled: true },
          tabSize: 2,
          insertSpaces: true,
          autoIndent: "full",
          readOnly: (fileMeta as SandpackFile).readOnly,
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
          suggest: {
            showKeywords: true,
            showSnippets: true,
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true,
          },
          parameterHints: { enabled: true },
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          folding: true,
          foldingStrategy: "indentation",
          showFoldingControls: "mouseover",
          matchBrackets: "always",
          colorDecorators: true,
        }}
      />
    </div>
  );
};
