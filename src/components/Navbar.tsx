import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/education', label: t.nav.education },
    { path: '/games', label: t.nav.games },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img src="/logo.svg" alt="CyberSafe Edu logo" className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl text-foreground">
              CyberSafe <span className="text-primary">Edu</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm transition-all duration-300 hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate('/auth')}>
                <LogIn className="w-4 h-4" />
                {t.nav.login}
              </Button>
              <Button variant="cyber" size="sm" className="gap-2" onClick={() => navigate('/auth?mode=register')}>
                <UserPlus className="w-4 h-4" />
                {t.nav.register}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-screen pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start gap-2" onClick={() => { setIsOpen(false); navigate('/auth'); }}>
                <LogIn className="w-4 h-4" />
                {t.nav.login}
              </Button>
              <Button variant="cyber" className="justify-start gap-2" onClick={() => { setIsOpen(false); navigate('/auth?mode=register'); }}>
                <UserPlus className="w-4 h-4" />
                {t.nav.register}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
