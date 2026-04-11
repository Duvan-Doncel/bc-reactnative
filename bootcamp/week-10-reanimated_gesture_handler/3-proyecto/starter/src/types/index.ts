// ============================================
// TYPES — Tipos globales del proyecto
// ============================================
// Adapta esta interfaz a las propiedades de tu dominio.
// El campo `description` y `badge` son opcionales; añade
// los campos que sean relevantes para tu contexto.

/**
 * Elemento genérico del dominio asignado.
 *
 * Ejemplos de adaptación:
 * - Biblioteca  → Book (title, author, isbn, available: boolean)
 * - Farmacia    → Medication (name, price, stock, category)
 * - Gimnasio    → Member (fullName, plan, joinDate, active: boolean)
 * - Restaurante → Dish (name, price, category, available: boolean)
 */
export interface DomainItem {
  id: string;
  name: string;
  description?: string;
  // TODO: Agrega las propiedades específicas de tu dominio
  badge?: string;
  isActive?: boolean;
}

/**
 * Respuesta paginada de la API.
 * Reutilizable en cualquier entidad del dominio.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
