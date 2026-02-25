"use client";

import { FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

interface MDXPreviewProps {
  content: string;
  className?: string;
}

export function MDXPreview({ content, className }: MDXPreviewProps) {
  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert max-w-none flex-1 overflow-auto scrollbar-hide",
        "prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none",
        className
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            <img {...props} className="max-w-full rounded-md" />
          ),
          pre: ({ children }) => <>{children}</>,
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const content = String(children).replace(/\n$/, "");
            const isShort = content.length < 50 && !content.includes("\n");

            if (!inline && !isShort) {
              return (
                <CodeBlock
                  fileName={language ? language.toUpperCase() : "Code"}
                  code={content}
                  className="my-6"
                >
                  <code className={cn(className, "text-[13px] scrollbar-hide")} {...props}>
                    {children}
                  </code>
                </CodeBlock>
              );
            }

            return (
              <code
                className={cn(
                  "font-mono",
                  !inline && "bg-muted/40 px-1.5 py-0.5 rounded-md border text-[0.9em]",
                  className
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content || "Nothing to preview"}
      </ReactMarkdown>
    </div>
  );
}
