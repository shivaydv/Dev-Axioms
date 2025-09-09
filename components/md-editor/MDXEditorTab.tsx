"use client";

import { FC } from "react";
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  toolbarPlugin,
  codeMirrorPlugin,
} from "@mdxeditor/editor";
import { TabsContent } from "@/components/ui/tabs";
import { EditorToolbar } from "./EditorToolbar";

import { oneDark } from "@codemirror/theme-one-dark";
import { EDITOR_CONFIG, EDITOR_STYLES } from "./MarkdownEditor";




interface MDXEditorTabProps {
  markdown: string;
  onChange: (markdown: string) => void;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const MDXEditorTab: FC<MDXEditorTabProps> = ({
  markdown,
  onChange,
  editorRef,
}) => {
  return (
    <TabsContent value="edit" className="flex h-0 flex-1 flex-col pt-0!">
      <MDXEditor
        ref={editorRef}
        markdown={markdown}
        onChange={onChange}
        contentEditableClassName={EDITOR_STYLES.contentClassName}
        plugins={[
          // Core plugins
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),

          // Link plugins
          linkPlugin(),
          linkDialogPlugin(),

          // Image plugin
          imagePlugin({
            // imageUploadHandler,
            
          }),

          // Table plugin
          tablePlugin(),

          // Code block plugin
          codeBlockPlugin({
            defaultCodeBlockLanguage: "js",
          }),
          codeMirrorPlugin({
            codeBlockLanguages: EDITOR_CONFIG.codeBlockLanguages,
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: [oneDark]
          }),

          // Toolbar plugin
          toolbarPlugin({
            toolbarContents: () => <EditorToolbar />,
            toolbarClassName: EDITOR_STYLES.toolbarClassName,
          }),
        ]}
        className="h-full max-w-none flex-1 overflow-auto"
      />
    </TabsContent>
  );
};

export default MDXEditorTab;
