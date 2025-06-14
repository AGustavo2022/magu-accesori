"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// Datos organizados por categorías para el navigation menu
const productCategories = [
  {
    title: "Electrónicos",
    description: "Dispositivos y gadgets de última tecnología",
    items: ["Smartphones", "Laptops", "Tablets", "Auriculares", "Cámaras"],
  },
  {
    title: "Ropa & Moda",
    description: "Las últimas tendencias en moda y accesorios",
    items: ["Camisetas", "Pantalones", "Chaquetas", "Calzado", "Accesorios"],
  },
  {
    title: "Deportes",
    description: "Todo lo que necesitas para mantenerte activo",
    items: ["Zapatillas", "Ropa Deportiva", "Equipamiento", "Suplementos", "Outdoor"],
  },
  {
    title: "Hogar",
    description: "Productos para hacer de tu casa un hogar",
    items: ["Muebles", "Decoración", "Cocina", "Iluminación", "Jardín"],
  },
]

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inicio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Productos with Navigation Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-6 md:w-[600px] lg:w-[700px]">
              {productCategories.map((category, index) => (
                <div key={index} className="group rounded-md p-3 hover:bg-gray-50">
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                    >
                      <div className="text-sm font-medium leading-none text-gray-900">{category.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-500">{category.description}</p>
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                        {category.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href="#"
                            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 text-center border-t">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Ver todos los productos
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Quienes Somos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contacto" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contacto
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

                <NavigationMenuItem>
          <Link href="/productos" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Producto Card
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList
