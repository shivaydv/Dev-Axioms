import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LoadingTable() {
  return (
    <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs overflow-hidden select-none animate-pulse">
      <CardHeader className="space-y-4 pb-4 border-b border-border/40 px-6 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36 rounded-md bg-muted/60" />
        </div>

        {/* Filter skeletons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-9 flex-1 rounded-lg bg-muted/50" />
          <Skeleton className="h-9 w-full sm:w-[130px] rounded-lg bg-muted/50" />
          <Skeleton className="h-9 w-full sm:w-[140px] rounded-lg bg-muted/50" />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border/40">
              <TableHead className="h-11"><Skeleton className="h-4 w-20 bg-muted/60" /></TableHead>
              <TableHead className="h-11"><Skeleton className="h-4 w-16 bg-muted/60" /></TableHead>
              <TableHead className="h-11"><Skeleton className="h-4 w-16 bg-muted/60" /></TableHead>
              <TableHead className="h-11"><Skeleton className="h-4 w-20 bg-muted/60" /></TableHead>
              <TableHead className="h-11 text-right"><Skeleton className="h-4 w-16 bg-muted/60 ml-auto" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-border/40">
                <TableCell className="py-3.5">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-48 bg-muted/60" />
                    <Skeleton className="h-3 w-32 bg-muted/40" />
                  </div>
                </TableCell>
                <TableCell className="py-3.5">
                  <Skeleton className="h-5 w-16 rounded-md bg-muted/50" />
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-12 rounded-md bg-muted/40" />
                    <Skeleton className="h-5 w-14 rounded-md bg-muted/40" />
                  </div>
                </TableCell>
                <TableCell className="py-3.5">
                  <Skeleton className="h-4 w-24 bg-muted/40" />
                </TableCell>
                <TableCell className="py-3.5 text-right">
                  <div className="flex justify-end gap-1.5">
                    <Skeleton className="h-7 w-7 rounded-md bg-muted/50" />
                    <Skeleton className="h-7 w-7 rounded-md bg-muted/50" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
