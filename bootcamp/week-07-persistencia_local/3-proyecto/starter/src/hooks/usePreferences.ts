// src/hooks/usePreferences.ts
// Preferencias del usuario persistidas con MMKV (síncrono, reactivo).
// Toda la lógica de storage queda encapsulada aquí, las pantallas solo consumen el hook.

import { useMMKVBoolean, useMMKVNumber, useMMKVString } from 'react-native-mmkv';
import { storage } from '../storage/mmkv';

// Claves centralizadas para evitar strings sueltos
const PREF_KEYS = {
  SORT_ORDER: 'pref_sortOrder',
  COMPACT_MODE: 'pref_compactMode',
  ITEMS_PER_PAGE: 'pref_itemsPerPage',
} as const;

export type SortOrder = 'asc' | 'desc';

export function usePreferences() {
  const [sortOrder, setSortOrder] = useMMKVString(PREF_KEYS.SORT_ORDER, storage);
  const [compactMode, setCompactMode] = useMMKVBoolean(PREF_KEYS.COMPACT_MODE, storage);
  const [itemsPerPage, setItemsPerPage] = useMMKVNumber(PREF_KEYS.ITEMS_PER_PAGE, storage);

  return {
    // Si no hay valor guardado (o es inválido), cae al default
    sortOrder: (sortOrder === 'desc' ? 'desc' : 'asc') as SortOrder,
    setSortOrder: (value: SortOrder) => setSortOrder(value),

    compactMode: compactMode ?? false,
    setCompactMode: (value: boolean) => setCompactMode(value),

    itemsPerPage: itemsPerPage ?? 10,
    setItemsPerPage: (value: number) => setItemsPerPage(value),
  };
}
