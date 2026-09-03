// src/data/mockData.ts
// Datos de ejemplo genéricos para el proyecto.
// El estudiante debe reemplazar estos datos con los de su dominio asignado.

// src/data/mockData.ts

import type { Item } from '../types';

export const ITEMS: Item[] = [
  { id: '1', name: 'Finca La Esperanza', description: 'Hortalizas y verduras frescas cultivadas sin químicos.', productCategory: 'Verduras', location: 'Fusagasugá, Cundinamarca', isActive: true },
  { id: '2', name: 'Frutas Doña Marta', description: 'Frutas de temporada recogidas directamente del árbol.', productCategory: 'Frutas', location: 'La Mesa, Cundinamarca', isActive: true },
  { id: '3', name: 'Lácteos El Establo', description: 'Queso campesino, cuajada y yogurt artesanal.', productCategory: 'Lácteos', location: 'Ubaté, Cundinamarca', isActive: true },
  { id: '4', name: 'Granos San Isidro', description: 'Fríjol, maíz y arveja cosechados a mano.', productCategory: 'Granos', location: 'Chocontá, Cundinamarca', isActive: false },
  { id: '5', name: 'Miel Dorada', description: 'Miel de abejas 100% pura, sin procesar.', productCategory: 'Miel y derivados', location: 'Villa de Leyva, Boyacá', isActive: true },
  { id: '6', name: 'Cafetal Los Andes', description: 'Café de altura tostado artesanalmente.', productCategory: 'Café', location: 'Fredonia, Antioquia', isActive: true },
  { id: '7', name: 'Huevos Campo Real', description: 'Huevos de gallinas criadas en libertad.', productCategory: 'Huevos', location: 'Sopó, Cundinamarca', isActive: true },
  { id: '8', name: 'Panadería La Espiga', description: 'Pan y arepas horneados con harinas propias.', productCategory: 'Panadería', location: 'Guasca, Cundinamarca', isActive: false },
];