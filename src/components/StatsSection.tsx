import React, { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, BookOpen, FileText, Award, LucideIcon } from 'lucide-react';
import { STATS } from '@/constants';

interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

interface AnimatedNumberProps {
  value: number;
  suffix: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <>
      {count.toLocaleString()}{suffix}
    </>
  );
};

const StatsSection: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  const stats: Stat[] = useMemo(
    () => [
      { icon: Users, value: STATS.users, suffix: '+', label: t.stats.users },
      { icon: BookOpen, value: STATS.courses, suffix: '+', label: t.stats.courses },
      { icon: FileText, value: STATS.articles, suffix: '+', label: t.stats.articles },
      { icon: Award, value: STATS.certificates, suffix: '+', label: t.stats.certificates },
    ],
    [t]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section id="stats-section" className="relative py-20" aria-labelledby="stats-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" aria-hidden="true" />
      
      <div className="container px-4 mx-auto relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-card mb-4 transition-all duration-300 group-hover:scale-110 group-hover:neon-glow">
                  <IconComponent className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {isVisible ? (
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  ) : (
                    '0'
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
