import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative pt-16 pb-8 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="CyberSafe Edu logo" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold text-xl text-foreground">
                CyberSafe <span className="text-primary">Edu</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              Zamonaviy kiber tahdidlardan himoyalanish, internet xavfsizligi va ma'lumotlaringizni saqlash bo'yicha bilimlarni egallang.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Tezkor havolalar
            </h4>
            <ul className="space-y-2">
              {[
                { label: t.nav.home, path: '/' },
                { label: t.nav.about, path: '/about' },
                { label: t.nav.education, path: '/education' },
                { label: t.nav.games, path: '/games' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Aloqa
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@cybersec.uz</li>
              <li>+998 90 123 45 67</li>
              <li>Toshkent, O'zbekiston</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CyberSafe Edu. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
