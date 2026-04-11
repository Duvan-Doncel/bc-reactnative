// src/hooks/usePreferences.ts
// Hook de preferencias del usuario almacenadas con MMKV.
// TODO: implementar los hooks reactivos de MMKV.

// TODO: importar los hooks de MMKV
// import { useMMKVString, useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';
// import { storage } from '../storage/mmkv';

// ─── Claves de preferencias (evitar strings sueltos) ─────────────────────────
const PREF_KEYS = {
  SORT_ORDER:   'pref_sortOrder',
  COMPACT_MODE: 'pref_compactMode',
  ITEMS_PER_PAGE: 'pref_itemsPerPage',
  // TODO: agrega claves específicas de tu dominio
  // Ejemplo (Farmacia): SHOW_OUT_OF_STOCK: 'pref_showOutOfStock',
} as const;

// ─── Tipo de los valores de sortOrder ─────────────────────────────────────────
export type SortOrder = 'asc' | 'desc';

// ─── Hook principal ────────────────────────────────────────────────────────────
export function usePreferences() {
  // TODO: reemplazar los useState por hooks de MMKV
  // ─────────────────────────────────────────────
  // const [sortOrder, setSortOrder]       = useMMKVString(PREF_KEYS.SORT_ORDER, storage);
  // const [compactMode, setCompactMode]   = useMMKVBoolean(PREF_KEYS.COMPACT_MODE, storage);
  // const [itemsPerPage, setItemsPerPage] = useMMKVNumber(PREF_KEYS.ITEMS_PER_PAGE, storage);

  // Placeholder — reemplazar al implementar
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sortOrder = 'asc';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setSortOrder = (_value: string | undefined) => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const compactMode = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setCompactMode = (_value: boolean | undefined) => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const itemsPerPage = 10;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setItemsPerPage = (_value: number | undefined) => {};

  // TODO: agrega preferencias adicionales de tu dominio aquí

  return {
    // Valores con defaults para evitar undefined
    sortOrder: (sortOrder ?? 'asc') as SortOrder,
    setSortOrder: (value: SortOrder) => setSortOrder(value),

    compactMode: compactMode ?? false,
    setCompactMode,

    itemsPerPage: itemsPerPage ?? 10,
    setItemsPerPage: (value: number) => setItemsPerPage(value),
  };
}
