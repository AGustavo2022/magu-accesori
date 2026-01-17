
import { sql } from '../db/db';
import { Order, OrderItem } from '../types/order.types';
import { notFound } from 'next/navigation';


export async function getOrderByNumber(
  orderNumber: string
): Promise<{order: Order, items: OrderItem[]}> {
  /* 1️⃣ ORDEN */
  const orders = await sql`
    SELECT
      id,
      order_number,
      total,
      subtotal,
      shipping_cost,
      payment_method,
      created_at,
      shipping_data
    FROM orders
    WHERE order_number = ${orderNumber}
    LIMIT 1
  `

  if (orders.length === 0) {
    notFound()
  }

  const order = orders[0] as Order & { id: string }

  /* 2️⃣ ITEMS */
  const items = await sql`
    SELECT
      oi.id,
      p.title,
      oi.quantity,
      oi.price
    FROM order_items oi
    JOIN products2 p ON p.id = oi.product_id
    WHERE oi.order_id = ${order.id}
    ORDER BY oi.id
  `

  return {
    order: {
      order_number: order.order_number,
      total: order.total,
      subtotal: order.subtotal,
      shipping_cost: order.shipping_cost,
      payment_method: order.payment_method,
      created_at: order.created_at,
      shipping_data: order.shipping_data,
    },
    items: items as OrderItem[],
  }
}