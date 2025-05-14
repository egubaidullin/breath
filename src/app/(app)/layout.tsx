import type { ReactNode } from 'react';
import Header from '@/components/app/Header';
import { LocalizationProvider } from '@/contexts/LocalizationContext';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <LocalizationProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="py-6 md:px-8 md:py-0 bg-background/95 border-t">
          <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row max-w-5xl mx-auto">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Eduard Gubaidullin
            </p>
          </div>
        </footer>
      </div>
    </LocalizationProvider>
  );
}
