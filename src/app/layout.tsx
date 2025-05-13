import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ServiceWorkerRegistration from '@/components/app/ServiceWorkerRegistration';

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: 'BreatheWise - Wim Hof Method',
  description: 'Your personal guide to the Wim Hof Method breathing exercises.',
  manifest: '/manifest.json',
  icons: {
    apple: "/icons/icon-192x192.png",
  }
};

export const viewport: Viewport = {
  themeColor: '#75A9FF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="application-name" content="BreatheWise" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BreatheWise" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#75A9FF" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
        <Toaster />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
