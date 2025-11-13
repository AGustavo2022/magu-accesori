
import { MetricCard } from "@/components/dashboard/metric-card" 
import {ProductTableCard } from "@/components/dashboard/products-table-card"
import { getProductsAll } from '@/lib/data'
import { Plus } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"


export default async function DashboardPage() {

  const products = await getProductsAll()

  // console.log(products)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                variant="outline"
                className="w-16 h-16 p-3 rounded-full">
                <Link
                  href={'/dashboard/add'}
                  className=" hover:bg-gray-100"
                >
                  <Plus size={24}/>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Agregar Producto</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          products={products.length}
          cardTitle="Cantidad de Productos"
        />
        <MetricCard
          products={products.reduce((sum, product) => sum + product.stock, 0)}
          cardTitle="Stock Total"
        />
        <MetricCard
          products={products.reduce((sum, product) => sum + product.price * product.stock, 0).toFixed(2)}
          cardTitle="Valor del Inventario"
          unitSigla="$"
        />
      </div>
      <ProductTableCard products={products} />
    </div>
  )
}
