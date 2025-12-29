import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/constants';

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks: SocialLink[] = [
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: SOCIAL_LINKS.email, label: 'Email' },
  ];

  const quickLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.education, path: '/education' },
    { label: t.nav.games, path: '/games' },
  ];

  return (
    <footer className="relative pt-16 pb-8 border-t border-border" role="contentinfo">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="CyberSafe Edu bosh sahifa">
              <img 
                src="/logo.png" 
                alt="CyberSafe Edu logo" 
                className="w-8 h-8 object-contain"
                loading="lazy"
              />
              <span className="font-display font-bold text-xl text-foreground">
                CyberSafe <span className="text-primary">Edu</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              Zamonaviy kiber tahdidlardan himoyalanish, internet xavfsizligi va ma'lumotlaringizni saqlash bo'yicha bilimlarni egallang.
            </p>
            <div className="flex items-center gap-3" role="list" aria-label="Ijtimoiy tarmoqlar">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-lg glass-card flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-primary"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Tezkor havolalar">
            <h4 className="font-display font-semibold text-foreground mb-4">
              Tezkor havolalar
            </h4>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link, index) => (
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
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Aloqa
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>{CONTACT_INFO.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 CyberSafe Edu. {t.footer.rights}
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
