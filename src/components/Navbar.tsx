import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { Menu, X, LogIn, UserPlus, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import type { NavLink } from '@/types';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks: NavLink[] = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/education', label: t.nav.education },
    { path: '/games', label: t.nav.games },
    { path: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Tizimdan chiqdingiz.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Xatolik',
        description: 'Chiqishda xatolik yuz berdi.',
        variant: 'destructive',
      });
    }
  }, [signOut, toast, navigate]);

  const handleNavClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Foydalanuvchi';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="CyberSafe Edu bosh sahifa">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="CyberSafe Edu logo" 
                className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110"
                loading="eager"
              />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl text-foreground">
              CyberSafe <span className="text-primary">Edu</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Asosiy navigatsiya">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm transition-all duration-300 hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <UserIcon className="w-4 h-4" aria-hidden="true" />
                    <span>{displayName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Chiqish</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate('/auth')}>
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  {t.nav.login}
                </Button>
                <Button variant="cyber" size="sm" className="gap-2" onClick={() => navigate('/auth?mode=register')}>
                  <UserPlus className="w-4 h-4" aria-hidden="true" />
                  {t.nav.register}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground"
            aria-label={isOpen ? 'Menuni yopish' : 'Menuni ochish'}
            aria-expanded={isOpen}
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
          <nav className="flex flex-col gap-4" aria-label="Mobil navigatsiya">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-medium">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2 text-destructive" 
                  onClick={() => {
                    handleNavClick();
                    handleLogout();
                  }}
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  Chiqish
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-2" onClick={() => { handleNavClick(); navigate('/auth'); }}>
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  {t.nav.login}
                </Button>
                <Button variant="cyber" className="justify-start gap-2" onClick={() => { handleNavClick(); navigate('/auth?mode=register'); }}>
                  <UserPlus className="w-4 h-4" aria-hidden="true" />
                  {t.nav.register}
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
