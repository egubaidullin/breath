'use client';

import { useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useLocalization } from '@/contexts/LocalizationContext';
import ProgressDisplay from '@/components/app/ProgressDisplay';
import type { UserProgress } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export default function ProgressPage() {
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress | null>('breathewise-progress', null);
  const [isLoading, setIsLoading] = useState(true);
  const { translate } = useLocalization();
  const router = useRouter();


  useEffect(() => {
    // Client-side check for user existence
    const storedName = typeof window !== "undefined" ? window.localStorage.getItem('breathewise-username') : null;
    if (!storedName) {
      router.replace('/'); // Redirect if no user is set up
    } else {
      // Load progress
      const storedProgress = typeof window !== "undefined" ? window.localStorage.getItem('breathewise-progress') : null;
      if (storedProgress) {
        setUserProgress(JSON.parse(storedProgress));
      }
      setIsLoading(false);
    }
  }, [router, setUserProgress]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {translate('yourProgress')}
      </h1>
      <ProgressDisplay progress={userProgress} />
    </div>
  );
}
