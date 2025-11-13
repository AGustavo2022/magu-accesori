import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductTableProps } from "@/lib/definitions"
import { ProductsTable } from "@/components/dashboard/products-table"



 export function ProductTableCard({ products }: ProductTableProps) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Productos</CardTitle>
            </CardHeader>
            <CardContent>
                <ProductsTable products={products} />
            </CardContent>
        </Card>
    )
}