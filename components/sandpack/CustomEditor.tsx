"use client";
import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  useSandpack,
} from "@codesandbox/sandpack-react";
import FileTabs from "./FileTabs";
import { getLanguageFromFileName } from "@/utils/helpers";
import { useEffect, useState } from "react";

// ✅ Global singletons (won’t reload across navigations)
let globalHighlighter: any = null;
let globalShikiToMonaco: any = null;
let shikiInitPromise: Promise<void> | null = null;

const EditorLoading = () => (
  <div className="h-full w-full bg-background flex items-center justify-center">
    <div className="flex items-center gap-3">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-600 border-t-blue-500"></div>
      <span className="text-gray-400 text-sm">Loading editor...</span>
    </div>
  </div>
);

// ✅ preload once, reused everywhere
async function preloadShiki() {
  if (!shikiInitPromise) {
    shikiInitPromise = (async () => {
      const { shikiToMonaco } = await import("@shikijs/monaco");
      const { createHighlighter } = await import("shiki");

      globalHighlighter = await createHighlighter({
        themes: ["dark-plus"],
        langs: ["javascript", "typescript", "html", "css", "json", "jsx", "tsx"],
      });

      globalShikiToMonaco = shikiToMonaco;
      // console.log("✅ Shiki highlighter preloaded");
    })();
  }
  return shikiInitPromise;
}

export default function CustomEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const language = getLanguageFromFileName(sandpack.activeFile);
  const [ready, setReady] = useState(false);

  // ⏳ Preload Shiki before mounting Editor
  useEffect(() => {
    preloadShiki().then(() => setReady(true));
  }, []);

  if (!sandpack.activeFile) return <EditorLoading />;
  if (!ready) return <EditorLoading />;

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

    // ✅ apply Shiki highlighter once Monaco is ready
    if (globalHighlighter && globalShikiToMonaco) {
      globalShikiToMonaco(globalHighlighter, monaco);
      monaco.editor.setTheme("dark-plus");
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <FileTabs />
      <div className="flex-1 min-h-0 bg-background ">
        <Editor
          width="100%"
          height="100%"
          language={language}
          theme="dark-plus" // fallback (safe)
          onMount={handleEditorDidMount}
          value={code}
          onChange={(value) => updateCode(value || "")}
          loading={<EditorLoading />}
          options={{
            minimap: { enabled: false },
            padding: { top: 10, bottom: 10 },
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
    </div>
  );
}
