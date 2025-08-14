"use client"

import Link from "next/link"
import Image from "next/image"
import { ProductItemProps } from "@/lib/definitions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProductItem({ product }: ProductItemProps) {

  const {id, name, description, price, image_url, stock, status, category, subcategory} = product[0]

   console.log(product)
 
  return (

    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Volver */}
        <div className="mb-4">
          <Link
            href="/products"
            className="flex items-center gap-2"
          >
            ← Volver
          </Link>
        </div>

        {/* Contenido del producto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          {/* Imagen */}
          <div className="w-full h-auto">
            <Image
              src={image_url}
              alt={name}
              width={500}
              height={500}
              className="object-cover rounded-lg"
            />
          </div>

          {/* Información */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              <p className="text-gray-700 mt-2">{description}</p>

              <div className="mt-4 flex gap-2">
                <Badge variant="secondary">{category}</Badge>
                {status ? (
                  <Badge variant="default" className="bg-green-500">Activo</Badge>
                ) : (
                  <Badge variant="destructive">Inactivo</Badge>
                )}
              </div>

              <div className="mt-4 text-2xl font-semibold text-green-600">
                ${price}
              </div>

              <div className="mt-2 text-sm text-gray-600">
                {stock > 0 ? (
                  <span>En stock: {stock} unidades</span>
                ) : (
                  <span className="text-red-600">Sin stock</span>
                )}
              </div>
            </div>

            <div className="pt-4">
              <Button disabled={stock === 0} className="w-full">
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
