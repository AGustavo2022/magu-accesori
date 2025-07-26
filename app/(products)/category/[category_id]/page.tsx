"use client"


import { notFound } from "next/navigation"
import ProductGrid from "@/components/products/product-grid"
import { getProductsByCategory } from "@/lib/actions"
import { useEffect, useState } from "react";
import { Product } from "@/lib/definitions";


export default function CategoryPage({ params }: { params: { category_id: number } }) {

  const { category_id } = params
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    async function fetchData() {
      //const data = await getCategorias();
      const data = await getProductsByCategory(category_id)
      setProducts(data as Product[]);
    }
    fetchData();
  }, []);

  console.log(products)

  // Si no hay productos, mostrar página 404
if (!Array.isArray(products) || products.length === 0) {
  console.log("Categoría no encontrada:", category_id);
  notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-2 text-center">{categoryTitle}</h1>
      <p className="text-gray-600 mb-8 text-center">Explora nuestra selección de {categoryTitle.toLowerCase()}</p> */}

      {/* Mostrar los productos usando el componente ProductGrid */}
      <ProductGrid products={products} />
    </div>
  )
}
