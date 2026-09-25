// Domain types — Mercado Campesino.
// Cada Item representa un producto publicado en el puesto del vendedor.

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string; // Verduras, Frutas, Lácteos, Tubérculos...
  price: number; // precio en COP
  progress?: number; // 0-1, % de stock disponible — usado en ProgressBar
}

// Response shape from the API
export interface ApiResponse<T> {
  data: T[];
  total: number;
}
