"use client";
import { Question } from "@/types/Question";
import { MDXPreview } from "./MDXPreview";
import { FileText, Lightbulb, Tag } from "lucide-react";

interface PracticeSidebarContentProps {
  question: Question;
}

export function createPracticeSidebarTabs(question: Question) {
  return [
    {
      id: "question",
      label: "Question",
      icon: <FileText className="h-3.5 w-3.5" />,
      content: <QuestionContent question={question} />,
    },
    {
      id: "solution",
      label: "Solution",
      icon: <Lightbulb className="h-3.5 w-3.5" />,
      content: <SolutionContent question={question} />,
    },
  ];
}

// Question Tab Content
function QuestionContent({ question }: PracticeSidebarContentProps) {
  return (
    <div className="h-full space-y-5 overflow-y-auto p-4 sm:p-5 scrollbar-hide text-xs sm:text-sm">
      {/* Prominent Question Header Title */}
      <div className="space-y-1 pb-3 border-b border-border/40">
        <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
          {question.title}
        </h1>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-card/70 prose-pre:border prose-pre:border-border/50">
        <MDXPreview content={question.content} />
      </div>

      {question.tags && question.tags.length > 0 && (
        <div className="mt-6 border-t border-border/50 pt-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Tag className="w-3.5 h-3.5 text-[#FF5A26]" />
            <span>Related Tags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-card/60 px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border/50 hover:border-[#FF5A26]/40 hover:text-foreground transition-all select-none"
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
    <div className="h-full overflow-y-auto scrollbar-hide">
      {hasSolution ? (
        <div className="space-y-6 p-4 sm:p-5 pb-20">
          <MDXPreview
            content={question.solution!}
            className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed"
          />
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center min-h-[250px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card border border-border/50 text-muted-foreground">
            <Lightbulb className="h-5 w-5 text-[#FF5A26]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-foreground text-sm font-semibold">
              Solution Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-[220px] text-xs leading-relaxed">
              We're polishing the step-by-step solution and explanation for this axiom.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
