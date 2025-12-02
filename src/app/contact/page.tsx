"use client";

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    console.log('Contact form submitted:', { name, email, subject, message });
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('پیام شما با موفقیت ارسال شد');
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">تماس با ما</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ما همیشه آماده پاسخگویی به سوالات شما هستیم
            </p>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">تلفن</h3>
                    <p className="text-muted-foreground">021-12345678</p>
                    <p className="text-muted-foreground">021-87654321</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">ایمیل</h3>
                    <p className="text-muted-foreground">info@gajitak.market</p>
                    <p className="text-muted-foreground">support@gajitak.market</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">آدرس</h3>
                    <p className="text-muted-foreground">تهران، خیابان ولیعصر، پلاک 123، طبقه 4</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-xl p-6 bg-card">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">ساعات کاری</h3>
                    <p className="text-muted-foreground">شنبه تا پنجشنبه: 9 صبح تا 6 عصر</p>
                    <p className="text-muted-foreground">جمعه: تعطیل</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="border rounded-xl p-8 bg-card">
                <h2 className="text-2xl font-bold mb-6">فرم تماس</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">نام و نام خانوادگی *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="نام خود را وارد کنید"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">ایمیل *</Label>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">موضوع *</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="موضوع پیام خود را وارد کنید"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">پیام *</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="پیام خود را بنویسید..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'در حال ارسال...' : 'ارسال پیام'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
