"use client";

import { useState, useEffect } from "react";
import {
  toggleLike,
  toggleBookmark,
  getUserInteractionData,
} from "@/server/actions/user-interactions-actions";
import { toast } from "sonner";

export interface UseUserInteractionsProps {
  questionId: string;
  initialLikesCount?: number;
  initialIsLiked?: boolean;
  initialIsBookmarked?: boolean;
}

export interface UseUserInteractionsReturn {
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isLoading: boolean;
  handleLike: () => Promise<void>;
  handleBookmark: () => Promise<void>;
}

export function useUserInteractions({
  questionId,
  initialLikesCount = 0,
  initialIsLiked = false,
  initialIsBookmarked = false,
}: UseUserInteractionsProps): UseUserInteractionsReturn {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial data on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await getUserInteractionData(questionId);
        setLikesCount(data.likesCount);
        setIsLiked(data.isLiked);
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error("Error fetching initial interaction data:", error);
      }
    };

    fetchInitialData();
  }, [questionId]);

  const handleLike = async () => {
    // Optimistic update
    const previousState = { likesCount, isLiked };
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    try {
      const result = await toggleLike(questionId);

      if (result.success) {
        // Update with server response (for accuracy)
        setIsLiked(result.isLiked);
        setLikesCount(result.likesCount);
      } else {
        // Revert optimistic update on failure
        setIsLiked(previousState.isLiked);
        setLikesCount(previousState.likesCount);

        if (result.message) {
          toast.error(result.message);
        }
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(previousState.isLiked);
      setLikesCount(previousState.likesCount);
      toast.error("Failed to update like status");
      console.error("Error toggling like:", error);
    }
  };

  const handleBookmark = async () => {
    // Optimistic update
    const previousIsBookmarked = isBookmarked;
    const newIsBookmarked = !isBookmarked;

    setIsBookmarked(newIsBookmarked);

    try {
      const result = await toggleBookmark(questionId);

      if (result.success) {
        // Update with server response (for accuracy)
        setIsBookmarked(result.isBookmarked);
      } else {
        // Revert optimistic update on failure
        setIsBookmarked(previousIsBookmarked);

        if (result.message) {
          toast.error(result.message);
        }
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsBookmarked(previousIsBookmarked);
      toast.error("Failed to update bookmark status");
      console.error("Error toggling bookmark:", error);
    }
  };

  return {
    likesCount,
    isLiked,
    isBookmarked,
    isLoading,
    handleLike,
    handleBookmark,
  };
}
