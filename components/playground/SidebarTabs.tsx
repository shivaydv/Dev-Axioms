"use client";
import { Question } from "@/types/Question";
import { MDXPreview } from "./MDXPreview";
import { FileText, Lightbulb } from "lucide-react";

interface PracticeSidebarContentProps {
  question: Question;
}

// Main export function that creates the tabs
export function createPracticeSidebarTabs(question: Question) {
  return [
    {
      id: "question",
      label: "Question",
      icon: <FileText className="h-4 w-4" />,
      content: <QuestionContent question={question} />,
    },
    {
      id: "solution",
      label: "Solution",
      icon: <Lightbulb className="h-4 w-4" />,
      content: <SolutionContent question={question} />,
    },
  ];
}

// Question Tab Content
function QuestionContent({ question }: PracticeSidebarContentProps) {
  return (
    <div className="h-full space-y-6 overflow-y-auto p-6">
      <MDXPreview content={question.content} />

      {question.tags && question.tags.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-foreground mb-3 text-sm font-semibold">
            Related Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-blue-200/50 transition-colors select-none hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800/50 dark:hover:bg-blue-900/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Solution Tab Content
function SolutionContent({ question }: PracticeSidebarContentProps) {
  const hasSolution = question.solution && question.solution.trim() !== "";

  return (
    <div className="h-full overflow-y-auto">
      {hasSolution ? (
        <div className="space-y-6 p-6">
          <div className="from-background to-muted/20 rounded-xl border bg-gradient-to-b p-6 shadow-sm">
            <MDXPreview
              content={question.solution!}
              className="prose prose-sm max-w-none"
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-6 p-8 text-center">
          <div className="from-muted/50 to-muted flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br">
            <Lightbulb className="text-muted-foreground h-8 w-8" />
          </div>
          <div className="space-y-3">
            <h3 className="text-foreground text-lg font-semibold">
              Solution Not found
            </h3>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Solution is not available for this question yet.
            </p>
          </div>
          <div className="bg-primary/5 text-primary rounded-lg px-4 py-2 text-xs font-medium">
            💡 Tip: Try solving it yourself first
          </div>
        </div>
      )}
    </div>
  );
}
