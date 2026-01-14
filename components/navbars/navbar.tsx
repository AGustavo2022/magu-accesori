"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import AcmeLogo from "./acme-logo"
import { MenuList } from "./menu-list"
import { CartDrawer } from "../cart/cart-drawer"
import Link from "next/link"
import { Product } from "@/lib/types/definitions"

export const mockProducts: Product[] = [
  {
    id: "1996834e-4b4f-4e40-9b74-aef864174a2d",
    title: "Billetera Mágica con Elástico",
    short_description: "Billetera compacta con cierre elástico",
    long_description:
      "Billetera mágica fabricada en material resistente, ideal para uso diario.",
    price: 1200,
    discount: 10,
    stock: 15,
    image_url: "/products/billetera.jpg",
    status: true,
    category: "Accesorios",
    subcategory: "Billeteras",
    created_at: new Date("2025-01-10T10:00:00Z"),
  },
  {
    id: "24776f09-b2ba-441b-aa84-5c5f427e4d7b",
    title: "Pack de 5 Medias Invisibles",
    short_description: "Medias invisibles con silicona antideslizante",
    long_description:
      "Pack de cinco pares de medias invisibles, cómodas y resistentes.",
    price: 1550,
    discount: 0,
    stock: 8,
    image_url: "/products/medias.jpg",
    status: true,
    category: "Indumentaria",
    subcategory: "Medias",
    created_at: new Date("2025-02-01T14:30:00Z"),
  },
  {
    id: "3c1c1c27-9fa9-4e92-8a36-1e7f6f9cbeaa",
    title: "Mochila Urbana Impermeable",
    short_description: "Mochila urbana con compartimento para notebook",
    long_description:
      "Mochila impermeable ideal para trabajo y estudio.",
    price: 18500,
    discount: 20,
    stock: 3,
    image_url: "/products/mochila.jpg",
    status: true,
    category: "Accesorios",
    subcategory: "Mochilas",
    created_at: new Date("2024-12-20T09:15:00Z"),
  },
]



export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="container mx-auto px-4 text-center">
          <p>🚚 Envío gratis en compras mayores a $50 | 📞 Soporte 24/7</p>
        </div>
      </div>

      {/* Main Nav */}
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <AcmeLogo />

          {/* Navigation Menu — siempre visible */}
          <div className="flex flex-1 justify-center">
            <MenuList />
          </div>

          {/* Right side icons — siempre visibles */}
          <div className="flex items-center space-x-4">

            {/* User */}
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard">
                    <User />
                  </Link>
                </Button>
            {/* Cart */}
                <CartDrawer />
          </div>
        </div>
      </div>
    </nav>
  )
}
