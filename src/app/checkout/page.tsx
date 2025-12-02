"use client";

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  CreditCard, 
  Wallet, 
  Banknote,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Mail
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  
  // Form data
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    nationalCode: ''
  });
  
  const [shippingAddress, setShippingAddress] = useState({
    province: '',
    city: '',
    address: '',
    postalCode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'card' | 'cash'>('online');
  
  // Mock cart summary
  const orderSummary = {
    subtotal: 123500000,
    discount: 12350000,
    shipping: 0,
    tax: 11115000,
    total: 122265000
  };
  
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price);
  }
  
  function goToNextStep() {
    if (step < 3) {
      setStep(step + 1);
    }
  }
  
  function goToPreviousStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }
  
  function submitOrder() {
    console.log('Order submitted', { customerInfo, shippingAddress, paymentMethod });
    setStep(4); // Success page
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {step < 4 ? (
            <>
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  {[1, 2, 3].map((stepNum) => (
                    <div key={stepNum} className="flex items-center gap-2">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                        step >= stepNum ? 'bg-[#60a5fa] text-white' : 'bg-[#374151] text-gray-300'
                      }`}>
                        {stepNum}
                      </div>
                      <span className={`hidden md:inline font-medium ${
                        step >= stepNum ? 'text-white' : 'text-gray-300'
                      }`}>
                        {stepNum === 1 ? 'اطلاعات' : stepNum === 2 ? 'آدرس' : 'پرداخت'}
                      </span>
                      {stepNum < 3 && (
                        <div className={`h-0.5 w-12 mx-2 ${step > stepNum ? 'bg-[#60a5fa]' : 'bg-[#374151]'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Form Steps */}
                <div className="lg:col-span-2">
                  {step === 1 && (
                    /* Customer Information */
                    <div className="border border-[#374151] rounded-lg p-6 bg-[#111827]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-full bg-[#60a5fa]/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-[#60a5fa]" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white">اطلاعات مشتری</h2>
                          <p className="text-sm text-gray-300">لطفاً اطلاعات خود را وارد کنید</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-gray-300">نام *</Label>
                          <Input
                            id="firstName"
                            value={customerInfo.firstName}
                            onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                            placeholder="نام خود را وارد کنید"
                            className="bg-[#0f172a] border-[#374151] text-white focus:ring-[#60a5fa]"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-gray-300">نام خانوادگی *</Label>
                          <Input
                            id="lastName"
                            value={customerInfo.lastName}
                            onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                            placeholder="نام خانوادگی خود را وارد کنید"
                            className="bg-[#0f172a] border-[#374151] text-white focus:ring-[#60a5fa]"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-300">شماره موبایل *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                            placeholder="09123456789"
                            className="bg-[#0f172a] border-[#374151] text-white focus:ring-[#60a5fa]"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-300">ایمیل</Label>
                          <Input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                            placeholder="example@email.com"
                            className="bg-[#0f172a] border-[#374151] text-white focus:ring-[#60a5fa]"
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="nationalCode" className="text-gray-300">کد ملی *</Label>
                          <Input
                            id="nationalCode"
                            value={customerInfo.nationalCode}
                            onChange={(e) => setCustomerInfo({...customerInfo, nationalCode: e.target.value})}
                            placeholder="کد ملی 10 رقمی"
                            className="bg-[#0f172a] border-[#374151] text-white focus:ring-[#60a5fa]"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 mt-6">
                        <Button size="lg" className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white">
                          مرحله بعد
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    /* Shipping Address */
                    <div className="border rounded-lg p-6 bg-card">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">آدرس تحویل</h2>
                          <p className="text-sm text-muted-foreground">آدرس کامل خود را وارد کنید</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="province">استان *</Label>
                            <select
                              id="province"
                              value={shippingAddress.province}
                              onChange={(e) => setShippingAddress({...shippingAddress, province: e.target.value})}
                              className="w-full h-10 px-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              required
                            >
                              <option value="">انتخاب کنید</option>
                              <option value="tehran">تهران</option>
                              <option value="isfahan">اصفهان</option>
                              <option value="shiraz">شیراز</option>
                              <option value="mashhad">مشهد</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="city">شهر *</Label>
                            <select
                              id="city"
                              value={shippingAddress.city}
                              onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                              className="w-full h-10 px-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              required
                            >
                              <option value="">انتخاب کنید</option>
                              <option value="tehran">تهران</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">آدرس کامل *</Label>
                          <Textarea 
                            id="address" 
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                            placeholder="آدرس کامل پستی خود را وارد کنید"
                            rows={4}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">کد پستی *</Label>
                          <Input 
                            id="postalCode" 
                            value={shippingAddress.postalCode}
                            onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                            placeholder="کد پستی 10 رقمی بدون خط تیره"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between gap-3 mt-6">
                        <Button size="lg" variant="outline" onClick={goToPreviousStep}>
                          مرحله قبل
                        </Button>
                        <Button size="lg" onClick={goToNextStep}>
                          مرحله بعد
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    /* Payment Method */
                    <div className="border border-[#374151] rounded-lg p-6 bg-[#111827]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-[#22c55e]" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white">روش پرداخت</h2>
                          <p className="text-sm text-gray-300">نحوه پرداخت خود را انتخاب کنید</p>
                        </div>
                      </div>
                      
                      <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)} className="space-y-3">
                        <div className={`border border-[#374151] rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === 'online' ? 'border-[#60a5fa] bg-[#60a5fa]/5' : 'hover:border-[#374151]'
                        }`}>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online" className="flex items-center gap-3 cursor-pointer flex-1">
                              <div className="h-10 w-10 rounded-full bg-[#60a5fa]/10 flex items-center justify-center">
                                <Wallet className="h-5 w-5 text-[#60a5fa]" />
                              </div>
                              <div>
                                <div className="font-semibold text-white">پرداخت آنلاین</div>
                                <div className="text-sm text-gray-300">پرداخت از طریق درگاه بانکی</div>
                              </div>
                            </Label>
                          </div>
                        </div>
                        
                        <div className={`border border-[#374151] rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === 'card' ? 'border-[#60a5fa] bg-[#60a5fa]/5' : 'hover:border-[#374151]'
                        }`}>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                              <div className="h-10 w-10 rounded-full bg-[#a78bfa]/10 flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-[#a78bfa]" />
                              </div>
                              <div>
                                <div className="font-semibold text-white">پرداخت با کارت</div>
                                <div className="text-sm text-gray-300">پرداخت با کارت بانکی</div>
                              </div>
                            </Label>
                          </div>
                        </div>
                        
                        <div className={`border border-[#374151] rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === 'cash' ? 'border-[#60a5fa] bg-[#60a5fa]/5' : 'hover:border-[#374151]'
                        }`}>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                              <div className="h-10 w-10 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                                <Banknote className="h-5 w-5 text-[#f59e0b]" />
                              </div>
                              <div>
                                <div className="font-semibold text-white">پرداخت در محل</div>
                                <div className="text-sm text-gray-300">پرداخت هنگام تحویل کالا</div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                      
                      <div className="flex justify-between gap-3 mt-6">
                        <Button size="lg" variant="outline" className="border-[#374151] text-white hover:bg-[#1f2937]" onClick={goToPreviousStep}>
                          مرحله قبل
                        </Button>
                        <Button size="lg" className="bg-[#22c55e] hover:bg-[#16a34a] text-white" onClick={submitOrder}>
                          <CheckCircle2 className="h-5 w-5 ml-2" />
                          تکمیل خرید
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                  <div className="border border-[#374151] rounded-lg p-6 bg-[#111827] sticky top-24 space-y-4">
                    <h3 className="font-bold text-lg sm:text-xl text-white">خلاصه سفارش</h3>
                    
                    <div className="space-y-3 py-4 border-y border-[#374151] text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">جمع کالاها</span>
                        <span className="text-white">{formatPrice(orderSummary.subtotal)} تومان</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-[#22c55e]">
                        <span>تخفیف</span>
                        <span>-{formatPrice(orderSummary.discount)} تومان</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">هزینه ارسال</span>
                        <span className="text-white">{orderSummary.shipping === 0 ? 'رایگان' : `${formatPrice(orderSummary.shipping)} تومان`}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">مالیات</span>
                        <span className="text-white">{formatPrice(orderSummary.tax)} تومان</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className="text-white">مبلغ قابل پرداخت</span>
                      <span className="text-2xl sm:text-3xl text-[#60a5fa]">{formatPrice(orderSummary.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success Page */
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="h-24 w-24 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12 text-[#22c55e]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">سفارش شما با موفقیت ثبت شد!</h1>
              <p className="text-lg text-gray-300 mb-8">
                شماره سفارش شما: <span className="font-bold text-[#60a5fa]">12345678</span>
              </p>
              <p className="text-gray-300 mb-8">
                سفارش شما در حال پردازش است و به زودی برای ارسال آماده می‌شود.
                اطلاعات پیگیری سفارش به ایمیل و شماره موبایل شما ارسال شد.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/orders">
                  <Button size="lg" className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white">
                    پیگیری سفارش
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline" className="border-[#374151] text-white hover:bg-[#1f2937]">
                    بازگشت به فروشگاه
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
