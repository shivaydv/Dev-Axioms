"use client"

import { useSandpack } from "@codesandbox/sandpack-react";
import { FileIcon } from "./FileIcon";

const FileTabs = () => {
    const { sandpack } = useSandpack();

    const { setActiveFile, visibleFiles, activeFile } = sandpack;

    return (
        <div className="flex items-center border-b bg-background  overflow-x-auto h-10">
            {visibleFiles.map((file) => {
                const isActive = activeFile === file
                return (
                    <button
                        key={file}
                        onClick={() => setActiveFile(file)}
                        className={`flex items-center gap-2 px-3 h-full text-sm whitespace-nowrap border-b-2 transition-colors
                                ${isActive
                                ? "border-primary text-primary font-medium"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"}`}
                    >
                        <FileIcon fileName={file} />
                        <span className="truncate">
                            {file.startsWith("/") ? file.slice(1) : file}
                        </span>
                    </button>
                )
            })}
        </div>
    )

}

export default FileTabs