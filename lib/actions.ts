'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import { DeleteProductArgs } from './definitions';


const sqlDb = `${process.env.DATABASE_URL}`

const sql = neon(sqlDb);

const FormSchema = z.object({
    id: z.string(),
    title: z.string(),
    shortDescription: z.string(),
    longDescription: z.string(),
    price: z.coerce.number(),
    stock: z.coerce.number(),
    image_url: z.string(),
    category: z.string(),
    subcategory: z.string(),
    status: z.enum(['pending', 'paid']),
    discount: z.coerce.number(),
    date: z.string(),
});


const CreateProduct = FormSchema.omit({ id: true, date: true });

export async function createProduct(formData: FormData) {
    
    
    const rawFormData = {
        title: formData.get('title'),
        shortDescription: formData.get('shortDescription'),
        longDescription: formData.get('longDescription'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        image_url: formData.get('image_url'),
        category: formData.get('category'),
        subcategory: formData.get('subcategory'),
        //status: formData.get('status'), // Nota: Esto será un string, necesitará conversión a booleano
        discount: formData.get('discount'),
    };
// 1. **Conversión de Tipos y Validación (¡Recomendado!)**
    // Es crucial convertir los valores a los tipos correctos antes de insertarlos.
    // Por ejemplo, `price`, `stock`, `discount` deben ser números, y `status` un booleano (si aplica).
    const priceNew = Number(rawFormData.price) || 0; // Convertir a número, usar 0 si falla
    const stockNew = Number(rawFormData.stock) || 0;
    const discountNew = Number(rawFormData.discount) || 0;
    // Si 'status' es un booleano en la BD:
    const status = 'true'; // Asumiendo que viene de un checkbox

    // 2. **Fecha de Creación**
    // Obtenemos la fecha actual para la columna de fecha de creación.
    const created_at = new Date().toISOString(); // Usar ISO string para TIMESTAMP

    // Para probarlo:
    console.log(rawFormData);

    // 3. **Consulta SQL Modificada**
    // Utilizamos los valores ya formateados y la plantilla de cadena (`sql` tag)
    // para insertar los datos de manera segura, evitando inyección SQL.

    try {
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
                ${rawFormData.title}, 
                ${rawFormData.shortDescription}, 
                ${rawFormData.longDescription}, 
                ${priceNew}, 
                ${stockNew}, 
                ${rawFormData.image_url},                
                ${rawFormData.category}, 
                ${rawFormData.subcategory}, 
                ${status}, 
                ${discountNew}, 
                ${created_at}
            )
        `;
// "Olvida los datos que tienes guardados" (la caché) para una página en particular.
// "Cuando un usuario visite esa ruta la próxima vez, vuelve a buscar los datos" (o en el próximo acceso a datos en el servidor).
        revalidatePath('/dashboard/add');
        console.log('Producto creado exitosamente.');
        
    } catch (error) {
        console.error('Error al crear el producto:', error);
        // Aquí podrías manejar el error, quizás lanzando una nueva excepción.
        throw new Error('Fallo al crear el producto en la base de datos.');
    }
    redirect('/dashboard');
}

export async function updateProduct(id: string, formData: FormData) {
    // 1. **Obtener y Formatear Datos del Formulario**
    // (Igual que en la función de creación)
    const rawFormData = {
        title: formData.get('title'),
        shortDescription: formData.get('shortDescription'),
        longDescription: formData.get('longDescription'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        image_url: formData.get('image_url'),
        category: formData.get('category'),
        subcategory: formData.get('subcategory'),
        status: formData.get('status'), // Nota: Esto será un string
        discount: formData.get('discount'),
    };

    // 2. **Conversión y Validación de Tipos**
    const priceNew = Number(rawFormData.price) || 0;
    const stockNew = Number(rawFormData.stock) || 0;
    const discountNew = Number(rawFormData.discount) || 0;
    // Si 'status' es un booleano en la BD:
    const status = rawFormData.status === 'on' || rawFormData.status === 'true';

    // 3. **Fecha de Actualización (Opcional, pero recomendado)**
    // Agregamos una columna para rastrear cuándo fue la última modificación.
    const updated_at = new Date().toISOString();

    // Para probarlo:
    console.log(`Actualizando producto ID: ${id}`);

    // 4. **Consulta SQL UPDATE**
    // Usamos la sentencia UPDATE y la cláusula WHERE para asegurarnos de que
    // solo se modifique el producto con el ID especificado.

    try {
        await sql`
            UPDATE products2
            SET
                title = ${rawFormData.title},
                short_description = ${rawFormData.shortDescription},
                long_description = ${rawFormData.longDescription},
                price = ${priceNew},
                stock = ${stockNew},
                image_url = ${rawFormData.image_url},
                category = ${rawFormData.category},
                subcategory = ${rawFormData.subcategory},
                status = ${status},
                discount = ${discountNew},
                updated_at = ${updated_at} -- Columna para la última actualización
            WHERE id = ${id}
        `;

        // 5. **Invalidación de Caché y Redirección**
        // Invalida la caché de la página de edición y de la lista principal.
        revalidatePath('/dashboard');
        revalidatePath(`/dashboard/${id}/edit`);

        console.log(`Producto ID ${id} actualizado exitosamente.`);
        
    } catch (error) {
        console.error(`Error al actualizar el producto ID ${id}:`, error);
        throw new Error('Fallo al actualizar el producto en la base de datos.');
    }

    // Redirige a la página principal de productos o al detalle.
    redirect('/dashboard');
}

export async function deleteProduct({ id }: DeleteProductArgs) {

  if (!id || typeof id !== 'number' || id <= 0) {
    console.error('ID de producto inválido para la eliminación:', id);
    throw new Error('Debe proporcionar un ID de producto válido para eliminar.');
  }
  
  try {
    await sql`
      DELETE FROM products2
      WHERE id = ${id};
    `;

    // 3. **Revalidar el Caché**
    // Indicamos a Next.js que olvide los datos cacheados de la ruta donde se listan los productos.
    // Esto asegura que al volver a la página, se carguen los datos actualizados (sin el producto eliminado).
    // Adapta la ruta a donde se lista tu tabla de productos (e.g., '/dashboard/products' o similar).
    revalidatePath('/dashboard'); // <-- ¡Asegúrate de que esta es la ruta correcta!
    
    console.log(`Producto con ID ${id} eliminado exitosamente.`);

    // Opcional: Si quieres redirigir a la lista de productos después de la eliminación exitosa.
    // redirect('/dashboard/products'); 

  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    // Lanzamos un error más amigable para manejarlo en la interfaz de usuario si es necesario.
    throw new Error('Fallo al eliminar el producto de la base de datos.');
  }
}