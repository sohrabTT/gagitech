"use client";

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    console.log('Password reset request for:', email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-primary mb-2">گجیتک مارکت</h1>
            <p className="text-muted-foreground">بازیابی رمز عبور</p>
          </div>
          
          {/* Forgot Password Card */}
          <div className="border rounded-2xl p-8 bg-card shadow-lg">
            {!isSubmitted ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">فراموشی رمز عبور</h2>
                  <p className="text-sm text-muted-foreground">
                    ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
                  </Button>
                </form>
                
                {/* Back to Login */}
                <div className="text-center mt-6">
                  <Link href="/login" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    <ArrowRight className="h-4 w-4" />
                    بازگشت به صفحه ورود
                  </Link>
                </div>
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-4">
                <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-2">ایمیل ارسال شد</h2>
                <p className="text-muted-foreground mb-6">
                  لینک بازیابی رمز عبور به ایمیل {email} ارسال شد. لطفاً ایمیل خود را بررسی کنید.
                </p>
                <Link href="/login">
                  <Button size="lg" className="w-full">
                    بازگشت به صفحه ورود
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
