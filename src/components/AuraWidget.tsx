"use client";

import { useEffect } from "react";
import { AuraClient } from "auraai-sdk";
import { useCart } from "@/lib/cart-context";
import { featuredProducts, categories, brands } from "@/lib/data/products";

const AuraWidget = () => {
  const cart = useCart();

  useEffect(() => {
    // Initialize the auraai-sdk widget
    const widget = new (AuraClient as any)({
      apiKey: "aura_b46293813f510028bfa1870fd7194723",
      theme: "dark"
    });

    // Store cart reference for AI tools
    (widget as any).cart = cart;
    (widget as any).products = featuredProducts;
    (widget as any).categories = categories;
    (widget as any).brands = brands;

    // AI Shopping Functions
    (widget as any).searchProducts = (query: string, filters: any = {}) => {
      let filteredProducts = [...featuredProducts];

      if (query) {
        const searchTerm = query.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.nameEn?.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category.includes(filters.category)
        );
      }

      if (filters.brand) {
        filteredProducts = filteredProducts.filter(product =>
          product.brand.includes(filters.brand)
        );
      }

      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(product =>
          product.price >= filters.minPrice
        );
      }

      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
          product.price <= filters.maxPrice
        );
      }

      return filteredProducts.slice(0, filters.maxResults || 10);
    };

    (widget as any).addToCart = (productId: string, quantity: number = 1) => {
      const product = featuredProducts.find(p => p.id === productId);
      if (product && product.inStock) {
        for (let i = 0; i < quantity; i++) {
          cart.addItem(product);
        }
        return {
          success: true,
          message: `✅ ${quantity} عدد از "${product.name}" به سبد خرید اضافه شد!`
        };
      }
      return { success: false, message: "محصول یافت نشد یا موجود نیست." };
    };

    (widget as any).removeFromCart = (productId: string) => {
      const existingItem = cart.state.items.find(item => item.id === productId);
      if (existingItem) {
        cart.removeItem(productId);
        return {
          success: true,
          message: `✅ "${existingItem.name}" از سبد خرید حذف شد.`
        };
      }
      return { success: false, message: "محصول در سبد خرید یافت نشد." };
    };

    (widget as any).updateCartQuantity = (productId: string, quantity: number) => {
      const existingItem = cart.state.items.find(item => item.id === productId);
      if (existingItem) {
        if (quantity <= 0) {
          cart.removeItem(productId);
          return {
            success: true,
            message: `✅ "${existingItem.name}" از سبد خرید حذف شد.`
          };
        }
        cart.updateQuantity(productId, quantity);
        return {
          success: true,
          message: `✅ تعداد "${existingItem.name}" به ${quantity} تغییر یافت.`
        };
      }
      return { success: false, message: "محصول در سبد خرید یافت نشد." };
    };

    (widget as any).getCartSummary = () => {
      return cart.getCartSummary();
    };

    (widget as any).startCheckout = () => {
      if (cart.state.items.length === 0) {
        return { success: false, message: "⚠️ سبد خرید شما خالی است." };
      }
      return {
        success: true,
        message: `🛒 آماده برای پرداخت!\n\n${cart.getCartSummary()}\n\nلطفاً اطلاعات خود را وارد کنید.`
      };
    };

    (widget as any).finalizeOrder = (customerInfo: any) => {
      if (cart.state.items.length === 0) {
        return { success: false, message: "⚠️ سبد خرید خالی است." };
      }
      
      const orderId = `ORDER-${Date.now()}`;
      cart.clearCart();
      
      return {
        success: true,
        message: `✅ سفارش شما ثبت شد!\n\n📋 شماره سفارش: ${orderId}\n👤 مشتری: ${customerInfo.name}\n💰 مبلغ: ${cart.state.totalPrice.toLocaleString('fa-IR')} تومان\n\nپس از آماده‌سازی با شما تماس گرفته خواهد شد.`
      };
    };

    (widget as any).getProductDetails = (productId: string) => {
      const product = featuredProducts.find(p => p.id === productId);
      if (!product) {
        return { success: false, message: "محصول یافت نشد." };
      }

      const specsText = product.specifications ?
        Object.entries(product.specifications).map(([key, value]) => `• ${key}: ${value}`).join('\n') :
        'مشخصات خاصی ثبت نشده';

      return {
        success: true,
        message: `${product.name}\n` +
          `قیمت: ${product.price.toLocaleString('fa-IR')} تومان\n` +
          `برند: ${product.brand} | دسته: ${product.category}\n` +
          `امتیاز: ${product.rating}/5 (${product.reviewCount} نظر)\n` +
          `وضعیت: ${product.inStock ? '✅ موجود' : '❌ ناموجود'}\n\n` +
          `توضیحات: ${product.description}\n\n` +
          `مشخصات:\n${specsText}\n\n` +
          `شناسه: ${product.id}`,
        product: product
      };
    };

    // Initialize the widget
    (widget as any).loadAndInit();

    // Clean up on unmount
    return () => {
      // Widget will clean up automatically
    };
  }, [cart]);

  return null; // Widget is rendered by the SDK
};

export default AuraWidget;
