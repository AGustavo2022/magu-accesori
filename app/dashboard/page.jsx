
import { MetricCard } from "@/components/dashboard/metric-card"
import { ProductTableCard } from "@/components/dashboard/products-table-card"
import { getProductsDashboard } from '@/lib/data/product.data'
import { Plus, PowerIcon } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { signOut } from '@/auth';


export default async function DashboardPage() {

  const products = await getProductsDashboard()

  // console.log(products)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
        </div>
        <div className="flex justify-end items-start gap-3">
          <Button
            asChild
            variant="outline"
            className="w-24 h-24 rounded-xl hover:bg-gray-100"
          >
            <Link
              href="/dashboard/add"
              className="flex flex-col items-center justify-center gap-1 text-center"
            >
              <Plus size={24} />
              <span className="text-xs leading-tight">
                Agregar<br />producto
              </span>
            </Link>
          </Button>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-gray-100"
            >
              <PowerIcon className="w-6" />
              <span className="text-xs leading-tight">
                Sign<br />Out
              </span>
            </Button>
          </form>
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
