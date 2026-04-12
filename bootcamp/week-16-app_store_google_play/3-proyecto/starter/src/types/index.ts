// Domain types — adapt these to your assigned domain
// Examples:
//   Biblioteca: Book, Author, Loan
//   Farmacia:   Medicine, Category, Sale
//   Gimnasio:   Member, Routine, Session
//   Restaurante: Dish, Category, Order
//   Hospital:   Patient, Appointment, Doctor

export interface DomainItem {
  id: string;
  name: string;
  description: string;
  // TODO: Add properties specific to your domain
  // Example (Biblioteca):   author: string; isbn: string; available: boolean;
  // Example (Farmacia):     price: number; stock: number; category: string;
  // Example (Gimnasio):     plan: string; memberSince: string; active: boolean;
  // Example (Restaurante):  price: number; isAvailable: boolean; calories?: number;
}

export type DomainItemList = DomainItem[];
