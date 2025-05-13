'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';
import UserNameForm from '@/components/app/UserNameForm';
import { LocalizationProvider, useLocalization } from '@/contexts/LocalizationContext'; // Import useLocalization
import { Skeleton } from '@/components/ui/skeleton';

// Wrap the core logic in a component that uses the context
function HomePageContent() {
  const [userName, setUserName] = useLocalStorage<string | null>('breathewise-username', null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { translate } = useLocalization(); // Now safe to call

  useEffect(() => {
    // Check for user name after client-side mount
    const storedName = window.localStorage.getItem('breathewise-username');
    if (storedName) {
      setUserName(JSON.parse(storedName));
    }
    setIsLoading(false);
  }, [setUserName]);

  useEffect(() => {
    if (!isLoading && userName) {
      router.replace('/dashboard');
    }
  }, [userName, isLoading, router]);

  const handleNameSaved = (name: string) => {
    setUserName(name);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-6 w-64 mb-6" />
        <Skeleton className="h-10 w-full max-w-sm mb-4" />
        <Skeleton className="h-10 w-full max-w-sm" />
      </div>
    );
  }

  if (!userName) {
    return <UserNameForm onNameSaved={handleNameSaved} />;
  }

  // This part should ideally not be reached if redirection works correctly
  return (
     <div className="flex items-center justify-center min-h-screen">
       <p>{translate('loading')}...</p>
     </div>
  );
}


export default function Home() {
  return (
    <LocalizationProvider>
      <HomePageContent />
    </LocalizationProvider>
  );
}
