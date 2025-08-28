"use client";
import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  useSandpack,
} from "@codesandbox/sandpack-react";
import FileTabs from "./FileTabs";
import { getLanguageFromFileName } from "@/lib/getLanguageFromFileName";
import { useRef } from "react";

// Global singleton highlighter (shared across navigations)
let globalShikiInitialized = false;

const EditorLoading = () => (
  <div className="h-full w-full bg-[#1e1e1e] flex items-center justify-center">
    <div className="flex items-center gap-3">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-600 border-t-blue-500"></div>
      <span className="text-gray-400 text-sm">Loading editor...</span>
    </div>
  </div>
);

export default function CustomEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const language = getLanguageFromFileName(sandpack.activeFile);

  if (!sandpack.activeFile) return <EditorLoading />;

const handleEditorDidMount = async (editor: any, monaco: any) => {
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

  if (typeof window !== "undefined" && !globalShikiInitialized) {
    try {
      const { shikiToMonaco } = await import("@shikijs/monaco");
      const { createHighlighter } = await import("shiki");

      const highlighter = await createHighlighter({
        themes: ["dark-plus"], // ✅ only Shiki theme
        langs: ["javascript", "typescript", "html", "css", "json", "jsx", "tsx"],
      });

      shikiToMonaco(highlighter, monaco);

      // ✅ use ONLY Shiki theme
      monaco.editor.setTheme("dark-plus");
      globalShikiInitialized = true;
      console.log("✅ Shiki syntax highlighting applied");
    } catch (error) {
      console.error("❌ Failed to initialize Shiki:", error);
    }
  } else {
    // Always stick to dark-plus once initialized
    monaco.editor.setTheme("dark-plus");
  }
};
  return (
    <SandpackStack className="w-full h-full flex flex-col">
      <FileTabs />
      <div className="flex-1 min-h-0 bg-[#1e1e1e]" style={{ paddingTop: 8 }}>
        <Editor
          width="100%"
          height="100%"
          language={language}
          theme={"dark-plus"} 
          onMount={handleEditorDidMount}
          value={code}
          onChange={(value) => updateCode(value || "")}
          loading={<EditorLoading />}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            bracketPairColorization: { enabled: true },
            tabSize: 2,
            insertSpaces: true,
            autoIndent: "full",
            formatOnType: false,
            formatOnPaste: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
              verticalScrollbarSize: 14,
              horizontalScrollbarSize: 14,
              alwaysConsumeMouseWheel: false,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showClasses: true,
              showFunctions: true,
              showVariables: true,
              showModules: true,
              showProperties: true,
              showMethods: true,
              filterGraceful: true,
            },
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: "on",
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false,
            },
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: "matchingDocuments",
          }}
          
        />
      </div>
    </SandpackStack>
  );
}
