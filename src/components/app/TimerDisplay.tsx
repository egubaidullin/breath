'use client';

interface TimerDisplayProps {
  timeInSeconds: number;
  className?: string;
}

const TimerDisplay = ({ timeInSeconds, className }: TimerDisplayProps) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return (
    <div className={className}>
      <span className="tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default TimerDisplay;
