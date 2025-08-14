"use client"
import React, { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { getProductsByid } from "@/lib/actions"
import ProductItem from "@/components/products/product-item"
import { Product } from "@/lib/definitions"


export default function ProductItemPage() {
  
   const { product_id } = useParams<{ product_id: string }>()
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
  
  console.log(products)

  return (
    <p>ProductItem</p>
    // <ProductItem product={products[0]} />
  )
}

