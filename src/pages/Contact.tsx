import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Xabar yuborildi!',
      description: 'Tez orada siz bilan bog\'lanamiz.',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@cybersec.uz',
      href: 'mailto:info@cybersec.uz',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '+998 90 123 45 67',
      href: 'tel:+998901234567',
    },
    {
      icon: MapPin,
      label: 'Manzil',
      value: 'Toshkent, O\'zbekiston',
      href: '#',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Aloqa - CyberSec</title>
        <meta name="description" content="Biz bilan bog'laning. Savollaringizga javob beramiz." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="container px-4 mx-auto">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-primary-foreground" />
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.name}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ismingizni kiriting"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.email}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.message}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Xabaringizni yozing..."
                      rows={5}
                      required
                      className="bg-background/50 resize-none"
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
                        <Send className="w-5 h-5" />
                        {t.contact.send}
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="p-6 rounded-2xl glass-card flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      <info.icon className="w-7 h-7 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                      <div className="font-semibold text-foreground">{info.value}</div>
                    </div>
                  </a>
                ))}

                {/* Map Placeholder */}
                <div className="aspect-video rounded-2xl glass-card overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Toshkent, O'zbekiston</p>
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
