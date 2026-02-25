"use client";

import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserInteractions } from "@/hooks/useUserInteractions";

interface SidebarInteractionsLoaderProps {
  questionId: string;
  onShare: () => void;
}

export function SidebarInteractionsLoader({
  questionId,
  onShare,
}: SidebarInteractionsLoaderProps) {
  const { likesCount, isLiked, isBookmarked, handleLike, handleBookmark } =
    useUserInteractions({
      questionId,
      initialLikesCount: 0,
      initialIsLiked: false,
      initialIsBookmarked: false,
    });

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleLike}
        className={cn(
          "group h-9 rounded-lg border px-3 transition-all duration-200",
          "hover:shadow-sm",
          isLiked
            ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
            : "border-border bg-background hover:bg-accent hover:text-accent-foreground",
        )}
        title={isLiked ? "Unlike question" : "Like question"}
      >
        <div className="flex items-center gap-1.5">
          <Heart
            className={cn(
              "h-4 w-4 transition-all duration-200",
              isLiked ? "scale-110 fill-current" : "group-hover:scale-110",
            )}
          />
          {likesCount > 0 && (
            <span className="text-xs font-semibold">
              {likesCount > 99 ? "99+" : likesCount}
            </span>
          )}
        </div>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleBookmark}
        className={cn(
          "group h-9 w-9 rounded-lg border transition-all duration-200",
          "hover:scale-105 hover:shadow-sm",
          isBookmarked
            ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900"
            : "border-border bg-background hover:bg-accent hover:text-accent-foreground",
        )}
        title={isBookmarked ? "Remove bookmark" : "Bookmark question"}
      >
        <Bookmark
          className={cn(
            "h-4 w-4 transition-all duration-200",
            isBookmarked ? "scale-110 fill-current" : "group-hover:scale-110",
          )}
        />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onShare}
        className="group border-border bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-sm"
        title="Share question"
      >
        <Share2 className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      </Button>
    </div>
  );
}
