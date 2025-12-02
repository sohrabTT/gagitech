"use client";

import { useState, useMemo, use } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { categories, featuredProducts, brands } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal, Grid3x3, List, X } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get category and filter products by category
  const unwrappedParams = use(params);
  const category = categories.find(c => c.slug === unwrappedParams.slug);
  
  // If category not found, show error
  if (!category) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">دسته‌بندی یافت نشد</h1>
            <p className="text-muted-foreground">متاسفانه دسته‌بندی مورد نظر شما پیدا نشد.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Filter products by category
  const products = featuredProducts.filter(p => p.category === category.name);
  
  // Apply filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      // Color filter (assuming colors are in product specifications)
      if (selectedColors.length > 0) {
        const hasColor = selectedColors.some(color =>
          product.description?.includes(color) ||
          product.name?.includes(color)
        );
        if (!hasColor) return false;
      }
      
      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      
      return true;
    });
  }, [products, priceRange, selectedBrands, selectedColors, inStockOnly]);
  
  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'popular':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'cheapest':
        return sorted.sort((a, b) => a.price - b.price);
      case 'expensive':
        return sorted.sort((a, b) => b.price - a.price);
      case 'discount':
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);
  
  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentPageProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  
  const colors = ['مشکی', 'سفید', 'آبی', 'قرمز', 'طلایی', 'نقره‌ای'];
  
  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'cheapest', label: 'ارزان‌ترین' },
    { value: 'expensive', label: 'گران‌ترین' },
    { value: 'discount', label: 'بیشترین تخفیف' }
  ];
  
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price);
  }
  
  function toggleBrand(brand: string) {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  }
  
  function toggleColor(color: string) {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  }
  
  function clearFilters() {
    setSelectedBrands([]);
    setSelectedColors([]);
    setInStockOnly(false);
    setPriceRange([0, 100000000]);
  }
  
  const activeFiltersCount = selectedBrands.length + selectedColors.length + (inStockOnly ? 1 : 0);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-white hover:text-primary">خانه</Link>
              <span className="text-white">/</span>
              <Link href="/categories" className="text-white hover:text-primary">دسته‌بندی‌ها</Link>
              <span className="text-white">/</span>
              <span className="font-medium text-white">{category.name}</span>
            </div>
          </div>
        </div>
        
        {/* Category Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                <img
                  src={category.slug === 'mobile' ? 'https://www.technolife.com/image/color_image_TLP-174088_e88fa955-1548-4bb8-8f18-8c88bac8be93.png' :
                       category.slug === 'laptop' ? 'https://cebit.ir/storage/images/products/69146899d66f57ca700ece02/1762945034-MacBook-Pro-MDE14-2025-M5-CEBIT.IR-1.jpg' :
                       category.slug === 'smart-gadgets' ? 'https://kiansama.com/wp-content/uploads/2025/11/jetfan-300x300.jpg' :
                       category.slug === 'accessories' ? 'https://agstatics-public.aloghesti.com/2024/12/PPBD30K-black.webp' :
                       category.slug === 'headphones' ? 'https://hilatel.ir/uploads/products/65f1b8b3ad78b_5392.jpg' :
                       category.slug === 'smart-watches' ? 'https://api2.zoomit.ir/media/66dff8ade404d665a09e0656' :
                       (category.image || "/placeholder.svg")}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2 text-white">{category.name}</h1>
                <p className="text-white">{formatPrice(category.productCount)} محصول</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    <h2 className="font-bold text-lg text-white">فیلترها</h2>
                    {activeFiltersCount > 0 && (
                      <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </div>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 ml-1" />
                      پاک کردن
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {/* Price Range */}
                  <div className="border rounded-lg p-4 bg-card">
                    <h3 className="font-semibold mb-4 text-white">محدوده قیمت</h3>
                    <div className="space-y-4">
                      <Slider 
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100000000}
                        step={1000000}
                        className="mb-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">از {formatPrice(priceRange[0])} تومان</span>
                        <span className="text-white">تا {formatPrice(priceRange[1])} تومان</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Brands */}
                  <div className="border rounded-lg p-4 bg-card">
                    <h3 className="font-semibold mb-4 text-white">برند</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center gap-2">
                          <Checkbox 
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrand(brand)}
                          />
                          <Label
                            htmlFor={`brand-${brand}`}
                            className="text-sm font-normal cursor-pointer flex-1 text-white"
                          >
                            {brand}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Colors */}
                  <div className="border rounded-lg p-4 bg-card">
                    <h3 className="font-semibold mb-4 text-white">رنگ</h3>
                    <div className="space-y-3">
                      {colors.map((color) => (
                        <div key={color} className="flex items-center gap-2">
                          <Checkbox 
                            id={`color-${color}`}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => toggleColor(color)}
                          />
                          <Label
                            htmlFor={`color-${color}`}
                            className="text-sm font-normal cursor-pointer flex-1 text-white"
                          >
                            {color}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stock Status */}
                  <div className="border rounded-lg p-4 bg-card">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="in-stock"
                        checked={inStockOnly}
                        onCheckedChange={(checked) => setInStockOnly(!!checked)}
                      />
                      <Label
                        htmlFor="in-stock"
                        className="text-sm font-semibold cursor-pointer text-white"
                      >
                        فقط کالاهای موجود
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 border rounded-lg bg-card">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white">مرتب‌سازی:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm text-white focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white hidden sm:inline">نمایش:</span>
                  <div className="flex items-center border rounded-md bg-secondary/50">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`h-9 px-3 flex items-center justify-center transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary text-primary-foreground rounded-md'
                          : 'text-white hover:text-foreground'
                      }`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`h-9 px-3 flex items-center justify-center transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary text-primary-foreground rounded-md'
                          : 'text-white hover:text-foreground'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Active Filters Tags */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                    >
                      {brand}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  {selectedColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                    >
                      {color}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  {inStockOnly && (
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                    >
                      فقط موجود
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}
              
              {/* Products */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                  {currentPageProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  {currentPageProducts.length === 0 && (
                    <div className="col-span-full text-center py-8 text-white">
                      محصولی با این فیلترها یافت نشد
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentPageProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 p-4 border rounded-lg bg-card hover:shadow-lg transition-shadow">
                      <Link href={`/product/${product.id}`} className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/50">
                        <img 
                          src={product.image || "/placeholder.svg"} 
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link href={`/product/${product.id}`} className="font-bold text-lg hover:text-primary transition-colors mb-2 block">
                              {product.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">{product.brand}</span>
                              <span className="text-muted-foreground">★ {product.rating}</span>
                            </div>
                          </div>
                          <div className="text-left">
                            {product.discount && (
                              <div className="text-sm text-muted-foreground line-through mb-1">
                                {formatPrice(product.originalPrice || 0)}
                              </div>
                            )}
                            <div className="text-2xl font-bold text-primary">
                              {formatPrice(product.price)}
                            </div>
                            <div className="text-xs text-muted-foreground">تومان</div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1">افزودن به سبد</Button>
                          <Button size="sm" variant="outline">مقایسه</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="bg-[#1f2937] text-white border-[#374151] hover:bg-[#374151] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  قبلی
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage
                      ? "bg-[#1e40af] text-white hover:bg-[#1e3a8a]"
                      : "bg-[#1f2937] text-white border-[#374151] hover:bg-[#374151] hover:text-white"
                    }
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-[#1f2937] text-white border-[#374151] hover:bg-[#374151] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  بعدی
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
