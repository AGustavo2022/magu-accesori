"use client"

import ProductGrid from "@/components/products/product-grid"
import { getProductsBySubcategory } from "@/lib/actions"
import { useEffect, useState } from "react";
import { Product } from "@/lib/definitions";
import React from "react"

export default   function CategoryPage({ params }: { params: Promise<{ subcategory_id: string }> }) {

  const { subcategory_id } =  React.use(params) 
  const numericSubcategoryId = Number(subcategory_id);

  // const products = await getProductsBySubcategory(numericSubcategoryId)

  // console.log(products)
  
  const [products, setProducts] = useState<Array<Product>>([]);


  useEffect(() => {
    async function fetchData() {
      const data = await getProductsBySubcategory(numericSubcategoryId)
      console.log(data)
      setProducts(data as Product[]);
    }
    fetchData();
  }, [numericSubcategoryId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid products={products} />
    </div>
  )
}
