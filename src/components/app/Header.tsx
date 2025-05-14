'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Wind, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Header = () => {
  const { translate } = useLocalization();
  const [userName, setUserName] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Используем useEffect для получения имени пользователя только на клиенте
  useEffect(() => {
    setIsClient(true);
    const storedName = localStorage.getItem('breathewise-username');
    if (storedName) {
      try {
        setUserName(JSON.parse(storedName));
      } catch (e) {
        console.error('Error parsing username from localStorage', e);
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-5xl mx-auto px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Wind className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">{translate('appName')}</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex gap-3">
             <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
               {translate('navDashboard')}
             </Link>
             <Link href="/progress" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
               {translate('navProgress')}
             </Link>
          </nav>

          {isClient && userName && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground border-r pr-3">
                    <User className="h-3.5 w-3.5" />
                    <span className="max-w-[100px] truncate">{userName}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{translate('welcome', { name: userName })}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
