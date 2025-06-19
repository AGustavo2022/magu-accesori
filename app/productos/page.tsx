import ProductGrid from '@/components/products/product-grid'
import { getProductos } from '@/lib/actions'
import React from 'react'

export default async function page() {

  const products = await getProductos()

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h1>
      <ProductGrid products={products} />
    </main>
  )
}

