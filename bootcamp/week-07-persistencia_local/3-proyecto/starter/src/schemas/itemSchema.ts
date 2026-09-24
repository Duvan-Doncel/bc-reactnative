// src/schemas/itemSchema.ts
// Schema Zod del formulario de producto (mercado campesino).

import { z } from 'zod';

export const itemSchema = z.object({
  title: z
    .string({ error: 'El nombre del producto es requerido' })
    .min(1, 'El nombre no puede estar vacío')
    .max(80, 'Máximo 80 caracteres'),
  body: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  price: z
    .string()
    .regex(/^\d*$/, 'Solo números, sin puntos ni comas')
    .optional(),
  category: z.string().max(40, 'Máximo 40 caracteres').optional(),
});

export type ItemFormData = z.infer<typeof itemSchema>;
