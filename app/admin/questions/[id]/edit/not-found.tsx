import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FileQuestion className="text-muted-foreground mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-bold">Question Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The question you're looking for doesn't exist or may have been
            deleted.
          </p>
          <Button asChild>
            <Link href="/admin/questions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
