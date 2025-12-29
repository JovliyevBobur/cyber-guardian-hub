import React, { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, MessageSquare, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CONTACT_INFO } from '@/constants';
import { validateEmail, validateName } from '@/utils/validators';
import type { ContactFormData } from '@/types';

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo: ContactInfo[] = useMemo(
    () => [
      {
        icon: Mail,
        label: 'Email',
        value: CONTACT_INFO.email,
        href: `mailto:${CONTACT_INFO.email}`,
      },
      {
        icon: Phone,
        label: 'Telefon',
        value: CONTACT_INFO.phone,
        href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
      },
      {
        icon: MapPin,
        label: 'Manzil',
        value: CONTACT_INFO.address,
        href: '#',
      },
    ],
    []
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) {
      toast({
        title: 'Xatolik',
        description: nameValidation.message,
        variant: 'destructive',
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: 'Xatolik',
        description: 'To\'g\'ri email manzil kiriting.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      toast({
        title: 'Xatolik',
        description: 'Xabar kamida 10 ta belgidan iborat bo\'lishi kerak.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission - in production, send to backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Xabar yuborildi!',
        description: 'Tez orada siz bilan bog\'lanamiz.',
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: 'Xatolik',
        description: 'Xabar yuborishda xatolik yuz berdi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast]);

  return (
    <>
      <Helmet>
        <title>Aloqa - CyberSafe Edu</title>
        <meta name="description" content="Biz bilan bog'laning. Savollaringizga javob beramiz." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="container px-4 mx-auto">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-primary-foreground" aria-hidden="true" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.contact.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <div className="p-8 rounded-2xl glass-card">
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.name}
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ismingizni kiriting"
                      required
                      className="bg-background/50"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.email}
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                      className="bg-background/50"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.message}
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Xabaringizni yozing..."
                      rows={5}
                      required
                      className="bg-background/50 resize-none"
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="cyber"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Yuborilmoqda...'
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden="true" />
                        {t.contact.send}
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="p-6 rounded-2xl glass-card flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-300"
                      aria-label={`${info.label}: ${info.value}`}
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                        <IconComponent className="w-7 h-7 text-primary transition-colors group-hover:text-primary-foreground" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                        <div className="font-semibold text-foreground">{info.value}</div>
                      </div>
                    </a>
                  );
                })}

                {/* Map Placeholder */}
                <div className="aspect-video rounded-2xl glass-card overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" aria-hidden="true" />
                      <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                    </div>
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

export default Contact;
