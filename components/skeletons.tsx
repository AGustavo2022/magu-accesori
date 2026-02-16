// components/skeletons/skeleton-products-page.tsx

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function SkeletonProductsPage() {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">

      {/* Buscador */}
      <div className="h-16 w-full flex items-center">
        <Skeleton className="h-10 w-full  rounded-md" />
      </div>

      {/* Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonProductCard key={i} />
          ))}
        </div>
      </div>

      {/* Paginación */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-md" />
        ))}
      </div>

    </div>
  )
}

function SkeletonProductCard() {
  return (
    <Card className="w-full overflow-hidden flex flex-col h-95 p-0">

      {/* Imagen */}
      <div className="relative w-full h-40">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute top-2 right-2">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Contenido */}
      <CardContent className="p-3 flex flex-col flex-1">
        <div className="flex flex-col flex-1 space-y-3">

          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>

          <div className="mt-auto space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
          </div>

        </div>
      </CardContent>

    </Card>
  )
}
