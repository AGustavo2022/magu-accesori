
import { ITEMS_PAGINATION_PAGE } from '../constants/pagination.constants';
import { sql } from '../db/db';
import { Order, OrderItem, OrderPreview } from '../types/order.types';
import { notFound } from 'next/navigation';



export async function getOrdersPages(
  query: string = "",
  page: number = 1
) {
  const offset = (page - 1) * ITEMS_PAGINATION_PAGE
  const search = `%${query}%`

  try {
    const orders = await sql`
      SELECT
        o.id,
        o.order_number,
        o.user_id,
        o.status,
        o.payment_method,
        o.subtotal,
        o.shipping_cost,
        o.total,
        o.shipping_data,
        o.created_at,
        o.updated_at
      FROM orders o
      WHERE
        (
          o.order_number ILIKE ${search}
          OR o.status::text ILIKE ${search}
          OR o.shipping_data->>'firstName' ILIKE ${search}
          OR o.shipping_data->>'lastName' ILIKE ${search}
        )
      ORDER BY o.created_at DESC
      LIMIT ${ITEMS_PAGINATION_PAGE}
      OFFSET ${offset}
    `

    return orders as Order[]
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch paginated orders.")
  }
}

export async function getOrdersTotalPages(query: string = "") {
  const search = `%${query}%`

  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM orders o
      WHERE
        (
          o.order_number ILIKE ${search}
          OR o.status::text ILIKE ${search}
          OR o.payment_method ILIKE ${search}
          OR o.total::text ILIKE ${search}
        )
    `

    const total = Number(count[0].count)
    return Math.ceil(total / ITEMS_PAGINATION_PAGE)
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of order pages.")
  }
}

export async function getOrdersDashboardTotalCount(
  query?: string,
  status?: "pending" | "confirmed" | "cancelled"
): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) AS total
    FROM orders o
    WHERE 1=1

    ${
      query
        ? sql`
          AND (
            o.order_number ILIKE ${'%' + query + '%'}
            OR o.status::text ILIKE ${'%' + query + '%'}
            OR o.payment_method ILIKE ${'%' + query + '%'}
            OR o.total::text ILIKE ${'%' + query + '%'}
            OR o.shipping_data->>'firstName' ILIKE ${'%' + query + '%'}
            OR o.shipping_data->>'lastName' ILIKE ${'%' + query + '%'}
            OR o.shipping_data->>'phone' ILIKE ${'%' + query + '%'}
          )
        `
        : sql``
    }

    ${
      status
        ? sql`AND o.status = ${status}::order_status`
        : sql``
    }
  `

  return Number(result[0].total)
}

export async function getOrderByNumber(
  orderNumber: string
): Promise<{order: OrderPreview, items: OrderItem[]}> {
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