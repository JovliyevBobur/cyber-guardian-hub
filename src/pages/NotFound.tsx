import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Sahifa topilmadi | CyberSafe Edu</title>
        <meta name="description" content="Sahifa topilmadi" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <AlertCircle className="w-24 h-24 text-primary" aria-hidden="true" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" aria-hidden="true" />
            </div>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-bold text-foreground mb-4">
            404
          </h1>
          
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Sahifa topilmadi
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Kechirasiz, siz qidirgan sahifa mavjud emas yoki o'chirilgan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cyber" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                Bosh sahifaga qaytish
              </Link>
            </Button>
            <Button variant="cyberOutline" onClick={() => window.history.back()}>
              Orqaga
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
