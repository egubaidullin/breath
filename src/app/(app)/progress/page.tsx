'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useLocalization } from '@/contexts/LocalizationContext';
import ProgressDisplay from '@/components/app/ProgressDisplay';
import type { UserProgress, SessionRecord } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

export default function ProgressPage() {
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress | null>('breathewise-progress', null);
  const [isLoading, setIsLoading] = useState(true);
  const { translate } = useLocalization();
  const router = useRouter();

  useEffect(() => {
    const storedName = typeof window !== "undefined" ? window.localStorage.getItem('breathewise-username') : null;
    if (!storedName) {
      router.replace('/');
    } else {
      const storedProgress = typeof window !== "undefined" ? window.localStorage.getItem('breathewise-progress') : null;
      if (storedProgress) {
        try {
          setUserProgress(JSON.parse(storedProgress));
        } catch (e) {
          console.error("Failed to parse progress from localStorage", e);
          setUserProgress(null); 
        }
      } else {
         setUserProgress(null); // Ensure it's null if nothing in storage
      }
      setIsLoading(false);
    }
  }, [router, setUserProgress]);

  const handleDeleteAllData = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem('breathewise-username');
      window.localStorage.removeItem('breathewise-progress');
    }
    setUserProgress(null); // Update state
    // No need to clear username from local state as this page doesn't manage it.
    // The useEffect in layout/dashboard will handle redirect if username is gone.
    router.replace('/');
  };

  const handleDeleteSession = (sessionId: string) => {
    if (!userProgress) return;

    const updatedSessions = userProgress.sessions.filter(session => session.id !== sessionId);
    const newTotalSessions = updatedSessions.length;
    const newLongestHoldOverall = newTotalSessions > 0 
      ? Math.max(...updatedSessions.map(session => session.longestHold), 0)
      : 0;

    setUserProgress({
      sessions: updatedSessions,
      totalSessionsCompleted: newTotalSessions,
      longestHoldOverall: newLongestHoldOverall,
    });
  };


  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-10 w-40 mt-4" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {translate('yourProgress')}
        </h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              {translate('deleteAllData')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{translate('confirmDeleteAllTitle')}</AlertDialogTitle>
              <AlertDialogDescription>
                {translate('confirmDeleteAllDescription')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{translate('cancelButton')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAllData} className="bg-destructive hover:bg-destructive/90">
                {translate('confirmDeleteAllButton')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <ProgressDisplay progress={userProgress} onDeleteSession={handleDeleteSession} />
    </div>
  );
}
