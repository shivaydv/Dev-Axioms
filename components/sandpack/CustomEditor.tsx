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

export default function CustomEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const language = getLanguageFromFileName(sandpack.activeFile);
  const shikiInitialized = useRef(false);

  const handleEditorDidMount = async (editor: any, monaco: any) => {

    // Disable error diagnostics but keep suggestions and auto-imports
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


    // Initialize Shiki for syntax highlighting
    if (typeof window !== 'undefined' && !shikiInitialized.current) {
      try {
        const { shikiToMonaco } = await import('@shikijs/monaco');
        const { createHighlighter } = await import('shiki');

        const highlighter = await createHighlighter({
          themes: ['dark-plus'],
          langs: ['javascript', 'typescript', 'html', 'css', 'json', 'jsx', 'tsx'],
        });

        shikiToMonaco(highlighter, monaco);
        monaco.editor.setTheme('dark-plus');

        shikiInitialized.current = true;
        console.log('Shiki syntax highlighting applied');
      } catch (error) {
        console.error('Failed to initialize Shiki:', error);
        monaco.editor.setTheme('vs-dark');
      }
    }
  };

  return (
    <SandpackStack className="w-full h-full">
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language={language}
          theme="dark-plus"
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
          onMount={handleEditorDidMount}
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
}

