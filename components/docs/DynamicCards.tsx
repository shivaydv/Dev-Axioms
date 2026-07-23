"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Node } from "fumadocs-core/page-tree";

export function DynamicCards({ items }: { items: Node[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter for valid pages, folders, and links that point to a destination
    const validItems = items.filter(item => {
        const anyItem = item as any;
        if (item.type === 'page' || item.type === 'folder' || anyItem.type === 'link') {
            const url = anyItem.url || anyItem.index?.url || '';
            // Don't show the index page itself
            return url !== '' && !url.endsWith('/index') && !url.endsWith('\\index');
        }
        return false;
    });

    const processedItems = validItems.map(item => {
        const anyItem = item as any;
        const rawUrl = anyItem.url || anyItem.index?.url || "";
        const slug = rawUrl.split(/[/\\]/).filter(Boolean).pop()?.replace(/-/g, ' ');

        const title = anyItem.name ||
            anyItem.title ||
            anyItem.index?.title ||
            anyItem.index?.name ||
            anyItem.data?.title ||
            slug ||
            "Untitled Doc";

        const description = anyItem.description || anyItem.index?.description || anyItem.data?.description || "";
        const url = rawUrl || "#";
        const isFolder = item.type === 'folder';
        const isLink = anyItem.type === 'link';

        return { item, title, description, url, isFolder, isLink, rawUrl };
    });

    const filteredItems = processedItems.filter((data) => {
        const q = searchQuery.toLowerCase();
        return (
            data.title.toLowerCase().includes(q) ||
            data.description.toLowerCase().includes(q)
        );
    });

    if (validItems.length === 0) return null;

    return (
        <div className="flex flex-col gap-5 not-prose w-full pt-2">
            {/* Minimal Search Filter */}
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
                <Input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-8 text-xs bg-card/40 border-border/50 focus:border-[#FF5A26]/40 focus:ring-0 rounded-lg placeholder:text-muted-foreground/50 transition-colors"
                />
            </div>

            {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border/50 rounded-xl">
                    No topics found for "{searchQuery}"
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {filteredItems.map(({ title, description, url }) => (
                        <Link key={url} href={url} className="group block">
                            <div className="h-full p-4 rounded-xl border border-border/50 bg-card/40 hover:bg-card hover:border-[#FF5A26]/30 transition-all duration-200 flex flex-col justify-between space-y-3 shadow-xs">
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-[#FF5A26] transition-colors line-clamp-1">
                                            {title}
                                        </h3>
                                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-[#FF5A26] group-hover:translate-x-0.5 transition-all shrink-0" />
                                    </div>

                                    {description && (
                                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
