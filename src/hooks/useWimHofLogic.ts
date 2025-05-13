'use client';

import { useState, useCallback, useEffect } from 'react';
import type { SessionState, BreathingPhase } from '@/types';
import useTimer from './useTimer';

const BREATHS_PER_ROUND = 30;
const RECOVERY_HOLD_DURATION = 15; // seconds

interface WimHofLogicProps {
  initialTotalRounds?: number;
  onSessionComplete?: (holdDurations: number[]) => void;
}

export function useWimHofLogic({ initialTotalRounds = 3, onSessionComplete }: WimHofLogicProps) {
  const [sessionState, setSessionState] = useState<SessionState>({
    phase: 'idle',
    currentRound: 0,
    totalRounds: initialTotalRounds,
    currentBreath: 0,
    breathsPerRound: BREATHS_PER_ROUND,
    holdTime: 0,
    recoveryTime: 0,
    currentSessionRecords: { holdDurations: [] },
  });

  const { 
    time: breathCycleTime, 
    start: startBreathCycleTimer, 
    stop: stopBreathCycleTimer, 
    reset: resetBreathCycleTimer 
  } = useTimer(2, { // Approx 2s per breath part (inhale/exhale)
    onEnd: () => {
      if (sessionState.phase === 'breathing') {
        handleNextBreath();
      }
    }
  });

  const { 
    time: holdTimerTime, 
    start: startHoldTimer, 
    stop: stopHoldTimer, 
    reset: resetHoldTimer 
  } = useTimer(undefined, { // Count-up timer
    onTick: (t) => setSessionState(prev => ({ ...prev, holdTime: t }))
  });

  const { 
    time: recoveryTimerTime, 
    start: startRecoveryTimer, 
    stop: stopRecoveryTimer, 
    reset: resetRecoveryTimer 
  } = useTimer(RECOVERY_HOLD_DURATION, { // Countdown timer
    initialTime: RECOVERY_HOLD_DURATION,
    onTick: (t) => setSessionState(prev => ({ ...prev, recoveryTime: t})),
    onEnd: () => {
      handleEndRecovery();
    }
  });

  const startSession = useCallback((rounds: number) => {
    setSessionState({
      phase: 'breathing',
      currentRound: 1,
      totalRounds: rounds,
      currentBreath: 1,
      breathsPerRound: BREATHS_PER_ROUND,
      holdTime: 0,
      recoveryTime: RECOVERY_HOLD_DURATION,
      currentSessionRecords: { holdDurations: [] },
    });
    resetBreathCycleTimer(2); // reset with initial time for breath cycle
    startBreathCycleTimer();
  }, [resetBreathCycleTimer, startBreathCycleTimer]);

  const handleNextBreath = () => {
    setSessionState(prev => {
      if (prev.currentBreath < prev.breathsPerRound) {
        resetBreathCycleTimer(2);
        startBreathCycleTimer();
        return { ...prev, currentBreath: prev.currentBreath + 1 };
      } else {
        // Last breath of the round, transition to hold
        stopBreathCycleTimer();
        resetHoldTimer(0); // Reset hold timer to 0
        startHoldTimer();
        return { ...prev, phase: 'holding', holdTime: 0 };
      }
    });
  };
  
  const userStopHold = useCallback(() => {
    stopHoldTimer();
    setSessionState(prev => {
      const newHoldDurations = [...prev.currentSessionRecords.holdDurations, prev.holdTime];
      // Transition to recovery
      resetRecoveryTimer(RECOVERY_HOLD_DURATION);
      startRecoveryTimer();
      return {
        ...prev,
        phase: 'recovery',
        recoveryTime: RECOVERY_HOLD_DURATION,
        currentSessionRecords: { holdDurations: newHoldDurations }
      };
    });
  }, [stopHoldTimer, resetRecoveryTimer, startRecoveryTimer]);

  const handleEndRecovery = () => {
    stopRecoveryTimer();
    setSessionState(prev => {
      if (prev.currentRound < prev.totalRounds) {
        // Next round
        resetBreathCycleTimer(2);
        startBreathCycleTimer();
        return {
          ...prev,
          phase: 'breathing',
          currentRound: prev.currentRound + 1,
          currentBreath: 1,
          holdTime: 0, // Reset for next hold
        };
      } else {
        // Session finished
        onSessionComplete?.(prev.currentSessionRecords.holdDurations);
        return { ...prev, phase: 'finished' };
      }
    });
  };

  const resetSession = useCallback(() => {
    stopBreathCycleTimer();
    stopHoldTimer();
    stopRecoveryTimer();
    setSessionState({
      phase: 'idle',
      currentRound: 0,
      totalRounds: initialTotalRounds,
      currentBreath: 0,
      breathsPerRound: BREATHS_PER_ROUND,
      holdTime: 0,
      recoveryTime: 0,
      currentSessionRecords: { holdDurations: [] },
    });
  }, [initialTotalRounds, stopBreathCycleTimer, stopHoldTimer, stopRecoveryTimer]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      stopBreathCycleTimer();
      stopHoldTimer();
      stopRecoveryTimer();
    };
  }, [stopBreathCycleTimer, stopHoldTimer, stopRecoveryTimer]);

  return { sessionState, startSession, userStopHold, resetSession };
}
