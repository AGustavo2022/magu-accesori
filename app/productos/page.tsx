import ProductGrid from '@/components/products/product-grid'
import React from 'react'

function page() {
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h1>
      <ProductGrid />
    </main>
  )
}

export default page
