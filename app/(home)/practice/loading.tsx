import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function PracticeLoading() {
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
        {/* Filters */}
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

      {/* Loading Questions List */}
      <div className="bg-card divide-y rounded-lg border">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1">
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-3 h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-14" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
