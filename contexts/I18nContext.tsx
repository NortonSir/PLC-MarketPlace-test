import React, { createContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react';

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
  const [language, setLanguage] = useState<Language>('ko');
  const [isLoaded, setIsLoaded] = useState(false);
  const translationsRef = useRef<{ en: TranslationData; ko: TranslationData }>({ en: {}, ko: {} });

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enResponse, koResponse] = await Promise.all([
          fetch('/locales/en.json'),
          fetch('/locales/ko.json')
        ]);
        if (!enResponse.ok || !koResponse.ok) {
            throw new Error(`Failed to fetch translation files: ${enResponse.statusText}, ${koResponse.statusText}`);
        }
        translationsRef.current.en = await enResponse.json();
        translationsRef.current.ko = await koResponse.json();
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };
    loadTranslations();
  }, []); // Empty dependency array ensures this runs only once on mount.

  useEffect(() => {
    if (isLoaded) {
      document.documentElement.lang = language;
    }
  }, [language, isLoaded]);

  const t = useCallback((key: string): string => {
    const langTranslations = translationsRef.current[language];
    return langTranslations[key as keyof typeof langTranslations] || key;
  }, [language]);

  // Render nothing until translations are loaded to prevent a flash of untranslated text.
  if (!isLoaded) {
    return null; 
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
