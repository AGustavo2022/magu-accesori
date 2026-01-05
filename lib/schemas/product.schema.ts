
import { z } from 'zod';


export const FormSchema = z.object({
  title: z.string().min(3),
  shortDescription: z.string().min(10),
  longDescription: z.string().min(20),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  image_url: z.string().url(),
  category: z.string().min(1),
  subcategory: z.string().min(1),
  discount: z.coerce.number().min(0).max(100).optional(),
});


export const CreateProductSchema = FormSchema;
export const UpdateProductSchema = FormSchema;

  const UpdateProduct = FormSchema.extend({
    status: z.enum(["true", "false"]),
  });

