"use client";

import { FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
interface MDXPreviewProps {
  content: string;
  className?: string;
}

export function MDXPreview({ content, className }: MDXPreviewProps) {
  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none flex-1 overflow-auto ${className}`}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            <img {...props} className="max-w-full rounded-md" />
          ),
        }}
      >
        {content || "Nothing to preview"}
      </ReactMarkdown>
    </div>
  );
}
