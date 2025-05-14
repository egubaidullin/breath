'use client';

import { useEffect, useState } from 'react';

interface BreathingTextProps {
  inhaleText: string;
  exhaleText: string;
  duration?: number; // in seconds
}

/**
 * A component that alternates between inhale and exhale text
 * using CSS animations and React state
 */
export default function BreathingText({ 
  inhaleText, 
  exhaleText, 
  duration = 4 
}: BreathingTextProps) {
  const [isInhaling, setIsInhaling] = useState(true);
  
  // Toggle between inhale and exhale every half duration
  useEffect(() => {
    const interval = setInterval(() => {
      setIsInhaling(prev => !prev);
    }, (duration * 1000) / 2);
    
    return () => clearInterval(interval);
  }, [duration]);
  
  return (
    <div className="text-2xl font-semibold text-primary-foreground text-center px-2">
      {isInhaling ? inhaleText : exhaleText}
    </div>
  );
}
