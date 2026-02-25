"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getPopularQuestions } from "@/server/actions/user-interactions-actions";

interface PopularQuestion {
  id: string;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  createdAt: Date;
  likesCount: number;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

interface PopularQuestionsProps {
  limit?: number;
  showHeader?: boolean;
}

export function PopularQuestions({
  limit = 10,
  showHeader = true,
}: PopularQuestionsProps) {
  const [questions, setQuestions] = useState<PopularQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularQuestions = async () => {
      try {
        const popularQuestions = await getPopularQuestions(limit);
        setQuestions(popularQuestions);
      } catch (error) {
        console.error("Error fetching popular questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularQuestions();
  }, [limit]);

  if (loading) {
    return (
      <div className="space-y-4">
        {showHeader && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Popular Questions</h2>
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="bg-muted h-6 w-3/4 rounded"></div>
                <div className="bg-muted h-4 w-1/2 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted h-10 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Popular Questions</h2>
          <Badge variant="secondary" className="ml-auto">
            Most Liked
          </Badge>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {questions.map((question, index) => (
          <Card key={question.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    {index < 3 && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          index === 0
                            ? "border-yellow-400 text-yellow-600"
                            : index === 1
                              ? "border-gray-400 text-gray-600"
                              : "border-orange-400 text-orange-600"
                        }`}
                      >
                        #{index + 1}
                      </Badge>
                    )}
                  </div>
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
                        +{question.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{question.likesCount}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={`/practice/${question.slug}`}>
                  Start Practicing
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {questions.length === 0 && (
        <Card className="py-8 text-center">
          <CardContent>
            <TrendingUp className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <CardTitle className="mb-2">No Popular Questions Yet</CardTitle>
            <CardDescription>
              Questions will appear here as users start liking them.
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
