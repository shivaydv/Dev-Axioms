"use client";

import { useSandpackConsole } from "@codesandbox/sandpack-react";
import { useEffect, useRef } from "react";

type SandpackMessageConsoleMethods = "log" | "debug" | "info" | "warn" | "error" | "table" | "clear" | "time" | "timeEnd" | "count" | "assert";

const CustomConsole = () => {
  const { logs, reset } = useSandpackConsole({
    resetOnPreviewRestart: false,
    showSyntaxError: true
  });

  // const scrollRef = useRef<HTMLDivElement>(null);

  // // Auto-scroll to bottom when new logs are added
  // useEffect(() => {
  //   if (scrollRef.current) {
  //     const scrollElement = scrollRef.current;
  //     const isScrolledToBottom = scrollElement.scrollHeight - scrollElement.clientHeight <= scrollElement.scrollTop + 1;

  //     // Only auto-scroll if user is already at the bottom
  //     if (isScrolledToBottom || logs.length === 1) {
  //       scrollElement.scrollTop = scrollElement.scrollHeight;
  //     }
  //   }
  // }, [logs]);

  return (
    <div className="flex flex-col h-full text-white bg-[#1e1e1e]">
      <div
        // ref={scrollRef}
        className="flex-1 overflow-auto p-3 space-y-1"
      >
        {logs.length === 0 ? (
          <div className="text-gray-500 italic text-sm  h-full">
            <div>No console output</div>
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={log.id}
              className={`flex items-start gap-3 p-2 rounded-md text-sm font-mono border-l-4 ${getConsoleStyle(log.method)} hover:bg-gray-800/30 transition-colors`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="flex-1 whitespace-pre-wrap break-words text-gray-200">
                  {formatConsoleData(log.data)}
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center justify-between p-3 bg-[#252526] border-t border-gray-700">
        <span className="text-xs text-gray-400 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          {logs.length} {logs.length === 1 ? 'message' : 'messages'}
        </span>
        <button
          className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-1 text-xs transition-colors border border-gray-600 hover:border-gray-500"
          onClick={reset}
        >
          Clear Console
        </button>
      </div>
    </div>
  );
};

// Helper function to get console message type styling
const getConsoleStyle = (method: SandpackMessageConsoleMethods) => {
  switch (method) {
    case "error":
      return "border-red-500 bg-red-500/5";
    case "warn":
      return "border-yellow-500 bg-yellow-500/5";
    case "info":
      return "border-blue-500 bg-blue-500/5";
    case "clear":
      return "border-gray-500 bg-gray-500/5";
    default:
      return "border-gray-600 bg-gray-600/5";
  }
};

// Helper function to get method badge styling
const getMethodBadgeStyle = (method: SandpackMessageConsoleMethods) => {
  switch (method) {
    case "error":
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    case "warn":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    case "info":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    case "clear":
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    default:
      return "bg-gray-600/20 text-gray-300 border border-gray-600/30";
  }
};

// Helper function to format console data
const formatConsoleData = (data: Array<string | Record<string, string>> | undefined): string => {
  if (!data) return "";

  return data.map(item => {
    if (typeof item === "string") {
      return item;
    } else if (typeof item === "object") {
      return JSON.stringify(item, null, 2);
    }
    return String(item);
  }).join(" ");
};

export default CustomConsole;
