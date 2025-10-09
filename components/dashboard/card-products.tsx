import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductArrayProps, ProductTableProps } from "@/lib/definitions"
import { ProductsTable } from "@/components/dashboard/products-table"

function CardProducts({ products, cardTitle, unitSigla }: ProductArrayProps) {

    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{unitSigla}{products}</div>
                </CardContent>
            </Card>
        </div>
    )
}


function CardProductsTable({ products }: ProductTableProps) {

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

export {CardProducts, CardProductsTable}