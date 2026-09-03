// src/schemas/itemSchema.ts
// Schema Zod para el formulario de ítem.
// TODO: adaptar los campos a tu dominio asignado.

// src/schemas/itemSchema.ts

import { z } from 'zod';

export const itemSchema = z.object({
  title: z
    .string()
    .min(1, 'El nombre del vendedor es requerido')
    .max(80, 'Máx. 80 caracteres'),

  body: z
    .string()
    .max(500, 'Máx. 500 caracteres')
    .optional()
    .or(z.literal('')),
});

export type ItemFormData = z.infer<typeof itemSchema>;