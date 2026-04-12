// ============================================
// UTILS: formatters
// Funciones de formato reutilizables
// ============================================

/**
 * Formatea un número como precio en la moneda local.
 * Adaptar el locale y currency a tu país / dominio.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Trunca un texto a maxLength caracteres añadiendo '…' al final.
 */
export function truncateText(text: string, maxLength: number = 60): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

/**
 * Filtra una lista de items por nombre de forma case-insensitive.
 * Usar dentro de useMemo — es una función pura sin efectos secundarios.
 */
export function filterByName<T extends { name: string }>(
  items: T[],
  query: string
): T[] {
  if (!query.trim()) return items;
  const lower = query.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(lower));
}
