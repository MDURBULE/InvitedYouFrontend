'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Locale, LocaleInfo, TranslationDictionary } from './types';
import { en } from './translations/en';
import { hi } from './translations/hi';
import { mr } from './translations/mr';

const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  en,
  hi,
  mr,
};

export const AVAILABLE_LOCALES: LocaleInfo[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', short: 'HI', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', short: 'MR', flag: '🚩' },
];

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, fallback?: string) => string;
  localeInfo: LocaleInfo;
  availableLocales: LocaleInfo[];
  formatNumber: (num: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'invitedyou_locale';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && (stored === 'en' || stored === 'hi' || stored === 'mr')) {
        setLocaleState(stored);
      } else {
        // Detect browser language if starting with hi or mr
        const navLang = typeof navigator !== 'undefined' ? navigator.language?.toLowerCase() : '';
        if (navLang.startsWith('mr')) {
          setLocaleState('mr');
        } else if (navLang.startsWith('hi')) {
          setLocaleState('hi');
        }
      }
    } catch {
      // Storage access blocked or SSR
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLocale;
      }
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const t = useMemo(() => {
    return (path: string, fallback?: string): string => {
      const parts = path.split('.');
      let current: any = TRANSLATIONS[locale];
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          // Fallback to English dictionary
          let enFallback: any = TRANSLATIONS['en'];
          for (const enPart of parts) {
            if (enFallback && typeof enFallback === 'object' && enPart in enFallback) {
              enFallback = enFallback[enPart];
            } else {
              enFallback = undefined;
              break;
            }
          }
          return typeof enFallback === 'string' ? enFallback : fallback || path;
        }
      }
      return typeof current === 'string' ? current : fallback || path;
    };
  }, [locale]);

  const formatNumber = (num: number): string => {
    if (locale === 'hi') {
      return new Intl.NumberFormat('hi-IN').format(num);
    }
    if (locale === 'mr') {
      return new Intl.NumberFormat('mr-IN').format(num);
    }
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const localeInfo = useMemo(() => {
    return AVAILABLE_LOCALES.find((l) => l.code === locale) || AVAILABLE_LOCALES[0];
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        localeInfo,
        availableLocales: AVAILABLE_LOCALES,
        formatNumber,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
