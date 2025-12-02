import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Award, Users, ShieldCheck, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">درباره گجیتک مارکت</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              فروشگاه آنلاین تخصصی گجت‌های دیجیتال با بیش از 500 محصول اورجینال
            </p>
          </div>
        </section>
        
        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">داستان ما</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p>
                  گجیتک مارکت در سال 1400 با هدف ارائه بهترین محصولات تکنولوژی به مشتریان ایرانی تاسیس شد. 
                  ما باور داریم که هر فردی حق دسترسی به جدیدترین و باکیفیت‌ترین محصولات دیجیتال را دارد.
                </p>
                <p>
                  امروز با بیش از 50 هزار مشتری راضی و صدها برند معتبر جهانی، به یکی از پیشتازان فروش آنلاین 
                  محصولات دیجیتال در ایران تبدیل شده‌ایم. تیم ما متشکل از متخصصان با تجربه در حوزه تکنولوژی است 
                  که همواره در تلاش هستند بهترین خدمات را به شما ارائه دهند.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">ارزش‌های ما</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">اصالت کالا</h3>
                <p className="text-sm text-muted-foreground">100٪ اورجینال و گارانتی معتبر</p>
              </div>
              
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">رضایت مشتری</h3>
                <p className="text-sm text-muted-foreground">خدمات پس از فروش عالی</p>
              </div>
              
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-10 w-10 text-success" />
                </div>
                <h3 className="font-bold text-lg mb-2">ارسال سریع</h3>
                <p className="text-sm text-muted-foreground">به سراسر کشور</p>
              </div>
              
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-warning" />
                </div>
                <h3 className="font-bold text-lg mb-2">کیفیت برتر</h3>
                <p className="text-sm text-muted-foreground">بهترین محصولات دنیا</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">آماده خرید هستید؟</h2>
            <p className="text-muted-foreground mb-8">بیش از 500 محصول در انتظار شماست</p>
            <Button size="lg" asChild>
              <a href="/">مشاهده محصولات</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
