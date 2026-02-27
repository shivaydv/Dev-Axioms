import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, ChevronRight, BookOpen, FolderIcon, ExternalLink } from "lucide-react";
import type { PageTree } from "fumadocs-core/server";

export function DynamicCards({ items }: { items: PageTree.Node[] }) {
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

    if (validItems.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 not-prose">
            {validItems.map((item) => {
                const anyItem = item as any;

                // Fumadocs PageTree items use 'name' as label. 
                // Source objects use 'data.title'.
                // Fallback to URL slugs if title/name is missing.
                const rawUrl = anyItem.url || anyItem.index?.url || "";
                const slug = rawUrl.split(/[/\\]/).filter(Boolean).pop()?.replace(/-/g, ' ');

                const title = anyItem.name ||
                    anyItem.title ||
                    anyItem.index?.title ||
                    anyItem.index?.name ||
                    anyItem.data?.title ||
                    slug ||
                    "Untitled Doc";

                const url = anyItem.url || anyItem.index?.url || "#";
                const isFolder = item.type === 'folder';
                const isLink = anyItem.type === 'link';

                return (
                    <Link key={url} href={url} className="group">
                        <Card className="h-full border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:ring-1 hover:ring-primary/20 hover:shadow-lg hover:-translate-y-1 overflow-hidden relative text-left">
                            <CardHeader className="p-5 flex flex-row items-center justify-between space-y-0 text-left">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="p-2.5 rounded-lg bg-primary/5 text-primary border border-primary/10 transition-colors duration-500 group-hover:bg-primary/20">
                                        {isFolder ? (
                                            <FolderIcon className="w-4 h-4 opacity-70" />
                                        ) : isLink ? (
                                            <ExternalLink className="w-4 h-4 opacity-70" />
                                        ) : (
                                            <BookOpen className="w-4 h-4 opacity-70" />
                                        )}
                                    </div>
                                    <CardTitle className="text-[17px] font-semibold group-hover:text-primary transition-colors tracking-tight text-left">
                                        {title}
                                    </CardTitle>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/70 transition-all transform group-hover:translate-x-1" />
                            </CardHeader>
                            <CardContent className="px-5 pb-5 pt-0 text-left">
                                <div className="flex items-center text-[10px] uppercase tracking-widest font-bold text-primary/40 group-hover:text-primary/70 transition-colors text-left">
                                    {isFolder ? 'Explore Path' : isLink ? 'Visit Link' : 'Read Guide'} <MoveRight className="w-3.5 h-3.5 ml-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
