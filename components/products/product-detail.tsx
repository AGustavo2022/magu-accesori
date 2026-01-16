"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Package,
  BanknoteArrowUp,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import Breadcrumbs from "../breadcrumbs"
import { createSlug, formatPrice, productToCartItem } from "@/lib/utils"
import { QuantitySelector } from "./quantity-selector"
import { useCart } from "@/contexts/cart.context"
import { Product } from "@/lib/types/definitions"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {


  console.log(product)

  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const { addItem, items } = useCart()

  /* 🧠 Estado del producto */
  const isOutOfStock = product.stock === 0
  const isInactive = !product.status
  const isLowStock = product.stock > 0 && product.stock <= 5
  const isDiscount = product.discount > 0

  // const isOutOfStock = product.stock === 0
  // const isInactive = !product.status
  // const isLowStock = product.stock > 0 && product.stock <= 5
  // const isDiscount = product.discount > 0
  // const priceDiscount = product.price * (1 - product.discount / 100)
  // const isInCart = items.some((item) => item.productId === product.id)

  const priceDiscount =
    product.price * (1 - product.discount / 100)

  /* ✅ Nuevo carrito: se compara por productId */
  const isProductInCart = items.some(
    (item) => item.productId === product.id
  )

  /* ➕ Agregar al carrito (solo ID + cantidad) */
  const handleAddToCart = () => {
    addItem(productToCartItem(product, selectedQuantity))
  }

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity)
  }

const validSpecifications = (product.specifications ?? []).filter(
  (spec) => spec.value && spec.value.toString().trim() !== ""
);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* 🖼 Imagen */}
        <div className="relative">
          <div className="sticky top-8">
            <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted/20">
              {product.image_url ? (
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted/30">
                  <Package className="w-24 h-24 text-muted-foreground" />
                </div>
              )}

              <div className="absolute top-2 right-4 flex flex-col gap-2">
                {/* Últimas unidades */}
                {isLowStock && !isOutOfStock && !isInactive && (
                  <Badge
                    variant="outline"
                    className="border-amber-500 bg-amber-50 text-amber-700 shadow-lg
                 dark:border-amber-400 dark:bg-amber-950 dark:text-amber-400"
                  >
                    Últimas unidades
                  </Badge>
                )}

                {/* Producto inactivo */}
                {isInactive && (
                  <Badge
                    variant="outline"
                    className="border-red-500 bg-red-50 text-red-700 shadow-lg
                 dark:border-red-400 dark:bg-red-950 dark:text-red-400"
                  >
                    Producto inactivo
                  </Badge>
                )}

                {/* Agotado */}
                {isOutOfStock && !isInactive && (
                  <Badge
                    variant="outline"
                    className="border-red-500 bg-red-50 text-red-700 shadow-lg
                 dark:border-red-400 dark:bg-red-950 dark:text-red-400"
                  >
                    Agotado
                  </Badge>
                )}
              </div>

            </div>
          </div>
        </div>


        {/* 📄 Info */}
        <div className="flex flex-col space-y-6">

          <Breadcrumbs
            breadcrumbs={[
              { label: "Inicio", href: "/" },
              { label: "Productos", href: "/products" },
              {
                label: product.category,
                href: `/category/${createSlug(product.category)}`,
              },
              {
                label: product.subcategory,
                href: `/category/subcategory/${createSlug(
                  product.subcategory
                )}`,
                active: true,
              },
            ]}
          />

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {product.title}
            </h1>

            {isDiscount ? (
              <>
                <span className="line-through text-muted-foreground mr-3">
                  {formatPrice(product.price)}
                </span>
                <span className="text-3xl font-bold text-red-600 mr-3">
                  {formatPrice(priceDiscount)}
                </span>
                <Badge
                  variant="destructive"
                  className="px-3 py-1 text-sm font-semibold"
                >
                  -{product.discount}%
                </Badge>

              </>
            ) : (
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {isOutOfStock ? "Sin stock disponible" : `${product.stock} unidades disponibles`}
            </span>
          </div>

          <Accordion type="single" collapsible defaultValue="desc">
            <AccordionItem value="desc">
              <AccordionTrigger>Descripción del producto</AccordionTrigger>
              <AccordionContent>
                {product.long_description}
              </AccordionContent>
            </AccordionItem>

            {validSpecifications.length > 0 && (
              <AccordionItem value="details">
                <AccordionTrigger>Especificaciones</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    {validSpecifications.map((spec) => (
                      <div key={spec.label} className="rounded-lg border p-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          {spec.label}
                        </p>
                        <p className="font-medium">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="payment">
              <AccordionTrigger>Métodos de pago</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 rounded-lg border p-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Transferencia bancaria</p>
                      <p className="text-sm text-muted-foreground">Pago directo a cuenta</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-2">
                    <BanknoteArrowUp className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Efectivo</p>
                      <p className="text-sm text-muted-foreground">Al retirar el producto</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
          {/* 🛒 Acciones */}
          <div className="flex gap-4 items-end mt-auto">
            <span className="mb-2 block text-sm font-medium">Cantidad</span>
            <QuantitySelector
              maxStock={product.stock}
              initialQuantity={1}
              onQuantityChange={handleQuantityChange}
            />

            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={
                isOutOfStock ||
                isInactive ||
                selectedQuantity === 0 ||
                isProductInCart
              }
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isProductInCart
                ? "En el carrito"
                : "Agregar al carrito"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
