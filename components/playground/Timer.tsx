"use client";

import React from "react";
import { useTimer } from "@/hooks/useTimer";
import { Play, Pause, RotateCcw } from "lucide-react";

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
    if (isFinished) return "text-rose-500 font-semibold";
    if (isRunning) return "text-emerald-500 font-semibold";
    if (timeLeft <= 300) return "text-amber-500 font-semibold";
    return "text-foreground font-medium";
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className={`font-mono text-xs tracking-wider ${getTimerColor()}`}>
        {formattedTime}
      </span>

      <div className="flex items-center gap-0.5 border-l border-border/50 pl-1.5 ml-0.5">
        {!isRunning ? (
          <button
            onClick={startTimer}
            disabled={timeLeft === 0}
            title="Start Timer"
            className="text-muted-foreground hover:text-emerald-500 hover:bg-muted flex h-5 w-5 items-center justify-center rounded-md p-0 transition-colors"
          >
            <Play className="h-3 w-3 fill-current" />
          </button>
        ) : (
          <button
            onClick={stopTimer}
            title="Pause Timer"
            className="text-muted-foreground hover:text-amber-500 hover:bg-muted flex h-5 w-5 items-center justify-center rounded-md p-0 transition-colors"
          >
            <Pause className="h-3 w-3 fill-current" />
          </button>
        )}

        <button
          onClick={resetTimer}
          title="Reset Timer"
          className="text-muted-foreground hover:text-rose-500 hover:bg-muted flex h-5 w-5 items-center justify-center rounded-md p-0 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
