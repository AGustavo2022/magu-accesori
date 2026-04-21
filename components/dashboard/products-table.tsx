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

export function ProductsTable({ products, totalProducts, columns }: ProductTableProps) {
  const [state, formAction] = useFormState(deleteProduct, initialState)


  return (

    <>
    {columns.includes("info") && (
      <p className="text-sm text-muted-foreground">
        Mostrando {products.length} de {totalProducts} productos
      </p>
    )}

      <div className="border rounded-lg overflow-hidden">


        <Table>
          <TableHeader>
            <TableRow>
              {columns.includes("image") && (
                <TableHead className="text-center">Imagen</TableHead>
              )}
              {columns.includes("sku") && (
                <TableHead className="text-center">Codigo</TableHead>
              )}
              {columns.includes("product") && (
                <TableHead>Producto</TableHead>
              )}
              {columns.includes("price") && (
                <TableHead className="text-center">Precio</TableHead>
              )}
              {columns.includes("stock") && (
                <TableHead className="text-center">Stock</TableHead>
              )}
              {columns.includes("discount") && (
                <TableHead className="text-center">Descuento</TableHead>
              )}
              {columns.includes("date") && (
                <TableHead className="text-center">Fecha</TableHead>
              )}
              {columns.includes("action") && (
                <TableHead className="text-center"></TableHead>
              )}
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

                  <TableRow
                    key={product.id}
                    className="hover:bg-muted/40 transition-colors"
                  >

                  {columns.includes("image") && (
                    <TableCell className="text-center">
                      <Image
                        src={product.image[0].image_url || "/backpack.png"}
                        width={72}
                        height={72}
                        alt={product.title}
                        className="mx-auto rounded-md object-cover"
                      />
                    </TableCell>
                  )}



                  {columns.includes("sku") && (
                    <TableCell className="text-center">
                      {product.sku}
                    </TableCell>
                  )}

                  {columns.includes("product") && (
                    <TableCell>
                      <div className="space-y-1 max-w-80">
                        <p className="font-semibold text-base leading-tight">
                          {product.title}
                        </p>

                        {product.short_description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.short_description}
                          </p>
                        )}

                        {/* <p className="text-xs text-muted-foreground">
                          {product.category} / {product.subcategory}
                        </p> */}
                      </div>
                    </TableCell>
                  )}


                  {/* {columns.includes("price") && (
                    <TableCell className="text-center font-medium">
                      ${Number(product.final_price).toFixed(2)}
                    </TableCell>
                  )} */}

                  {columns.includes("price") && (
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        {product.discount > 0 && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${Number(product.price).toFixed(2)}
                          </span>
                        )}

                        <span className="font-semibold text-base">
                          ${Number(product.final_price).toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                  )}

                  {/* {columns.includes("stock") && (
                    <TableCell className="text-center">
                      {product.stock}
                    </TableCell>
                  )} */}

                  {columns.includes("stock") && (
                    <TableCell className="text-center">
                      {product.stock === 0 ? (
                        <span className="text-red-600 font-medium">Sin stock</span>
                      ) : product.stock < 2 ? (
                        <span className="text-yellow-600 font-medium">
                           {product.stock}
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium">
                          {product.stock}
                        </span>
                      )}
                    </TableCell>
                  )}

                  {columns.includes("discount") && (
                    <TableCell className="text-center">
                      {product.discount} %
                    </TableCell>
                  )}

                  {columns.includes("date") && (
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {product.created_at
                        ? new Date(product.created_at).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                  )}

                  {columns.includes("action") && (
                    <TableCell className="text-right">
                      {/* <div className="flex justify-end gap-2">
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
                      </div> */}
                        <div className="flex justify-end gap-1">
                          <Button asChild variant="ghost" size="icon">
                            <Link href={`/dashboard/products/${product.id}/edit`}>
                              <Pencil size={16} />
                            </Link>
                          </Button>

                          <form action={formAction}>
                            <input type="hidden" name="id" value={product.id} />
                            <Button
                              type="submit"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash size={16} />
                            </Button>
                          </form>
                        </div>
                      </TableCell>
                    )}


                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
