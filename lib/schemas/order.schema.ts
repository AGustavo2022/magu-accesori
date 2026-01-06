import { z } from "zod";

export const CreateOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().min(1),
    })
  ).min(1),

  paymentMethod: z.string().min(1),

  shipping: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(6),
    address: z.string().min(5),
    city: z.string(),
    province: z.string(),
    postal: z.string().min(4),
  }),
});
