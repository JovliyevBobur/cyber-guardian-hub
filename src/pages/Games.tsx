import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Gamepad2, Fish, Key, Link2, Trophy, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Games = () => {
  const { t } = useLanguage();

  const games = [
    {
      icon: Fish,
      title: t.games.phishing.title,
      description: t.games.phishing.description,
      difficulty: 'Oson',
      players: 2340,
      rating: 4.8,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Key,
      title: t.games.password.title,
      description: t.games.password.description,
      difficulty: 'O\'rta',
      players: 1890,
      rating: 4.9,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Link2,
      title: t.games.links.title,
      description: t.games.links.description,
      difficulty: 'Qiyin',
      players: 1250,
      rating: 4.7,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const leaderboard = [
    { name: 'CyberHero', score: 9850, avatar: '🦸' },
    { name: 'SecureMaster', score: 9420, avatar: '🛡️' },
    { name: 'HackerHunter', score: 9100, avatar: '🎯' },
    { name: 'DataGuard', score: 8750, avatar: '🔐' },
    { name: 'NetDefender', score: 8320, avatar: '🌐' },
  ];

  return (
    <>
      <Helmet>
        <title>O'yinlar - CyberSafe Edu</title>
        <meta name="description" content="Kiber xavfsizlikni o'yin orqali o'rganing. Phishing, parol xavfsizligi va boshqa mavzular." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="container px-4 mx-auto">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <Gamepad2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.games.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.games.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Games Grid */}
              <div className="lg:col-span-2 space-y-6">
                {games.map((game, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl glass-card group hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <game.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {game.title}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {game.difficulty}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {game.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              {game.players.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              {game.rating}
                            </div>
                          </div>
                          <Button variant="cyber">
                            O'ynash
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Leaderboard */}
              <div className="lg:col-span-1">
                <div className="p-6 rounded-2xl glass-card sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Reyting
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {leaderboard.map((player, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-secondary/50 ${
                          index < 3 ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                          index === 1 ? 'bg-gray-400/20 text-gray-400' :
                          index === 2 ? 'bg-orange-500/20 text-orange-500' :
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="text-2xl">{player.avatar}</div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{player.name}</div>
                          <div className="text-sm text-muted-foreground">{player.score.toLocaleString()} ball</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Games;
