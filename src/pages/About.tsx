import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Eye, Users, Award, Shield, Zap, LucideIcon } from 'lucide-react';

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const { t } = useLanguage();

  const values: Value[] = useMemo(
    () => [
      {
        icon: Shield,
        title: 'Xavfsizlik',
        description: 'Foydalanuvchilarimiz xavfsizligi bizning asosiy ustuvorligimiz.',
      },
      {
        icon: Users,
        title: 'Hamkorlik',
        description: 'Jamoa bo\'lib ishlash va bilim almashish.',
      },
      {
        icon: Zap,
        title: 'Innovatsiya',
        description: 'Eng so\'nggi texnologiyalar va usullarni qo\'llash.',
      },
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>Biz haqimizda - CyberSafe Edu</title>
        <meta name="description" content="CyberSafe Edu platformasi haqida ma'lumot. Bizning missiyamiz va maqsadlarimiz." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24">
          {/* Hero */}
          <section className="py-20" aria-labelledby="about-heading">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <h1 id="about-heading" className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {t.about.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  Biz kiber xavfsizlik sohasida bilim va ko'nikmalarni tarqatish orqali xavfsiz raqamli kelajak yaratish uchun ishlaymiz.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20 bg-secondary/30" aria-labelledby="mission-vision-heading">
            <div className="container px-4 mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Mission */}
                <article className="p-8 rounded-2xl glass-card">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <h2 id="mission-vision-heading" className="font-display text-2xl font-bold text-foreground mb-4">
                    {t.about.mission}
                  </h2>
                  <p className="text-muted-foreground">
                    {t.about.missionText}
                  </p>
                </article>

                {/* Vision */}
                <article className="p-8 rounded-2xl glass-card">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {t.about.vision}
                  </h2>
                  <p className="text-muted-foreground">
                    {t.about.visionText}
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20" aria-labelledby="values-heading">
            <div className="container px-4 mx-auto">
              <h2 id="values-heading" className="font-display text-3xl font-bold text-foreground text-center mb-12">
                Bizning qadriyatlarimiz
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <article
                      key={index}
                      className="text-center p-8 rounded-2xl glass-card group hover:scale-105 transition-transform duration-300"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                        <IconComponent className="w-8 h-8 text-primary transition-colors group-hover:text-primary-foreground" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-20 bg-secondary/30" aria-labelledby="team-heading">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-primary-foreground" aria-hidden="true" />
                </div>
                <h2 id="team-heading" className="font-display text-3xl font-bold text-foreground mb-6">
                  Professional jamoa
                </h2>
                <p className="text-muted-foreground mb-8">
                  Bizning jamoamiz kiber xavfsizlik sohasida ko'p yillik tajribaga ega mutaxassislardan tashkil topgan. Biz doimiy ravishda o'z bilimlarimizni yangilab, eng so'nggi tahdidlar va himoya usullari haqida ma'lumotlarni taqdim etamiz.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
