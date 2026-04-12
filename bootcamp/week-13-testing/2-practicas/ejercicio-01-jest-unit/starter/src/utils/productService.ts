// ============================================
// UTILS: productService.ts
// Servicio async — el estudiante escribe los tests con mocks
// ============================================
import { httpClient } from './httpClient';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

/**
 * Fetches all products from the remote API.
 * Depends on httpClient (will be mocked in tests).
 */
export async function fetchProductsFromServer(): Promise<Product[]> {
  const response = await httpClient.get<Product[]>('/products');
  return response.data;
}

/**
 * Fetches a single product by ID.
 * Throws if not found (404).
 */
export async function fetchProductById(id: string): Promise<Product> {
  const response = await httpClient.get<Product>(`/products/${id}`);
  return response.data;
}

/**
 * Checks whether a product is in stock.
 */
export function isInStock(product: Product): boolean {
  return product.stock > 0;
}
