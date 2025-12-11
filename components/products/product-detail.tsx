"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Package, BanknoteArrowUp, CreditCard } from "lucide-react"
import { Product } from "@/lib/definitions"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import Breadcrumbs from "../breadcrumbs"
import { createSlug, formatPrice } from "@/lib/utils"
import { QuantitySelector } from "./quantity-selector"
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductDetailProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
}


export function ProductDetail({ product }: ProductDetailProps) {

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { addItem, items } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product, selectedQuantity);
  }

  const isOutOfStock = product.stock === 0
  const isInactive = !product.status
  const isLowStock = product.stock <= 5 && product.stock > 0
  const isDiscount = product.discount > 0
  const priceDiscount = product.price * (1 - (product.discount / 100));
  const isProductInCart = items.some(item => item.product.id === product.id);

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
    console.log(`Nueva cantidad seleccionada: ${newQuantity}`);
  };


return (
  <div className="max-w-6xl mx-auto p-8">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-full">


      <div className="space-y-4">
        <Card className="p-0 overflow-hidden">
          <div className="aspect-square relative p-0">

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


            <div className="absolute top-2 right-4 flex flex-col gap-2">
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



      <div className="flex flex-col space-y-6 lg:h-full">

        <div className="text-sm">
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
        </div>

       
        <div>
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
        
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >

          <AccordionItem value="item-1">
            <AccordionTrigger>Descripción</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground flex flex-col gap-4 text-balance pl-14">
              <p className="leading-relaxed ">{product.long_description}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Detalles del Producto</AccordionTrigger>
            <AccordionContent className="text-sm text-gray-700 flex flex-col gap-2 pl-14">
              <p><strong>Stock disponible:</strong> {product.stock} unidades</p>
              <p><strong>SKU:</strong> SKUDELPRODUCTO</p>
            </AccordionContent>
          </AccordionItem>


          <AccordionItem value="item-3">
            <AccordionTrigger>Método de Pago</AccordionTrigger>
            <AccordionContent className="text-sm text-gray-700 flex flex-col gap-4 text-balance pl-14">
              <div className="flex">
                <CreditCard />
                <p className="px-3">Transferencia bancaria</p>
              </div>
              <div className="flex">
                <BanknoteArrowUp />
                <p className="px-3">Efectivo</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-4 lg:mt-auto"> 
          <div className="flex items-end gap-3">
            <div className="flex-none">
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
              disabled={isOutOfStock || isInactive || selectedQuantity === 0 || isProductInCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isOutOfStock
                ? "Agotado"
                : isInactive
                  ? "No Disponible"
                  : isProductInCart
                    ? "Añadido al Carrito"
                    : "Añadir al Carrito"}
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