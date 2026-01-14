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
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const { addItem, items } = useCart()

  /* 🧠 Estado del producto */
  const isOutOfStock = product.stock === 0
  const isInactive = !product.status
  const isLowStock = product.stock > 0 && product.stock <= 5
  const isDiscount = product.discount > 0

  const priceDiscount =
    product.price * (1 - product.discount / 100)

  /* ✅ Nuevo carrito: se compara por productId */
  const isProductInCart = items.some(
    (item) => item.productId === product.id
  )

  /* ➕ Agregar al carrito (solo ID + cantidad) */
  const handleAddToCart = () => { addItem(productToCartItem(product, selectedQuantity))}

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity)
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* 🖼 Imagen */}
        <Card className="overflow-hidden">
          <div className="aspect-square relative">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-24 h-24 text-muted-foreground" />
              </div>
            )}

            <div className="absolute top-2 right-4 flex flex-col gap-2">
              {isInactive && (
                <Badge variant="destructive">Producto inactivo</Badge>
              )}
              {isOutOfStock && (
                <Badge variant="secondary">Agotado</Badge>
              )}
              {isLowStock && (
                <Badge variant="outline">
                  Últimas unidades
                </Badge>
              )}
            </div>
          </div>
        </Card>

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
            <h1 className="text-2xl font-bold mb-2">
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
                <Badge variant="destructive">
                  -{product.discount}%
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <Accordion type="single" collapsible defaultValue="desc">
            <AccordionItem value="desc">
              <AccordionTrigger>Descripción</AccordionTrigger>
              <AccordionContent>
                {product.long_description}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger>Detalles</AccordionTrigger>
              <AccordionContent>
                <p>Stock: {product.stock}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger>Métodos de pago</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex gap-2">
                  <CreditCard /> Transferencia
                </div>
                <div className="flex gap-2">
                  <BanknoteArrowUp /> Efectivo
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* 🛒 Acciones */}
          <div className="flex gap-4 items-end mt-auto">
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
