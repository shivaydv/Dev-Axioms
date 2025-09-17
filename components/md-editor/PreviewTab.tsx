"use client";

import { FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface PreviewTabProps {
  markdown: string;
}

export const PreviewTab: FC<PreviewTabProps> = ({ markdown }) => {
  return (
    <TabsContent value="preview" className="flex h-0 flex-1 flex-col pt-0!">
      <CardContent className="prose prose-slate dark:prose-invert max-w-none flex-1 overflow-auto p-4">
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ node, ...props }) => (
              <img {...props} className="max-w-full rounded-md" />
            ),
          }}
        >
          {markdown || "Nothing to preview"}
        </ReactMarkdown>
      </CardContent>
    </TabsContent>
  );
};
