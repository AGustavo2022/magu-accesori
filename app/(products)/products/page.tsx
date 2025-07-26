"use client"

import ProductGrid from '@/components/products/product-grid'
import { getProductos } from '@/lib/actions'
import { Product } from '@/lib/definitions';
import { Console } from 'console'
import { useEffect, useState } from "react"

export default function page() {

    const [products, setProducts] = useState<Array<Product>>([]);
  
      useEffect(() => {
        async function fetchData() {
          const data = await getProductos();
          setProducts(data as Product[]);
        }
        fetchData();
      }, []);
      
    // console.log(products)

  //const products = await getProductos()

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h1>
      <ProductGrid products={products} />
    </main>
  )
}
