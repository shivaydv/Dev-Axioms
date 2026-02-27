import { webdev, web3 } from "@/lib/source";
import { DynamicCards } from "./DynamicCards";
import type { PageTree } from "fumadocs-core/server";

interface DocGridProps {
    path?: string;
    sourceType?: 'webdev' | 'web3';
}

/**
 * Robustly find the directory of nodes in the Fumadocs PageTree.
 */
function findNodesInTree(nodes: PageTree.Node[], targetUrl: string): PageTree.Node[] {
    const normalizedTarget = targetUrl.toLowerCase().replace(/\/$/, "");

    for (const node of nodes) {
        if (node.type === 'folder') {
            const anyFolder = node as any;
            const folderUrl = anyFolder.url?.toLowerCase().replace(/\/$/, "");

            // If the folder matches exactly, return its children
            if (folderUrl === normalizedTarget) {
                return node.children;
            }

            // Look for an index page that might match the URL
            if (anyFolder.index) {
                const indexUrl = (anyFolder.index as any).url?.toLowerCase().replace(/\/$/, "");
                if (indexUrl === normalizedTarget) {
                    return node.children;
                }
            }

            // Recurse deeper
            const deeperMatches = findNodesInTree(node.children, targetUrl);
            if (deeperMatches.length > 0) return deeperMatches;
        }
    }
    return [];
}

/**
 * Fallback: find all nodes which are children of the target path by URL prefix
 */
function findNodesByPrefix(nodes: PageTree.Node[], prefix: string): PageTree.Node[] {
    const result: PageTree.Node[] = [];
    const normalizedPrefix = prefix.toLowerCase().replace(/\/$/, "") + "/";

    function traverse(items: PageTree.Node[]) {
        for (const item of items) {
            if (item.type === 'page') {
                const anyPage = item as any;
                const url = anyPage.url?.toLowerCase() || "";
                if (url.startsWith(normalizedPrefix)) {
                    const rest = url.substring(normalizedPrefix.length);
                    // Check if it's an immediate child (no more slashes)
                    if (rest.length > 0 && !rest.includes('/')) {
                        result.push(item);
                    }
                }
            } else if (item.type === 'folder') {
                traverse(item.children);
            }
        }
    }

    traverse(nodes);
    return result;
}

export function DocGrid({ path, sourceType = 'webdev' }: DocGridProps) {
    if (!path) return null;

    const source = sourceType === 'web3' ? web3 : webdev;
    let target = path.trim();

    // Ensure absolute path
    if (!target.startsWith('/')) {
        target = `/${target}`;
    }

    // Prepend base URL if it's missing (e.g. they passed "/html-css" instead of "/web-dev/html-css")
    if (!target.startsWith(source.baseUrl)) {
        target = `${source.baseUrl}${target}`;
    }

    // 1. Recursive search for a matching folder
    let items = findNodesInTree(source.pageTree.children, target);

    // 2. Prefix discovery search
    if (items.length === 0) {
        items = findNodesByPrefix(source.pageTree.children, target);
    }

    // 3. Last fallback: root folder handling
    if (items.length === 0 && (target === source.baseUrl || target === source.baseUrl + "/index")) {
        items = source.pageTree.children;
    }

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="my-10 not-prose">
            <DynamicCards items={items} />
        </div>
    );
}
