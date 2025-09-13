import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Locale } from './types';

// 1. Define types
export type Translations = { [key: string]: any };

// 2. Create Context
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// 3. Create Provider with async loading
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('fr');
  const [translations, setTranslations] = useState<Record<Locale, Translations> | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [frResponse, enResponse] = await Promise.all([
          fetch('./locales/fr.json'),
          fetch('./locales/en.json')
        ]);
        if (!frResponse.ok || !enResponse.ok) {
          throw new Error('Failed to load translation files');
        }
        const fr = await frResponse.json();
        const en = await enResponse.json();
        setTranslations({ fr, en });
      } catch (error) {
        console.error("Could not load translations:", error);
      }
    };
    loadTranslations();
  }, []);

  const t = useMemo(() => (key: string, replacements?: { [key: string]: string | number }): string => {
    if (!translations) {
      return key;
    }

    const keys = key.split('.');
    let result = translations[locale];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        return key;
      }
    }
    
    let text = String(result);

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        text = text.replace(`{{${placeholder}}}`, String(replacements[placeholder]));
      });
    }

    return text;
  }, [locale, translations]);
  
  if (!translations) {
    return null;
  }

  const value = { locale, setLocale, t };

  return React.createElement(I18nContext.Provider, { value: value }, children);
};

// 4. Create hook
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
