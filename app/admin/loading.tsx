import { LoadingTable } from "@/components/admin-dashboard/loading-table";

export default function AdminLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 select-none animate-pulse">
      <div className="h-8 w-48 bg-muted/60 rounded-lg" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-muted/40 border border-border/40" />
        ))}
      </div>
      <LoadingTable />
    </div>
  );
}
