// src/types/index.ts
// Tipos globales del proyecto (dominio: mercado campesino).

export interface Item {
  id: number;
  title: string;      // nombre del producto
  body: string;       // descripción
  userId: number;
  price?: number;     // precio en COP
  category?: string;  // frutas, verduras, lácteos...
}

// Tipo para el estado offline de la lista
export interface ItemsWithSource {
  items: Item[];
  source: 'network' | 'cache';
}
