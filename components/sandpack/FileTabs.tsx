"use client"

import { useSandpack } from "@codesandbox/sandpack-react";
import { FileIcon } from "./FileIcon";

const FileTabs = () => {
    const { sandpack } = useSandpack();

    const { setActiveFile, visibleFiles, activeFile } = sandpack;

    return (
        <div className="flex items-center bg-[#252526] border-b  overflow-x-auto shrink-0 h-10">
            {visibleFiles.map((file) => (
                <div
                    key={file}
                    className={`relative flex items-center group  ${activeFile === file
                        ? "bg-[#1e1e1e] text-white  "
                        : " hover:text-white hover:bg-[#37373d]"
                        } transition-colors`}
                >
                    <button
                        onClick={() => setActiveFile(file)}
                        className="px-3 py-2  text-sm font-medium flex items-center gap-2 focus:outline-none min-w-0"
                    >
                        <FileIcon fileName={file} />
                        <span className="truncate">
                            {file.startsWith('/') ? file.slice(1) : file}
                        </span>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default FileTabs