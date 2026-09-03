// src/types/index.ts
// Modelo del dominio "mercado campesino".
// Se mapea desde JSONPlaceholder (/posts) usada como API de práctica.

export interface Item {
  id: string | number;
  name: string;
  description?: string;
}

export type CreateItemPayload = Omit<Item, 'id'>;