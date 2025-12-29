import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { ANIMATION_DELAYS } from '@/constants';

interface FeatureIcon {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features: FeatureIcon[] = useMemo(
    () => [
      { icon: Shield, label: 'Himoya' },
      { icon: Lock, label: 'Xavfsizlik' },
      { icon: Eye, label: 'Monitoring' },
    ],
    []
  );

  const handleStartLearning = () => {
    navigate('/education');
  };

  const handleRegister = () => {
    navigate('/auth?mode=register');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} 
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '-3s' }} 
        />
        <div 
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-neon-purple/10 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '-1.5s' }} 
        />
      </div>

      {/* Cyber Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
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
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in"
            style={{ animationDelay: ANIMATION_DELAYS.hero.badge }}
          >
            <img 
              src="/logo.png" 
              alt="CyberSafe Edu logo" 
              className="w-4 h-4 object-contain"
              loading="eager"
            />
            <span className="text-sm font-medium text-muted-foreground">
              Kiber Xavfsizlik Platformasi
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
            style={{ animationDelay: ANIMATION_DELAYS.hero.title }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent gradient-animate bg-[length:200%_auto]">
              {t.hero.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl font-display text-foreground/90 mb-4 animate-fade-in"
            style={{ animationDelay: ANIMATION_DELAYS.hero.subtitle }}
          >
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p 
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: ANIMATION_DELAYS.hero.description }}
          >
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: ANIMATION_DELAYS.hero.buttons }}
          >
            {/* O'rganishni boshlash - Gradient button */}
            <Button 
              variant="cyber" 
              size="xl" 
              className="group bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-300" 
              onClick={handleStartLearning}
            >
              <span className="text-foreground dark:text-primary-foreground font-semibold">
                {t.hero.cta}
              </span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-foreground dark:text-primary-foreground" aria-hidden="true" />
            </Button>
            
            {/* Ro'yxatdan o'tish - Outline button */}
            <Button 
              variant="cyberOutline" 
              size="xl" 
              className="border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/25 font-semibold transition-all duration-300"
              onClick={handleRegister}
            >
              {t.hero.ctaSecondary}
            </Button>
          </div>

          {/* Feature Icons */}
          <div 
            className="flex items-center justify-center gap-8 mt-16 animate-fade-in"
            style={{ animationDelay: ANIMATION_DELAYS.hero.features }}
          >
            {features.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={item.label}
                >
                  <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:neon-glow">
                    <IconComponent className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};

export default HeroSection;
