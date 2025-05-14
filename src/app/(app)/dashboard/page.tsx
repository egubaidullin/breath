'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useLocalization } from '@/contexts/LocalizationContext';
import BreathingSession from '@/components/app/BreathingSession';
import WimHofMethodInfo from '@/components/app/WimHofMethodInfo';
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
        <Skeleton className="h-20 w-full" /> {/* Skeleton for WimHofMethodInfo */}
        <Skeleton className="h-64 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WimHofMethodInfo />
      <BreathingSession />
    </div>
  );
}
