'use server';

import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateProductState, DeleteActionState, UpdateProductState } from '../types/product.types';
import { CreateProductSchema, UpdateProductSchema } from '../schemas/product.schema';
import { CreateOrderSchema } from '../schemas/order.schema';
import { CreateOrderState } from '../types/order.types';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function createProduct(
  prevState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {

  const rawValues = Object.fromEntries(
    Array.from(formData.entries()).map(([k, v]) => [k, String(v)])
  );

  const validatedFields = CreateProductSchema.safeParse(rawValues);

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);

    const errors = Object.fromEntries(
      Object.entries(tree.properties ?? {}).map(([key, value]) => [
        key,
        value?.errors ?? [],
      ])
    );

    return {
      success: false,
      message: "Error al crear el producto",
      errors,
      values: rawValues,
    };
  }

  const status = 'true';
  const created_at = new Date().toISOString(); // Usar ISO string para TIMESTAMP

  await sql`
            INSERT INTO products2 (
                title, 
                short_description, 
                long_description, 
                price, 
                stock, 
                image_url, 
                category, 
                subcategory, 
                status, 
                discount, 
                created_at
            )
            VALUES (
                ${validatedFields.data.title}, 
                ${validatedFields.data.shortDescription}, 
                ${validatedFields.data.longDescription}, 
                ${validatedFields.data.price}, 
                ${validatedFields.data.stock}, 
                ${validatedFields.data.image_url},                
                ${validatedFields.data.category}, 
                ${validatedFields.data.subcategory}, 
                ${status}, 
                ${validatedFields.data.discount}, 
                ${created_at}
            )
        `;
  // "Olvida los datos que tienes guardados" (la caché) para una página en particular.
  // "Cuando un usuario visite esa ruta la próxima vez, vuelve a buscar los datos" (o en el próximo acceso a datos en el servidor).
  revalidatePath('/dashboard/add');
  redirect('/dashboard');

}

export async function updateProduct(
  id: string,
  prevState: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {

  const rawValues = Object.fromEntries(
    Array.from(formData.entries()).map(([k, v]) => [k, String(v)])
  );

  const validatedFields = UpdateProductSchema.safeParse(rawValues);

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);

    const errors = Object.fromEntries(
      Object.entries(tree.properties ?? {}).map(([key, value]) => [
        key,
        value?.errors ?? [],
      ])
    );

    return {
      success: false,
      message: 'Datos inválidos. Revisá el formulario.',
      errors,
      values: rawValues,
    };
  }

  const updated_at = new Date().toISOString();

  try {
    await sql`
      UPDATE products2
      SET
        title = ${validatedFields.data.title},
        short_description = ${validatedFields.data.shortDescription},
        long_description = ${validatedFields.data.longDescription},
        price = ${validatedFields.data.price},
        stock = ${validatedFields.data.stock},
        image_url = ${validatedFields.data.image_url},
        category = ${validatedFields.data.category},
        subcategory = ${validatedFields.data.subcategory},
        status = ${validatedFields.data.status},
        discount = ${validatedFields.data.discount},
        updated_at = ${updated_at}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error DB update:', error);

    return {
      success: false,
      message: 'Error al actualizar el producto. Intentá nuevamente.',
      values: rawValues,
    };
  }

  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/${id}/edit`);
  redirect('/dashboard');
}

export async function deleteProduct(prevState: DeleteActionState,formData: FormData): Promise<DeleteActionState> {

  const id = formData.get('id') as string;

  if (!id) {
    return {
      success: false,
      message: 'ID de producto inválido.',
    };
  }

  try {
    await sql`
      UPDATE products2
      SET status = false
      WHERE id = ${id};
      `;

    revalidatePath('/dashboard');

  } catch (error) {
    console.error('Error DB delete:', error);
    return {
      success: false,
      message: 'Error al eliminar el producto. Intentá nuevamente.',
    };
  }

  redirect('/dashboard');
}


// type CartItem = {
//   productId: string;
//   quantity: number;
//   price: number;
// };

// export async function createOrder(formData: FormData) {
//   // --- 1. Leer datos del form ---
//   // const rawFormData = {
//   //   items: formData.get("items"),
//   //   shippingData: formData.get("shippingData"),
//   //   paymentMethod: formData.get("paymentMethod"),
//   // };

//   // const items: CartItem[] = rawFormData.items
//   //   ? JSON.parse(rawFormData.items as string)
//   //   : [];

//   // const shippingData = rawFormData.shippingData
//   //   ? JSON.parse(rawFormData.shippingData as string)
//   //   : {};

//   // const paymentMethod = String(rawFormData.paymentMethod || "");

//     /* 1️⃣ Parsear datos */


//   const raw = {
//     items: JSON.parse(String(formData.get("items"))),
//     paymentMethod: formData.get("paymentMethod"),
//     shipping: {
//       firstName: formData.get("shipping_firstName"),
//       lastName: formData.get("shipping_lastName"),
//       email: formData.get("shipping_email"),
//       phone: formData.get("shipping_phone"),
//       address: formData.get("shipping_address"),
//     },
//   };

//   // if (!items.length) throw new Error("No se enviaron items.");
//   // if (!paymentMethod) throw new Error("Método de pago inválido.");

//   // const total = items.reduce(
//   //   (acc, i) => acc + i.price * i.quantity,
//   //   0
//   // );

//     /* 2️⃣ Validación Zod v4 */
//   const parsed = CreateOrderSchema.safeParse(raw);

//   if (!parsed.success) {
//     return {
//       success: false,
//       errors: z.treeifyError(parsed.error),
//     };
//   }

//   const { items, paymentMethod, shipping } = parsed.data;

//     /* 3️⃣ Recalcular precios en SERVER */
//   const products = await sql`
//     SELECT id, price
//     FROM products2
//     WHERE id = ANY(${items.map(i => i.productId)})
//   `;

//   let subtotal = 0;

//   for (const item of items) {
//     const product = products.find(p => p.id === item.productId);
//     if (!product) throw new Error("Producto no encontrado");
//     subtotal += product.price * item.quantity;
//   }

//   const shippingCost = subtotal > 50000 ? 0 : 599;
//   const total = subtotal + shippingCost;


//   // const created_at = new Date().toISOString();
//   // let orderId: string;
//   // let order_number = "";

//   // --- 2. INICIAR TRANSACCIÓN ---
//   await sql`BEGIN`;

//   try {
//     // --- 3. Verificar stock de todos los productos ---
//     for (const item of items) {
//       const product = await sql`
//         SELECT stock FROM products2
//         WHERE id = ${item.productId};
//       `;

//       if (!product[0]) {
//         throw new Error(`Producto ${item.productId} no existe.`);
//       }

//       if (product[0].stock < item.quantity) {
//         throw new Error(
//           `Stock insuficiente para el producto ${item.productId}.`
//         );
//       }
//     }

//     // --- 4. Crear la orden principal ---
//     const orderResult = await sql`
//       INSERT INTO orders (
//         shipping_data,
//         payment_method,
//         total,
//         status,
//         created_at
//       )
//       VALUES (
//         ${JSON.stringify(shippingData)}::jsonb,
//         ${paymentMethod},
//         ${total},
//         'pending',
//         ${created_at}
//       )
//       RETURNING id;
//     `;

//     orderId = orderResult[0].id;

//     order_number = "ORD-" + orderId.substring(0, 8).toUpperCase();

//     // --- 5. Insertar items y descontar stock ---
//     for (const item of items) {
//       await sql`
//         INSERT INTO order_items (order_id, product_id, quantity, price, order_number)
//         VALUES (${orderId}, ${item.productId}, ${item.quantity}, ${item.price}, ${order_number});
//       `;

//       await sql`
//         UPDATE products2
//         SET stock = stock - ${item.quantity}
//         WHERE id = ${item.productId};
//       `;
//     }

//     // --- 6. CONFIRMAR TRANSACCIÓN ---
//     await sql`COMMIT`;

//     console.log(`Pedido ${orderId} creado correctamente.`);

//   } catch (err) {
//     console.error("Error creando pedido:", err);

//     // Si todo falla, revertimos todo ✔️
//     await sql`ROLLBACK`;

//     throw new Error("No se pudo crear la orden. Intente nuevamente.");
//   }

//   return {
//     orderId,
//     items,
//     total,
//     shippingData,
//     paymentMethod,
//     order_number,
//     created_at,
//   };
// }

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

  const shippingCost = subtotal > 50000 ? 0 : 599;
  const total = subtotal + shippingCost;
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

    /* 5️⃣ Crear orden (order_number ACÁ) */
    const [order] = await sql`
      INSERT INTO orders (
        shipping_data,
        payment_method,
        total,
        status,
        created_at,
        order_number
      )
      VALUES (
        ${JSON.stringify(shippingData)}::jsonb,
        ${paymentMethod},
        ${total},
        ${status},
        ${created_at},
        'ORD-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
        LPAD(nextval('order_number_seq')::text, 6, '0')
      )
      RETURNING *
    `;

    /* 6️⃣ Items */
    for (const item of items) {
      const product = productMap.get(item.productId)!;

      await sql`
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
      `;
    }

    await sql`COMMIT`;

    return {
      success: true,
      message: "Orden creada correctamente",
      order,
    };

  } catch (error: any) {
    await sql`ROLLBACK`;

    return {
      success: false,
      message: error.message ?? "Error al crear la orden",
    };
  }
}
