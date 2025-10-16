
import ProductGrid from '@/components/products/product-grid'
import { getProductos2 } from '@/lib/data'
import { notFound } from 'next/navigation';

export default async function ProductItemPage() {
  const product = await getProductos2()
  console.log(product)
  if (!product || product.length === 0) {
    notFound()
  }
  return (
    // se agrega suspender sin veerificar q funciones
  <>
  <ProductGrid products={product} />
  </>
  )
}


