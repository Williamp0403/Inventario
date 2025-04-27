import z from 'zod'

export const createProductSchema = z.object({
  sku: z.string().
    trim().
    length(5, { message: 'El SKU debe tener exactamente 5 caracteres.' }),
  name: z.string()
    .trim()
    .min(2, { message: 'EL nombre debe tener al menos 2 caracteres.' })
    .max(20, { message: 'EL nombre no puede tener más de 20 caracteres.' }),
  description: z.string()
    .trim()
    .min(5, { message: 'La descripcion debe tener al menos 3 caracteres.' }),
  price: z.number({ message: 'EL precio debe ser un valor numérico' })
    .min(0.1, { message: 'EL precio debe ser mayor a 0$' })
    .max(100000000, { message: 'EL precio no puede ser mayor a 100.000.000$' }),
  stock_quantity: z.number({ message: 'La cantidad debe ser un valor numérico' })
    .int({ message: 'La cantidad debe ser un numero entero.' })
    .min(0, { message: 'La cantidad no puede ser menor que 0.' })
    .max(1000000, { message: 'La cantidad no puede ser mayor a 1.000.000' })
})

export const updateProductSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: 'EL nombre debe tener al menos 2 caracteres.' })
    .max(20, { message: 'EL nombre no puede tener más de 20 caracteres.' }),
  description: z.string()
    .trim()
    .min(5, { message: 'La descripcion debe tener al menos 3 caracteres.' }),
  price: z.number({ message: 'EL precio debe ser un valor numérico' })
    .min(0.1, { message: 'EL precio debe ser mayor a 0$' })
    .max(100000000, { message: 'EL precio no puede ser mayor a 100.000.000$' }),
  stock_quantity: z.number({ message: 'La cantidad debe ser un valor numérico' })
    .int({ message: 'La cantidad debe ser un numero entero.' })
    .min(0, { message: 'La cantidad no puede ser menor que 0.' })
    .max(1000000, { message: 'La cantidad no puede ser mayor a 1.000.000' })
})