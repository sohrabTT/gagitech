"use client";

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }
    
    if (!agreeToTerms) {
      alert('لطفاً قوانین و مقررات را بپذیرید');
      return;
    }
    
    setIsLoading(true);
    console.log('Register attempt:', { firstName, lastName, email, phone });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // Redirect to login or home
    window.location.href = '/login';
  }
  
  function handleSocialRegister(provider: string) {
    console.log('Social register:', provider);
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-primary mb-2">گجیتک مارکت</h1>
            <p className="text-muted-foreground">عضویت در فروشگاه</p>
          </div>
          
          {/* Register Card */}
          <div className="border rounded-2xl p-8 bg-card shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">ثبت‌نام</h2>
              <p className="text-sm text-muted-foreground">
                برای ایجاد حساب کاربری فرم را تکمیل کنید
              </p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">نام</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="نام"
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">نام خانوادگی</Label>
                  <Input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="نام خانوادگی"
                    required
                  />
                </div>
              </div>
              
              {/* Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="phone">شماره موبایل</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    className="pr-10"
                    required
                  />
                </div>
              </div>
              
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
              
              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="حداقل 8 کاراکتر"
                    className="pr-10 pl-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="رمز عبور را دوباره وارد کنید"
                    className="pr-10 pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Terms Checkbox */}
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeToTerms}
                  onCheckedChange={(c) => setAgreeToTerms(!!c)}
                  className="mt-1" 
                />
                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                  <Link href="/terms" className="text-primary hover:underline">قوانین و مقررات</Link>
                  {' '}و{' '}
                  <Link href="/privacy" className="text-primary hover:underline">حریم خصوصی</Link>
                  {' '}را مطالعه کرده و می‌پذیرم
                </Label>
              </div>
              
              {/* Register Button */}
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
              </Button>
            </form>
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">یا ثبت‌نام با</span>
              </div>
            </div>
            
            {/* Social Register */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleSocialRegister('google')}
                className="w-full"
              >
                <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                گوگل
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleSocialRegister('apple')}
                className="w-full"
              >
                <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                اپل
              </Button>
            </div>
            
            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              قبلاً ثبت‌نام کرده‌اید؟
              <Link href="/login" className="text-primary font-medium hover:underline">
                وارد شوید
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
