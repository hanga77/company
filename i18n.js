
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const I18nContext = createContext(undefined);

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState('fr');
  const [translations, setTranslations] = useState(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [frResponse, enResponse] = await Promise.all([
          fetch('/locales/fr.json'),
          fetch('/locales/en.json')
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

  const t = useMemo(() => (key, replacements) => {
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

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
