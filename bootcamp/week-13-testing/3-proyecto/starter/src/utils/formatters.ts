// ============================================
// UTILS: formatters.ts
// Funciones de utilidad — adapta a tu dominio
// ============================================
import type { Item } from '../types';

/**
 * Formats a price number as a currency string.
 * Adapt the currency and locale to your domain's context.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Filters items by name (case-insensitive partial match).
 */
export function filterItems(items: Item[], search: string): Item[] {
  const term = search.toLowerCase().trim();
  if (!term) return items;
  return items.filter((item) => item.name.toLowerCase().includes(term));
}

/**
 * Calculates the total value of all in-stock items in a list.
 * TODO: Adapta esta función a una cálculo relevante de tu dominio.
 * Ejemplos:
 * - Farmacia:    calcular valor total del inventario
 * - Biblioteca:  calcular multa acumulada
 * - Restaurante: calcular total de un pedido
 */
export function calculateInventoryValue(items: Item[]): number {
  return items
    .filter((item) => item.inStock)
    .reduce((sum, item) => sum + item.price, 0);
}

/**
 * Truncates a string to a given max length, appending '...' if needed.
 */
export function truncateDescription(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
