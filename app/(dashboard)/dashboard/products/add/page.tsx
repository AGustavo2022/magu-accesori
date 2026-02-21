import { getCategoryAll } from "@/lib/data/categories.data"
import { Category } from "@/lib/types/definitions"
import CreateProductForm from "@/components/dashboard/create-form"

export default async function AddProductPage() {

    const category = await getCategoryAll()

  return (
    <>
      <CreateProductForm categories={category as Category[]}/>
    </>
  )
}
