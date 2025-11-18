"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Share2, Package, Calendar, Tag } from "lucide-react"
import { Product } from "@/lib/definitions"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Breadcrumbs from "../breadcrumbs"
import { createSlug, formatPrice } from "@/lib/utils"
import { QuantitySelector } from "./quantity-selector"
import { useState } from "react"

interface ProductDetailProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
}


export function ProductDetail({ product }: ProductDetailProps) {

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { addItem } = useCart();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleAddToCart = (product: Product) => {
    addItem(product, selectedQuantity);
    console.log("Añadiendo al carrito:", product.title, "Cantidad:", selectedQuantity)
  }

  const isOutOfStock = product.stock === 0
  const isInactive = !product.status
  const isLowStock = product.stock <= 5 && product.stock > 0
  const isDiscount = product.discount > 0
  const priceDiscount = product.price * (1 - (product.discount / 100));

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
    console.log(`Nueva cantidad seleccionada: ${newQuantity}`);
  };


  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Contenedor Principal: 2 Columnas, usa h-full para que se estiren */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-full">

        {/* COLUMNA 1: Imagen del Producto */}
        <div className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="aspect-square relative p-0">
              {/* ... Contenido de la Imagen (mantener) ... */}
              {product.image_url ? (
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  width={500}
                  height={300}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-muted-foreground" />
                </div>
              )}

              {/* Status badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {isDiscount &&
                  <Badge
                    className="h-16 w-16 rounded-full text-3xl bg-red-600/70"
                    variant="destructive"
                  >
                    {`${product.discount}%`}
                  </Badge>
                }
                {isInactive && <Badge variant="destructive">Producto Inactivo</Badge>}
                {isOutOfStock && <Badge variant="secondary" className="bg-red-100 border border-red-300 rounded-lg">Agotado</Badge>}
                {isLowStock && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    Últimas unidades
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* COLUMNA 2: Información del Producto (Contenedor FLEX principal) */}
        <div className="flex flex-col space-y-6"> {/* Agregado flex flex-col para apilar verticalmente */}
          <div>
            <Breadcrumbs
              breadcrumbs={[
                { label: 'Inicio', href: '/' },
                { label: 'Productos', href: '/products' },
                { label: `${product.category}`, href: `/category/${createSlug(product.category)}` },
                {
                  label: `${product.subcategory}`,
                  href: `/category/subcategory/${createSlug(product.subcategory)}`,
                  active: true,
                },
              ]}
            />

            <h1 className="text-2xl font-bold text-balance mb-2">{product.title}</h1>

            {isDiscount ? (
              <>
                <span className="text-xl text-gray-500 line-through pr-5">
                  {formatPrice(product.price)}
                </span>
                <span className="text-3xl font-bold text-red-600">
                  {formatPrice(priceDiscount)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.long_description && (
            <div>
              <p className="text-muted-foreground leading-relaxed">{product.long_description}</p>
            </div>
          )}

          <Separator />

          {/* Product Details (Información de Stock) */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  <strong>Stock:</strong> {product.stock} unidades
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons: ESTE BLOQUE AHORA USA mt-auto PARA IR ABAJO */}
          <div className="space-y-4 lg:mt-auto"> {/* CAMBIO CLAVE: lg:mt-auto */}
            {/* Selector de Cantidad y Botón Añadir (Horizontal) */}
            <div className="flex items-end gap-3">
              {/* 1. Selector de Cantidad */}
              <div className="flex-none">
                <label className="block text-sm font-medium mb-1">Cantidad</label>
                <QuantitySelector
                  maxStock={product.stock}
                  onQuantityChange={handleQuantityChange}
                  initialQuantity={selectedQuantity}
                />
              </div>

              {/* 2. Botón "Añadir al Carrito" */}
              <Button
                size="lg"
                className="flex-1 h-[44px]"
                onClick={() => handleAddToCart(product)}
                disabled={isOutOfStock || isInactive || selectedQuantity === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isOutOfStock ? "Agotado" : isInactive ? "No Disponible" : "Añadir al Carrito"}
              </Button>
            </div>

            {/* Mensaje de error para cantidad > stock */}
            {selectedQuantity > product.stock && (
              <p className="text-red-500 text-sm mt-2">
                ⚠️ ¡Error! La cantidad (**{selectedQuantity}**) excede el stock disponible (**{product.stock}**).
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}