
import { z } from 'zod';

const SpecificationSchema = z.object({
  label: z.string().transform(v => v.trim()),
  value: z.string().transform(v => v.trim()),
})

export const ProductImageSchema = z.object({
  image_url: z.string().url("URL de imagen inválida"),
  publicId: z.string().min(1, "El publicId es requerido"),
});

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

  specifications: z
    .array(SpecificationSchema)
    .optional()
    .default([])
    .refine(
      specs => {
        const labels = specs.map(s =>
          s.label.toLowerCase().trim()
        );
        return new Set(labels).size === labels.length;
      },
      { message: "No se permiten especificaciones duplicadas" }
    ),

  price: z
    .coerce
    .number()
    .positive({ message: "El precio debe ser mayor a 0" }),

  stock: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number({
      error: "El stock es obligatorio" // En algunas versiones es 'error' o simplemente el objeto de mensaje
    })
      .int({ message: "El stock debe ser un número entero" })
      .min(0, { message: "El stock no puede ser negativo" })
  ),

  discount: z.preprocess(
    (val) => (val === "" || val === null ? 0 : val), // Si está vacío, lo tratamos como 0
    z.coerce
      .number()
      .min(0, { message: "El descuento no puede ser menor a 0" })
      .max(100, { message: "El descuento no puede ser mayor a 100" })
      .default(0)
  ),

  images: z.array(ProductImageSchema)
    .min(1, "Al menos una imagen es requerida")
    .max(5, "Máximo 5 imágenes permitidas"),

  category: z
    .string()
    .min(1, { message: "Debés seleccionar una categoría" }),

  subcategory: z
    .string()
    .min(1, { message: "Debés seleccionar una subcategoría" }),

});


export const CreateProductSchema = ProductFormSchema;

export const UpdateProductSchema = ProductFormSchema.extend({
  status: z.enum(['true', 'false'], {
    message: "El estado del producto es inválido",
  }),
});
