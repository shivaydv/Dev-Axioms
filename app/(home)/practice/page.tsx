import React, { Suspense } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getQuestionsFiltered } from "@/server/functions/questions";
import { Metadata } from "next";
import { PracticeSearch } from "@/components/practice/PracticeSearch";
import { ChevronLeft, ChevronRight, Code2, ArrowRight } from "lucide-react";

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
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
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

  const { questions, totalCount, totalPages } = await getQuestionsFiltered({
    difficulty: currentDifficulty,
    search: currentSearch,
    page: currentPage,
    limit,
  });

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
    <div className="bg-background min-h-screen pb-20 pt-10 select-none">
      <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-6">
        {/* Minimal Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Practice Arena
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Curated coding challenges for modern developer interviews.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#FF5A26]/10 text-[#FF5A26] border-[#FF5A26]/20 text-xs font-semibold px-3 py-1">
              {totalCount} Total Questions
            </Badge>
          </div>
        </div>

        {/* Server-Synced Search & Filter Bar */}
        <Suspense fallback={<div className="h-16 w-full animate-pulse bg-card/40 rounded-2xl" />}>
          <PracticeSearch
            currentDifficulty={currentDifficulty}
            currentSearch={currentSearch}
            currentPage={currentPage}
          />
        </Suspense>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            Showing <strong className="text-foreground">{questions.length}</strong> of{" "}
            <strong className="text-foreground">{totalCount}</strong> question{totalCount !== 1 ? "s" : ""}
            {currentDifficulty !== "All" && ` • ${currentDifficulty}`}
            {currentSearch && ` • Search: "${currentSearch}"`}
          </span>

          {(currentDifficulty !== "All" || currentSearch) && (
            <Link href="/practice" className="text-[#FF5A26] hover:underline font-semibold">
              Reset Filters
            </Link>
          )}
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <div className="bg-card/30 rounded-xl border border-border/60 p-12 text-center shadow-xs">
            <Code2 className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">No questions found</h3>
            <p className="text-xs text-muted-foreground mb-4 max-w-xs mx-auto">
              No practice questions matched your filter or search query.
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A26] text-white text-xs font-semibold hover:bg-[#FF5A26]/90 transition-all shadow-xs"
            >
              View All Questions
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-border/60 bg-card/30 overflow-hidden divide-y divide-border/40 shadow-xs">
            {questions.map((question) => (
              <Link
                href={`/practice/${question.slug}`}
                key={question.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-card/70 transition-colors"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  {/* Title First for Perfect Left Alignment */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-foreground group-hover:text-[#FF5A26] transition-colors truncate">
                      {question.title}
                    </span>

                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-md px-1.5 py-0 text-[10px] font-semibold uppercase tracking-wider border shrink-0",
                        difficultyVariants[question.difficulty],
                      )}
                    >
                      {question.difficulty}
                    </Badge>
                  </div>

                  {question.tags && question.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {question.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/30">
                  <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-[#FF5A26] transition-colors">
                    <span>Solve</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Server-Side Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-border/60 text-xs">
            {currentPage > 1 ? (
              <Link
                href={getPaginationUrl(currentPage - 1)}
                className="px-3 py-1.5 rounded-lg border border-border/60 bg-card/40 hover:bg-card text-foreground font-medium flex items-center gap-1 transition-all"
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

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={getPaginationUrl(p)}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-medium transition-all text-xs",
                    p === currentPage
                      ? "bg-[#FF5A26] text-white font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {p}
                </Link>
              ))}
            </div>

            {currentPage < totalPages ? (
              <Link
                href={getPaginationUrl(currentPage + 1)}
                className="px-3 py-1.5 rounded-lg border border-border/60 bg-card/40 hover:bg-card text-foreground font-medium flex items-center gap-1 transition-all"
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
