// types/index.ts — Tipos globales del proyecto
// Adapta la interfaz Item a las propiedades de tu dominio asignado

export interface Item {
  id: string;
  name: string;
  description: string;
  // TODO: Agrega propiedades específicas de tu dominio
  // Ejemplos:
  //   Biblioteca:  author: string; isbn: string; available: boolean;
  //   Farmacia:    price: number; stock: number; requiresPrescription: boolean;
  //   Gimnasio:    memberSince: string; plan: 'basic' | 'premium';
  //   Restaurante: category: string; price: number; isAvailable: boolean;
}
