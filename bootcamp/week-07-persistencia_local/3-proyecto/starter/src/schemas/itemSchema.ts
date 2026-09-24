// src/schemas/itemSchema.ts
// Schema Zod para validar el formulario de creaciÃ³n/ediciÃ³n.
// TODO: adaptar los campos a tu dominio asignado.

import { z } from 'zod';

export const itemSchema = z.object({
  title: z
    .string({ error: 'El nombre es requerido' })
    .min(1, 'El nombre no puede estar vacÃ­o')
    .max(80, 'MÃ¡ximo 80 caracteres'),
  body: z
    .string()
    .max(500, 'MÃ¡ximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  // TODO: agrega campos de tu dominio
  // Ejemplo (Farmacia): price: z.coerce.number().positive('Precio invÃ¡lido')
  // Ejemplo (Gimnasio): capacity: z.coerce.number().int().min(1)
});

// El tipo se infiere del schema â€” no duplicar con interface manual
export type ItemFormData = z.infer<typeof itemSchema>;

