import { NextResponse } from "next/server"
import { sql } from "@/lib/db/db"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params

    console.log("Order ID recibido:", orderId)

    const items = await sql`
      SELECT 
        oi.id,
        oi.product_id,
        p.title,
        oi.price::numeric as price,
        oi.quantity
      FROM order_items oi
      LEFT JOIN products2 p ON p.id = oi.product_id
      WHERE oi.order_id = ${orderId}
    `

    return NextResponse.json({ items })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error fetching order items" },
      { status: 500 }
    )
  }
}
