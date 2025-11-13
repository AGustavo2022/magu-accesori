//import { fetchProducts } from "@/lib/data"
import Form from "@/components/dashboard/create-form"
import { FileChartColumn } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default async function AddProductPage() {
  //const produts = await fetchProducts()

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nuevos Productos</h1>
          <p className="text-muted-foreground">Formulario para el ingreso de nuevos productos</p>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                variant="outline"
                className="w-16 h-16 p-3 rounded-full">
                <Link
                  href={'/dashboard'}
                  className=" hover:bg-gray-100"
                >
                  <FileChartColumn size={24} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ir Producto</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <Form />
    </>
  )
}
