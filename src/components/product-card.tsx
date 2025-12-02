"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

// Add to cart button with animation
function AddToCartButton({ onAddToCart }: { onAddToCart: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClick = () => {
    setShowAnimation(true);
    onAddToCart();
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <>
      <Button
        ref={buttonRef}
        className="w-full mt-1 sm:mt-2 rounded-xl sm:rounded-2xl bg-[#1e40af] hover:bg-[#1e3a8a] text-white text-xs sm:text-sm px-1 sm:px-2 py-1 sm:py-2"
        size="sm"
        onClick={handleClick}
      >
        <ShoppingCart className="h-3 w-3 sm:h-4 w-4 ml-1 sm:ml-2" />
        افزودن به سبد
      </Button>
      
      {showAnimation && buttonRef.current && (
        <FlyingItem fromRef={buttonRef} onComplete={handleAnimationComplete} />
      )}
    </>
  );
}

// Animation component for flying item
function FlyingItem({ fromRef, onComplete }: { fromRef: React.RefObject<HTMLElement | null>; onComplete: () => void }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!fromRef.current) return;

    const fromElement = fromRef.current;
    const headerCart = document.querySelector('[data-cart-icon]') as HTMLElement;
    
    if (!headerCart) return;

    const fromRect = fromElement.getBoundingClientRect();
    const toRect = headerCart.getBoundingClientRect();

    // Set initial position
    setPosition({
      x: fromRect.left + fromRect.width / 2,
      y: fromRect.top + fromRect.height / 2
    });
    setShow(true);
    setIsAnimating(true);

    // Animation duration
    const duration = 800;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      // Calculate position
      const fromX = fromRect.left + fromRect.width / 2;
      const fromY = fromRect.top + fromRect.height / 2;
      const toX = toRect.left + toRect.width / 2;
      const toY = toRect.top + toRect.height / 2;
      
      const currentX = fromX + (toX - fromX) * easeOutCubic;
      const currentY = fromY + (toY - fromY) * easeOutCubic;
      
      setPosition({ x: currentX, y: currentY });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setTimeout(() => {
          setShow(false);
          onComplete();
        }, 200);
      }
    }

    requestAnimationFrame(animate);
  }, [fromRef, onComplete]);

  if (!show) return null;

  return (
    <div
      className={`fixed z-50 pointer-events-none transition-transform ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-150 opacity-0'
      }`}
      style={{
        left: position.x - 12,
        top: position.y - 12,
        transform: isAnimating ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) scale(1.5)',
        transition: isAnimating ? 'none' : 'transform 200ms ease-out, opacity 200ms ease-out'
      }}
    >
      <div className="bg-white rounded-full shadow-xl p-1 border border-white/50 animate-pulse">
        <ShoppingCart className="h-4 w-4 text-[#1e40af] drop-shadow-sm" />
      </div>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('fa-IR').format(price);
  }

  return (
    <div className="group relative h-full flex flex-col bg-white rounded-2xl sm:rounded-3xl lg:rounded-[28px] border hover:shadow-lg transition-all duration-300 overflow-hidden min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]">
      {/* Badges */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 sm:gap-2">
        {product.discount && (
          <span className="bg-sale text-sale-foreground text-xs font-bold px-2 py-1 rounded-xl">
            {product.discount}٪ تخفیف
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#1e40af] text-white text-xs font-bold px-2 py-1 rounded-xl shadow-lg">
            جدید
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-warning text-warning-foreground text-xs font-bold px-2 py-1 rounded-xl">
            پرفروش
          </span>
        )}
      </div>
      
      {/* Wishlist button */}
      <button className="absolute top-1 left-1 z-10 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Heart className="h-4 w-4" />
      </button>
      
      {/* Image */}
      <Link href={`/product/${product.id}`} className="relative aspect-square lg:aspect-[6/5] overflow-hidden bg-gray-100 p-1 sm:p-2 lg:p-3 block">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      
      {/* Content */}
      <div className="flex flex-col flex-1 p-1 sm:p-2 lg:p-3">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-2 lg:mb-3">
          <span className="text-[10px] text-[#1e40af] font-medium rounded-full bg-gray-100 px-2 py-1">{product.category}</span>
          <span className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#1e40af] font-semibold">{product.brand}</span>
        </div>
        
        {/* Title */}
        <Link href={`/product/${product.id}`} className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 lg:mb-3 line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 lg:mb-4">
          <Star className="h-3 w-3 sm:h-4 w-4 lg:h-5 lg:w-5 fill-warning text-warning" />
          <span className="text-xs sm:text-sm lg:text-base font-medium text-[#1e40af]">{product.rating}</span>
          <span className="text-xs sm:text-sm lg:text-base text-[#1e40af]">({formatPrice(product.reviewCount)} نظر)</span>
        </div>
        
        {/* Price */}
        <div className="mt-auto">
          {product.originalPrice && (
            <div className="text-xs sm:text-sm lg:text-base text-muted-foreground line-through mb-1">
              {formatPrice(product.originalPrice)} تومان
            </div>
          )}
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-[18px] sm:text-[20px] lg:text-base font-bold text-black">
              {formatPrice(product.price)}
            </div>
            <span className="text-xs sm:text-sm lg:text-base text-[#1e40af] font-medium">تومان</span>
          </div>
        </div>
        
        {/* Add to cart button */}
        <AddToCartButton onAddToCart={() => {
          // Handle add to cart logic here
          console.log('Added to cart:', product.name);
        }} />
      </div>
      
      {/* Stock status */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <span className="text-sm font-bold text-destructive">ناموجود</span>
        </div>
      )}
    </div>
  );
}
