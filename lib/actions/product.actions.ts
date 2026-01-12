import { z } from 'zod';
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateProductSchema, UpdateProductSchema } from "../schemas/product.schema";
import { CreateProductState, UpdateProductState, DeleteActionState } from "../types/product.types";


export const sql = neon(`${process.env.DATABASE_URL}`);

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
      errors: {
        _form: ["Error al actualizar el producto"],
      },
      values: rawValues,
    };
  }

  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/${id}/edit`);
  redirect('/dashboard');
}

export async function deleteProduct(
  prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> {

  const id = formData.get('id') as string | null;

  if (!id) {
    return {
      success: false,
      message: null,
      errors: {
        id: ['ID de producto inválido.'],
      },
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
      message: null,
      errors: {
        _form: ['Error al eliminar el producto. Intentá nuevamente.'],
      },
    };
  }

  redirect('/dashboard');
}
