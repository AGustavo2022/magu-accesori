import Form from "@/components/dashboard/create-form"
import { FileChartColumn } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCategoryAll } from "@/lib/data/categories.data"
import { Category } from "@/lib/types/definitions"

export default async function AddProductPage() {

    const category = await getCategoryAll()

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nuevos Productos</h1>
          <p className="text-muted-foreground">Formulario para el ingreso de nuevos productos</p>
        </div>
      </div>
      <Form categories={category as Category[]}/>
    </>
  )
}
