import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Video, CheckSquare, BookOpen, Play, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Education = () => {
  const { t } = useLanguage();
  const [activeLevel, setActiveLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const articles = [
    {
      title: 'Phishing hujumlarini aniqlash',
      description: 'Qalbaki xabarlarni qanday aniqlash mumkin',
      level: 'beginner',
      readTime: '5 daqiqa',
      views: 1250,
    },
    {
      title: 'Parol xavfsizligi',
      description: 'Kuchli parol yaratish sirlari',
      level: 'beginner',
      readTime: '7 daqiqa',
      views: 2100,
    },
    {
      title: 'Ikki faktorli autentifikatsiya',
      description: '2FA ni qanday sozlash kerak',
      level: 'intermediate',
      readTime: '10 daqiqa',
      views: 890,
    },
    {
      title: 'Tarmoq xavfsizligi',
      description: 'Wi-Fi himoyasi va VPN',
      level: 'intermediate',
      readTime: '12 daqiqa',
      views: 670,
    },
    {
      title: 'Kriptografiya asoslari',
      description: 'Shifrlash va kalitlar',
      level: 'advanced',
      readTime: '15 daqiqa',
      views: 450,
    },
  ];

  const videos = [
    {
      title: 'Kiber xavfsizlik asoslari',
      duration: '15:30',
      level: 'beginner',
      views: 5400,
      rating: 4.8,
    },
    {
      title: 'Social engineering hujumlari',
      duration: '22:15',
      level: 'intermediate',
      views: 3200,
      rating: 4.9,
    },
    {
      title: 'Penetration testing kirish',
      duration: '45:00',
      level: 'advanced',
      views: 1800,
      rating: 4.7,
    },
  ];

  const tests = [
    {
      title: 'Boshlang\'ich test',
      questions: 20,
      time: '15 daqiqa',
      level: 'beginner',
      participants: 3400,
    },
    {
      title: 'O\'rta daraja testi',
      questions: 30,
      time: '25 daqiqa',
      level: 'intermediate',
      participants: 1800,
    },
    {
      title: 'Ekspert testi',
      questions: 50,
      time: '45 daqiqa',
      level: 'advanced',
      participants: 620,
    },
  ];

  const getLevelColor = (level: string) => {
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
  };

  const getLevelLabel = (level: string) => {
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
  };

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
            <div className="flex justify-center gap-4 mb-12">
              {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeLevel === level
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {getLevelLabel(level)}
                </button>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="articles" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="articles" className="gap-2">
                  <FileText className="w-4 h-4" />
                  {t.education.articles}
                </TabsTrigger>
                <TabsTrigger value="videos" className="gap-2">
                  <Video className="w-4 h-4" />
                  {t.education.videos}
                </TabsTrigger>
                <TabsTrigger value="tests" className="gap-2">
                  <CheckSquare className="w-4 h-4" />
                  {t.education.tests}
                </TabsTrigger>
              </TabsList>

              {/* Articles */}
              <TabsContent value="articles">
                <div className="grid gap-4">
                  {articles
                    .filter((a) => a.level === activeLevel)
                    .map((article, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-xl glass-card flex items-center justify-between gap-4 group hover:scale-[1.02] transition-transform duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary" />
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
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {article.views}
                          </div>
                          <Button variant="cyber" size="sm">
                            O'qish
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              {/* Videos */}
              <TabsContent value="videos">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos
                    .filter((v) => v.level === activeLevel)
                    .map((video, index) => (
                      <div
                        key={index}
                        className="rounded-xl glass-card overflow-hidden group hover:scale-105 transition-transform duration-300"
                      >
                        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110">
                            <Play className="w-8 h-8 text-primary-foreground ml-1" />
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
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              {video.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              {/* Tests */}
              <TabsContent value="tests">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tests
                    .filter((test) => test.level === activeLevel)
                    .map((test, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-xl glass-card group hover:scale-105 transition-transform duration-300"
                      >
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                          <CheckSquare className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          {test.title}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckSquare className="w-4 h-4" />
                            {test.questions} savol
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {test.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {test.participants} ishtirokchi
                          </div>
                        </div>
                        <Button variant="cyber" className="w-full">
                          Testni boshlash
                        </Button>
                      </div>
                    ))}
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
