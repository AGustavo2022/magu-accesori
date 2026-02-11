"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useFormState } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  CheckCircle2,
  ArchiveX,
  Ban,
  Pencil,
  Trash,
} from "lucide-react"

import { ProductTableProps } from "@/lib/types/definitions"
import { deleteProduct } from "@/lib/actions/product.actions"
import { DeleteActionState } from "@/lib/types/product.types"


import {
  FilterOptionCard,
  filterOptions,
} from "@/components/dashboard/filter-option-card"
import SearchNew from "../search"


const initialState: DeleteActionState = {
  success: false,
  message: null,
  errors: {},
}


export function ProductsTable({ products, totalProducts }: ProductTableProps) {

  const [state, formAction] = useFormState(deleteProduct, initialState)

  const router = useRouter()
  const searchParams = useSearchParams()

  const statusParam = searchParams.get("status") ?? "true"
  const outOfStockParam = searchParams.get("outOfStock") === "true"

  const currentFilter: "active" | "out-of-stock" | "inactive" =
    outOfStockParam
      ? "out-of-stock"
      : statusParam === "false"
        ? "inactive"
        : "active"


  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Agotado</Badge>
    if (stock <= 5) return <Badge variant="secondary">Bajo stock</Badge>
    return <Badge variant="default">En stock</Badge>
  }


  return (
    <>
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
      {filterOptions.map((option) => (
        <FilterOptionCard
          key={option.id}
          item={option}
          selected={currentFilter === option.id}
          onSelect={() => {
            const params = new URLSearchParams(searchParams.toString())

            if (option.id === "active") {
              params.set("status", "true")
              params.delete("outOfStock")
            }

            if (option.id === "out-of-stock") {
              params.set("page", "1")
              params.set("status", "true")
              params.set("outOfStock", "true")
            }

            if (option.id === "inactive") {
              params.set("page", "1")
              params.set("status", "false")
              params.delete("outOfStock")
            }

            router.push(`?${params.toString()}`)

          }}
        />
      ))}
      </div>

        <SearchNew placeholder="Buscar producto..." />



      <p className="text-sm text-muted-foreground pt-3">
        Mostrando {products.length} de {totalProducts} productos
      </p>

      <div className="mt-6 border rounded-lg overflow-hidden">


        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Imagen</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead className="text-center">Precio</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Descuento</TableHead>
              <TableHead className="text-center">Fecha</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay productos para este filtro
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-center">
                    <Image
                      src={product.image_url || "/backpack.png"}
                      width={64}
                      height={64}
                      alt={product.title}
                      className="mx-auto rounded-md object-cover"
                    />
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1 max-w-105">
                      <p className="font-semibold text-base leading-tight">
                        {product.title}
                      </p>

                      {product.short_description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.short_description}
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground">
                        {product.category} / {product.subcategory}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-medium">
                    ${Number(product.final_price).toFixed(2)}
                  </TableCell>

                  <TableCell className="text-center">
                    {product.stock}
                  </TableCell>

                  <TableCell className="text-center">
                    {product.discount} %
                  </TableCell>

                  <TableCell className="text-center text-sm text-muted-foreground">
                    {product.created_at
                      ? new Date(product.created_at).toLocaleDateString()
                      : "N/A"}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/products/${product.id}/edit`}>
                          <Pencil size={16} />
                        </Link>
                      </Button>

                      <form action={formAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash size={16} />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </div>
    </>
  )
}
