"use client";

import React from "react";
import { useTimer } from "@/hooks/useTimer";
import { Play, Square, RotateCcw } from "lucide-react";

interface TimerProps {
  timeLimit: number; // in minutes
  onTimeUp?: () => void;
  className?: string;
}

export function Timer({ timeLimit, onTimeUp, className = "" }: TimerProps) {
  const {
    timeLeft,
    isRunning,
    isFinished,
    formattedTime,
    startTimer,
    resetTimer,
    stopTimer,
  } = useTimer(timeLimit);

  React.useEffect(() => {
    if (isFinished && onTimeUp) {
      onTimeUp();
    }
  }, [isFinished, onTimeUp]);

  const getTimerColor = () => {
    if (isFinished) return "text-red-500";
    if (isRunning) return "text-green-500";
    if (timeLeft <= 300) return "text-orange-500";
    return "text-[var(--playground-text-muted)]";
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className={`font-mono text-sm ${getTimerColor()}`}>
        {formattedTime}
      </span>

      {!isRunning ? (
        <button
          onClick={startTimer}
          disabled={timeLeft === 0}
          title="Start Timer"
          className="text-muted-foreground hover:bg-muted flex h-8 w-8 items-center justify-center rounded-md p-0 transition-all hover:text-green-600"
        >
          <Play className="h-4 w-4" />
        </button>
      ) : (
        <button
          onClick={stopTimer}
          title="Stop Timer"
          className="text-muted-foreground hover:bg-muted flex h-8 w-8 items-center justify-center rounded-md p-0 transition-all hover:text-red-600"
        >
          <Square className="h-4 w-4" />
        </button>
      )}

      <button
        onClick={resetTimer}
        title="Reset Timer"
        className="text-muted-foreground hover:bg-muted flex h-8 w-8 items-center justify-center rounded-md p-0 transition-all hover:text-red-500"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  );
}
