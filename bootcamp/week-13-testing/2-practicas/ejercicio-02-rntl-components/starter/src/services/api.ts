// ============================================
// SERVICE: api.ts
// Se mockea completamente en los tests
// ============================================

export interface Item {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch('https://api.ejemplo.com/items');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
