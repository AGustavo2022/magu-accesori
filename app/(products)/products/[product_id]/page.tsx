"use client"
import React, { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { getProductsByid } from "@/lib/actions"
import ProductItem from "@/components/products/product-item"
import { Product } from "@/lib/definitions"


export default function ProductItemPage({ params }: { params: Promise<{ product_id: string }> }) {
  
  const { product_id } =  React.use(params) 
  const numericProductsId = Number(product_id);
  
  const [products, setProducts] = useState<Array<Product>>([]);


  useEffect(() => {
    async function fetchData() {
      const data = await getProductsByid(numericProductsId)
      console.log(data)
      setProducts(data as Product[]);
    }
    fetchData();
  }, [numericProductsId]);
  
  return (
    <ProductItem product={products[0]} />
  )
}


// export default async function ProductPage({ params }: { params: { product_id: string } }) {
  
//   const product_id = Number(params.product_id)
//   const product = await getProductsByid(product_id)

//   // Si no hay productos, mostrar página 404
//   if (product.length === 0) {
//     notFound()
//   }

//   return (
//     <ProductItem product={product[0]} />
//   )
// }


