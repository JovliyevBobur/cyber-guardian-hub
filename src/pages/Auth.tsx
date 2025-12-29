import React, { useState, useEffect, useCallback } from 'react';
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
import { validateEmail, validatePassword, validateName } from '@/utils/validators';

type AuthMode = 'login' | 'register';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Auth: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');

  // Login form state
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    setMode(modeParam === 'register' ? 'register' : 'login');
  }, [searchParams]);

  const handleLoginChange = useCallback((field: keyof LoginFormData, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleRegisterChange = useCallback((field: keyof RegisterFormData, value: string) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(loginForm.email)) {
      toast({
        title: 'Xatolik',
        description: 'To\'g\'ri email manzil kiriting.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email.trim(),
        password: loginForm.password,
      });

      if (error) throw error;

      toast({
        title: 'Muvaffaqiyatli!',
        description: 'Tizimga kirdingiz.',
      });
      navigate('/');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Tizimga kirishda xatolik yuz berdi.';
      toast({
        title: 'Xatolik',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [loginForm, toast, navigate]);

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate name
    const nameValidation = validateName(registerForm.name);
    if (!nameValidation.valid) {
      toast({
        title: 'Xatolik',
        description: nameValidation.message,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Validate email
    if (!validateEmail(registerForm.email)) {
      toast({
        title: 'Xatolik',
        description: 'To\'g\'ri email manzil kiriting.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(registerForm.password);
    if (!passwordValidation.valid) {
      toast({
        title: 'Xatolik',
        description: passwordValidation.message,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Check password match
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: 'Xatolik',
        description: 'Parollar mos kelmaydi.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: registerForm.email.trim(),
        password: registerForm.password,
        options: {
          data: {
            full_name: registerForm.name.trim(),
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
            full_name: registerForm.name.trim(),
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
      setRegisterForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ro\'yxatdan o\'tishda xatolik yuz berdi.';
      toast({
        title: 'Xatolik',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [registerForm, toast]);

  const switchMode = useCallback((newMode: AuthMode) => {
    setMode(newMode);
    navigate(newMode === 'register' ? '/auth?mode=register' : '/auth');
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>{mode === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'} | CyberSafe Edu</title>
        <meta name="description" content="CyberSafe Edu platformasiga kiring yoki ro'yxatdan o'ting." />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" aria-hidden="true" />
        
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

        <Navbar />
        
        <main className="pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4 max-w-md">
            {/* Back button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              aria-label="Bosh sahifaga qaytish"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Bosh sahifa</span>
            </Link>

            <Card className="glass-card border-border/50">
              <CardHeader className="text-center space-y-4">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-10 h-10 text-primary" aria-hidden="true" />
                    </div>
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" aria-hidden="true" />
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
                  <form onSubmit={handleLogin} className="space-y-4" noValidate>
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="ababab@gmail.com"
                          value={loginForm.email}
                          onChange={(e) => handleLoginChange('email', e.target.value)}
                          className="pl-10 h-12"
                          required
                          autoComplete="email"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Parol</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="login-password"
                          type={showLoginPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) => handleLoginChange('password', e.target.value)}
                          className="pl-10 pr-10 h-12"
                          required
                          autoComplete="current-password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showLoginPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
                          disabled={isLoading}
                        >
                          {showLoginPassword ? (
                            <EyeOff className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <Eye className="w-5 h-5" aria-hidden="true" />
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
                        onClick={() => switchMode('register')}
                        className="text-primary hover:underline font-medium"
                        disabled={isLoading}
                      >
                        Ro'yxatdan o'tish
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4" noValidate>
                    <div className="space-y-2">
                      <Label htmlFor="register-name">To'liq ism</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Abababa"
                          value={registerForm.name}
                          onChange={(e) => handleRegisterChange('name', e.target.value)}
                          className="pl-10 h-12"
                          required
                          autoComplete="name"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="abababab@gmail.com"
                          value={registerForm.email}
                          onChange={(e) => handleRegisterChange('email', e.target.value)}
                          className="pl-10 h-12"
                          required
                          autoComplete="email"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Parol</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="register-password"
                          type={showRegisterPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={registerForm.password}
                          onChange={(e) => handleRegisterChange('password', e.target.value)}
                          className="pl-10 pr-10 h-12"
                          minLength={6}
                          required
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showRegisterPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
                          disabled={isLoading}
                        >
                          {showRegisterPassword ? (
                            <EyeOff className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <Eye className="w-5 h-5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Parolni tasdiqlang</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={registerForm.confirmPassword}
                          onChange={(e) => handleRegisterChange('confirmPassword', e.target.value)}
                          className="pl-10 pr-10 h-12"
                          minLength={6}
                          required
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showConfirmPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <Eye className="w-5 h-5" aria-hidden="true" />
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
                        onClick={() => switchMode('login')}
                        className="text-primary hover:underline font-medium"
                        disabled={isLoading}
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
