'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Language, LocalizationStrings } from '@/types';
import { translations } from '@/lib/localization';
import useLocalStorage from '@/hooks/useLocalStorage';

interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, replacements?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [persistedLanguage, setPersistedLanguage] = useLocalStorage<Language>('breathewise-lang', 'en');
  const [language, setLanguageState] = useState<Language>(persistedLanguage);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setLanguageState(persistedLanguage);
  }, [persistedLanguage]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setPersistedLanguage(lang);
  }, [setPersistedLanguage]);

  const translate = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    if (!isMounted) return key; // Return key or a loading string if not mounted

    const langStrings = translations[language] as LocalizationStrings;
    const keys = key.split('.');
    let current: string | LocalizationStrings | undefined = langStrings;

    for (const k of keys) {
      if (typeof current === 'object' && current !== null && k in current) {
        current = current[k] as string | LocalizationStrings;
      } else {
        console.warn(`Translation key "${key}" not found for language "${language}".`);
        return key; // Return the key itself if not found
      }
    }
    
    if (typeof current !== 'string') {
      console.warn(`Translation key "${key}" is not a string for language "${language}".`);
      return key;
    }

    let translatedString = current;
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translatedString = translatedString.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }
    
    return translatedString;
  }, [language, isMounted]);

  if (!isMounted) {
    // You can return a loading state or null here if needed
    // For simplicity, we'll proceed, but translate will return keys
  }

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
