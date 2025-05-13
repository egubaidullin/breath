'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const ServiceWorkerRegistration = () => {
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
          // Optional: Notify user of PWA install capability or updates
          // For example, if an update is found:
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New content is available, please refresh.
                    toast({
                      title: "App Update Available",
                      description: "A new version of BreatheWise is available. Please refresh the page.",
                      duration: 10000,
                    });
                  } else {
                    // Content is cached for offline use.
                     toast({
                      title: "App Ready for Offline Use",
                      description: "BreatheWise is now cached and ready to use offline.",
                    });
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
           toast({
            title: "PWA Setup Error",
            description: "Could not set up offline capabilities.",
            variant: "destructive",
          });
        });
    }
  }, [toast]);

  return null; // This component doesn't render anything
};

export default ServiceWorkerRegistration;
