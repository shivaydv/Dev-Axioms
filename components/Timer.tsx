'use client';

import React from 'react';
import { useTimer } from '@/hooks/useTimer';
import { Button } from '@/components/ui/button';
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
        <Button
          onClick={startTimer}
          disabled={timeLeft === 0}
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-[var(--playground-text-muted)] hover:text-green-600 hover:bg-green-50"
        >
          <Play className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          onClick={stopTimer}
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-[var(--playground-text-muted)] hover:text-red-600 hover:bg-red-50"
        >
          <Square className="w-4 h-4" />
        </Button>
      )}

      <Button
        onClick={resetTimer}
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0 text-[var(--playground-text-muted)] hover:text-[var(--playground-text)] hover:bg-[var(--playground-accent)]"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
}
