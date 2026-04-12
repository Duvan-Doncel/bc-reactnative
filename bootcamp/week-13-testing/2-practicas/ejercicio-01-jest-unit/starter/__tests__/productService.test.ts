// ============================================
// TEST: productService.test.ts
// Tests asíncronos y mocks para productService
//
// 📋 INSTRUCCIONES:
// Descomenta cada sección (Paso 3, 4) para completar el ejercicio.
// ============================================

// ============================================
// PASO 3: Tests asíncronos con async/await
// ============================================
console.log('--- Paso 3: Tests asíncronos ---');

// Descomenta las siguientes líneas:
// import { isInStock } from '../src/utils/productService';
// import type { Product } from '../src/utils/productService';
//
// describe('isInStock', () => {
//   it('retorna true cuando stock > 0', () => {
//     const product: Product = { id: '1', name: 'Laptop', price: 2500, stock: 5 };
//     expect(isInStock(product)).toBe(true);
//   });
//
//   it('retorna false cuando stock es 0', () => {
//     const product: Product = { id: '2', name: 'Mouse', price: 150, stock: 0 };
//     expect(isInStock(product)).toBe(false);
//   });
// });

// ============================================
// PASO 4: Mock de módulo externo (jest.mock)
// ============================================
console.log('--- Paso 4: jest.mock ---');

// Descomenta las siguientes líneas:
// import { fetchProductsFromServer, fetchProductById } from '../src/utils/productService';
// import { httpClient } from '../src/utils/httpClient';
//
// // Mock del módulo httpClient ANTES de cualquier import que lo use
// jest.mock('../src/utils/httpClient', () => ({
//   httpClient: {
//     get: jest.fn(),
//   },
// }));
//
// describe('fetchProductsFromServer', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//
//   it('retorna lista de productos al resolver', async () => {
//     const mockProducts: Product[] = [
//       { id: '1', name: 'Laptop', price: 2500, stock: 10 },
//       { id: '2', name: 'Mouse', price: 150, stock: 0 },
//     ];
//     (httpClient.get as jest.Mock).mockResolvedValue({ data: mockProducts });
//
//     const result = await fetchProductsFromServer();
//
//     expect(result).toHaveLength(2);
//     expect(result[0].name).toBe('Laptop');
//     expect(httpClient.get).toHaveBeenCalledWith('/products');
//     expect(httpClient.get).toHaveBeenCalledTimes(1);
//   });
//
//   it('lanza error si el httpClient rechaza', async () => {
//     (httpClient.get as jest.Mock).mockRejectedValue(new Error('HTTP 500'));
//     await expect(fetchProductsFromServer()).rejects.toThrow('HTTP 500');
//   });
// });
//
// describe('fetchProductById', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//
//   it('llama al endpoint correcto con el ID', async () => {
//     const mockProduct: Product = { id: 'abc', name: 'Teclado', price: 300, stock: 2 };
//     (httpClient.get as jest.Mock).mockResolvedValue({ data: mockProduct });
//
//     const result = await fetchProductById('abc');
//
//     expect(result.id).toBe('abc');
//     expect(httpClient.get).toHaveBeenCalledWith('/products/abc');
//   });
// });
