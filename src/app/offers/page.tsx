"use client";

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { featuredProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { Tag, Zap, Clock } from 'lucide-react';

export default function OffersPage() {
  // Filter discounted products
  const discountedProducts = featuredProducts.filter(p => p.discount);
  
  const [sortBy, setSortBy] = useState('discount');
  const [minDiscount, setMinDiscount] = useState(0);
  
  // Countdown timer
  const [timeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 48
  });
  
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price);
  }
  
  const sortOptions = [
    { value: 'discount', label: 'بیشترین تخفیف' },
    { value: 'price-low', label: 'ارزان‌ترین' },
    { value: 'price-high', label: 'گران‌ترین' },
    { value: 'newest', label: 'جدیدترین' }
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-sale via-sale/90 to-sale/80 text-sale-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                <Zap className="h-5 w-5" />
                <span className="font-medium">تخفیف‌های ویژه</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                فرصت‌های استثنایی خرید
              </h1>
              <p className="text-xl text-sale-foreground/90 mb-6">
                تخفیف تا 50٪ روی محصولات منتخب
              </p>
              
              {/* Countdown Timer */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">پایان تخفیف‌ها</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-black mb-1">{formatPrice(timeLeft.days)}</div>
                    <div className="text-sm opacity-80">روز</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black mb-1">{formatPrice(timeLeft.hours)}</div>
                    <div className="text-sm opacity-80">ساعت</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black mb-1">{formatPrice(timeLeft.minutes)}</div>
                    <div className="text-sm opacity-80">دقیقه</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black mb-1">{formatPrice(timeLeft.seconds)}</div>
                    <div className="text-sm opacity-80">ثانیه</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Discount Categories */}
        <section className="py-8 bg-secondary/30 border-b">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              <Button variant={minDiscount === 0 ? 'default' : 'outline'} onClick={() => setMinDiscount(0)}>
                همه تخفیف‌ها
              </Button>
              <Button variant={minDiscount === 50 ? 'default' : 'outline'} onClick={() => setMinDiscount(50)}>
                بالای 50٪
              </Button>
              <Button variant={minDiscount === 30 ? 'default' : 'outline'} onClick={() => setMinDiscount(30)}>
                بالای 30٪
              </Button>
              <Button variant={minDiscount === 20 ? 'default' : 'outline'} onClick={() => setMinDiscount(20)}>
                بالای 20٪
              </Button>
              <Button variant={minDiscount === 10 ? 'default' : 'outline'} onClick={() => setMinDiscount(10)}>
                بالای 10٪
              </Button>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-sale" />
              <span className="font-medium">{discountedProducts.length} محصول تخفیف‌دار</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Discounted Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              مشاهده محصولات بیشتر
            </Button>
          </div>
        </div>
        
        {/* Newsletter */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">از تخفیف‌ها با خبر شوید</h2>
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              با عضویت در خبرنامه، از جدیدترین تخفیف‌ها و پیشنهادات ویژه مطلع شوید
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 h-12 px-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button size="lg" variant="secondary">
                عضویت
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
