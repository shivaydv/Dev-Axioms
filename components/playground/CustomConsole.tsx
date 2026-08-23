import { useSandpackConsole } from "@codesandbox/sandpack-react";

export function CustomConsole() {
  const { logs } = useSandpackConsole({ resetOnPreviewRestart: true });
  console.log("Console logs state:", logs);
  
  return (
    <div className="flex-1 overflow-auto bg-[#151515] p-4 font-mono text-sm text-white">
      {logs.length === 0 && <div className="text-gray-500 italic">No logs yet...</div>}
      {logs.map((log, i) => (
        <div key={log.id || i} className="mb-2 border-b border-[#333] pb-1">
          {Array.isArray(log.data) ? log.data.join(" ") : String(log.data)}
        </div>
      ))}
    </div>
  );
}
