'use server';

import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateProductState, DeleteActionState, UpdateProductState } from '../types/product-state';
import { CreateProductSchema, UpdateProductSchema } from '../schemas/product.schema';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function createProduct(
  prevState: CreateProductState, 
  formData: FormData
): Promise<CreateProductState> {


  const validatedFields = CreateProductSchema.safeParse({
    title: formData.get('title'),
    shortDescription: formData.get('shortDescription'),
    longDescription: formData.get('longDescription'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    image_url: formData.get('image_url'),
    category: formData.get('category'),
    subcategory: formData.get('subcategory'),
    discount: formData.get('discount'),
  });

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
  };
}

  console.log(validatedFields)

  const status = 'true';

  // **Fecha de Creación**
  const created_at = new Date().toISOString(); // Usar ISO string para TIMESTAMP

    // await sql`
    //         INSERT INTO products2 (
    //             title, 
    //             short_description, 
    //             long_description, 
    //             price, 
    //             stock, 
    //             image_url, 
    //             category, 
    //             subcategory, 
    //             status, 
    //             discount, 
    //             created_at
    //         )
    //         VALUES (
    //             ${validatedFields.data.title}, 
    //             ${validatedFields.data.shortDescription}, 
    //             ${validatedFields.data.longDescription}, 
    //             ${validatedFields.data.price}, 
    //             ${validatedFields.data.stock}, 
    //             ${validatedFields.data.image_url},                
    //             ${validatedFields.data.category}, 
    //             ${validatedFields.data.subcategory}, 
    //             ${status}, 
    //             ${validatedFields.data.discount}, 
    //             ${created_at}
    //         )
    //     `;
    // "Olvida los datos que tienes guardados" (la caché) para una página en particular.
    // "Cuando un usuario visite esa ruta la próxima vez, vuelve a buscar los datos" (o en el próximo acceso a datos en el servidor).
    revalidatePath('/dashboard/add');
    redirect('/dashboard');
  
}

export async function updateProduct(id: string,prevState: UpdateProductState,formData: FormData): Promise<UpdateProductState> {
  
  const validatedFields = UpdateProductSchema.safeParse({
    title: formData.get('title'),
    shortDescription: formData.get('shortDescription'),
    longDescription: formData.get('longDescription'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    image_url: formData.get('image_url'),
    category: formData.get('category'),
    subcategory: formData.get('subcategory'),
    status: formData.get('status'),
    discount: formData.get('discount'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Datos inválidos. Revisá el formulario.',
      errors: validatedFields.error.flatten().fieldErrors,
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

        discount = ${validatedFields.data.discount},
        updated_at = ${updated_at}
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/${id}/edit`);

  } catch (error) {
    console.error('Error DB update:', error);
    return {
      success: false,
      message: 'Error al actualizar el producto. Intentá nuevamente.',
    };
  }

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


type CartItem = {
  productId: string;
  quantity: number;
  price: number;
};

export async function createOrder(formData: FormData) {
  // --- 1. Leer datos del form ---
  const rawFormData = {
    items: formData.get("items"),
    shippingData: formData.get("shippingData"),
    paymentMethod: formData.get("paymentMethod"),
  };

  const items: CartItem[] = rawFormData.items
    ? JSON.parse(rawFormData.items as string)
    : [];

  const shippingData = rawFormData.shippingData
    ? JSON.parse(rawFormData.shippingData as string)
    : {};

  const paymentMethod = String(rawFormData.paymentMethod || "");

  if (!items.length) throw new Error("No se enviaron items.");
  if (!paymentMethod) throw new Error("Método de pago inválido.");

  const total = items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  const created_at = new Date().toISOString();
  let orderId: string;
  let order_number = "";

  // --- 2. INICIAR TRANSACCIÓN ---
  await sql`BEGIN`;

  try {
    // --- 3. Verificar stock de todos los productos ---
    for (const item of items) {
      const product = await sql`
        SELECT stock FROM products2
        WHERE id = ${item.productId};
      `;

      if (!product[0]) {
        throw new Error(`Producto ${item.productId} no existe.`);
      }

      if (product[0].stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para el producto ${item.productId}.`
        );
      }
    }

    // --- 4. Crear la orden principal ---
    const orderResult = await sql`
      INSERT INTO orders (
        shipping_data,
        payment_method,
        total,
        status,
        created_at
      )
      VALUES (
        ${JSON.stringify(shippingData)}::jsonb,
        ${paymentMethod},
        ${total},
        'pending',
        ${created_at}
      )
      RETURNING id;
    `;

    orderId = orderResult[0].id;

    order_number = "ORD-" + orderId.substring(0, 8).toUpperCase();

    // --- 5. Insertar items y descontar stock ---
    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, product_id, quantity, price, order_number)
        VALUES (${orderId}, ${item.productId}, ${item.quantity}, ${item.price}, ${order_number});
      `;

      await sql`
        UPDATE products2
        SET stock = stock - ${item.quantity}
        WHERE id = ${item.productId};
      `;
    }

    // --- 6. CONFIRMAR TRANSACCIÓN ---
    await sql`COMMIT`;

    console.log(`Pedido ${orderId} creado correctamente.`);

  } catch (err) {
    console.error("Error creando pedido:", err);

    // Si todo falla, revertimos todo ✔️
    await sql`ROLLBACK`;

    throw new Error("No se pudo crear la orden. Intente nuevamente.");
  }

  return {
    orderId,
    items,
    total,
    shippingData,
    paymentMethod,
    order_number,
    created_at,
  };
}
