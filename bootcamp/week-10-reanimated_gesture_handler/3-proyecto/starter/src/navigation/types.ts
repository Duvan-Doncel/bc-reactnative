// ============================================
// NAVIGATION TYPES
// ============================================
// Define los parámetros de cada pantalla en el stack.
// El tipo RootStackParamList es la fuente de verdad para la navegación tipada.
// Adapta los nombres y params a las pantallas de tu dominio.

export type RootStackParamList = {
  Home: undefined;
  // TODO: Agrega los parámetros de la pantalla de detalle para tu dominio.
  // Ejemplo (Biblioteca):
  // Detail: { bookId: string; title: string };
  // Ejemplo (Farmacia):
  // Detail: { medicamentId: string; name: string };
  Detail: { itemId: string; itemName: string };
};
