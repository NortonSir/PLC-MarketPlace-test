import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import translations from '../i18n'; // i18n.js 파일에서 번역 데이터 불러오기

type TranslationData = Record<string, string>;

type Language = 'en' | 'ko';

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko'); // Default to Korean
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Translations are loaded synchronously from i18n.js
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      document.documentElement.lang = language;
    }
  }, [language, isLoaded]);

  const t = useCallback((key: string): string => {
    const langTranslations = translations[language] as TranslationData;
    return langTranslations[key] || key;
  }, [language]);

  if (!isLoaded) {
    return null; 
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};