import type { Metadata } from "next";
import "./globals.css";
import { Vazirmatn, IBM_Plex_Sans_Arabic } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import AuraWidget from "@/components/AuraWidget";

// Load Google fonts with optimal Next.js integration
const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
});

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "گجیتک مارکت",
  description: "فروشگاه آنلاین تخصصی گجت‌های دیجیتال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${ibmPlex.variable}`}>
      <body className="min-h-screen bg-background font-sans">
        <CartProvider>
          {children}
          <AuraWidget />
        </CartProvider>
      </body>
    </html>
  );
}
