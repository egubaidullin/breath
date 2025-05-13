'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import type { BreathingPhase } from '@/types';
import { Play, Pause, SkipForward } from 'lucide-react';

interface SessionControlsProps {
  phase: BreathingPhase;
  onStartHold: () => void; // Called after breathing rounds, to signal user is ready to hold
  onStopHoldTimer: () => void; // User stops the hold timer
  onNextRound?: () => void; // To manually advance recovery, if needed.
  isLastRound?: boolean;
}

const SessionControls = ({
  phase,
  onStartHold,
  onStopHoldTimer,
}: SessionControlsProps) => {
  const { translate } = useLocalization();

  if (phase === 'breathing') {
    // Button to signal end of breathing and start hold.
    // Usually this is automatic, but could be a manual trigger.
    // For Wim Hof, it's typically automatic after last exhale.
    // This button could be "Ready to Hold" if we want manual advance.
    // For simplicity, we'll assume automatic transition after breathing phase.
    return null; 
  }

  if (phase === 'holding') {
    return (
      <Button onClick={onStopHoldTimer} variant="destructive" size="lg" className="w-full md:w-auto">
        <Pause className="mr-2 h-5 w-5" />
        {translate('stopTimer')}
      </Button>
    );
  }
  
  // No specific controls needed for 'recovery' or 'finished' typically from this component
  // as they are timed or lead to a summary screen.

  return null;
};

export default SessionControls;
