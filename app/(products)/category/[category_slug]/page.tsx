import ProductGrid from "@/components/products/product-grid"
import { getProductsByCategory } from "@/lib/data"
import { unslugify } from "@/lib/utils"

export const dynamic = "force-dynamic";


export default async function CategoryPage(props: { params: Promise<{ category_slug: string }> }) {

  const {category_slug} = await props.params

  const products = await getProductsByCategory(unslugify(category_slug))

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid products={products} />
    </div>
  )
}
