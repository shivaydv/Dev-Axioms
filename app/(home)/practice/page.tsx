import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getQuestionsByDifficulty } from "@/server/functions/questions";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string }>;
}): Promise<Metadata> {
  const { difficulty } = await searchParams;
  const questions = await getQuestionsByDifficulty(difficulty);

  const title = difficulty
    ? `${difficulty} Practice Questions - Dev Axioms`
    : "Practice Coding Questions - Dev Axioms";

  const description = difficulty
    ? `Practice ${difficulty.toLowerCase()} level coding challenges. ${questions.length} questions available to sharpen your programming skills.`
    : `Practice coding questions across all difficulty levels. ${questions.length} curated interview questions to improve your programming skills.`;

  return {
    title,
    description,
    keywords: `coding practice, programming challenges, interview questions, ${difficulty ? difficulty.toLowerCase() : "easy medium hard"}, coding interview prep`,
  };
}

const difficultyVariants: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800",
  Medium:
    "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800",
  Hard: "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800",
};

interface PracticePageProps {
  searchParams: Promise<{
    difficulty?: string;
  }>;
}

export default async function PracticePage({
  searchParams,
}: PracticePageProps) {
  const { difficulty } = await searchParams;
  const questions = await getQuestionsByDifficulty(difficulty);
  const currentDifficulty = difficulty || "All";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Practice</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Sharpen your coding skills with curated interview questions.
            {currentDifficulty !== "All" && (
              <span className="ml-1">
                • Showing {questions.length} {currentDifficulty.toLowerCase()}{" "}
                question{questions.length !== 1 ? "s" : ""}
              </span>
            )}
            {currentDifficulty === "All" && (
              <span className="ml-1">
                • {questions.length} question{questions.length !== 1 ? "s" : ""}{" "}
                total
              </span>
            )}
          </p>
        </div>
        {/* Difficulty Filters */}
        <div className="flex gap-2">
          {["All", "Easy", "Medium", "Hard"].map((level) => (
            <Link
              key={level}
              href={
                level === "All" ? "/practice" : `/practice?difficulty=${level}`
              }
            >
              <Button
                variant={currentDifficulty === level ? "outline" : "ghost"}
                size="sm"
                className={cn(
                  "transition-all",
                  currentDifficulty === level &&
                    "bg-primary/10 text-primary border-primary/20",
                )}
              >
                {level}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="bg-card rounded-lg border p-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="mb-2 text-lg font-semibold">
              No Questions Available
            </h3>
            <p className="text-muted-foreground mb-4">
              There are no practice questions available yet. Please contact an
              admin to add some questions.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-card divide-y rounded-lg border">
          {questions.map((question) => (
            <Link
              href={`/practice/${question.slug}`}
              key={question.id}
              className="hover:bg-muted/40 group flex flex-col gap-3 p-5 transition-colors sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="text-base font-medium transition-all group-hover:underline">
                  {question.title}
                </div>
                <div className="mt-2 flex w-full flex-wrap items-center gap-2 text-xs">
                  {/* Tags */}
                  {question.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  <Badge
                    className={cn(difficultyVariants[question.difficulty])}
                  >
                    {question.difficulty}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
