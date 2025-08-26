"use client";

import { ResizablePanel } from "@/components/ui/resizable";
import CustomEditor from "@/components/sandpack/CustomEditor";

interface EditorPanelProps {
  isConsoleVisible: boolean;
}

export default function EditorPanel({ isConsoleVisible }: EditorPanelProps) {
  return (
    <ResizablePanel
      defaultSize={isConsoleVisible ? 70 : 100}
      minSize={30}
      className="bg-[#1e1e1e]"
    >
      <CustomEditor />
    </ResizablePanel>
  );
}
