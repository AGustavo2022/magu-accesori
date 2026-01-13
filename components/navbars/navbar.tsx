"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import AcmeLogo from "./acme-logo"
import { MenuList } from "./menu-list"
import { CartDrawer } from "./cart-drawer"
import Link from "next/link"

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
                  <Link href="/#">
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
