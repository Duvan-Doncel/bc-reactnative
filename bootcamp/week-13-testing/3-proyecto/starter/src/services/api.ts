// ============================================
// SERVICE: api.ts
// Llamadas al servidor — se mockea en tests
// ============================================
import type { Item } from '../types';

const BASE_URL = 'https://api.ejemplo.com';

/**
 * Fetches all items from the remote API.
 * This function is mocked in tests — never calls the real server.
 */
export async function fetchItems(): Promise<Item[]> {
  const res = await fetch(`${BASE_URL}/items`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * Fetches a single item by ID.
 */
export async function fetchItemById(id: string): Promise<Item> {
  const res = await fetch(`${BASE_URL}/items/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
