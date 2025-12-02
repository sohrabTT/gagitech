import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { featuredProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { Sparkles, Gift, Rocket, Star, PartyPopper, Calendar, Tag } from 'lucide-react';

export default function FestivalPage() {
  const festivalProducts = featuredProducts;
  
  const festivals = [
    {
      id: 1,
      title: 'جشنواره زمستانه',
      subtitle: 'تخفیف‌های باورنکردنی',
      description: 'بیش از 200 محصول با تخفیف ویژه',
      discount: '50%',
      image: '/placeholder.svg?height=400&width=600',
      color: 'from-blue-500 to-blue-700',
      active: true
    },
    {
      id: 2,
      title: 'جشن فروش گوشی',
      subtitle: 'آخرین مدل‌های موبایل',
      description: 'گوشی‌های هوشمند با قیمت استثنایی',
      discount: '40%',
      image: '/placeholder.svg?height=400&width=600',
      color: 'from-purple-500 to-purple-700',
      active: true
    },
    {
      id: 3,
      title: 'فستیوال لپ‌تاپ',
      subtitle: 'برای کار و بازی',
      description: 'لپ‌تاپ‌های قدرتمند با بهترین قیمت',
      discount: '35%',
      image: '/placeholder.svg?height=400&width=600',
      color: 'from-green-500 to-green-700',
      active: false
    }
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-accent-foreground py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 text-9xl">🎉</div>
            <div className="absolute bottom-20 left-20 text-9xl">🎁</div>
            <div className="absolute top-1/2 left-1/3 text-7xl">✨</div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">جشنواره‌های فروش</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-4">
                جشن بزرگ تخفیف‌ها
              </h1>
              <p className="text-2xl text-accent-foreground/90 mb-8">
                با هر خرید، جایزه بگیرید و از تخفیف‌های ویژه بهره‌مند شوید
              </p>
              <Button size="lg" variant="secondary" className="text-base px-8">
                <Gift className="h-5 w-5 ml-2" />
                مشاهده جوایز
              </Button>
            </div>
          </div>
        </section>
        
        {/* Active Festivals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">جشنواره‌های فعال</h2>
              <p className="text-muted-foreground">از این فرصت‌های طلایی استفاده کنید</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {festivals.filter(f => f.active).map((festival) => (
                <div key={festival.id} className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${festival.color} text-white p-8 group hover:shadow-2xl transition-shadow`}>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{festival.title}</h3>
                        <p className="text-lg opacity-90">{festival.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black">{festival.discount}</div>
                        <div className="text-sm opacity-80">تخفیف</div>
                      </div>
                    </div>
                    <p className="opacity-90 mb-6">{festival.description}</p>
                    <Button variant="secondary" className="group-hover:scale-105 transition-transform">
                      مشاهده محصولات
                    </Button>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Special Offers */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="h-6 w-6 text-warning fill-warning" />
                <h2 className="text-3xl font-bold">پیشنهادات ویژه جشنواره</h2>
                <Star className="h-6 w-6 text-warning fill-warning" />
              </div>
              <p className="text-muted-foreground">محصولات منتخب با قیمت استثنایی</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {festivalProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">مزایای خرید در جشنواره</h2>
              <p className="text-muted-foreground">چرا باید از این فرصت استفاده کنید؟</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-sale/10 flex items-center justify-center mx-auto mb-4">
                  <Tag className="h-8 w-8 text-sale" />
                </div>
                <h3 className="font-bold mb-2">تخفیف‌های ویژه</h3>
                <p className="text-sm text-muted-foreground">تا 50٪ تخفیف روی محصولات منتخب</p>
              </div>
              
              <div className="text-center p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold mb-2">جایزه با هر خرید</h3>
                <p className="text-sm text-muted-foreground">قرعه‌کشی و جوایز نقدی برای مشتریان</p>
              </div>
              
              <div className="text-center p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">ارسال فوری</h3>
                <p className="text-sm text-muted-foreground">ارسال رایگان و سریع به سراسر کشور</p>
              </div>
              
              <div className="text-center p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <PartyPopper className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-bold mb-2">گارانتی بازگشت</h3>
                <p className="text-sm text-muted-foreground">7 روز ضمانت بازگشت بدون قید و شرط</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming Festivals */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">جشنواره‌های آینده</h2>
              </div>
              <p className="text-muted-foreground">به زودی...</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {festivals.filter(f => !f.active).map((festival) => (
                <div key={festival.id} className="border rounded-xl p-6 bg-card text-center">
                  <div className="aspect-video rounded-lg overflow-hidden bg-secondary/30 mb-4">
                    <img 
                      src={festival.image || "/placeholder.svg"} 
                      alt={festival.title}
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{festival.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{festival.description}</p>
                  <Button variant="outline" className="w-full" disabled>
                    به زودی
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">فرصت را از دست ندهید!</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              جشنواره فروش محدود است. همین حالا خرید کنید و از تخفیف‌های ویژه بهره‌مند شوید
            </p>
            <Button size="lg" variant="secondary" className="text-base px-8">
              شروع خرید
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
