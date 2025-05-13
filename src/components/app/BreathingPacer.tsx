'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import type { BreathingPhase } from '@/types';

interface BreathingPacerProps {
  phase: BreathingPhase;
  currentBreath?: number;
  breathsPerRound?: number;
}

const BreathingPacer = ({ phase, currentBreath, breathsPerRound }: BreathingPacerProps) => {
  const { translate } = useLocalization();
  let text = '';
  let showPacer = false;
  let pacerClass = 'bg-primary';

  switch (phase) {
    case 'breathing':
      text = `${translate('breathe')} (${currentBreath}/${breathsPerRound})`;
      showPacer = true;
      pacerClass = 'bg-primary breathing-pacer-animate'; // uses animation from globals.css
      break;
    case 'holding':
      text = translate('holdBreath');
      showPacer = true;
      pacerClass = 'bg-accent'; // Teal for hold
      break;
    case 'recovery':
      text = translate('recoveryBreath');
      showPacer = true;
      pacerClass = 'bg-yellow-500'; // Different color for recovery
      break;
    default:
      showPacer = false;
  }

  return (
    <div className="flex flex-col items-center justify-center my-8 space-y-4">
      {showPacer && (
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${pacerClass} opacity-30`}
          />
          <div
            className={`absolute inset-4 rounded-full transition-all duration-1000 ease-in-out ${pacerClass} opacity-60`}
          />
          <div
             className={`absolute inset-8 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out ${pacerClass}`}
          >
            <span className="text-2xl font-semibold text-primary-foreground">
              {phase === 'breathing' ? (currentBreath && currentBreath % 2 !== 0 ? translate('breathIn') : translate('breathOut')) : ''}
            </span>
          </div>
        </div>
      )}
      <p className="text-xl font-medium text-center text-foreground mt-4 min-h-[28px]">
        {text}
      </p>
    </div>
  );
};

export default BreathingPacer;
