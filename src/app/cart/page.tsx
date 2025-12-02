"use client";

import { useState, useMemo } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { featuredProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    { product: featuredProducts[0], quantity: 1 },
    { product: featuredProducts[1], quantity: 2 }
  ]);
  
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price);
  }
  
  function updateQuantity(index: number, delta: number) {
    const newQuantity = cartItems[index].quantity + delta;
    if (newQuantity > 0) {
      const newItems = [...cartItems];
      newItems[index].quantity = newQuantity;
      setCartItems(newItems);
    }
  }
  
  function removeItem(index: number) {
    setCartItems(cartItems.filter((_, i) => i !== index));
  }
  
  function applyDiscount() {
    if (discountCode === 'WELCOME10') {
      setAppliedDiscount(10);
    }
  }
  
  const subtotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );
  
  const discount = useMemo(() => 
    Math.floor((subtotal * appliedDiscount) / 100),
    [subtotal, appliedDiscount]
  );
  
  const shipping = useMemo(() => subtotal > 5000000 ? 0 : 200000, [subtotal]);
  
  const tax = useMemo(() => Math.floor(subtotal * 0.09), [subtotal]);
  
  const total = useMemo(() => subtotal - discount + shipping + tax, [subtotal, discount, shipping, tax]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">سبد خرید</h1>
            <p className="text-sm sm:text-base text-gray-300">{cartItems.length} محصول در سبد خرید شما</p>
          </div>
          
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16">
              <div className="h-32 w-32 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">سبد خرید شما خالی است</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6">برای شروع خرید به صفحه محصولات بروید</p>
              <Link href="/">
                <Button size="lg" className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white">
                  <ArrowLeft className="h-5 w-5 ml-2" />
                  بازگشت به فروشگاه
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="border border-[#374151] rounded-lg p-6 bg-[#111827]">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.product.id}`}
                        className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[#1f2937]"
                      >
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <Link
                              href={`/product/${item.product.id}`}
                              className="font-bold text-lg sm:text-xl text-white hover:text-[#60a5fa] transition-colors block mb-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-300">{item.product.brand}</p>
                          </div>
                          <button
                            onClick={() => removeItem(index)}
                            className="h-9 w-9 rounded-lg hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-gray-300" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#374151] rounded-lg bg-[#0f172a]">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              className="h-9 w-9 flex items-center justify-center hover:bg-[#1f2937] transition-colors"
                            >
                              <Minus className="h-4 w-4 text-gray-300" />
                            </button>
                            <span className="h-9 w-12 flex items-center justify-center font-medium text-white border-x border-[#374151]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="h-9 w-9 flex items-center justify-center hover:bg-[#1f2937] transition-colors"
                            >
                              <Plus className="h-4 w-4 text-gray-300" />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <div className="text-left">
                            {item.product.discount && (
                              <div className="text-sm text-gray-400 line-through">
                                {formatPrice((item.product.originalPrice || 0) * item.quantity)}
                              </div>
                            )}
                            <div className="text-xl sm:text-2xl font-bold text-[#60a5fa]">
                              {formatPrice(item.product.price * item.quantity)} تومان
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-[#374151] rounded-lg p-6 bg-[#111827] sticky top-24 space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">خلاصه سفارش</h2>
                  
                  {/* Discount Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300" htmlFor="discount-code">کد تخفیف</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="کد تخفیف خود را وارد کنید"
                        className="flex-1 h-10 px-3 rounded-lg border border-[#374151] bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                        id="discount-code"
                      />
                      <Button onClick={applyDiscount} variant="outline" className="border-[#374151] text-white hover:bg-[#1f2937]">
                        اعمال
                      </Button>
                    </div>
                    {appliedDiscount > 0 && (
                      <p className="text-sm text-green-400">کد تخفیف با موفقیت اعمال شد</p>
                    )}
                  </div>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-3 py-4 border-y border-[#374151]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">جمع کالاها</span>
                      <span className="font-medium text-white">{formatPrice(subtotal)} تومان</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex items-center justify-between text-green-400">
                        <span>تخفیف ({appliedDiscount}٪)</span>
                        <span>-{formatPrice(discount)} تومان</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">هزینه ارسال</span>
                      <span className="font-medium text-white">
                        {shipping === 0 ? 'رایگان' : `${formatPrice(shipping)} تومان`}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">مالیات (9٪)</span>
                      <span className="font-medium text-white">{formatPrice(tax)} تومان</span>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold text-white">مبلغ قابل پرداخت</span>
                    <span className="font-black text-2xl sm:text-3xl text-[#60a5fa]">{formatPrice(total)} تومان</span>
                  </div>
                  
                  {/* Checkout Button */}
                  <Link href="/checkout" className="block w-full">
                    <Button size="lg" className="w-full text-base bg-[#1e40af] hover:bg-[#1e3a8a] text-white">
                      ادامه خرید
                      <ArrowLeft className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  
                  {/* Continue Shopping */}
                  <Link href="/" className="block w-full">
                    <Button size="lg" variant="outline" className="w-full text-base border-[#374151] text-white hover:bg-[#1f2937]">
                      بازگشت به فروشگاه
                    </Button>
                  </Link>
                  
                  {/* Free Shipping Notice */}
                  {shipping > 0 ? (
                    <div className="bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg p-3 text-sm text-center">
                      {formatPrice(5000000 - subtotal)} تومان تا ارسال رایگان
                    </div>
                  ) : (
                    <div className="bg-green-500/10 text-green-400 rounded-lg p-3 text-sm text-center">
                      شما از ارسال رایگان بهره‌مند می‌شوید
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
