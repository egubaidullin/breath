'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useLocalization } from '@/contexts/LocalizationContext';
import BreathingSession from '@/components/app/BreathingSession';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [userName] = useLocalStorage<string | null>('breathewise-username', null);
  const [isLoading, setIsLoading] = useState(true);
  const { translate, language } = useLocalization(); // language dependency for useEffect
  const router = useRouter();


  useEffect(() => {
    // Client-side check
    const storedName = typeof window !== "undefined" ? window.localStorage.getItem('breathewise-username') : null;
    if (!storedName) {
      router.replace('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);


  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    );
  }
  
  // Re-trigger welcome message translation if language changes
  const welcomeMessage = userName ? translate('welcome', { name: userName }) : '';


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">{welcomeMessage}</h1>
      <BreathingSession />
    </div>
  );
}
