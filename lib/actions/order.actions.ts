'use server';

import { z } from 'zod';

import { CreateOrderSchema } from '../schemas/order.schema';
import { CreateOrderState } from '../types/order.types';
import { sql } from './product.actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function flattenZodErrors(tree: any, parentKey = ""): Record<string, string[]> {
  let errors: Record<string, string[]> = {}

  if (tree.errors?.length) {
    errors[parentKey || "_form"] = tree.errors
  }

  if (tree.properties) {
    for (const [key, value] of Object.entries(tree.properties)) {
      const path = parentKey ? `${parentKey}.${key}` : key
      Object.assign(errors, flattenZodErrors(value, path))
    }
  }

  if (tree.items) {
    tree.items.forEach((item: any, index: number) => {
      const path = `${parentKey}[${index}]`
      Object.assign(errors, flattenZodErrors(item, path))
    })
  }

  return errors
}

export async function createOrder(
  prevState: CreateOrderState,
  formData: FormData
): Promise<CreateOrderState> {

  /* 1️⃣ Normalizar datos */
  const rawValues = {
    items: JSON.parse(String(formData.get("items"))),
    paymentMethod: String(formData.get("paymentMethod")),
    shippingMethod: String(formData.get("shipping_method")),
    shipping: {
      firstName: String(formData.get("shipping_firstName")),
      lastName: String(formData.get("shipping_lastName")),
      email: String(formData.get("shipping_email")),
      phone: String(formData.get("shipping_phone")),
      address: String(formData.get("shipping_address")),
      city: String(formData.get("shipping_city")),
      province: String(formData.get("shipping_province")),
      postal: String(formData.get("shipping_postal")),
    },
  };

  /* 2️⃣ Validar */
  const validated = CreateOrderSchema.safeParse(rawValues);

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    const errors = flattenZodErrors(tree);

    return {
      success: false,
      message: "Error al crear la orden",
      errors,
      values: rawValues,
    };
  }

  const { items, paymentMethod, shipping } = validated.data;

  /* 3️⃣ Recalcular precios */
  const products = await sql`
    SELECT
      id,
      title,
      ROUND(
        price - (price * COALESCE(discount, 0) / 100.0),
        2
      ) AS final_price
    FROM products2
    WHERE id = ANY(${items.map(i => i.productId)})
  `;

  const productMap = new Map(products.map(p => [p.id, p]));

  let subtotal = 0;

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return { success: false, message: "Producto no encontrado" };
    }
    subtotal += product.final_price * item.quantity;
  }

  const [shippingRow] = await sql`
  SELECT price
  FROM shipping_methods
  WHERE code = ${validated.data.shippingMethod}
    AND active = true
  LIMIT 1
`

  if (!shippingRow) {
    return {
      success: false,
      message: "Método de envío inválido",
    }
  }

  const shippingCost = Number(shippingRow.price)

  // const shippingCost = shipping.address === "Retiro del local" ? 0 : 5000
  const total = subtotal + shippingCost
  const status = "pending";
  const created_at = new Date().toISOString();

  const shippingData = {
    firstName: shipping.firstName,
    lastName: shipping.lastName,
    email: shipping.email,
    phone: shipping.phone,
    address: shipping.address,
    city: shipping.city ?? "Rio Grande",
    province: shipping.province ?? "Tierra del Fuego",
    postal: shipping.postal ?? "9420",
  };

  try {
    await sql`BEGIN`;

    /* 4️⃣ Control de stock */
    for (const item of items) {
      const [updated] = await sql`
        UPDATE products2
        SET stock = stock - ${item.quantity}
        WHERE id = ${item.productId}
          AND stock >= ${item.quantity}
        RETURNING id
      `;

      if (!updated) {
        throw new Error("Stock insuficiente");
      }
    }

    /* 5️⃣ Crear orden */
    const [order] = await sql`
      INSERT INTO orders (
        shipping_data,
        payment_method,
        subtotal,
        shipping_cost,
        total,
        status,
        created_at,
        order_number
      )
      VALUES (
        ${JSON.stringify(shippingData)}::jsonb,
        ${paymentMethod},
        ${subtotal},
        ${shippingCost},
        ${total},
        ${status},
        ${created_at},
        'ORD-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
        LPAD(nextval('order_number_seq')::text, 6, '0')
      )
      RETURNING *
    `;

    /* 6️⃣ Crear items y devolverlos */
    const itemsArray: any[] = [];

    for (const item of items) {
      const product = productMap.get(item.productId)!;

      const [orderItem] = await sql`
        INSERT INTO order_items (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES (
          ${order.id},
          ${item.productId},
          ${item.quantity},
          ${product.final_price}
        )
        RETURNING
          id,
          order_id,
          product_id,
          quantity,
          price
      `;

      itemsArray.push({
        ...orderItem,
        title: product.title,
      });
    }

    await sql`COMMIT`;

    return {
      success: true,
      message: "Orden creada correctamente",
      order,
      items: itemsArray,
    };

  } catch (error: any) {
    await sql`ROLLBACK`;

    return {
      success: false,
      message: error.message ?? "Error al crear la orden",
    };
  }
}



export type UpdateOrderStatusState = {
  success: boolean
  message: string
}

export async function updateOrderStatus(
  orderId: string,
  status: "confirmed" | "cancelled"
): Promise<UpdateOrderStatusState> {

  const allowedStatuses = ["confirmed", "cancelled"]

  /* 1️⃣ Validar estado permitido */
  if (!allowedStatuses.includes(status)) {
    return {
      success: false,
      message: "Estado inválido",
    }
  }

  try {
    await sql`BEGIN`

    /* 2️⃣ Verificar que exista la orden */
    const [order] = await sql`
      SELECT id, status
      FROM orders
      WHERE id = ${orderId}
      LIMIT 1
    `

    if (!order) {
      await sql`ROLLBACK`
      return {
        success: false,
        message: "Orden no encontrada",
      }
    }

    /* 3️⃣ Solo permitir modificar órdenes pendientes */
    if (order.status !== "pending") {
      await sql`ROLLBACK`
      return {
        success: false,
        message: "La orden ya fue procesada",
      }
    }

    /* 4️⃣ Si se cancela, devolver stock */
    if (status === "cancelled") {

      const items = await sql`
        SELECT product_id, quantity
        FROM order_items
        WHERE order_id = ${orderId}
      `

      for (const item of items) {
        await sql`
          UPDATE products2
          SET stock = stock + ${item.quantity}
          WHERE id = ${item.product_id}
        `
      }
    }

    /* 5️⃣ Actualizar estado */
    await sql`
      UPDATE orders
      SET status = ${status}
      WHERE id = ${orderId}
    `

    await sql`COMMIT`


    revalidatePath('/dashboard/orders');
    redirect('/dashboard/orders');

  } catch (error: any) {

    await sql`ROLLBACK`

    return {
      success: false,
      message: error.message ?? "Error al actualizar la orden",
    }
  }

    
}