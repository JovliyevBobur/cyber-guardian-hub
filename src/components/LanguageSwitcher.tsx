import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';

const flags: Record<Language, { src: string; alt: string }> = {
  uz: {
    src: 'https://img.icons8.com/color/48/uzbekistan-circular.png',
    alt: 'Uzbekistan',
  },
  en: {
    src: 'https://img.icons8.com/color/48/great-britain-circular.png',
    alt: 'United Kingdom',
  },
  ru: {
    src: 'https://img.icons8.com/color/48/russian-federation-circular.png',
    alt: 'Russia',
  },
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ['uz', 'en', 'ru'];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
            language === lang
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
              : 'opacity-60 hover:opacity-100 hover:scale-105'
          }`}
        >
          <img
            src={flags[lang].src}
            alt={flags[lang].alt}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
