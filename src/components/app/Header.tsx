'use client';

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Wind } from 'lucide-react';

const Header = () => {
  const { translate } = useLocalization();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-5xl mx-auto px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Wind className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">{translate('appName')}</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex gap-2">
             <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
               {translate('navDashboard')}
             </Link>
             <Link href="/progress" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
               {translate('navProgress')}
             </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
