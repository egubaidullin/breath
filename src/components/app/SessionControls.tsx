'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import type { BreathingPhase } from '@/types';
import { Play, Pause, SkipForward, XCircle } from 'lucide-react';

interface SessionControlsProps {
  phase: BreathingPhase;
  onStopHoldTimer: () => void; 
  onCancelSession?: () => void;
}

const SessionControls = ({
  phase,
  onStopHoldTimer,
  onCancelSession,
}: SessionControlsProps) => {
  const { translate } = useLocalization();

  const showCancelButton = phase === 'breathing' || phase === 'holding' || phase === 'recovery';

  // If no buttons are relevant for the current phase, render nothing or a placeholder.
  if (phase !== 'holding' && !showCancelButton) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mt-4">
      {phase === 'holding' && (
        <Button onClick={onStopHoldTimer} variant="destructive" size="lg" className="w-full sm:w-auto">
          <Pause className="mr-2 h-5 w-5" />
          {translate('stopTimer')}
        </Button>
      )}
      {showCancelButton && onCancelSession && (
        <Button onClick={onCancelSession} variant="outline" size="lg" className="w-full sm:w-auto">
          <XCircle className="mr-2 h-5 w-5" />
          {translate('stopSession')}
        </Button>
      )}
    </div>
  );
};

export default SessionControls;
