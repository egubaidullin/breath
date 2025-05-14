'use client';

import { useEffect, useState } from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useWimHofLogic } from '@/hooks/useWimHofLogic';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { UserProgress, SessionRecord } from '@/types';

import BreathingPacer from './BreathingPacer';
import TimerDisplay from './TimerDisplay';
import SessionControls from './SessionControls';
import ConfigurationModal from './ConfigurationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, CheckCircle } from 'lucide-react'; // Removed PlayCircle as it's not used
import Link from 'next/link';

const BreathingSession = () => {
  const { translate } = useLocalization();
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress | null>('breathewise-progress', null);

  const handleSessionComplete = (holdDurations: number[]) => {
    const longestThisSession = Math.max(...holdDurations, 0);
    const newSessionRecord: SessionRecord = {
      id: crypto.randomUUID(), // Use crypto.randomUUID for unique IDs
      date: new Date().toISOString(),
      rounds: sessionState.totalRounds,
      holdDurations: holdDurations,
      longestHold: longestThisSession,
    };

    setUserProgress(prev => {
      const newProgress: UserProgress = prev ? { ...prev } : {
        longestHoldOverall: 0,
        totalSessionsCompleted: 0,
        sessions: [],
      };
      newProgress.sessions.push(newSessionRecord);
      newProgress.totalSessionsCompleted += 1;
      newProgress.longestHoldOverall = Math.max(newProgress.longestHoldOverall, longestThisSession);
      return newProgress;
    });
  };

  const { sessionState, startSession, userStopHold, resetSession } = useWimHofLogic({
    onSessionComplete: handleSessionComplete,
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);


  if (!isClient) {
    return (
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>{translate('loading')}...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    );
  }


  const renderContent = () => {
    switch (sessionState.phase) {
      case 'idle':
        return (
          <div className="text-center space-y-6">
            <ConfigurationModal
              triggerButtonText={translate('startSession')}
              triggerButtonVariant="default"
              triggerButtonClassName="w-full md:w-auto py-6 text-lg bg-accent hover:bg-accent/90"
              onConfirm={(rounds) => startSession(rounds)}
            />
             <Link href="/progress">
                <Button variant="outline" className="w-full md:w-auto">
                    <BarChart className="mr-2 h-4 w-4" />
                    {translate('viewProgress')}
                </Button>
            </Link>
          </div>
        );
      case 'configuring':
        return null;
      case 'breathing':
      case 'holding':
      case 'recovery':
        const progressValue = sessionState.phase === 'breathing' ?
            (Math.ceil(sessionState.currentBreath / 2) / sessionState.breathsPerRound) * 100 :
            sessionState.phase === 'recovery' ?
            ((15 - sessionState.recoveryTime) / 15) * 100 : 0;

        return (
          <div className="space-y-6 w-full">
            <CardDescription className="text-center text-lg">
              {translate('round', { current: sessionState.currentRound, total: sessionState.totalRounds })}
            </CardDescription>

            {sessionState.phase === 'breathing' && (
              <Progress value={progressValue} className="w-full h-2" />
            )}
            {sessionState.phase === 'recovery' && (
               <Progress value={progressValue} className="w-full h-2 bg-yellow-500/30 [&>div]:bg-yellow-500" />
            )}

            <BreathingPacer
              phase={sessionState.phase}
              currentBreath={sessionState.currentBreath}
              breathsPerRound={sessionState.breathsPerRound}
            />

            {sessionState.phase === 'holding' && (
              <TimerDisplay timeInSeconds={sessionState.holdTime} className="text-6xl font-bold text-center text-accent my-4" />
            )}
            {sessionState.phase === 'recovery' && (
              <TimerDisplay timeInSeconds={sessionState.recoveryTime} className="text-6xl font-bold text-center text-yellow-600 my-4" />
            )}

            <div className="flex justify-center mt-8">
              <SessionControls
                phase={sessionState.phase}
                onStopHoldTimer={userStopHold}
                onCancelSession={resetSession} // Pass resetSession here
              />
            </div>
          </div>
        );
      case 'finished':
        const longestThisSession = Math.max(...sessionState.currentSessionRecords.holdDurations, 0);
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-3xl font-semibold">{translate('sessionComplete')}</h2>
            <p>{translate('yourHoldTimes')} {sessionState.currentSessionRecords.holdDurations.join(', ')}</p>
            <p>{translate('longestHoldThisSession', { time: longestThisSession })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <ConfigurationModal
                triggerButtonText={translate('startSession')}
                triggerButtonVariant="default"
                triggerButtonClassName="w-full sm:w-auto bg-accent hover:bg-accent/90"
                onConfirm={(rounds) => startSession(rounds)}
              />
              <Link href="/progress">
                <Button variant="outline" className="w-full sm:w-auto">
                    <BarChart className="mr-2 h-4 w-4" />
                    {translate('viewProgress')}
                </Button>
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        {sessionState.phase !== 'idle' && sessionState.phase !== 'finished' && (
          <CardTitle className="text-center">{translate('appName')}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="min-h-[300px] flex flex-col justify-center items-center px-4 py-8 sm:p-8">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default BreathingSession;
