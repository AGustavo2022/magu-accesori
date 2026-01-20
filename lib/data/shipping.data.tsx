"use server"

import { sql } from "../db/db"

export type ShippingMethod = {
  code: "delivery" | "pickup"
  name: string
  price: number
}

export async function getShippingMethodsAll() {
  try {
    const response = await sql`
      SELECT
        sm.code,
        sm.name,
        sm.price
      FROM shipping_methods sm
      ORDER BY sm.name;
    `

    return response as ShippingMethod[]
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch shipping methods.")
  }
}