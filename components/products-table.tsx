"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input" // Importación necesaria para el buscador
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookImage, Pencil, Trash, Search } from "lucide-react" // Importé Search
import { ProductTableProps } from "@/lib/definitions" // Asumimos que ProductsTableProps ahora tiene 'onDelete'
import { deleteProduct } from "@/lib/actions"


export function ProductsTable({ products }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get unique categories
  // Usamos el encadenamiento opcional para evitar errores si 'products' es temporalmente undefined, aunque lo inicializamos vacío en el padre.
  const categories = Array.from(new Set(products.map((p) => p.category)))

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    // 🚨 ATENCIÓN: Se asume que 'title' y 'shortDescription' existen en tu tipo Product.
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          {/* 👈 CAMBIO 2: Implementación del buscador de producto */}
          <Input
            type="text"
            placeholder="Buscar por título o descripción..."
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

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Mostrando **{filteredProducts.length}** de **{products.length}** productos
      </div>

      {/* Products Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {/* ... Encabezados de tabla ... */}
            <TableRow>
              <TableHead className="w-16">Imagen</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* ... Comprobación de no hay resultados ... */}
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
                  <TableCell>...</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{product.shortDescription}</div>
                    </div>
                  </TableCell>
                  <TableCell>
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          console.log("[v0] Edit product:", product.id)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        // 👈 CAMBIO 3: Llamar a la función onDelete con el ID del producto
                        onClick={() => deleteProduct({id:product.id})}
                        // onClick={()=>console.log(typeof product.id, product.id )}
                        className="text-destructive hover:bg-destructive/10" // Estilo para destacar eliminación
                      >
                        <Trash className="h-4 w-4" /> 
                      </Button>
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
