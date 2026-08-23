import { WebPlayground } from "@/components/playground/WebPlayground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Playground | Dev Axioms",
  description: "Interactive Web (HTML/CSS/Vanilla JS) coding environment for instant frontend development and prototyping.",
  keywords: ["HTML", "CSS", "JavaScript", "Web Development", "Playground", "Code Editor", "Frontend", "Dev Axioms"],
  openGraph: {
    title: "Web Playground | Dev Axioms",
    description: "Interactive Web coding environment for instant frontend development and prototyping.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Playground | Dev Axioms",
    description: "Interactive Web coding environment for instant frontend development and prototyping.",
  },
};

export default function WebPlaygroundPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      <div className="w-full flex-1 flex flex-col p-4 md:p-6 pb-6 gap-4">
        <div className="flex-1 w-full min-h-0">
          <WebPlayground />
        </div>
      </div>
    </div>
  );
}
