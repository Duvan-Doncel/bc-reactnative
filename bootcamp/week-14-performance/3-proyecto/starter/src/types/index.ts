// ============================================
// TYPES: index.ts
// Interfaces del proyecto — adaptar a tu dominio
// ============================================

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  // TODO: Agrega propiedades específicas de tu dominio
  // Ejemplo (Biblioteca): author: string; isbn: string; year: number;
  // Ejemplo (Farmacia): laboratory: string; prescription: boolean;
  // Ejemplo (Restaurante): category: string; preparationTime: number;
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
}
