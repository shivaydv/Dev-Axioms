import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getQuestionsFiltered } from "@/server/functions/questions";
import { Metadata } from "next";
import { PracticeSearch } from "@/components/practice/PracticeSearch";
import { ChevronLeft, ChevronRight, Code2 } from "lucide-react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string; search?: string; page?: string }>;
}): Promise<Metadata> {
  const { difficulty, search, page } = await searchParams;
  const pageNum = parseInt(page || "1", 10);
  const { totalCount } = await getQuestionsFiltered({
    difficulty,
    search,
    page: pageNum,
    limit: 10,
  });

  const title = difficulty
    ? `${difficulty} Practice Questions - Dev Axioms`
    : search
    ? `Search: "${search}" - Practice Questions - Dev Axioms`
    : "Practice Coding Questions - Dev Axioms";

  const description = `Practice curated coding challenges. ${totalCount} questions available to sharpen your programming and developer interview skills.`;

  return {
    title,
    description,
    keywords: `coding practice, programming challenges, interview questions, easy medium hard, coding interview prep`,
  };
}

const difficultyVariants: Record<string, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium",
  Hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-medium",
};

interface PracticePageProps {
  searchParams: Promise<{
    difficulty?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function PracticePage({
  searchParams,
}: PracticePageProps) {
  const { difficulty, search, page } = await searchParams;
  const currentDifficulty = difficulty || "All";
  const currentSearch = search || "";
  const currentPage = parseInt(page || "1", 10);
  const limit = 10;

  // Server-side database query with search, filter, and pagination
  const { questions, totalCount, totalPages } = await getQuestionsFiltered({
    difficulty: currentDifficulty,
    search: currentSearch,
    page: currentPage,
    limit,
  });

  // Helper to generate pagination URL preserving existing query params
  function getPaginationUrl(newPage: number) {
    const params = new URLSearchParams();
    if (currentDifficulty && currentDifficulty !== "All") {
      params.set("difficulty", currentDifficulty);
    }
    if (currentSearch) {
      params.set("search", currentSearch);
    }
    params.set("page", newPage.toString());
    return `/practice?${params.toString()}`;
  }

  return (
    <div className="bg-background min-h-screen pb-20 pt-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-6">
        {/* Minimal Clean Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-1">
            Practice Arena
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Curated coding challenges for modern developer interviews.
          </p>
        </div>

        {/* Server-Synced Search & Filter Bar */}
        <PracticeSearch
          currentDifficulty={currentDifficulty}
          currentSearch={currentSearch}
          currentPage={currentPage}
        />

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            Showing <strong className="text-foreground">{questions.length}</strong> of{" "}
            <strong className="text-foreground">{totalCount}</strong> total question{totalCount !== 1 ? "s" : ""}
            {currentDifficulty !== "All" && ` • ${currentDifficulty}`}
            {currentSearch && ` • Search: "${currentSearch}"`}
          </span>

          {(currentDifficulty !== "All" || currentSearch) && (
            <Link href="/practice" className="text-[#FF5A26] hover:underline font-medium">
              Reset Filters
            </Link>
          )}
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <div className="bg-card/40 rounded-2xl border border-border/60 p-12 text-center">
            <Code2 className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">No questions found</h3>
            <p className="text-xs text-muted-foreground mb-4">
              No practice questions matched your filter or search query.
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              View All Questions
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            {questions.map((question) => (
              <Link
                href={`/practice/${question.slug}`}
                key={question.id}
                className="group rounded-xl border border-border/70 bg-card/40 hover:bg-card hover:border-border p-4 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {question.title}
                  </span>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge
                      className={cn(
                        difficultyVariants[question.difficulty],
                        "px-2 py-0 text-[10px]"
                      )}
                    >
                      {question.difficulty}
                    </Badge>
                    {question.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground border border-border/40 text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                  <span>Solve</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-[#FF5A26]" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Server-Side Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-border/60 text-xs">
            {/* Previous Page Button */}
            {currentPage > 1 ? (
              <Link
                href={getPaginationUrl(currentPage - 1)}
                className="px-3 py-1.5 rounded-lg border border-border/70 bg-card/40 hover:bg-card text-foreground font-medium flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Link>
            ) : (
              <button
                disabled
                className="px-3 py-1.5 rounded-lg border border-border/40 text-muted-foreground/40 cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={getPaginationUrl(p)}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-medium transition-all",
                    p === currentPage
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {p}
                </Link>
              ))}
            </div>

            {/* Next Page Button */}
            {currentPage < totalPages ? (
              <Link
                href={getPaginationUrl(currentPage + 1)}
                className="px-3 py-1.5 rounded-lg border border-border/70 bg-card/40 hover:bg-card text-foreground font-medium flex items-center gap-1 transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                disabled
                className="px-3 py-1.5 rounded-lg border border-border/40 text-muted-foreground/40 cursor-not-allowed flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
