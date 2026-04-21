'use server'

import { z } from 'zod';
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { CreateProductSchema, UpdateProductSchema } from "../schemas/product.schema";
import { CreateProductState, UpdateProductState, DeleteActionState } from "../types/product.types";
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import cloudinary from '../cloudinary/cloudinary';



export const sql = neon(`${process.env.DATABASE_URL}`);

export async function createProduct(prevState: CreateProductState, formData: FormData): Promise<CreateProductState> {

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "Debes estar autenticado para crear un producto",
      errors: {},
      values: {},
    };
  }

  //Normalización de datos
  const rawValues: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") rawValues[key] = value;
  });

  // Parsear specifications
  let specifications = [];
  try {
    specifications = rawValues.specifications ? JSON.parse(rawValues.specifications) : [];
  } catch {
    specifications = [];
  }

  //NUEVO: Parsear images (MISMO PATRÓN que specifications)
let images: { image_url: string; publicId: string }[] = [];
try {
  images = rawValues.images ? JSON.parse(rawValues.images) : [];
} catch (error) {
  console.error("Error parsing images:", error);
  images = [];
}

console.log(images)

  const normalizedValues = {
    ...rawValues,
    discount: rawValues.discount === '' ? 0 : Number(rawValues.discount),
    specifications,
    images,
  };


  // 2. Validación con Zod
  const validatedFields = CreateProductSchema.safeParse(normalizedValues);

  console.log(normalizedValues)

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
      message: "Error de validación",
      errors,
      values: rawValues,
    };
  }

  try {

    const status = 'true';
    const created_at = new Date().toISOString();

    // Insertar en la DB usando los datos validados y la URL de Cloudinary
    await sql`
      INSERT INTO products (
          title, 
          short_description, 
          long_description, 
          price, 
          stock,
          specifications, 
          image, 
          category, 
          subcategory, 
          status, 
          discount, 
          created_at,
          user_id
      )
      VALUES (
          ${validatedFields.data.title}, 
          ${validatedFields.data.shortDescription}, 
          ${validatedFields.data.longDescription}, 
          ${validatedFields.data.price}, 
          ${validatedFields.data.stock},
          ${JSON.stringify(validatedFields.data.specifications)}, 
          ${JSON.stringify(validatedFields.data.images)},
          ${validatedFields.data.category}, 
          ${validatedFields.data.subcategory}, 
          ${status}, 
          ${validatedFields.data.discount}, 
          ${created_at},
          ${userId}
      )
    `;

  
    // ✅ 4. ACTUALIZAR TAGS EN CLOUDINARY (solo si hay publicId válido)
    let publicIdArray = [validatedFields.data.images[0].publicId]

    if (publicIdArray.length > 0) {
      await Promise.all([
        cloudinary.uploader.add_tag('confirmed', publicIdArray),
        cloudinary.uploader.remove_tag('temporary', publicIdArray)
      ]);
    }

  } catch (error) {
    console.error("Error en el proceso:", error);
    return {
      success: false,
      message: "No se pudo guardar el producto. Por favor, reintentá en unos minutos.",
      errors: {},
      values: rawValues
    };
  }

  // 4. Revalidación y redirección (fuera del try/catch)
  revalidatePath('/dashboard/add');
  redirect('/dashboard');
}

// export async function updateProduct(
//   id: string,
//   prevState: UpdateProductState,
//   formData: FormData
// ): Promise<UpdateProductState> {

//   const rawValues = Object.fromEntries(
//     Array.from(formData.entries()).map(([k, v]) => [k, String(v)])
//   );

//   const validatedFields = UpdateProductSchema.safeParse(rawValues);

//   if (!validatedFields.success) {
//     const tree = z.treeifyError(validatedFields.error);

//     const errors = Object.fromEntries(
//       Object.entries(tree.properties ?? {}).map(([key, value]) => [
//         key,
//         value?.errors ?? [],
//       ])
//     );

//     return {
//       success: false,
//       message: 'Datos inválidos. Revisá el formulario.',
//       errors,
//       values: rawValues,
//     };
//   }

//   const updated_at = new Date().toISOString();

//   try {
//     await sql`
//       UPDATE products
//       SET
//         title = ${validatedFields.data.title},
//         short_description = ${validatedFields.data.shortDescription},
//         long_description = ${validatedFields.data.longDescription},
//         price = ${validatedFields.data.price},
//         stock = ${validatedFields.data.stock},
//         image_url = ${validatedFields.data.image_url},
//         category = ${validatedFields.data.category},
//         subcategory = ${validatedFields.data.subcategory},
//         status = ${validatedFields.data.status},
//         discount = ${validatedFields.data.discount},
//         updated_at = ${updated_at}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     console.error('Error DB update:', error);

//     return {
//       success: false,
//       message: 'Error al actualizar el producto. Intentá nuevamente.',
//       errors: {
//         _form: ["Error al actualizar el producto"],
//       },
//       values: rawValues,
//     };
//   }

//   revalidatePath('/dashboard/products');
//   revalidatePath(`/dashboard//products/${id}/edit`);
//   redirect('/dashboard/products');
// }

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
      UPDATE products
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
