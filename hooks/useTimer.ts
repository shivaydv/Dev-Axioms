import { useState, useEffect, useRef, useCallback } from "react";

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  isFinished: boolean;
}

export function useTimer(initialTime: number = 30) {
  const [timeLeft, setTimeLeft] = useState(initialTime * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
      setIsFinished(false);
    }
  }, [timeLeft]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime * 60);
    setIsRunning(false);
    setIsFinished(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialTime]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setIsFinished(true);
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    timeLeft,
    isRunning,
    isFinished,
    formattedTime: formatTime(timeLeft),
    startTimer,
    pauseTimer,
    resetTimer,
    stopTimer,
  };
}
