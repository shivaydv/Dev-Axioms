"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";
import questionsData from "@/data/practice-questions.json";
import { Question } from "@/types/Question";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const difficultyVariants: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800",
  Medium:
    "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800",
  Hard: "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800",
};

export default function PracticePage() {
  const questions = questionsData.questions as Question[];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Practice</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Sharpen your coding skills with curated interview questions.
          </p>
        </div>
        {/* Filters placeholder */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            All
          </Button>
          <Button variant="ghost" size="sm">
            Easy
          </Button>
          <Button variant="ghost" size="sm">
            Medium
          </Button>
          <Button variant="ghost" size="sm">
            Hard
          </Button>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-card divide-y rounded-lg border">
        {questions.map((question) => (
          <Link
            href={`/practice/${question.id}`}
            key={question.id}
            className="hover:bg-muted/40 group flex flex-col gap-3 p-5 transition-colors sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="text-base font-medium transition-all group-hover:underline">
                {question.title}
              </div>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {question.description}
              </p>
              <div className="mt-2 flex w-full flex-wrap items-center gap-2 text-xs">
                {/* Time */}
                <span className="text-muted-foreground ml-auto flex items-center gap-1 sm:ml-0">
                  <Clock className="h-3.5 w-3.5" />
                  {question.timeLimit} min
                </span>
                <Badge className={cn(difficultyVariants[question.difficulty])}>
                  {question.difficulty}
                </Badge>
              </div>
            </div>
            <div>
              {/* <Link href={`/practice/${question.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Play className="h-4 w-4" />
                  Start
                </Button>
              </Link> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
