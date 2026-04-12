// ============================================
// UTILS: formatters.ts
// Funciones de utilidad ya implementadas — el estudiante escribe los tests
// ============================================

/**
 * Formats a number as currency string.
 * Uses Intl.NumberFormat — available in React Native 0.70+
 */
export function formatCurrency(amount: number, currency: 'COP' | 'USD' | 'EUR'): string {
  const localeMap: Record<string, string> = {
    COP: 'es-CO',
    USD: 'en-US',
    EUR: 'de-DE',
  };
  return new Intl.NumberFormat(localeMap[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Applies a percentage discount to a price.
 * Returns the discounted price (number).
 */
export function applyDiscount(price: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('discountPercent must be between 0 and 100');
  }
  return price * (1 - discountPercent / 100);
}

/**
 * Filters a list of items by a search term (case-insensitive, by name).
 */
export function filterByName<T extends { name: string }>(
  items: T[],
  search: string,
): T[] {
  const term = search.toLowerCase().trim();
  if (!term) return items;
  return items.filter((item) => item.name.toLowerCase().includes(term));
}

/**
 * Calculates the total price of a cart.
 * Returns 0 for empty arrays.
 */
export function calculateTotal(items: Array<{ price: number; quantity: number }>): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Truncates a string to maxLength, appending '...' if needed.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
