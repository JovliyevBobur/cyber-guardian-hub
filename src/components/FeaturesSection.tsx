import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Video, CheckSquare, Gamepad2 } from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: FileText,
      title: t.features.articles.title,
      description: t.features.articles.description,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Video,
      title: t.features.videos.title,
      description: t.features.videos.description,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: CheckSquare,
      title: t.features.tests.title,
      description: t.features.tests.description,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Gamepad2,
      title: t.features.games.title,
      description: t.features.games.description,
      gradient: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.features.title}
          </h2>
          <p className="text-muted-foreground">
            {t.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl glass-card transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
