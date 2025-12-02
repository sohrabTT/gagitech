import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary mt-16 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">درباره گجیتک مارکت</h3>
            <p className="text-sm text-white leading-relaxed">
              فروشگاه آنلاین تخصصی گجت‌های دیجیتال با بیش از 500 محصول اورجینال و گارانتی معتبر
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.instagram.com/gajitak.market" className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.twitter.com/gajitak.market" className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/gajitak.market" className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-white hover:text-primary transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="text-white hover:text-primary transition-colors">تماس با ما</Link></li>
              <li><Link href="/blog" className="text-white hover:text-primary transition-colors">بلاگ</Link></li>
              <li><Link href="/faq" className="text-white hover:text-primary transition-colors">سوالات متداول</Link></li>
              <li><Link href="/terms" className="text-white hover:text-primary transition-colors">قوانین و مقررات</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping" className="text-white hover:text-primary transition-colors">راهنمای خرید</Link></li>
              <li><Link href="/returns" className="text-white hover:text-primary transition-colors">رویه بازگشت کالا</Link></li>
              <li><Link href="/warranty" className="text-white hover:text-primary transition-colors">گارانتی محصولات</Link></li>
              <li><Link href="/track" className="text-white hover:text-primary transition-colors">پیگیری سفارش</Link></li>
              <li><Link href="/support" className="text-white hover:text-primary transition-colors">پشتیبانی</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-white">021-12345678</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-white">info@gajitak.market</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-white">تهران، خیابان ولیعصر، پلاک 123</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-white">
          <p>© 1403 گجیتک مارکت. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
