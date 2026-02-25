import { getUserBookmarkedQuestions } from "@/server/actions/user-interactions-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarked Questions",
  description:
    "Access your saved questions and continue practicing them later.",
};

export default async function BookmarkedQuestionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const bookmarkedQuestions = await getUserBookmarkedQuestions();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Bookmarked Questions</h1>
        <p className="text-muted-foreground">
          Questions you&apos;ve saved for later - {bookmarkedQuestions.length}{" "}
          total
        </p>
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent>
            <Bookmark className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <CardTitle className="mb-2">No Bookmarked Questions Yet</CardTitle>
            <CardDescription className="mb-4">
              Start exploring questions and bookmark the ones you want to
              practice later!
            </CardDescription>
            <Button asChild>
              <Link href="/practice">Browse Questions</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarkedQuestions.map((question) => (
            <Card
              key={question.id}
              className="transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2 line-clamp-2 text-lg">
                      {question.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`${difficultyColors[question.difficulty]} text-xs`}
                      >
                        {question.difficulty}
                      </Badge>
                      {question.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {question.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{question.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Bookmark className="h-5 w-5 flex-shrink-0 fill-blue-500 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground mb-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Bookmarked{" "}
                      {new Date(question.bookmarkedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/practice/${question.slug}`}>
                    Start Practicing
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
