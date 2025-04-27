import z from 'zod'

export const createProductSchema = (categories) => z.object({
  sku: z.string().
    trim().
    length(5, { message: 'Debe tener exactamente 5 caracteres.' }),
  name: z.string()
    .trim()
    .min(2, { message: 'Debe tener al menos 2 caracteres.' })
    .max(20, { message: 'No puede tener más de 20 caracteres.' }),
  description: z.string()
    .trim()
    .min(5, { message: 'Debe tener al menos 3 caracteres.' }),
  price: z.number({ message: 'Se espera un valor numérico' })
    .min(0.1, { message: 'Debe ser mayor a 0$' })
    .max(100000000, { message: 'No puede ser mayor a 100.000.000$' }),
  stock_quantity: z.number({ message: 'Se espera un valor numérico' })
    .int({ message: 'Debe ser un numero entero.' })
    .min(0, { message: 'No puede ser menor que 0.' })
    .max(1000000, { message: 'No puede ser mayor a 1.000.000' }),
    id_category: z.number({ message: 'Seleccione una categoría' })
    .refine((id) => categories.some((category) => category.id_category === id), {
      message: 'La categoría seleccionada no es válida',
    }),
})

export const updateProductSchema =(categories) => z.object({
  name: z.string()
    .trim()
    .min(2, { message: 'Debe tener al menos 2 caracteres.' })
    .max(20, { message: 'No puede tener más de 20 caracteres.' }),
  description: z.string()
    .trim()
    .min(5, { message: 'Debe tener al menos 3 caracteres.' }),
  price: z.number({ message: 'Se espera un valor numérico' })
    .min(0.1, { message: 'Debe ser mayor a 0$' })
    .max(100000000, { message: 'No puede ser mayor a 100.000.000$' }),
  stock_quantity: z.number({ message: 'Se espera un valor numérico' })
    .int({ message: 'Debe ser un numero entero.' })
    .min(0, { message: 'No puede ser menor que 0.' })
    .max(1000000, { message: 'No puede ser mayor a 1.000.000' }),
    id_category: z.number({ message: 'Seleccione una categoría' })
    .refine((id) => categories.some((category) => category.id_category === id), {
      message: 'La categoría seleccionada no es válida',
    }),
})