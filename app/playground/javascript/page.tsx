import { JSPlayground } from "@/components/playground/JSPlayground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Playground | Dev Axioms",
  description: "Interactive pure JavaScript coding environment for algorithms, data structures, and quick prototyping.",
  keywords: ["JavaScript", "Node.js", "Algorithms", "Data Structures", "Playground", "Code Editor", "Dev Axioms"],
  openGraph: {
    title: "JavaScript Playground | Dev Axioms",
    description: "Interactive pure JavaScript coding environment for algorithms, data structures, and quick prototyping.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Playground | Dev Axioms",
    description: "Interactive pure JavaScript coding environment for algorithms, data structures, and quick prototyping.",
  },
};

export default function JSPlaygroundPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      <div className="w-full flex-1 flex flex-col p-4 md:p-6 pb-6 gap-4">
        <div className="flex-1 w-full min-h-0">
          <JSPlayground />
        </div>
      </div>
    </div>
  );
}
