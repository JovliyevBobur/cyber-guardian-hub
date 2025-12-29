import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react';

const Auth = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'register') {
      setMode('register');
    } else {
      setMode('login');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      toast({
        title: 'Muvaffaqiyatli!',
        description: 'Tizimga kirdingiz.',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Xatolik',
        description: error.message || 'Tizimga kirishda xatolik yuz berdi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerPassword !== confirmPassword) {
      toast({
        title: 'Xatolik',
        description: 'Parollar mos kelmaydi.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (registerPassword.length < 6) {
      toast({
        title: 'Xatolik',
        description: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            full_name: registerName,
          },
        },
      });

      if (authError) throw authError;

      // Create profile in profiles table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            full_name: registerName,
            avatar_url: null,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't throw here, user is already created
        }
      }

      toast({
        title: 'Muvaffaqiyatli!',
        description: 'Ro\'yxatdan o\'tdingiz. Emailingizni tekshiring.',
      });
      setMode('login');
      // Clear form
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: 'Xatolik',
        description: error.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{mode === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'} | CyberSafe Edu</title>
        <meta name="description" content="CyberSafe Edu platformasiga kiring yoki ro'yxatdan o'ting." />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <Navbar />
        
        <main className="pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4 max-w-md">
            {/* Back button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Bosh sahifa</span>
            </Link>

            <Card className="glass-card border-border/50">
              <CardHeader className="text-center space-y-4">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  </div>
                </div>

                <CardTitle className="text-3xl font-display font-bold text-foreground">
                  {mode === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
                </CardTitle>
                <CardDescription className="text-base">
                  {mode === 'login' 
                    ? 'Hisobingizga kiring' 
                    : 'Yangi hisob yarating'}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {mode === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="ababab@gmail.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Parol</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showLoginPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showLoginPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="cyber" 
                      className="w-full h-12 text-base font-semibold" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Yuklanmoqda...' : 'Kirish'}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      <span>Hisobingiz yo'qmi? </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('register');
                          navigate('/auth?mode=register');
                        }}
                        className="text-primary hover:underline font-medium"
                      >
                        Ro'yxatdan o'tish
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">To'liq ism</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Abababa"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="abababab@gmail.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Parol</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type={showRegisterPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className="pl-10 pr-10 h-12"
                          minLength={6}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showRegisterPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Parolni tasdiqlang</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 pr-10 h-12"
                          minLength={6}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="cyber" 
                      className="w-full h-12 text-base font-semibold" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish'}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      <span>Allaqachon hisobingiz bormi? </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          navigate('/auth');
                        }}
                        className="text-primary hover:underline font-medium"
                      >
                        Kirish
                      </button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Auth;
