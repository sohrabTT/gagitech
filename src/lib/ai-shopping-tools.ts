"use client";

import { z } from "zod";
import { featuredProducts, categories, brands } from "@/lib/data/products";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { useAuraContext, useTool } from "auraai-sdk/react";

// Product Search Parameters Schema
const productSearchSchema = z.object({
  query: z.string().optional().describe("جستجو در نام محصول"),
  category: z.string().optional().describe("دسته‌بندی محصول"),
  brand: z.string().optional().describe("برند محصول"),
  minPrice: z.number().optional().describe("حداقل قیمت"),
  maxPrice: z.number().optional().describe("حداکثر قیمت"),
  maxResults: z.number().optional().default(10).describe("حداکثر تعداد نتایج")
});

// Add to Cart Parameters Schema
const addToCartSchema = z.object({
  productId: z.string().describe("شناسه محصول"),
  quantity: z.number().min(1).max(50).default(1).describe("تعداد محصول")
});

// Update Cart Parameters Schema
const updateCartSchema = z.object({
  productId: z.string().describe("شناسه محصول"),
  quantity: z.number().min(0).describe("تعداد جدید محصول")
});

// Checkout Parameters Schema
const checkoutSchema = z.object({
  customerName: z.string().min(2).describe("نام مشتری"),
  customerPhone: z.string().min(10).describe("شماره تلفن"),
  customerEmail: z.string().email().optional().describe("ایمیل"),
  address: z.string().min(10).describe("آدرس تحویل"),
  notes: z.string().optional().describe("یادداشت سفارش")
});

export function useAIShoppingTools() {
  const cart = useCart();

  // Product Search Tool
  useTool({
    name: "searchProducts",
    description: "جستجو و فیلتر محصولات بر اساس دسته‌بندی، برند و قیمت",
    displayContent: "جستجو محصولات با فیلترهای {query}، {category}، {brand}",
    parameters: productSearchSchema,
    execute: async (params) => {
      try {
        const validatedParams = productSearchSchema.parse(params);
        let filteredProducts = [...featuredProducts];

        // Apply filters
        if (validatedParams.query) {
          const query = validatedParams.query.toLowerCase();
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.nameEn?.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
          );
        }

        if (validatedParams.category) {
          filteredProducts = filteredProducts.filter(product =>
            product.category.includes(validatedParams.category!)
          );
        }

        if (validatedParams.brand) {
          filteredProducts = filteredProducts.filter(product =>
            product.brand.includes(validatedParams.brand!)
          );
        }

        if (validatedParams.minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(product =>
            product.price >= validatedParams.minPrice!
          );
        }

        if (validatedParams.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(product =>
            product.price <= validatedParams.maxPrice!
          );
        }

        // Sort by relevance (newest first, then by rating)
        filteredProducts.sort((a, b) => {
          if (a.isNew !== b.isNew) {
            return a.isNew ? -1 : 1;
          }
          return b.rating - a.rating;
        });

        // Limit results
        const results = filteredProducts.slice(0, validatedParams.maxResults);

        if (results.length === 0) {
          return {
            success: false,
            message: "هیچ محصولی با معیارهای جستجوی شما یافت نشد. لطفاً فیلترهای جستجو را تغییر دهید.",
            results: []
          };
        }

        const resultText = results.map((product, index) => 
          `${index + 1}. ${product.name} - ${product.price.toLocaleString('fa-IR')} تومان\n` +
          `   برند: ${product.brand} | دسته: ${product.category}\n` +
          `   امتیاز: ${product.rating}/5 (${product.reviewCount} نظر) | ${product.inStock ? 'موجود' : 'ناموجود'}\n` +
          `   شناسه: ${product.id}\n`
        ).join('\n');

        return {
          success: true,
          message: `${results.length} محصول یافت شد:\n\n${resultText}`,
          results: results
        };
      } catch (error) {
        return {
          success: false,
          message: `خطا در جستجو: ${error instanceof Error ? error.message : 'خطای ناشناخته'}`,
          results: []
        };
      }
    }
  });

  // Get Product Details Tool
  useTool({
    name: "getProductDetails",
    description: "دریافت جزئیات کامل یک محصول خاص",
    displayContent: "مشخصات محصول {productId}",
    parameters: z.object({
      productId: z.string().describe("شناسه محصول")
    }),
    execute: async (params) => {
      const { productId } = z.object({ productId: z.string() }).parse(params);
      
      const product = featuredProducts.find(p => p.id === productId);
      
      if (!product) {
        return {
          success: false,
          message: "محصول مورد نظر یافت نشد."
        };
      }

      const specsText = product.specifications ? 
        Object.entries(product.specifications).map(([key, value]) => `• ${key}: ${value}`).join('\n') :
        'مشخصات خاصی ثبت نشده';

      const featuresText = product.features ? 
        product.features.map(feature => `• ${feature}`).join('\n') :
        'ویژگی خاصی ثبت نشده';

      const advantagesText = product.advantages ? 
        product.advantages.map(advantage => `• ${advantage}`).join('\n') :
        'مزایای خاصی ثبت نشده';

      const discountText = product.discount ? 
        `\n💰 تخفیف: ${product.discount}%` : '';

      return {
        success: true,
        message: `${product.name}\n` +
          `قیمت: ${product.price.toLocaleString('fa-IR')} تومان${discountText}\n` +
          `برند: ${product.brand} | دسته: ${product.category}\n` +
          `امتیاز: ${product.rating}/5 (${product.reviewCount} نظر)\n` +
          `وضعیت: ${product.inStock ? '✅ موجود' : '❌ ناموجود'}\n\n` +
          `توضیحات: ${product.description}\n\n` +
          `مشخصات:\n${specsText}\n\n` +
          `ویژگی‌ها:\n${featuresText}\n\n` +
          `مزایا:\n${advantagesText}\n\n` +
          `شناسه: ${product.id}`,
        product: product
      };
    }
  });

  // Add to Cart Tool
  useTool({
    name: "addToCart",
    description: "افزودن محصول به سبد خرید",
    displayContent: "افزودن {quantity} عدد {productId} به سبد خرید",
    parameters: addToCartSchema,
    execute: async (params) => {
      try {
        const { productId, quantity } = addToCartSchema.parse(params);
        
        const product = featuredProducts.find(p => p.id === productId);
        
        if (!product) {
          return {
            success: false,
            message: "محصول مورد نظر یافت نشد."
          };
        }

        if (!product.inStock) {
          return {
            success: false,
            message: "این محصول در حال حاضر موجود نیست."
          };
        }

        // Add product to cart
        for (let i = 0; i < quantity; i++) {
          cart.addItem(product);
        }

        return {
          success: true,
          message: `✅ ${quantity} عدد از محصول "${product.name}" با موفقیت به سبد خرید اضافه شد.\n\n${cart.getCartSummary()}`,
          addedProduct: product,
          quantity: quantity
        };
      } catch (error) {
        return {
          success: false,
          message: `خطا در افزودن به سبد خرید: ${error instanceof Error ? error.message : 'خطای ناشناخته'}`
        };
      }
    }
  });

  // Remove from Cart Tool
  useTool({
    name: "removeFromCart",
    description: "حذف محصول از سبد خرید",
    displayContent: "حذف محصول {productId} از سبد خرید",
    parameters: z.object({
      productId: z.string().describe("شناسه محصول")
    }),
    execute: async (params) => {
      const { productId } = z.object({ productId: z.string() }).parse(params);
      
      const existingItem = cart.state.items.find(item => item.id === productId);
      
      if (!existingItem) {
        return {
          success: false,
          message: "این محصول در سبد خرید شما موجود نیست."
        };
      }

      cart.removeItem(productId);

      return {
        success: true,
        message: `✅ محصول "${existingItem.name}" از سبد خرید حذف شد.\n\n${cart.getCartSummary()}`,
        removedProduct: existingItem
      };
    }
  });

  // Update Cart Quantity Tool
  useTool({
    name: "updateCartQuantity",
    description: "تغییر تعداد محصول در سبد خرید",
    displayContent: "تغییر تعداد {productId} به {quantity}",
    parameters: updateCartSchema,
    execute: async (params) => {
      try {
        const { productId, quantity } = updateCartSchema.parse(params);
        
        const existingItem = cart.state.items.find(item => item.id === productId);
        
        if (!existingItem) {
          return {
            success: false,
            message: "این محصول در سبد خرید شما موجود نیست."
          };
        }

        if (quantity === 0) {
          cart.removeItem(productId);
          return {
            success: true,
            message: `✅ محصول "${existingItem.name}" از سبد خرید حذف شد.\n\n${cart.getCartSummary()}`
          };
        }

        cart.updateQuantity(productId, quantity);

        return {
          success: true,
          message: `✅ تعداد محصول "${existingItem.name}" به ${quantity} عدد تغییر یافت.\n\n${cart.getCartSummary()}`,
          updatedProduct: existingItem,
          newQuantity: quantity
        };
      } catch (error) {
        return {
          success: false,
          message: `خطا در تغییر تعداد: ${error instanceof Error ? error.message : 'خطای ناشناخته'}`
        };
      }
    }
  });

  // Get Cart Summary Tool
  useTool({
    name: "getCartSummary",
    description: "دریافت خلاصه سبد خرید",
    displayContent: "نمایش سبد خرید",
    parameters: z.object({}).partial(),
    execute: async () => {
      const summary = cart.getCartSummary();
      
      if (cart.state.items.length === 0) {
        return {
          success: true,
          message: "🛒 سبد خرید شما خالی است.\n\nبرای شروع خرید، می‌توانید از دستور 'جستجو محصولات' استفاده کنید.",
          cartState: cart.state
        };
      }

      return {
        success: true,
        message: `🛒 ${summary}\n\n💡 برای ادامه خرید، می‌توانید:\n• محصولات بیشتر جستجو کنید\n• تعداد محصولات را تغییر دهید\n• برای تکمیل خرید 'شروع پرداخت' بگویید`,
        cartState: cart.state
      };
    }
  });

  // Clear Cart Tool
  useTool({
    name: "clearCart",
    description: "پاک کردن کامل سبد خرید",
    displayContent: "پاک کردن سبد خرید",
    parameters: z.object({}).partial(),
    execute: async () => {
      const removedCount = cart.state.items.length;
      cart.clearCart();

      return {
        success: true,
        message: `✅ سبد خرید پاک شد. ${removedCount} محصول حذف گردید.`,
        removedCount
      };
    }
  });

  // Checkout Process Tool
  useTool({
    name: "startCheckout",
    description: "شروع فرآیند پرداخت و ثبت سفارش",
    displayContent: "شروع پرداخت",
    parameters: z.object({}).partial(),
    execute: async () => {
      if (cart.state.items.length === 0) {
        return {
          success: false,
          message: "⚠️ سبد خرید شما خالی است. ابتدا محصولاتی اضافه کنید."
        };
      }

      return {
        success: true,
        message: `🛒 آماده برای تکمیل خرید!\n\n` +
                `${cart.getCartSummary()}\n\n` +
                `برای تکمیل سفارش، لطفاً اطلاعات زیر را ارائه دهید:\n` +
                `• نام کامل\n` +
                `• شماره تلفن\n` +
                `• آدرس کامل تحویل\n` +
                `• ایمیل (اختیاری)\n` +
                `• یادداشت (اختیاری)\n\n` +
                `مثال:\n` +
                `"نام: علی احمدی، تلفن: 09121234567، آدرس: تهران، خیابان ولیعصر..."`,
        cartState: cart.state
      };
    }
  });

  // Finalize Order Tool
  useTool({
    name: "finalizeOrder",
    description: "تکمیل نهایی سفارش با اطلاعات مشتری",
    displayContent: "تکمیل سفارش با اطلاعات {customerName}",
    parameters: checkoutSchema,
    execute: async (params) => {
      try {
        const orderData = checkoutSchema.parse(params);
        
        if (cart.state.items.length === 0) {
          return {
            success: false,
            message: "⚠️ سبد خرید خالی است. ابتدا محصولاتی اضافه کنید."
          };
        }

        // Simulate order processing
        const orderId = `ORDER-${Date.now()}`;
        
        // Generate order summary
        const orderSummary = cart.state.items.map(item => 
          `• ${item.name} - تعداد: ${item.quantity} - قیمت: ${(item.price * item.quantity).toLocaleString('fa-IR')} تومان`
        ).join('\n');

        // Clear cart after successful order
        cart.clearCart();

        return {
          success: true,
          message: `✅ سفارش شما با موفقیت ثبت شد!\n\n` +
                  `📋 شماره سفارش: ${orderId}\n\n` +
                  `👤 اطلاعات مشتری:\n` +
                  `• نام: ${orderData.customerName}\n` +
                  `• تلفن: ${orderData.customerPhone}\n` +
                  `• آدرس: ${orderData.address}\n` +
                  `${orderData.customerEmail ? `• ایمیل: ${orderData.customerEmail}\n` : ''}` +
                  `${orderData.notes ? `• یادداشت: ${orderData.notes}\n` : ''}\n` +
                  `🛍️ محصولات سفارشی:\n${orderSummary}\n\n` +
                  `💰 مبلغ کل: ${cart.state.totalPrice.toLocaleString('fa-IR')} تومان\n\n` +
                  `📞 پس از آماده‌سازی سفارش، با شما تماس گرفته خواهد شد.\n` +
                  `🔄 سفارش شما در حال پردازش است...`,
          orderId: orderId,
          orderData: orderData,
          cartState: { items: [], totalItems: 0, totalPrice: 0 }
        };
      } catch (error) {
        return {
          success: false,
          message: `خطا در ثبت سفارش: ${error instanceof Error ? error.message : 'خطای ناشناخته'}`
        };
      }
    }
  });

  // Get Available Categories Tool
  useTool({
    name: "getCategories",
    description: "دریافت لیست دسته‌بندی‌های موجود",
    displayContent: "نمایش دسته‌بندی‌ها",
    parameters: z.object({}).partial(),
    execute: async () => {
      const categoriesText = categories.map(cat => 
        `• ${cat.name} (${cat.productCount} محصول)`
      ).join('\n');

      return {
        success: true,
        message: `📂 دسته‌بندی‌های موجود:\n\n${categoriesText}`,
        categories: categories
      };
    }
  });

  // Get Available Brands Tool
  useTool({
    name: "getBrands",
    description: "دریافت لیست برندهای موجود",
    displayContent: "نمایش برندها",
    parameters: z.object({}).partial(),
    execute: async () => {
      const brandsText = brands.map(brand => `• ${brand}`).join('\n');

      return {
        success: true,
        message: `🏷️ برندهای موجود:\n\n${brandsText}`,
        brands: brands
      };
    }
  });
}

// Context providers for AI
export function useAIContexts() {
  const cart = useCart();

  // Product Catalog Context
  useAuraContext("products", () =>
    JSON.stringify({
      name: "products",
      description: "کاتالوگ کامل محصولات فروشگاه",
      data: {
        totalProducts: featuredProducts.length,
        categories: categories.map(cat => ({
          name: cat.name,
          slug: cat.slug,
          count: cat.productCount
        })),
        brands: brands,
        priceRange: {
          min: Math.min(...featuredProducts.map(p => p.price)),
          max: Math.max(...featuredProducts.map(p => p.price))
        }
      }
    })
  );

  // Shopping Cart Context
  useAuraContext("cart", () =>
    JSON.stringify({
      name: "cart",
      description: "وضعیت فعلی سبد خرید کاربر",
      data: cart.state
    })
  );

  // User Session Context
  useAuraContext("session", () =>
    JSON.stringify({
      name: "session",
      description: "اطلسات جلسه کاربری",
      data: {
        timestamp: new Date().toISOString(),
        userType: "visitor",
        language: "fa",
        currency: "IRR"
      }
    })
  );
}