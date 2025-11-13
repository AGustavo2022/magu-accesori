import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductArrayProps} from "@/lib/definitions"


 export function MetricCard({ products, cardTitle, unitSigla }: ProductArrayProps) {

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
