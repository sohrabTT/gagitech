"use client";

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { featuredProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check,
  Truck,
  Shield,
  RefreshCw,
  ZoomIn,
  ChevronLeft,
  ThumbsUp
} from 'lucide-react';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Get product data from the products data
  const unwrappedParams = React.use(params);
  const product = featuredProducts.find(p => p.id === unwrappedParams.id);
  
  // If product not found, show error
  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">محصول یافت نشد</h1>
            <p className="text-muted-foreground">متاسفانه محصول مورد نظر شما پیدا نشد.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  const relatedProducts = featuredProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: 'علی احمدی',
      rating: 5,
      date: '1403/08/15',
      title: 'عالی و باکیفیت',
      comment: 'محصول فوق‌العاده‌ای است. کیفیت ساخت عالی و عملکرد بسیار خوب. پیشنهاد می‌کنم حتماً بخرید.',
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      user: 'مریم رضایی',
      rating: 4,
      date: '1403/08/10',
      title: 'خوب اما قیمت بالا',
      comment: 'محصول خوبی است ولی به نظرم قیمتش کمی بالاست. در کل راضی هستم.',
      helpful: 12,
      verified: true
    },
    {
      id: 3,
      user: 'حسین کریمی',
      rating: 5,
      date: '1403/08/05',
      title: 'بهترین خرید امسال',
      comment: 'واقعاً ارزش خرید را دارد. از همه نظر عالی است و توصیه می‌کنم.',
      helpful: 18,
      verified: false
    }
  ];
  
  const images = product.images || [product.image, product.image, product.image];
  
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price);
  }
  
  function addToCart() {
    if (product) {
      console.log('Adding to cart:', product.name, 'quantity:', quantity);
    }
  }
  
  function toggleWishlist() {
    if (product) {
      console.log('Toggle wishlist:', product.name);
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-white/20 bg-white/5">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <a href="/" className="text-white/70 hover:text-white transition-colors">خانه</a>
              <span className="text-white/50">/</span>
              <a href="/categories" className="text-white/70 hover:text-white transition-colors">دسته‌بندی‌ها</a>
              <span className="text-white/50">/</span>
              <a href={`/category/${product.category}`} className="text-white/70 hover:text-white transition-colors">{product.category}</a>
              <span className="text-white/50">/</span>
              <span className="font-medium text-white">{product.name}</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-[28px] overflow-hidden bg-white border border-gray-200 group hover:shadow-2xl transition-all duration-300">
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Beautiful gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {product.discount && (
                    <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1.5 rounded-[28px] shadow-lg border border-white/20 backdrop-blur-sm">
                      {product.discount}٪ تخفیف
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#1e40af] text-white text-sm font-bold px-3 py-1.5 rounded-[28px] shadow-lg border border-white/20 backdrop-blur-sm">
                      جدید
                    </span>
                  )}
                </div>
                
                {/* Zoom button */}
                <button className="absolute bottom-4 left-4 h-12 w-12 rounded-full bg-gray-900/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800 hover:scale-110 shadow-xl border border-gray-700">
                  <ZoomIn className="h-5 w-5 text-white" />
                </button>
                
                {/* Subtle corner glow */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#60a5fa]/20 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#a78bfa]/20 to-transparent rounded-full blur-xl"></div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-[28px] overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-[#60a5fa] shadow-xl shadow-[#60a5fa]/20 scale-105'
                        : 'border-gray-200 hover:border-[#60a5fa] hover:scale-105'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-contain p-2 bg-white"
                      />
                      {/* Selected indicator */}
                      {selectedImage === index && (
                        <div className="absolute top-2 left-2 h-6 w-6 rounded-full bg-[#60a5fa] flex items-center justify-center shadow-lg">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-white font-medium">{product.brand}</span>
                  <span className="text-white/70">•</span>
                  <span className="text-sm text-white/70">کد محصول: {product.id}</span>
                </div>
                <h1 className="text-3xl font-bold mb-3 text-white">{product.name}</h1>
                {product.nameEn && (
                  <p className="text-lg text-white/80 mb-4">{product.nameEn}</p>
                )}
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-white text-white' : 'text-white/50'}`}
                      />
                    ))}
                    <span className="font-bold text-white">{product.rating}</span>
                  </div>
                  <span className="text-white/70">({formatPrice(product.reviewCount)} نظر)</span>
                </div>
              </div>
              
              {/* Price */}
              <div className="border-y border-white/20 py-6">
                {product.originalPrice && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-white/60 line-through">
                      {formatPrice(product.originalPrice)} تومان
                    </span>
                    <span className="bg-[#ef4444] text-white text-sm font-bold px-2 py-1 rounded-md">
                      {product.discount}٪ تخفیف
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-lg text-white/80">تومان</span>
                </div>
                {product.originalPrice && (
                  <p className="text-sm text-[#22c55e] font-medium mt-2">
                    شما {formatPrice(product.originalPrice - product.price)} تومان صرفه‌جویی می‌کنید
                  </p>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center gap-3">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-[#22c55e]">
                    <Check className="h-5 w-5" />
                    <span className="font-medium text-white">موجود در انبار</span>
                  </div>
                ) : (
                  <div className="text-[#ef4444] font-medium">ناموجود</div>
                )}
              </div>
              
              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-white">تعداد:</span>
                  <div className="flex items-center border border-white/30 rounded-[28px] bg-white/5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 flex items-center justify-center hover:bg-white/20 transition-colors rounded-l-[28px]"
                    >
                      <span className="text-white text-lg">-</span>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="h-10 w-16 text-center border-x border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 flex items-center justify-center hover:bg-white/20 transition-colors rounded-r-[28px]"
                    >
                      <span className="text-white text-lg">+</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button size="lg" className="flex-1 text-base bg-white text-[#1e40af] hover:bg-white/90 rounded-[28px]" onClick={addToCart}>
                    <ShoppingCart className="h-5 w-5 ml-2 text-[#1e40af]" />
                    افزودن به سبد خرید
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-[28px]" onClick={toggleWishlist}>
                    <Heart className="h-5 w-5 text-white" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-[28px]">
                    <Share2 className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-[28px] bg-[#3b82f6]/20 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">ارسال رایگان</p>
                    <p className="text-sm text-white/70">برای سفارش‌های بالای 5 میلیون تومان</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-[28px] bg-[#22c55e]/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">گارانتی اصالت کالا</p>
                    <p className="text-sm text-white/70">100٪ اورجینال و گارانتی معتبر</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-[28px] bg-[#f59e0b]/20 flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">7 روز ضمانت بازگشت</p>
                    <p className="text-sm text-white/70">امکان بازگشت کالا تا 7 روز</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mb-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b border-white/20 rounded-[28px] h-auto p-0 bg-transparent">
                <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-white text-white/70 data-[state=active]:text-white rounded-[28px]">
                  توضیحات
                </TabsTrigger>
                <TabsTrigger value="specs" className="data-[state=active]:border-b-2 data-[state=active]:border-white text-white/70 data-[state=active]:text-white rounded-[28px]">
                  مشخصات فنی
                </TabsTrigger>
                <TabsTrigger value="advantages" className="data-[state=active]:border-b-2 data-[state=active]:border-white text-white/70 data-[state=active]:text-white rounded-[28px]">
                  مزایا و ویژگی‌ها
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-white text-white/70 data-[state=active]:text-white rounded-[28px]">
                  نظرات کاربران ({formatPrice(product.reviewCount)})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-white">{product.description}</p>
                  <p className="text-white/80 leading-relaxed mt-4">
                    این محصول با استفاده از جدیدترین تکنولوژی‌های روز دنیا ساخته شده است و کیفیت بسیار بالایی دارد.
                    طراحی زیبا و کاربردی آن باعث شده تا یکی از محبوب‌ترین محصولات بازار باشد.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-white/20 rounded-[28px] bg-white/5">
                      <span className="font-medium text-white">{key}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="advantages" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {product.advantages && product.advantages.map((advantage, index) => (
                    <div key={`adv-${index}`} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <p className="text-base leading-relaxed">{advantage}</p>
                    </div>
                  ))}
                  {product.features && product.features.map((feature, index) => (
                    <div key={`feat-${index}`} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-base leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <div className="grid md:grid-cols-3 gap-6 p-6 border border-white/20 rounded-[28px] bg-white/5">
                    <div className="text-center">
                      <div className="text-5xl font-black text-white mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-white text-white' : 'text-white/50'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-white/70">از {formatPrice(product.reviewCount)} نظر</p>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm w-12 text-white">{stars} ستاره</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-[28px] overflow-hidden">
                            <div
                              className="h-full bg-white"
                              style={{ width: `${stars === 5 ? '70' : stars === 4 ? '20' : '10'}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-white/70 w-12 text-left">
                            {stars === 5 ? '70' : stars === 4 ? '20' : '10'}٪
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-white/20 rounded-[28px] p-6 bg-white/5">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-white">{review.user}</span>
                              {review.verified && (
                                <span className="text-xs bg-[#22c55e]/20 text-[#22c55e] px-2 py-0.5 rounded-[28px]">
                                  خریدار محصول
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-white text-white' : 'text-white/50'}`}
                                />
                              ))}
                              <span className="text-sm text-white/70">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-bold mb-2 text-white">{review.title}</h4>
                        <p className="text-white/90 leading-relaxed mb-4">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            مفید ({formatPrice(review.helpful)})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Review Button */}
                  <div className="text-center pt-4">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-[28px]">
                      ثبت نظر جدید
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <section className="py-8 border-t border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">محصولات مشابه</h2>
              <Button variant="ghost" className="text-white hover:text-white/80 rounded-[28px]">
                مشاهده همه
                <ChevronLeft className="h-4 w-4 mr-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
