'use client';

import { useState, useEffect } from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';

interface BreathingCircleProps {
  isInhalePhase: boolean | undefined;
}

export default function BreathingCircle({ isInhalePhase }: BreathingCircleProps) {
  const { translate } = useLocalization();
  const [showInhale, setShowInhale] = useState(true);

  // Texts for inhale and exhale
  const inhaleText = translate('breathInShort');
  const exhaleText = translate('breathOutShort');

  // Animation class based on phase
  const animationClass = isInhalePhase
    ? 'breathing-pacer-animate-inhale'
    : 'breathing-pacer-animate-exhale';

  // Toggle text every 2 seconds to match animation
  useEffect(() => {
    // Set initial state based on current phase
    setShowInhale(isInhalePhase === true);

    // Create interval to toggle text
    const interval = setInterval(() => {
      setShowInhale(prev => !prev);
    }, 2000); // 2 seconds per phase (4 seconds total cycle)

    return () => clearInterval(interval);
  }, [isInhalePhase]);

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      <div
        className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out bg-primary ${animationClass} opacity-30`}
      />
      <div
        className={`absolute inset-4 rounded-full transition-all duration-1000 ease-in-out bg-primary ${animationClass} opacity-60`}
      />
      <div
        className={`absolute inset-8 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out bg-primary ${animationClass}`}
      >
        <span className="text-2xl font-semibold text-primary-foreground text-center px-2">
          {showInhale ? inhaleText : exhaleText}
        </span>
      </div>
    </div>
  );
}
