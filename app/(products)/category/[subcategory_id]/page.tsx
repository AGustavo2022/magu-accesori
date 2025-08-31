import ProductGrid from "@/components/products/product-grid"
import { getProductsBySubcategory } from "@/lib/actions"
import React from "react"

export default async function CategoryPage({ params }: { params: { subcategory_id: string } }) {


  const numericSubcategoryId = Number(params.subcategory_id);

  const products = await getProductsBySubcategory(numericSubcategoryId)

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid products={products} />
    </div>
  )
}
