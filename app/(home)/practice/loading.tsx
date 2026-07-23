import { Skeleton } from "@/components/ui/skeleton";

export default function PracticeLoading() {
  return (
    <div className="bg-background min-h-screen pb-20 pt-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>

        {/* Search & Filter Bar Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-3 rounded-2xl border border-border/70 shadow-sm">
          <Skeleton className="h-9 w-full sm:max-w-md rounded-xl" />
          <div className="flex items-center gap-1.5 bg-background/80 p-1 rounded-xl border border-border/60 w-full sm:w-auto justify-center">
            <Skeleton className="h-7 w-12 rounded-lg" />
            <Skeleton className="h-7 w-14 rounded-lg" />
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-7 w-14 rounded-lg" />
          </div>
        </div>

        {/* Results Counter Skeleton */}
        <div className="flex items-center justify-between px-1">
          <Skeleton className="h-4 w-44 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>

        {/* Question Cards Skeleton Rows */}
        <div className="grid grid-cols-1 gap-2.5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/70 bg-card/40 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-2.5 w-full">
                <Skeleton className="h-5 w-3/4 sm:w-1/2 rounded-md" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-14 rounded-md" />
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-5 w-16 rounded-md shrink-0 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
