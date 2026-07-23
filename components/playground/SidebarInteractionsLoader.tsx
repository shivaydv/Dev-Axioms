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
  const initialData = use(interactionDataPromise);

  const { likesCount, isLiked, isBookmarked, handleLike, handleBookmark } =
    useUserInteractions({
      questionId,
      initialLikesCount: initialData.likesCount,
      initialIsLiked: initialData.isLiked,
      initialIsBookmarked: initialData.isBookmarked,
    });

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={cn(
          "h-6 rounded-md px-2 text-xs transition-colors",
          isLiked
            ? "text-rose-500 bg-rose-500/10 hover:bg-rose-500/20"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
        title={isLiked ? "Unlike question" : "Like question"}
      >
        <div className="flex items-center gap-1">
          <Heart
            className={cn(
              "h-3 w-3 transition-colors",
              isLiked && "fill-current"
            )}
          />
          {likesCount > 0 && (
            <span className="text-[10px] font-semibold">
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
          "h-6 w-6 rounded-md transition-colors",
          isBookmarked
            ? "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
        title={isBookmarked ? "Remove bookmark" : "Bookmark question"}
      >
        <Bookmark
          className={cn(
            "h-3 w-3 transition-colors",
            isBookmarked && "fill-current"
          )}
        />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onShare}
        className="h-6 w-6 rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="Share question"
      >
        <Share2 className="h-3 w-3" />
      </Button>
    </div>
  );
}
