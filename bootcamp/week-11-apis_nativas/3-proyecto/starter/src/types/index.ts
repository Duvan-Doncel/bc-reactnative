// ============================================
// TYPES — Tipos globales del proyecto
// ============================================
// Adapta esta interfaz a tu dominio asignado.
// Ejemplo: Biblioteca → Book, Farmacia → Medicine, Gimnasio → Member

export interface Item {
  id: string;
  name: string;
  description: string;
  // TODO: Agregar propiedades específicas de tu dominio
  // Ejemplo (Biblioteca): author: string; isbn: string; available: boolean;
  // Ejemplo (Farmacia): price: number; stock: number; category: string;
  // Ejemplo (Gimnasio): plan: string; memberSince: string; active: boolean;

  // Campos nativos — semana 11
  photoUri?: string;           // URI de foto capturada/seleccionada
  locationLabel?: string;      // Dirección textual (reverseGeocode)
  latitude?: number;           // Coordenada GPS
  longitude?: number;          // Coordenada GPS
}

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  address: string | null;
}
