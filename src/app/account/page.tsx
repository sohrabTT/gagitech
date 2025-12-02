"use client";

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { User, Package, MapPin, Settings, LogOut, ChevronLeft } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  
  const user = {
    name: 'محمد علی',
    email: 'mohammad.ali@example.com',
    phone: '+98 910 123 4567',
    joinDate: '۱۴۰۲/۰۳/۱۵'
  };

  const orders = [
    {
      id: '#ORD-001',
      date: '۱۴۰۳/۰۹/۰۲',
      total: '۲,۵۰۰,۰۰۰ تومان',
      status: 'تکمیل‌شده',
      statusColor: 'bg-success/10 text-success',
      items: 'آیفون ۱۵ پرو'
    },
    {
      id: '#ORD-002',
      date: '۱۴۰۳/۰۸/۲۵',
      total: '۸۵۰,۰۰۰ تومان',
      status: 'در حال ارسال',
      statusColor: 'bg-warning/10 text-warning',
      items: 'هدفون بلوتوثی'
    },
    {
      id: '#ORD-003',
      date: '۱۴۰۳/۰۸/۱۵',
      total: '۱,۲۰۰,۰۰۰ تومان',
      status: 'تکمیل‌شده',
      statusColor: 'bg-success/10 text-success',
      items: 'کابل شارژ سریع'
    }
  ];

  const addresses = [
    {
      id: 1,
      type: 'منزل',
      name: 'آپارتمان شمال',
      address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
      phone: '+98 910 123 4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'محل کار',
      name: 'دفتر کار',
      address: 'تهران، خیابان آزادی، پلاک ۴۵۶',
      phone: '+98 911 987 6543',
      isDefault: false
    }
  ];

  const savedItems = [
    { id: 1, title: 'آیفون ۱۵ پرو مکس', price: '۳,۲۰۰,۰۰۰ تومان', image: '/modern-smartphones-collection.jpg' },
    { id: 2, title: 'مک‌بوک پرو ۱۶ اینچ', price: '۴۵,۰۰۰,۰۰۰ تومان', image: '/premium-laptops-display.jpg' },
    { id: 3, title: 'اپل واچ سریز ۹', price: '۲,۱۰۰,۰۰۰ تومان', image: '/smartwatch-collection.png' }
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-secondary/30 py-8">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">حساب کاربری</h1>
            <p className="text-muted-foreground">مدیریت پروفایل، سفارشات و تنظیمات</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border p-6 sticky top-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold truncate">{user.name}</h2>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                      activeTab === 'orders'
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Package className="h-5 w-5 flex-shrink-0" />
                    <span>سفارشات</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                      activeTab === 'addresses'
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span>آدرس‌ها</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                      activeTab === 'saved'
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <User className="h-5 w-5 flex-shrink-0" />
                    <span>آیتم‌های ذخیره‌شده</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                      activeTab === 'profile'
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    <span>تنظیمات حساب</span>
                  </button>

                  <hr className="my-2" />

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors text-right">
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span>خروج</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">سفارشات من</h2>
                    <Button variant="outline">
                      مشاهده همه
                      <ChevronLeft className="h-4 w-4 mr-2" />
                    </Button>
                  </div>

                  {orders.map((order) => (
                    <div key={order.id} className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-bold text-lg">{order.id}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{order.items}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span>تاریخ: {order.date}</span>
                            <span>مجموع: {order.total}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="flex-shrink-0">
                          جزئیات
                          <ChevronLeft className="h-4 w-4 mr-2" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">آدرس‌های من</h2>
                    <Button>
                      افزودن آدرس جدید
                      <ChevronLeft className="h-4 w-4 mr-2" />
                    </Button>
                  </div>

                  {addresses.map((address) => (
                    <div key={address.id} className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{address.name}</h3>
                            {address.isDefault && (
                              <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded">پیش‌فرض</span>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{address.type}</p>
                          <p className="text-sm mb-2">{address.address}</p>
                          <p className="text-sm text-muted-foreground">{address.phone}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button variant="outline" size="sm">ویرایش</Button>
                          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">
                            حذف
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Saved Items Tab */}
              {activeTab === 'saved' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">آیتم‌های ذخیره‌شده</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedItems.map((item) => (
                      <div key={item.id} className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all">
                        <div className="aspect-square overflow-hidden bg-secondary/50">
                          <img 
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                          <p className="text-lg font-bold text-primary mb-4">{item.price}</p>
                          <Button className="w-full">
                            افزودن به سبد
                            <ChevronLeft className="h-4 w-4 mr-2" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Settings Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">تنظیمات حساب</h2>

                  {/* Personal Info */}
                  <div className="bg-card rounded-xl border p-6">
                    <h3 className="text-xl font-bold mb-4">اطلاعات شخصی</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">نام کامل</label>
                        <input
                          id="fullName"
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">ایمیل</label>
                        <input
                          id="email"
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">شماره تماس</label>
                        <input
                          id="phone"
                          type="tel"
                          defaultValue={user.phone}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <Button className="w-full">ذخیره تغییرات</Button>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="bg-card rounded-xl border p-6">
                    <h3 className="text-xl font-bold mb-4">امنیت</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full">
                        تغییر رمز عبور
                        <ChevronLeft className="h-4 w-4 mr-2" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        تنظیمات احراز هویت دو مرحله‌ای
                        <ChevronLeft className="h-4 w-4 mr-2" />
                      </Button>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="bg-card rounded-xl border p-6">
                    <h3 className="text-xl font-bold mb-4">اطلاع‌رسانی‌ها</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <span>ایمیل برای سفارشات جدید</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <span>ایمیل برای تخفیف‌های ویژه</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <span>اخطار برای بازگشت محصولات</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
