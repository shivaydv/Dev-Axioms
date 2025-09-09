"use client";

import { FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Editor } from "@monaco-editor/react";
import { EDITOR_CONFIG } from "./MarkdownEditor";

interface RawEditorTabProps {
  markdown: string;
  onChange: (value: string) => void;
}

export const RawEditorTab: FC<RawEditorTabProps> = ({ markdown, onChange }) => {
  return (
    <TabsContent value="raw" className="flex h-0 flex-1 flex-col pt-0!">
      <Editor
        height="100%"
        className="flex-1"
        defaultLanguage="markdown"
        defaultValue={markdown}
        onChange={(value) => onChange(value || "")}
        onMount={(_, monaco) => {
          monaco.editor.setTheme("vs-dark");
        }}
        options={EDITOR_CONFIG.monacoOptions}
      />
    </TabsContent>
  );
};
