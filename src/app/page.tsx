import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { categories, featuredProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { ChevronLeft, TrendingUp, Sparkles, Tag, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const bestsellers = featuredProducts.filter(p => p.isBestseller);
  const newProducts = featuredProducts.filter(p => p.isNew);

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://sakhtafzarmag.com/wp-content/uploads/2021/06/iPhone-13-Pro-Black-Color-1030x578-1.jpg"
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{ filter: 'blur(2px)' }}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/30 mb-4 sm:mb-6">
                <span className="h-2 w-2 bg-[#3b82f6] rounded-full animate-pulse"></span>
                <span className="text-white text-xs sm:text-sm font-medium">ویژه مشتریان ویژه</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                تکنولوژی آینده را امروز تجربه کنید
              </h1>
              
              <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
                بهترین محصولات الکترونیکی با کیفیت بالا و قیمت مناسب.
                تحویل سریع و پشتیبانی عالی برای مشتریان ما.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-white text-[#111827] px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg hover:shadow-[#3b82f6]/30 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  فروشگاه
                </button>
                <button className="border-2 border-white/30 text-white px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-semibold hover:bg-white hover:text-[#111827] transition-all duration-300 text-sm sm:text-base">
                  مشاهده محصولات
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-white/80 text-xs sm:text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#3b82f6] rounded-full"></span>
                  ارسال رایگان
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#10b981] rounded-full"></span>
                  پشتیبانی 24/7
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#f59e0b] rounded-full"></span>
                  ضمانت اصالت
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Banner Section */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="relative">
              <img
                src="/banner2.png"
                alt="Banner"
                className="w-full h-auto rounded-2xl sm:rounded-3xl lg:rounded-[28px] shadow-lg"
              />
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-8 sm:py-12 bg-[#1a223f]/70">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">دسته‌بندی محصولات</h2>
              <p className="text-gray-300 text-sm sm:text-base">انتخاب کنید و خرید کنید</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative bg-[#1f2937]/60 rounded-2xl sm:rounded-3xl md:rounded-[24px] lg:rounded-[28px] p-1 sm:p-2 md:p-3 lg:p-4 border border-[#374151] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all duration-300 text-center"
                >
                  <div className="aspect-square mb-1 sm:mb-2 md:mb-3 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[24px] overflow-hidden bg-[#374151]/50">
                    <img
                      src={category.id === '1' ? 'https://www.technolife.com/image/color_image_TLP-174088_e88fa955-1548-4bb8-8f18-8c88bac8be93.png' :
                           category.id === '2' ? 'https://cebit.ir/storage/images/products/69146899d66f57ca700ece02/1762945034-MacBook-Pro-MDE14-2025-M5-CEBIT.IR-1.jpg' :
                           category.id === '3' ? 'https://kiansama.com/wp-content/uploads/2025/11/jetfan-300x300.jpg' :
                           category.id === '4' ? 'https://agstatics-public.aloghesti.com/2024/12/PPBD30K-black.webp' :
                           category.id === '5' ? 'https://hilatel.ir/uploads/products/65f1b8b3ad78b_5392.jpg' :
                           'https://api2.zoomit.ir/media/66dff8ade404d665a09e0656'}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold mb-1 text-white group-hover:text-primary transition-colors text-[9px] sm:text-[10px] md:text-xs">{category.name}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-300">{category.productCount} محصول</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Banner Section */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="relative">
              <img
                src="/banner1.png"
                alt="Banner"
                className="w-full h-auto rounded-2xl sm:rounded-3xl lg:rounded-[28px] shadow-lg"
              />
            </div>
          </div>
        </section>
        
        
        {/* Promotion Banner */}
        <section className="py-6 sm:py-8 bg-gradient-to-r from-[#3b82f6]/90 to-[#1e40af]/70 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Tag className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 text-white">تخفیف‌های ویژه امروز</h3>
                  <p className="text-white/90 text-sm sm:text-base">تا 50٪ تخفیف روی محصولات منتخب</p>
                </div>
              </div>
              <Button size="lg" variant="secondary" className="text-sm sm:text-base px-6 sm:px-8 flex-shrink-0 rounded-xl sm:rounded-2xl bg-[#3b82f6] text-white hover:bg-[#1e40af]">
                مشاهده تخفیف‌ها
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Special Discount Products */}
        <section className="py-8 sm:py-12 bg-gradient-to-br from-[#1e40af]/5 to-[#3b82f6]/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-[#f59e0b] drop-shadow-lg" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">تخفیف ویژه</h2>
                <span className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">ویژه</span>
              </div>
              <Link href="/offers">
                <Button variant="outline" className="text-white border-white/50 hover:bg-white/20 hover:text-white text-sm sm:text-base shadow-md rounded-xl">
                  مشاهده همه
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-6">
              {featuredProducts.filter(p => p.isBestseller || p.isNew || p.isFeatured).slice(0, 6).map((product) => (
                <div key={product.id} className="group relative">
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50 hover:border-[#1e40af]/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af]/5 to-[#3b82f6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">تخفیف ویژه</span>
                    </div>
                    {product.discount && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#1e40af] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">-{product.discount}%</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
                      <h3 className="font-bold text-white text-sm sm:text-base mb-2 group-hover:text-[#f3f4f6] transition-colors">{product.name}</h3>
                      <div className="space-y-1">
                        {product.originalPrice && (
                          <div className="text-white/70 text-xs sm:text-sm line-through">
                            {product.originalPrice.toLocaleString()} تومان
                          </div>
                        )}
                        <div className="text-white font-bold text-lg sm:text-xl">
                          {product.price.toLocaleString()} تومان
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Banner Section */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="relative">
              <img
                src="/banner3.png"
                alt="Banner"
                className="w-full h-auto rounded-2xl sm:rounded-3xl lg:rounded-[28px] shadow-lg"
              />
            </div>
          </div>
        </section>
        
        {/* Regular Products */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">محصولات پیشنهادی</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
              {featuredProducts.slice(6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-12 sm:py-16 border-t border-[#374151]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white">چرا گجیتک مارکت؟</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-white text-sm sm:text-base">ضمانت اصالت کالا</h3>
                <p className="text-xs sm:text-sm text-gray-300">100٪ اورجینال و گارانتی معتبر</p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-white text-sm sm:text-base">ارسال سریع</h3>
                <p className="text-xs sm:text-sm text-gray-300">ارسال به سراسر کشور در کمترین زمان</p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-white text-sm sm:text-base">پرداخت امن</h3>
                <p className="text-xs sm:text-sm text-gray-300">درگاه پرداخت معتبر و امن</p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-white text-sm sm:text-base">پشتیبانی 24/7</h3>
                <p className="text-xs sm:text-sm text-gray-300">پاسخگویی در تمام ساعات شبانه‌روز</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
