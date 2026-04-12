// ============================================
// TYPES — Semana 12: Push Notifications
// ============================================
// NOTA PARA EL APRENDIZ:
// Adapta la interfaz Item a tu dominio asignado.
// Ejemplos:
// - Biblioteca: title, author, dueDate (fecha devolución)
// - Farmacia: name, dosage, nextDoseAt (fecha próxima dosis)
// - Gimnasio: className, instructor, scheduledAt (fecha clase)
// - Restaurante: orderNumber, status, estimatedReadyAt

export interface Item {
  id: string;
  name: string;
  // Fecha/hora del evento relevante del dominio (para recordatorio)
  scheduledAt?: string; // ISO string — ej. "2026-04-15T09:00:00Z"
  // ID de la notificación local programada (para poder cancelarla)
  notificationId?: string;
  // TODO: Agregar propiedades específicas de tu dominio
  // Ejemplo (Biblioteca): author: string; isbn: string; dueDate: string;
  // Ejemplo (Farmacia): medication: string; dosage: string; frequency: string;
}

export interface NotificationPayload {
  screen: keyof import('./navigation').RootStackParamList;
  itemId: string;
}
