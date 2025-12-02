"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top banner */}
      <div className="bg-white text-black py-2 px-4 text-center text-sm font-medium">
         این یک دمو برای هوش مصنوعی auraai.ir است
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu and logo together on the left */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-white/10 border-white/20 hover:bg-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </Button>

            {/* Logo with special styling - moved closer to menu */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="logo text-2xl font-black text-white">گجیتک مارکت</div>
            </Link>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در محصولات..."
                className="w-full h-10 px-4 pr-10 rounded-2xl border border-input bg-background text-white focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5 text-white" />
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" data-cart-icon>
                <ShoppingCart className="h-5 w-5 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-white" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 py-3 border-t">
          <Link href="/category/mobile" className="text-sm font-medium text-white hover:text-primary transition-colors">
            موبایل
          </Link>
          <Link href="/category/laptop" className="text-sm font-medium text-white hover:text-primary transition-colors">
            لپ‌تاپ
          </Link>
          <Link href="/category/smart-gadgets" className="text-sm font-medium text-white hover:text-primary transition-colors">
            گجت هوشمند
          </Link>
          <Link href="/category/accessories" className="text-sm font-medium text-white hover:text-primary transition-colors">
            لوازم جانبی
          </Link>
          <Link href="/category/headphones" className="text-sm font-medium text-white hover:text-primary transition-colors">
            هدفون
          </Link>
          <Link href="/category/smart-watches" className="text-sm font-medium text-white hover:text-primary transition-colors">
            ساعت هوشمند
          </Link>
          <Link href="/offers" className="text-sm font-medium text-white hover:text-primary transition-colors">
            تخفیف‌ها
          </Link>
          <Link href="/festival" className="text-sm font-medium text-white hover:text-primary transition-colors">
            جشنواره
          </Link>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="py-4 px-4 space-y-3">
              <Link
                href="/category/mobile"
                className="block text-sm font-medium text-white hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                موبایل
              </Link>
              <Link
                href="/category/laptop"
                className="block text-sm font-medium text-white hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                لپ‌تاپ
              </Link>
              <Link
                href="/category/smart-gadgets"
                className="block text-sm font-medium text-white hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                گجت هوشمند
              </Link>
              <Link
                href="/category/accessories"
                className="block text-sm font-medium text-white hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                لوازم جانبی
              </Link>
              <Link
                href="/category/headphones"
                className="block text-sm font-medium text-white hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                هدفون
              </Link>
              <Link
                href="/category/smart-watches"
                className="block text-sm font-medium text-white hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                ساعت هوشمند
              </Link>
              <Link
                href="/offers"
                className="block text-sm font-medium text-white hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                تخفیف‌ها
              </Link>
              <Link
                href="/festival"
                className="block text-sm font-medium text-white hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                جشنواره
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
