"use client";

import { CodeIcon, TerminalIcon, Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CodeBlockProps = {
    fileName?: string;
    copyCode?: boolean;
    contentClassName?: string;
    code?: string;
} & React.ComponentProps<"div">;

export function CodeBlock({
    fileName,
    className,
    children,
    contentClassName,
    code,
    copyCode = true,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!code && typeof children !== "string") return;
        const textToCopy = code || (children as string);
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={cn(
                "relative rounded-xl border border-neutral-300/50 bg-[#F8F9FA] dark:border-neutral-800/60 dark:bg-[#0D0D0E] overflow-hidden group",
                className,
            )}
        >
            {(fileName || copyCode) && (
                <div className="relative flex h-10 items-center justify-between border-b border-neutral-300/50 bg-neutral-200/20 px-4 dark:border-neutral-800/60 dark:bg-neutral-900/30">
                    <div className="flex items-center gap-2">
                        {fileName === "Terminal" ? (
                            <TerminalIcon
                                size={14}
                                className="text-neutral-500 dark:text-neutral-400"
                            />
                        ) : (
                            <CodeIcon
                                size={14}
                                className="text-neutral-500 dark:text-neutral-400"
                            />
                        )}
                        <span className="text-[12px] font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                            {fileName || "Source Code"}
                        </span>
                    </div>

                    {copyCode && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopy}
                            className="h-7 w-7 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {copied ? (
                                <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                                <Copy className="h-3.5 w-3.5 text-neutral-500" />
                            )}
                        </Button>
                    )}
                </div>
            )}
            <div className={cn("relative overflow-auto scrollbar-hide", contentClassName)}>
                <div className="p-4 text-[13px] leading-[1.6] font-mono selection:bg-primary/20 antialiased" style={{ fontFamily: 'var(--font-geist-mono), JetBrains Mono, Menlo, Courier New, monospace' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
