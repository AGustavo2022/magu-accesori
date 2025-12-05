"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AcmeLogo from "./acme-logo"
import { MenuList } from "./menu-list"
import { CartDrawer } from "./cart-drawer"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Navbar() {

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="container mx-auto px-4 text-center">
          <p>🚚 Envío gratis en compras mayores a $50 | 📞 Soporte 24/7</p>
        </div>
      </div>

      {/* Logo and Action Icons Section */}
      <div className="w-full max-w-screen-xl container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <AcmeLogo />

          {/* Navigation Menu Section */}
          <div className="hidden md:flex flex-1 justify-center">
            <MenuList />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* User */}
            {/* <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button> */}
            <Tooltip>
              <TooltipTrigger>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex">
                  <Link
                    href={'/#'}
                  >
                    <User />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Usuario</p>
              </TooltipContent>
            </Tooltip>
            {/* Cart */}
            <Tooltip>
              <TooltipTrigger>
                <CartDrawer />
              </TooltipTrigger>
              <TooltipContent>
                <p>Carrito de Compras</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  )
}
