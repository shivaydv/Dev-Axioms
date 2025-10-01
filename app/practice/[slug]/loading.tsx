import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-background flex h-screen w-full flex-col">
      {/* Header Skeleton */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-80 space-y-4 border-r p-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
          </div>
          <div className="flex border-b">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        {/* Editor Area Skeleton */}
        <div className="flex-1 space-y-4 p-4">
          <div className="flex items-center gap-2 border-b pb-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-6" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  );
}
