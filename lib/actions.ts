'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';

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
        status: formData.get('status'), // Nota: Esto será un string, necesitará conversión a booleano
        discount: formData.get('discount'),
    };
// 1. **Conversión de Tipos y Validación (¡Recomendado!)**
    // Es crucial convertir los valores a los tipos correctos antes de insertarlos.
    // Por ejemplo, `price`, `stock`, `discount` deben ser números, y `status` un booleano (si aplica).

    const priceNew = Number(rawFormData.price) || 0; // Convertir a número, usar 0 si falla
    const stockNew = Number(rawFormData.stock) || 0;
    const discountNew = Number(rawFormData.discount) || 0;
    // Si 'status' es un booleano en la BD:
    const status = rawFormData.status === 'on' || rawFormData.status === 'true'; // Asumiendo que viene de un checkbox

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


//por 6hs
// https://ibb.co/0pg4sB2H
