"use client";

import "@mdxeditor/editor/style.css";
import "highlight.js/styles/atom-one-dark.css";

import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { EditorTabs } from "./EditorTabs";
// import { MDXEditorTab } from "./MDXEditorTab";
import { PreviewTab } from "./PreviewTab";
import { RawEditorTab } from "./RawEditorTab";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";

const MDXEditorTab = dynamic(() => import("./MDXEditorTab"), {
  ssr: false,
});

export const EDITOR_CONFIG = {
  height: 600,
  defaultTab: "raw" as const,
  codeBlockLanguages: {
    js: "JavaScript",
    css: "CSS",
    md: "Markdown",
    bash: "Bash",
    json: "JSON",
    typescript: "TypeScript",
    tsx: "TSX",
    jsx: "JSX",
    html: "HTML",
  },
  monacoOptions: {
    theme: "vs-dark",
    fontSize: 14,
    lineHeight: 24,
    wordWrap: "on" as const,
    automaticLayout: true,
  },
};

export const EDITOR_STYLES = {
  contentClassName: `
    prose max-w-none flex-1
    bg-background text-foreground
    prose-headings:text-foreground
    prose-p:text-muted-foreground
    prose-strong:text-foreground
    prose-em:text-muted-foreground
    prose-a:text-primary 
    hover:prose-a:text-primary/80
    prose-code:bg-muted! prose-code:px-1!
    [&_code>span]:bg-transparent!
    prose-li:text-foreground
    focus:outline-none 
    p-4 rounded-lg
    
    [&_.cm-editor]:py-2!
  `,
  toolbarClassName: `
    bg-background! border text-foreground! 
    [&_button]:hover:bg-muted! [&_button[data-state=on]]:bg-muted! 
    [&_button[disabled]]:[&_svg]:text-muted! [&_svg]:text-foreground! 
    [&_[role=combobox]]:bg-background! [&_[role=combobox]]:text-foreground! 
    [&_[role=combobox]_span]:text-foreground! rounded-none!
  `,
};

export type EditorTab = "edit" | "raw" | "preview";

export interface MarkdownEditorProps {
  markdown: string;
  onChange?: (markdown: string) => void;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  className?: string;
}

const MarkdownEditor: FC<MarkdownEditorProps> = ({
  markdown,
  onChange,
  editorRef,
  className,
}) => {
  const handleMarkdownChange = (newMarkdown: string) => {
    onChange?.(newMarkdown);
  };

  return (
    <Card
      className={cn(
        "bg-background flex w-full flex-col overflow-hidden rounded-xl border py-0! shadow-sm",
        className,
      )}
      style={{ height: `${EDITOR_CONFIG.height}px` }}
    >
      <Tabs
        defaultValue={EDITOR_CONFIG.defaultTab}
        className="flex h-full w-full flex-1 flex-col gap-0!"
      >
        <EditorTabs />

        <MDXEditorTab
          markdown={markdown}
          onChange={handleMarkdownChange}
          editorRef={editorRef}
        />

        <PreviewTab markdown={markdown} />

        <RawEditorTab markdown={markdown} onChange={handleMarkdownChange} />
      </Tabs>
    </Card>
  );
};

export default MarkdownEditor;
