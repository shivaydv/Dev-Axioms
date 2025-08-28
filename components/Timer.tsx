'use client';

import React from 'react';
import { useTimer } from '@/hooks/useTimer';
import { Play, Square, RotateCcw } from 'lucide-react';

interface TimerProps {
  timeLimit: number; // in minutes
  onTimeUp?: () => void;
  className?: string;
}

export function Timer({ timeLimit, onTimeUp, className = '' }: TimerProps) {
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
    if (isFinished) return 'text-red-500';
    if (timeLeft <= 300) return 'text-orange-500';
    return 'text-[var(--playground-text-muted)]';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className={`text-sm font-mono ${getTimerColor()}`}>
        {formattedTime}
      </span>

      {!isRunning ? (
        <button
          onClick={startTimer}
          disabled={timeLeft === 0}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-green-600 hover:bg-muted transition-all rounded-md flex justify-center items-center"
        >
          <Play className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={stopTimer}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600 hover:bg-muted transition-all rounded-md flex justify-center items-center"
        >
          <Square className="w-4 h-4" />
        </button>
      )}

      <button
        onClick={resetTimer}
        className="h-8 w-8 p-0 text-muted-foreground  hover:text-red-500 hover:bg-muted transition-all rounded-md flex justify-center items-center"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
}
