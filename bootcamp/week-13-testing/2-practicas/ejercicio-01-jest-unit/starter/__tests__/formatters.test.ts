// ============================================
// TEST: formatters.test.ts
// Unit tests para las funciones de formatters.ts
//
// 📋 INSTRUCCIONES:
// Descomenta cada sección de pasos (Paso 1, 2) para completar el ejercicio.
// No modifiques el archivo formatters.ts.
// ============================================
import {
  formatCurrency,
  applyDiscount,
  filterByName,
  calculateTotal,
  truncate,
} from '../src/utils/formatters';

// ============================================
// PASO 1: Matchers básicos — describe + it + expect
// ============================================
console.log('--- Paso 1: Matchers básicos ---');

// Descomenta las siguientes líneas:
// describe('formatCurrency', () => {
//   it('formatea 1500 COP con separador de miles', () => {
//     const result = formatCurrency(1500, 'COP');
//     // En es-CO, 1500 se muestra como $ 1.500
//     expect(result).toContain('1.500');
//   });
//
//   it('formatea 0 correctamente', () => {
//     const result = formatCurrency(0, 'USD');
//     expect(result).toContain('0');
//   });
//
//   it('retorna string (no number)', () => {
//     const result = formatCurrency(100, 'COP');
//     expect(typeof result).toBe('string');
//   });
// });

// ============================================
// PASO 2: Matchers avanzados
// ============================================
console.log('--- Paso 2: Matchers avanzados ---');

// Descomenta las siguientes líneas:
// describe('applyDiscount', () => {
//   it('aplica 10% de descuento sobre 1000', () => {
//     const result = applyDiscount(1000, 10);
//     expect(result).toBe(900);
//   });
//
//   it('retorna el mismo precio con 0% de descuento', () => {
//     expect(applyDiscount(500, 0)).toBe(500);
//   });
//
//   it('lanza error si descuento es mayor a 100', () => {
//     expect(() => applyDiscount(100, 110)).toThrow('discountPercent must be between 0 and 100');
//   });
//
//   it('lanza error si descuento es negativo', () => {
//     expect(() => applyDiscount(100, -5)).toThrow(Error);
//   });
// });
//
// describe('filterByName', () => {
//   const items = [
//     { id: '1', name: 'Laptop' },
//     { id: '2', name: 'Mouse' },
//     { id: '3', name: 'Laptop Stand' },
//   ];
//
//   it('filtra por coincidencia parcial (case-insensitive)', () => {
//     const result = filterByName(items, 'laptop');
//     expect(result).toHaveLength(2);
//     expect(result).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({ name: 'Laptop' }),
//         expect.objectContaining({ name: 'Laptop Stand' }),
//       ]),
//     );
//   });
//
//   it('retorna todos los items con búsqueda vacía', () => {
//     const result = filterByName(items, '');
//     expect(result).toHaveLength(3);
//   });
//
//   it('retorna array vacío si no hay coincidencia', () => {
//     const result = filterByName(items, 'teclado');
//     expect(result).toHaveLength(0);
//   });
// });
//
// describe('calculateTotal', () => {
//   it('suma precio × cantidad correctamente', () => {
//     const cart = [
//       { price: 100, quantity: 2 },
//       { price: 50, quantity: 1 },
//     ];
//     expect(calculateTotal(cart)).toBe(250);
//   });
//
//   it('retorna 0 para carrito vacío', () => {
//     expect(calculateTotal([])).toBe(0);
//   });
// });
//
// describe('truncate', () => {
//   it('trunca texto largo con ...', () => {
//     const result = truncate('React Native es genial', 10);
//     expect(result).toBe('React Nati...');
//     expect(result.length).toBe(13);
//   });
//
//   it('no trunca texto corto', () => {
//     const result = truncate('Hola', 10);
//     expect(result).toBe('Hola');
//   });
//
//   it('no trunca texto con longitud exacta', () => {
//     expect(truncate('1234567890', 10)).toBe('1234567890');
//   });
// });
