// ============================================
// TYPES — Navigation
// ============================================
// Re-exported separately to avoid circular imports with types/index.ts

export type RootStackParamList = {
  Home: undefined;
  Detail: { itemId: string };
  Settings: undefined;
};
