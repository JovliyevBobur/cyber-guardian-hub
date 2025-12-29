import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { APP_NAME, APP_DESCRIPTION } from '@/constants';

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{APP_NAME} - {APP_DESCRIPTION}</title>
        <meta name="description" content={t.hero.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
