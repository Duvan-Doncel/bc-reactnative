// Domain types — adapt to your assigned domain.

// Base item for the domain list.
// Add specific fields for your domain.
// Examples:
//   Biblioteca: author: string; isbn: string; isAvailable: boolean;
//   Farmacia: price: number; stock: number; category: string;
//   Gimnasio: membershipType: string; daysActive: number;
export interface Item {
  id: string;
  name: string;
  description: string;
  // TODO: Add domain-specific fields here
  progress?: number; // 0-1, used for ProgressBar
}

// Response shape from the API
export interface ApiResponse<T> {
  data: T[];
  total: number;
}
