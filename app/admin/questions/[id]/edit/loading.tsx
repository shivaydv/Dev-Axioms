import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingEditQuestion() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="mb-2 h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 w-64" />
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="space-y-4">
              <div className="flex gap-1">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-6">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
