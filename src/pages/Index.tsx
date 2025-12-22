import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>CyberSec - Kiber Xavfsizlik Platformasi</title>
        <meta name="description" content="Zamonaviy kiber tahdidlardan himoyalanish, internet xavfsizligi va ma'lumotlaringizni saqlash bo'yicha bilimlarni egallang." />
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
