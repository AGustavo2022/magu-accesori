"use client"

import { useState } from "react"
import { Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AcmeLogo from "./acme-logo"
import Link from "next/link"
import { MenuList } from "./menu-list"
import { CartDrawer } from "./cart-drawer"



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = ["Inicio", "Ropa", "Electrónicos", "Deportes", "Hogar", "Ofertas"]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="container mx-auto px-4 text-center">
          <p>🚚 Envío gratis en compras mayores a $50 | 📞 Soporte 24/7</p>
        </div>
      </div>

      {/* Logo and Action Icons Section */}
      <div className="w-full max-w-screen-xl  container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <AcmeLogo/>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* User */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="ml-1 text-sm">Cuenta</span>
            </Button>

            {/* Cart */}
            <CartDrawer/>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Input type="text" placeholder="Buscar productos..." className="pl-10 pr-4 py-2 w-full" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            
          </div>
        </div>
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center justify-center space-x-8 py-4">
              <MenuList/>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu Section */}



      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((category) => (
              <Link
                key={category}
                href="#"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
            <div className="border-t pt-2 mt-2">
              <Link 
                href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                <User className="inline h-4 w-4 mr-2" />
                Mi Cuenta
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
