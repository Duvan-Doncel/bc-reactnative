// Domain types — adapt these to your assigned domain
// Examples:
//   Biblioteca: Book, Author, Loan
//   Farmacia:   Medicine, Category, Sale
//   Gimnasio:   Member, Routine, Session
//   Restaurante: Dish, Category, Order

export interface DomainItem {
  id: string;
  name: string;
  description: string;
  // TODO: Add properties specific to your domain
  // Example (Biblioteca):   author: string; isbn: string; year: number;
  // Example (Farmacia):     price: number; stock: number; category: string;
  // Example (Restaurante):  price: number; isAvailable: boolean;
}

export type DomainItemList = DomainItem[];
