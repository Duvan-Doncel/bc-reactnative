// ============================================
// TYPES: index.ts
// Tipos del dominio — adapta Item a tu dominio asignado
// ============================================

/**
 * Tipo base del elemento del dominio.
 *
 * Ejemplos de adaptación:
 * - Biblioteca:  { author: string; isbn: string; available: boolean }
 * - Farmacia:    { activeIngredient: string; stock: number; expiryDate: string }
 * - Gimnasio:    { membershipType: 'basic' | 'premium'; expiresAt: string }
 * - Restaurante: { category: string; isVegetarian: boolean; preparationTime: number }
 */
export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  // TODO: Agregar propiedades específicas de tu dominio
  // Ejemplo (Biblioteca):   author: string;
  // Ejemplo (Farmacia):     stock: number; expiryDate: string;
}

/**
 * Tipo de respuesta paginada del API.
 */
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}
