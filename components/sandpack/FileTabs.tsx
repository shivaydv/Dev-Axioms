"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { FileIcon } from "./FileIcon";

const FileTabs = () => {
  const { sandpack } = useSandpack();

  const { setActiveFile, visibleFiles, activeFile } = sandpack;

  return (
    <div className="bg-background flex h-10 items-center overflow-x-auto border-b">
      {visibleFiles.map((file) => {
        const isActive = activeFile === file;
        return (
          <button
            key={file}
            onClick={() => setActiveFile(file)}
            className={`flex h-full items-center gap-2 border-b-2 px-3 text-sm whitespace-nowrap transition-colors ${
              isActive
                ? "border-primary text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:border-muted border-transparent"
            }`}
          >
            <FileIcon fileName={file} />
            <span className="truncate">
              {file.startsWith("/") ? file.slice(1) : file}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FileTabs;
