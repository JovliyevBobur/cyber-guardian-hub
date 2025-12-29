import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      {/* Cyber Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            fill="none"
            stroke="url(#cyber-gradient)"
            strokeWidth="0.1"
            className="animate-pulse-glow"
          />
          <path
            d="M0,60 Q25,40 50,60 T100,60"
            fill="none"
            stroke="url(#cyber-gradient)"
            strokeWidth="0.1"
            className="animate-pulse-glow"
            style={{ animationDelay: '0.5s' }}
          />
          <defs>
            <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <img src="/logo.png" alt="CyberSafe Edu logo" className="w-4 h-4 object-contain" />
            <span className="text-sm font-medium text-muted-foreground">
              Kiber Xavfsizlik Platformasi
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent gradient-animate bg-[length:200%_auto]">
              {t.hero.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-display text-foreground/90 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="cyber" size="xl" className="group" onClick={() => navigate('/education')}>
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="cyberOutline" size="xl" onClick={() => navigate('/auth')}>
              {t.hero.ctaSecondary}
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="flex items-center justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {[
              { icon: Shield, label: 'Himoya' },
              { icon: Lock, label: 'Xavfsizlik' },
              { icon: Eye, label: 'Monitoring' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:neon-glow">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
