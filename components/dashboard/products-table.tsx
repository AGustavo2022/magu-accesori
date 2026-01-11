"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input" // Importación necesaria para el buscador
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookImage, Pencil, Trash, Search } from "lucide-react" // Importé Search
import { ProductTableProps } from "@/lib/types/definitions" // Asumimos que ProductsTableProps ahora tiene 'onDelete'
import { deleteProduct } from "@/lib/actions/actions"
import { DeleteActionState } from '@/lib/types/product.types'
import Link from "next/link"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFormState } from "react-dom"

const initialState: DeleteActionState = {
  success: false,
  message: null,
  errors: {},
};



export function ProductsTable({ products }: ProductTableProps) {

  const [state, formAction] = useFormState(deleteProduct, initialState);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  //console.log(products)

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.short_description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Agotado</Badge>
    } else if (stock <= 5) {
      return <Badge variant="secondary">Bajo Stock</Badge>
    } else {
      return <Badge variant="default">En Stock</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Buscar por Producto o Descripción..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-muted-foreground">
        Mostrando {filteredProducts.length} de {products.length} productos
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {/* ... Encabezados de tabla ... */}
            <TableRow >
              <TableHead className="text-center w-24">Imagen</TableHead>
              <TableHead className="text-center">Producto</TableHead>
              <TableHead className="text-center">Categoría</TableHead>
              <TableHead className="text-center">Precio</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-center">Fecha</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  {searchTerm || selectedCategory !== "all"
                    ? "No se encontraron productos con los filtros aplicados"
                    : "No hay productos registrados"}
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  {/* ... Celdas de datos ... */}
                  <TableCell>
                    <Image
                      src={product.image_url || "/backpack.png"}
                      width={40}
                      height={40}
                      className="w-30 h-15 object-cover group-hover:scale-105 transition-transform duration-300 rounded-none"
                      alt={product.title}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{product.short_description}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">${Number(product.price).toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStockBadge(product.stock)}</TableCell>
                  {/* Si el formato de fecha falla, usa toLocaleDateString() con comprobación para evitar el error de toLocaleDateString en undefined/null */}
                  <TableCell className="text-sm text-muted-foreground">
                    {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            asChild
                            variant="outline"
                            size="sm">
                            <Link
                              href={`/dashboard/${product.id}/edit`}
                              className=" hover:bg-gray-100"
                            >
                              <Pencil size={16} />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar Producto</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
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
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar Producto</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
