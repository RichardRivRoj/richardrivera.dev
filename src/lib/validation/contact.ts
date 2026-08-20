import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre es demasiado largo."),

  email: z
    .string()
    .trim()
    .email("El correo electrónico no es válido.")
    .max(254, "El correo electrónico es demasiado largo."),

  subject: z
    .string()
    .trim()
    .min(3, "El asunto debe tener al menos 3 caracteres.")
    .max(150, "El asunto es demasiado largo."),

  message: z
    .string()
    .trim()
    .min(10, "El mensaje es demasiado corto.")
    .max(5000, "El mensaje es demasiado largo."),

  // Honeypot
  website: z.string().optional(),

  formStartedAt: z.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
