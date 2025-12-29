import React, { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Video, CheckSquare, BookOpen, Play, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatNumber } from '@/utils/formatters';
import type { Article, Video, Test } from '@/types';

type Level = 'beginner' | 'intermediate' | 'advanced';

const Education: React.FC = () => {
  const { t } = useLanguage();
  const [activeLevel, setActiveLevel] = useState<Level>('beginner');

  const articles: Article[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Phishing hujumlarini aniqlash',
        description: 'Qalbaki xabarlarni qanday aniqlash mumkin',
        content: '',
        level: 'beginner',
        readTime: '5 daqiqa',
        views: 1250,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Parol xavfsizligi',
        description: 'Kuchli parol yaratish sirlari',
        content: '',
        level: 'beginner',
        readTime: '7 daqiqa',
        views: 2100,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Ikki faktorli autentifikatsiya',
        description: '2FA ni qanday sozlash kerak',
        content: '',
        level: 'intermediate',
        readTime: '10 daqiqa',
        views: 890,
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Tarmoq xavfsizligi',
        description: 'Wi-Fi himoyasi va VPN',
        content: '',
        level: 'intermediate',
        readTime: '12 daqiqa',
        views: 670,
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Kriptografiya asoslari',
        description: 'Shifrlash va kalitlar',
        content: '',
        level: 'advanced',
        readTime: '15 daqiqa',
        views: 450,
        createdAt: new Date().toISOString(),
      },
    ],
    []
  );

  const videos: Video[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Kiber xavfsizlik asoslari',
        description: '',
        url: '',
        duration: '15:30',
        level: 'beginner',
        views: 5400,
        rating: 4.8,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Social engineering hujumlari',
        description: '',
        url: '',
        duration: '22:15',
        level: 'intermediate',
        views: 3200,
        rating: 4.9,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Penetration testing kirish',
        description: '',
        url: '',
        duration: '45:00',
        level: 'advanced',
        views: 1800,
        rating: 4.7,
        createdAt: new Date().toISOString(),
      },
    ],
    []
  );

  const tests: Test[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Boshlang\'ich test',
        description: '',
        questions: 20,
        time: '15 daqiqa',
        level: 'beginner',
        participants: 3400,
      },
      {
        id: '2',
        title: 'O\'rta daraja testi',
        description: '',
        questions: 30,
        time: '25 daqiqa',
        level: 'intermediate',
        participants: 1800,
      },
      {
        id: '3',
        title: 'Ekspert testi',
        description: '',
        questions: 50,
        time: '45 daqiqa',
        level: 'advanced',
        participants: 620,
      },
    ],
    []
  );

  const getLevelColor = useCallback((level: Level): string => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      default:
        return 'bg-primary/10 text-primary border-primary/30';
    }
  }, []);

  const getLevelLabel = useCallback(
    (level: Level): string => {
      switch (level) {
        case 'beginner':
          return t.education.beginner;
        case 'intermediate':
          return t.education.intermediate;
        case 'advanced':
          return t.education.advanced;
        default:
          return level;
      }
    },
    [t]
  );

  const filteredArticles = useMemo(
    () => articles.filter((a) => a.level === activeLevel),
    [articles, activeLevel]
  );

  const filteredVideos = useMemo(
    () => videos.filter((v) => v.level === activeLevel),
    [videos, activeLevel]
  );

  const filteredTests = useMemo(
    () => tests.filter((test) => test.level === activeLevel),
    [tests, activeLevel]
  );

  const levels: Level[] = useMemo(() => ['beginner', 'intermediate', 'advanced'], []);

  return (
    <>
      <Helmet>
        <title>O'quv bo'limi - CyberSafe Edu</title>
        <meta name="description" content="Kiber xavfsizlik bo'yicha maqolalar, video darslar va testlar." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="container px-4 mx-auto">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.education.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.education.subtitle}
              </p>
            </div>

            {/* Level Filter */}
            <div className="flex justify-center gap-4 mb-12" role="tablist" aria-label="Daraja tanlash">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeLevel === level
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  aria-pressed={activeLevel === level}
                  aria-label={getLevelLabel(level)}
                >
                  {getLevelLabel(level)}
                </button>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="articles" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="articles" className="gap-2">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  {t.education.articles}
                </TabsTrigger>
                <TabsTrigger value="videos" className="gap-2">
                  <Video className="w-4 h-4" aria-hidden="true" />
                  {t.education.videos}
                </TabsTrigger>
                <TabsTrigger value="tests" className="gap-2">
                  <CheckSquare className="w-4 h-4" aria-hidden="true" />
                  {t.education.tests}
                </TabsTrigger>
              </TabsList>

              {/* Articles */}
              <TabsContent value="articles">
                <div className="grid gap-4">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <article
                        key={article.id}
                        className="p-6 rounded-xl glass-card flex items-center justify-between gap-4 group hover:scale-[1.02] transition-transform duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">{article.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(article.level)}`}>
                            {getLevelLabel(article.level)}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" aria-hidden="true" />
                            {formatNumber(article.views)}
                          </div>
                          <Button variant="cyber" size="sm">
                            O'qish
                          </Button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Bu daraja uchun maqolalar hozircha mavjud emas.
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Videos */}
              <TabsContent value="videos">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => (
                      <article
                        key={video.id}
                        className="rounded-xl glass-card overflow-hidden group hover:scale-105 transition-transform duration-300"
                      >
                        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110">
                            <Play className="w-8 h-8 text-primary-foreground ml-1" aria-hidden="true" />
                          </div>
                          <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-background/80 text-xs font-medium">
                            {video.duration}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground mb-2">{video.title}</h3>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getLevelColor(video.level)}`}>
                              {getLevelLabel(video.level)}
                            </span>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                              {video.rating}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                      Bu daraja uchun video darslar hozircha mavjud emas.
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Tests */}
              <TabsContent value="tests">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTests.length > 0 ? (
                    filteredTests.map((test) => (
                      <article
                        key={test.id}
                        className="p-6 rounded-xl glass-card group hover:scale-105 transition-transform duration-300"
                      >
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                          <CheckSquare className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          {test.title}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckSquare className="w-4 h-4" aria-hidden="true" />
                            {test.questions} savol
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            {test.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" aria-hidden="true" />
                            {formatNumber(test.participants)} ishtirokchi
                          </div>
                        </div>
                        <Button variant="cyber" className="w-full">
                          Testni boshlash
                        </Button>
                      </article>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                      Bu daraja uchun testlar hozircha mavjud emas.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Education;
