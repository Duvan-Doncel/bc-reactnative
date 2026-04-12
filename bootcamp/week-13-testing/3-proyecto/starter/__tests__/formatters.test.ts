// ============================================
// TEST: formatters.test.ts
// Unit tests para las funciones de utilidad del dominio
//
// 📋 PARA EL APRENDIZ:
// Completa los TODOs con tests reales.
// Adapta los valores de ejemplo a tu dominio asignado.
// Objetivo: ≥ 3 tests en verde.
// ============================================
import { formatPrice, filterItems, calculateInventoryValue, truncateDescription } from '../src/utils/formatters';
import type { Item } from '../src/types';

// Datos de prueba — adapta a tu dominio
// Ejemplo (Farmacia): items con 'stock', 'expiryDate'
// Ejemplo (Biblioteca): items con 'author', 'isbn'
const SAMPLE_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Elemento A',
    description: 'Descripción del elemento A',
    price: 1000,
    inStock: true,
    // TODO: Agregar propiedades de tu dominio aquí
  },
  {
    id: '2',
    name: 'Elemento B',
    description: 'Descripción del elemento B',
    price: 500,
    inStock: false,
    // TODO: Agregar propiedades de tu dominio aquí
  },
  {
    id: '3',
    name: 'Otro Elemento',
    description: 'Descripción del tercer elemento',
    price: 200,
    inStock: true,
    // TODO: Agregar propiedades de tu dominio aquí
  },
];

describe('formatPrice', () => {
  it('debe formatear un precio como moneda', () => {
    // TODO: Reemplaza con valores reales de tu dominio
    // Ejemplo: const result = formatPrice(15000);
    //          expect(result).toContain('15.000');
  });

  it('debe formatear precio cero', () => {
    // TODO: Verificar que un precio de 0 se formatea correctamente
  });

  it('debe retornar un string (no número)', () => {
    // TODO: Verificar el tipo del resultado
  });
});

describe('filterItems', () => {
  it('debe filtrar items por coincidencia parcial del nombre', () => {
    // TODO: Llamar filterItems con SAMPLE_ITEMS y un término de búsqueda
    // Verificar que retorna solo los items que coinciden
  });

  it('debe retornar todos los items con búsqueda vacía', () => {
    // TODO: Llamar filterItems con string vacío
    // Verificar que retorna todos los items
  });

  it('debe ser case-insensitive', () => {
    // TODO: Buscar con mayúsculas y verificar que encuentra items en minúsculas
  });

  it('debe retornar array vacío si no hay coincidencia', () => {
    // TODO: Buscar con un término que no existe
    // Verificar que el resultado es un array vacío
  });
});

describe('calculateInventoryValue', () => {
  it('debe sumar solo el precio de items en stock', () => {
    // TODO: Llamar calculateInventoryValue con SAMPLE_ITEMS
    // De los 3 items, 2 están en stock (precio 1000 + 200 = 1200)
    // Verificar el total correcto
  });

  it('debe retornar 0 para array vacío', () => {
    // TODO: Verificar que calculateInventoryValue([]) retorna 0
  });
});

describe('truncateDescription', () => {
  it('debe truncar texto largo con ...', () => {
    // TODO: Usar un texto largo y un maxLength pequeño
    // Verificar que termina en '...'
  });

  it('debe retornar el texto original si cabe', () => {
    // TODO: Usar un texto corto y maxLength grande
    // Verificar que retorna el texto sin cambios
  });
});
