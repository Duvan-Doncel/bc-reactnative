// src/hooks/useItems.ts
// TanStack Query hooks con caché AsyncStorage para soporte offline.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createItem, fetchItemById, fetchItems, updateItem } from '../services/api';
import type { Item, ItemsWithSource } from '../types';

// ─── Query keys ───────────────────────────────────────────────────────────────
const ITEMS_QUERY_KEY = ['items'] as const;

// ─── AsyncStorage key para caché offline ─────────────────────────────────────
const CACHE_KEY = '@items_cache';

// ─── useItems — lista con caché offline ───────────────────────────────────────
export function useItems() {
  return useQuery<ItemsWithSource>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async (): Promise<ItemsWithSource> => {
      try {
        const data = await fetchItems();
        // Hay red: guardamos la lista en caché
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        return { items: data, source: 'network' };
      } catch (error) {
        // Sin red: intentamos leer la caché
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return { items: JSON.parse(cached) as Item[], source: 'cache' };
        }
        // Sin red y sin caché: dejamos que TanStack Query maneje el error
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useItemById ───────────────────────────────────────────────────────────────
export function useItemById(id: number | string | undefined) {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: () => fetchItemById(id!),
    enabled: id !== undefined,
  });
}

// ─── useCreateItem ─────────────────────────────────────────────────────────────
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Item, 'id'>) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

// ─── useUpdateItem ─────────────────────────────────────────────────────────────
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number | string } & Partial<Omit<Item, 'id'>>) =>
      updateItem(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ITEMS_QUERY_KEY, variables.id] });
    },
  });
}
