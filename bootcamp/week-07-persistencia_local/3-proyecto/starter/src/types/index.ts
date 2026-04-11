// src/types/index.ts
// Tipos globales del proyecto.
// TODO: adaptar 'Item' a los campos de tu dominio asignado.

export interface Item {
  id: number;
  title: string;
  body: string;
  userId: number;
  // TODO: agrega propiedades específicas de tu dominio
  // Ejemplo (Farmacia): price: number; stock: number; category: string;
  // Ejemplo (Biblioteca): author: string; isbn: string; available: boolean;
}

// Tipo para el estado offline de la lista
export interface ItemsWithSource {
  items: Item[];
  source: 'network' | 'cache';
}
