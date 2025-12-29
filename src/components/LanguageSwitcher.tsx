import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types';

interface FlagConfig {
  src: string;
  alt: string;
}

const flags: Record<Language, FlagConfig> = {
  uz: {
    src: 'https://img.icons8.com/color/48/uzbekistan-circular.png',
    alt: 'O\'zbek tili',
  },
  en: {
    src: 'https://img.icons8.com/color/48/great-britain-circular.png',
    alt: 'English',
  },
  ru: {
    src: 'https://img.icons8.com/color/48/russian-federation-circular.png',
    alt: 'Русский',
  },
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = useMemo(() => ['uz', 'en', 'ru'], []);

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Tilni tanlash">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
            language === lang
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
              : 'opacity-60 hover:opacity-100 hover:scale-105'
          }`}
          aria-label={flags[lang].alt}
          aria-pressed={language === lang}
        >
          <img
            src={flags[lang].src}
            alt={flags[lang].alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
