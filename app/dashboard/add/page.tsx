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
        <div>
          <Button
            asChild
            variant="outline"
            className="w-24 h-24 rounded-xl hover:bg-gray-100"
          >
            <Link
              href="/dashboard"
              className="flex flex-col items-center justify-center gap-1 text-center"
              aria-label="Ir a dashboard"
            >
              <FileChartColumn size={24} />
              <span className="text-xs leading-tight">
                Ir a<br />dashboard
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <Form categories={category as Category[]}/>
    </>
  )
}
