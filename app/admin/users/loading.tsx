import { LoadingTable } from "@/components/admin-dashboard/loading-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none animate-pulse">
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56 bg-muted/60 rounded-lg" />
          <Skeleton className="h-4 w-80 bg-muted/40 rounded-md" />
        </div>
      </div>
      <LoadingTable />
    </div>
  );
}
