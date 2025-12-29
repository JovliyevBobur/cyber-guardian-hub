import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Language, getTranslation, translations } from '@/lib/i18n';
import type { Language as LanguageType } from '@/types';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: typeof translations.uz;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    const saved = localStorage.getItem('language') as LanguageType | null;
    return saved && ['uz', 'en', 'ru'].includes(saved) ? saved : 'uz';
  });

  const setLanguage = useCallback((lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: getTranslation(language),
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
