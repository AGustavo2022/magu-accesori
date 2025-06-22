"use client"

import * as React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { getCategorias } from "@/lib/actions"
import { Category } from "@/lib/definitions"

export function MenuList() {
  const [productCategories, setProductCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getCategorias();
      setProductCategories(data as Category[]);
    }
    fetchData();
  }, []);

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

        {/* navegacion de categorias de productos */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-3 gap-1 p-2 md:w-[600px] lg:w-[900px]">

              {productCategories.map((category: any) => (
                <div key={category.id} className="group rounded-md p-1 hover:bg-gray-50">
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/productos/${category.id}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                    >
                      <div className="text-sm font-medium leading-none text-gray-900">
                        {category.name}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                        {category.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 text-center border-t">
              <Link
                href="/productos"
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
  );
}
