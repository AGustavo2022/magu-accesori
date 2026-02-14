"use client"

import { useFormState } from "react-dom"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Pencil, Trash } from "lucide-react"

import { ProductTableProps } from "@/lib/types/definitions"
import { deleteProduct } from "@/lib/actions/product.actions"
import { DeleteActionState } from "@/lib/types/product.types"

const initialState: DeleteActionState = {
  success: false,
  message: null,
  errors: {},
}

export function ProductsTable({ products }: ProductTableProps) {
  const [state, formAction] = useFormState(deleteProduct, initialState)

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Imagen</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead className="text-center">Precio</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Descuento</TableHead>
            <TableHead className="text-center">Fecha</TableHead>
            <TableHead className="text-center"></TableHead>
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
  )
}
