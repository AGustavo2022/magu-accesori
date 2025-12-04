import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"


export function SkeletonProductsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <Card className="w-full overflow-hidden flex flex-col h-[380px] p-0">
      
      {/* Imagen */}
      <div className="relative w-full h-40">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute top-1 right-1">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>

      {/* Contenido */}
      <CardContent className="p-3 flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          
          {/* Título */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>

          {/* Precios */}
          <div className="pt-3 space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
          </div>
        </div>
      </CardContent>

    </Card>
  );
}