// ============================================
// DATA: mockData
// Genera 300 items de prueba para el dominio asignado
// Adaptar ITEM_NAMES y DESCRIPTIONS a tu contexto
// ============================================

import { Item } from '../types';

// TODO: Reemplaza estas listas con nombres reales de tu dominio
const ITEM_NAMES = [
  'Producto A', 'Producto B', 'Producto C', 'Producto D',
  'Producto E', 'Producto F', 'Producto G', 'Producto H',
  'Producto I', 'Producto J', 'Producto K', 'Producto L',
];

// TODO: Adapta las descripciones a tu dominio
const DESCRIPTIONS = [
  'Descripción breve del producto para el dominio.',
  'Artículo destacado con características especiales.',
  'Opción estándar disponible para todos los usuarios.',
  'Edición limitada con características mejoradas.',
];

// TODO: Ajusta el rango de precios a tu dominio
// Medicamentos: 0.5 - 200 | Libros: 5 - 100 | Restaurante: 3 - 50

export function generateItems(count: number = 300): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    name: `${ITEM_NAMES[i % ITEM_NAMES.length]} ${i + 1}`,
    description: DESCRIPTIONS[i % DESCRIPTIONS.length],
    price: Math.round((Math.random() * 490 + 10) * 100) / 100,
    inStock: Math.random() > 0.2,
  }));
}

// Lista global — generada una sola vez fuera del componente
export const ITEMS: Item[] = generateItems(300);

// Altura fija de ItemCard para getItemLayout
export const ITEM_HEIGHT = 88;
