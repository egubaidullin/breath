'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import type { BreathingPhase } from '@/types';
import BreathingCircle from './BreathingCircle';

interface BreathingPacerProps {
  phase: BreathingPhase;
  currentBreath?: number;
  breathsPerRound?: number;
}

const BreathingPacer = ({ phase, currentBreath, breathsPerRound }: BreathingPacerProps) => {
  const { translate } = useLocalization();

  let phaseText = '';
  let showPacer = false;
  let pacerClass = 'bg-primary';

  // Calculate the actual breath number (1-based)
  const actualBreathNumber = currentBreath ? Math.ceil(currentBreath / 2) : 0;

  // Determine if we're in an inhale phase based on the currentBreath
  const isInhalePhase = currentBreath && currentBreath % 2 !== 0;

  // Get the translated text for inhale and exhale
  const inhaleText = translate('breathInShort');
  const exhaleText = translate('breathOutShort');
  const holdText = translate('holdBreath');
  const recoveryText = translate('recoveryBreath');

  switch (phase) {
    case 'breathing':
      // Устанавливаем текст фазы в зависимости от того, вдох или выдох
      phaseText = isInhalePhase
        ? translate('breathIn')
        : translate('breathOut');

      // Добавляем счетчик дыханий
      phaseText += ` (${actualBreathNumber}/${breathsPerRound})`;

      showPacer = true;
      // Добавляем уникальный класс для анимации в зависимости от фазы вдоха/выдоха
      pacerClass = isInhalePhase
        ? 'bg-primary breathing-pacer-animate-inhale'
        : 'bg-primary breathing-pacer-animate-exhale';
      break;
    case 'holding':
      phaseText = translate('holdBreath');
      showPacer = true;
      pacerClass = 'bg-accent'; // Teal for hold
      break;
    case 'recovery':
      phaseText = translate('recoveryBreath');
      showPacer = true;
      pacerClass = 'bg-yellow-500'; // Different color for recovery
      break;
    default:
      showPacer = false;
  }

  return (
    <div className="flex flex-col items-center justify-center my-8 space-y-4">
      {showPacer && (
        <>
          {phase === 'breathing' ? (
            <BreathingCircle isInhalePhase={isInhalePhase} />
          ) : (
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
                <span className="text-2xl font-semibold text-primary-foreground text-center px-2">
                  {phase === 'holding' ? holdText : recoveryText}
                </span>
              </div>
            </div>
          )}
        </>
      )}
      <p className="text-xl font-medium text-center text-foreground mt-4 min-h-[28px]">
        {phaseText}
      </p>
    </div>
  );
};

export default BreathingPacer;
