//import { fetchProducts } from "@/lib/data"
import Form from "@/components/dashboard/create-form"
import { SquareChartGantt } from "lucide-react"
import Link from "next/link"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

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
          <HoverCard>
            <HoverCardTrigger>
              <Link href='/dashboard'><SquareChartGantt /></Link>
            </HoverCardTrigger>
            <HoverCardContent>
              Ir a Productos
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <Form />
    </>
  )
}
