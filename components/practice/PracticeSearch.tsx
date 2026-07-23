"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PracticeSearchProps {
  currentDifficulty: string;
  currentSearch: string;
  currentPage: number;
}

export function PracticeSearch({
  currentDifficulty,
  currentSearch,
  currentPage,
}: PracticeSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch);
  const isFirstRender = useRef(true);

  // Live debounced search effect on input change
  useEffect(() => {
    // Skip running on initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      } else {
        params.delete("search");
      }
      params.set("page", "1"); // Reset to page 1

      startTransition(() => {
        router.replace(`/practice?${params.toString()}`, { scroll: false });
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue]);

  function handleClearSearch() {
    setSearchValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");

    startTransition(() => {
      router.replace(`/practice?${params.toString()}`, { scroll: false });
    });
  }

  function getDifficultyUrl(level: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (level === "All") {
      params.delete("difficulty");
    } else {
      params.set("difficulty", level);
    }
    params.set("page", "1");
    return `/practice?${params.toString()}`;
  }

  return (
    <div className="space-y-4">
      {/* Search Bar & Difficulty Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-3 rounded-2xl border border-border/70 shadow-sm">
        {/* Live Search Input Container */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Live search questions by title or tag..."
            className="w-full h-9 pl-9 pr-8 text-xs bg-background/80 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 text-[#FF5A26] animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
          ) : searchValue ? (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </div>

        {/* Server-Side URL Difficulty Filter Links */}
        <div className="flex items-center gap-1 bg-background/80 p-1 rounded-xl border border-border/60 text-xs font-medium w-full sm:w-auto shrink-0 justify-center">
          {["All", "Easy", "Medium", "Hard"].map((level) => {
            const isActive = currentDifficulty === level;
            return (
              <Link
                key={level}
                href={getDifficultyUrl(level)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all text-xs font-medium",
                  isActive
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {level}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
