"use client";

import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserInteractions } from "@/hooks/useUserInteractions";
import { use } from "react";

interface SidebarInteractionsLoaderProps {
  questionId: string;
  onShare: () => void;
  interactionDataPromise: Promise<{
    likesCount: number;
    isLiked: boolean;
    isBookmarked: boolean;
  }>;
}

export function SidebarInteractionsLoader({
  questionId,
  onShare,
  interactionDataPromise,
}: SidebarInteractionsLoaderProps) {
  // Use use() to consume the promise, which will trigger Suspense if not resolved
  const initialData = use(interactionDataPromise);

  const { likesCount, isLiked, isBookmarked, handleLike, handleBookmark } =
    useUserInteractions({
      questionId,
      initialLikesCount: initialData.likesCount,
      initialIsLiked: initialData.isLiked,
      initialIsBookmarked: initialData.isBookmarked,
    });

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={cn(
          "h-8 rounded-md px-2.5 transition-colors",
          isLiked
            ? "text-red-500 hover:bg-red-500/10 hover:text-red-600"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
        title={isLiked ? "Unlike question" : "Like question"}
      >
        <div className="flex items-center gap-1.5">
          <Heart
            className={cn(
              "h-3.5 w-3.5 transition-colors",
              isLiked && "fill-current"
            )}
          />
          {likesCount > 0 && (
            <span className="text-[11px] font-medium">
              {likesCount > 99 ? "99+" : likesCount}
            </span>
          )}
        </div>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleBookmark}
        className={cn(
          "h-8 w-8 rounded-md transition-colors",
          isBookmarked
            ? "text-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
        title={isBookmarked ? "Remove bookmark" : "Bookmark question"}
      >
        <Bookmark
          className={cn(
            "h-3.5 w-3.5 transition-colors",
            isBookmarked && "fill-current"
          )}
        />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onShare}
        className="h-8 w-8 rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="Share question"
      >
        <Share2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
