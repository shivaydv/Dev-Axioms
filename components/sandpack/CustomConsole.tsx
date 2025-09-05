"use client";

import { useSandpackConsole } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";

type SandpackMessageConsoleMethods =
  | "log"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "table"
  | "clear"
  | "time"
  | "timeEnd"
  | "count"
  | "assert";

const CustomConsole = () => {
  const { logs, reset } = useSandpackConsole({
    resetOnPreviewRestart: false,
    showSyntaxError: true,
  });

  return (
    <div className="bg-background text-foreground flex h-full flex-col">
      <div className="flex-1 space-y-1 overflow-auto p-3">
        {logs.length === 0 ? (
          <div className="text-muted-foreground h-full text-sm italic">
            <div>No console output</div>
          </div>
        ) : (
          logs.map((log, _) => (
            <div
              key={log.id}
              className={`flex items-start gap-3 rounded-md border p-2 font-mono text-sm ${getConsoleStyle(log.method)} transition-colors`}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="flex-1 break-words whitespace-pre-wrap text-gray-200">
                  {formatConsoleData(log.data)}
                </span>
                <span className="text-muted-foreground ml-auto text-xs">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-background flex items-center justify-between border-t p-3">
        <span className="text-muted-foreground flex items-center gap-2 text-xs">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          {logs.length} {logs.length === 1 ? "message" : "messages"}
        </span>
        <Button
          size={"sm"}
          variant={"secondary"}
          className="rounded-md"
          onClick={reset}
        >
          Clear Console
        </Button>
      </div>
    </div>
  );
};

// Helper function to get console message type styling
const getConsoleStyle = (method: SandpackMessageConsoleMethods) => {
  switch (method) {
    case "error":
      return "border-red-500/40  bg-red-500/20";
    case "warn":
      return "border-yellow-500/40 bg-yellow-500/20";
    case "info":
      return "border-blue-500/40 bg-blue-500/20";
    case "clear":
      return "border-gray-500/40 bg-gray-500/20";
    default:
      return "border-border ";
  }
};

// Helper function to format console data
const formatConsoleData = (
  data: Array<string | Record<string, string>> | undefined,
): string => {
  if (!data) return "";

  return data
    .map((item) => {
      if (typeof item === "string") {
        return item;
      } else if (typeof item === "object") {
        return JSON.stringify(item, null, 2);
      }
      return String(item);
    })
    .join(" ");
};

export default CustomConsole;
