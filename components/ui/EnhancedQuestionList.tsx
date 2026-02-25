"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Clock, Calendar, Filter } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useUserInteractions } from "@/hooks/useUserInteractions";

interface QuestionWithStats {
  id: string;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  timeLimit: number;
  createdAt: Date;
  likesCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

interface InteractiveQuestionCardProps {
  question: QuestionWithStats;
}

function InteractiveQuestionCard({ question }: InteractiveQuestionCardProps) {
  const { likesCount, isLiked, isBookmarked, handleLike, handleBookmark } =
    useUserInteractions({
      questionId: question.id,
      initialLikesCount: question.likesCount || 0,
      initialIsLiked: question.isLiked || false,
      initialIsBookmarked: question.isBookmarked || false,
    });

  return (
    <Card className="group transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <CardTitle className="group-hover:text-primary mb-3 line-clamp-2 text-lg transition-colors">
              {question.title}
            </CardTitle>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={`${difficultyColors[question.difficulty]} text-xs`}
              >
                {question.difficulty}
              </Badge>
              {question.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {question.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{question.tags.length - 3} more
                </Badge>
              )}
            </div>
            <div className="text-muted-foreground flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{question.timeLimit}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(question.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="ml-2 flex flex-shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-8 w-8 p-0 transition-all",
                isLiked && "text-red-500 hover:text-red-600",
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </Button>
            {likesCount > 0 && (
              <span className="text-muted-foreground min-w-[20px] text-xs">
                {likesCount}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={cn(
                "h-8 w-8 p-0 transition-all",
                isBookmarked && "text-blue-500 hover:text-blue-600",
              )}
            >
              <Bookmark
                className={cn("h-4 w-4", isBookmarked && "fill-current")}
              />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link href={`/practice/${question.slug}`}>Start Practicing</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

interface EnhancedQuestionListProps {
  questions: QuestionWithStats[];
  title?: string;
  description?: string;
  allowFiltering?: boolean;
}

export function EnhancedQuestionList({
  questions,
  title = "Questions",
  description,
  allowFiltering = true,
}: EnhancedQuestionListProps) {
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    let filtered = [...questions];

    // Apply difficulty filter
    if (difficultyFilter !== "All") {
      filtered = filtered.filter((q) => q.difficulty === difficultyFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "difficulty":
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        filtered.sort(
          (a, b) =>
            difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
        );
        break;
      case "popular":
        filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredQuestions(filtered);
  }, [questions, difficultyFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        {allowFiltering && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {difficultyFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
                  <DropdownMenuItem
                    key={difficulty}
                    onClick={() => setDifficultyFilter(difficulty)}
                  >
                    {difficulty}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("difficulty")}>
                  Difficulty
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("popular")}>
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("title")}>
                  Title A-Z
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="text-muted-foreground text-sm">
        Showing {filteredQuestions.length} of {questions.length} questions
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuestions.map((question) => (
          <InteractiveQuestionCard key={question.id} question={question} />
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <Card className="py-12 text-center">
          <CardContent>
            <div className="text-muted-foreground mb-4">
              No questions found matching your filters.
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setDifficultyFilter("All");
                setSortBy("newest");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
