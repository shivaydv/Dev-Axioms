"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />
        <h2 className="mb-2 text-lg font-semibold">Something went wrong!</h2>
        <p className="text-muted-foreground mb-4 text-center">
          Failed to load questions. Please try again.
        </p>
        <div className="text-muted-foreground mb-4 font-mono text-xs">
          {error.message}
        </div>
        <Button onClick={reset} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
