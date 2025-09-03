
import ProductGrid from '@/components/products/product-grid'
import { getProductos } from '@/lib/actions'
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '../../../components/skeletons';


export default async function ProductItemPage() {
  const product = await getProductos()
  if (!product || product.length === 0) {
    notFound()
  }
  return (
    // se agrega suspender sin veerificar q funciones
  <>
  <Suspense fallback={<RevenueChartSkeleton />}>
  <ProductGrid products={product} />
  </Suspense>
  </>
  )
}


