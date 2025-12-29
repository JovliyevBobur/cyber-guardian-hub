import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center transition-all duration-300 hover:scale-110 hover:neon-glow"
      aria-label={theme === 'dark' ? 'Yorug\'lik rejimiga o\'tish' : 'Qorong\'u rejimiga o\'tish'}
      aria-pressed={theme === 'dark'}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 text-primary transition-all duration-300 ${
            theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 text-primary transition-all duration-300 ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
          aria-hidden="true"
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
