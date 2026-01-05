
import { z } from 'zod';

export const ProductFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),

  shortDescription: z
    .string()
    .min(10, { message: "La descripción corta debe tener al menos 10 caracteres" }),

  longDescription: z
    .string()
    .min(20, { message: "La descripción larga debe tener al menos 20 caracteres" }),

  price: z
    .coerce
    .number()
    .positive({ message: "El precio debe ser mayor a 0" }),

  stock: z
    .coerce
    .number()
    .int({ message: "El stock debe ser un número entero" })
    .min(0, { message: "El stock no puede ser negativo" }),

  image_url: z
    .string(),
    // .url({ message: "La URL de la imagen no es válida" }),

  category: z
    .string()
    .min(1, { message: "Debés seleccionar una categoría" }),

  subcategory: z
    .string()
    .min(1, { message: "Debés seleccionar una subcategoría" }),

  discount: z
    .coerce
    .number()
    .min(0, { message: "El descuento no puede ser menor a 0" })
    .max(100, { message: "El descuento no puede ser mayor a 100" })
    .optional(),
});


export const CreateProductSchema = ProductFormSchema;

export const UpdateProductSchema = ProductFormSchema.extend({
  status: z.enum(['true', 'false'], {
    message: "El estado del producto es inválido",
  }),
});
