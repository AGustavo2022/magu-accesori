import { z } from "zod";

export const CreateOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().min(1),
    })
  ).min(1),

  paymentMethod: z.string().min(1),

  shippingMethod: z.enum(["delivery", "pickup"]),

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


export const shippingSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio"),

    lastName: z
      .string()
      .trim()
      .min(1, "El apellido es obligatorio"),

    email: z
      .string()
      .trim()
      .email("Email inválido"),

    phone: z
      .string()
      .trim()
      .min(6, "El teléfono es muy corto")
      .regex(/^[0-9+\s()-]+$/, "Teléfono inválido"),

    address: z
      .string()
      .trim()
      .min(5, "La dirección es muy corta"),

    city: z
      .string()
      .trim()
      .min(1, "La ciudad es obligatoria"),

    province: z
      .string()
      .trim()
      .min(1, "La provincia es obligatoria"),

    postal: z
      .string()
      .trim()
      .regex(/^\d{4}$/, "Código postal inválido"),
  })
  .strict()
