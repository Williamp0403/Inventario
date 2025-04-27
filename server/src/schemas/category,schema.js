import { z } from "zod";

export const categorySchema = z.object({
  name: z.string()
    .trim()
    .min(3, { message: 'La categoría debe tener al menos 3 caracteres.' })
    .max(30, { message: 'La categoría no puede tener más de 30 caracteres.' })
})