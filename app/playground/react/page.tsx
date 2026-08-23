import { ReactPlayground } from "@/components/playground/ReactPlayground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Playground | Dev Axioms",
  description: "Interactive React coding environment for building dynamic UI components and full-stack prototyping.",
  keywords: ["React", "JSX", "TypeScript", "Tailwind CSS", "Playground", "Code Editor", "Frontend", "Dev Axioms"],
  openGraph: {
    title: "React Playground | Dev Axioms",
    description: "Interactive React coding environment for building dynamic UI components and full-stack prototyping.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Playground | Dev Axioms",
    description: "Interactive React coding environment for building dynamic UI components and full-stack prototyping.",
  },
};

export default function ReactPlaygroundPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      <div className="w-full flex-1 flex flex-col p-4 md:p-6 pb-6 gap-4">
        <div className="flex-1 w-full min-h-0">
          <ReactPlayground />
        </div>
      </div>
    </div>
  );
}
