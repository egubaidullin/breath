'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerOptions {
  onTick?: (currentTime: number) => void;
  onEnd?: () => void;
  autoStart?: boolean;
  initialTime?: number; // For countdown
}

function useTimer(duration?: number, options?: TimerOptions) {
  const [time, setTime] = useState(options?.initialTime ?? 0);
  const [isActive, setIsActive] = useState(options?.autoStart ?? false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback((newInitialTime?: number) => {
    stop();
    setTime(newInitialTime ?? options?.initialTime ?? 0);
  }, [stop, options?.initialTime]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = duration !== undefined ? prevTime -1 : prevTime + 1; // Countdown or count-up
          
          options?.onTick?.(newTime);

          if (duration !== undefined && newTime <= 0) { // Countdown finished
            stop();
            options?.onEnd?.();
            return 0;
          }
          return newTime;
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
  }, [isActive, duration, options, stop]);

  return { time, start, stop, reset, isActive };
}

export default useTimer;
