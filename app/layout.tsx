import type { Metadata } from "next";
import { geistSans, geistMono } from '../ui/fonts';

import "./globals.css";
import Navbar from "@/components/navbars/navbar";
import { CartProvider } from "@/contexts/cart-context";

export const metadata: Metadata = {
  title: "SHOP-Rio Grande",
  description: "Comercio Electronico de Rio Grande",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="w-full max-w-screen-xl mx-auto">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
