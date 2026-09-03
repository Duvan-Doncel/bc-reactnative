// src/hooks/useItems.ts
// Custom hooks que encapsulan la lógica de fetching del dominio.
// Los componentes consumen estos hooks, no llaman a apiClient directamente.

// src/hooks/useItems.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateItemPayload, Item } from '../types';

export const ITEMS_QUERY_KEY = ['items'] as const;

// JSONPlaceholder devuelve { id, title, body, userId }
// Lo mapeamos a nuestro modelo del dominio: { id, name, description }
interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function mapPostToItem(post: PostResponse): Item {
  return {
    id: post.id,
    name: post.title,
    description: post.body,
  };
}

export function useItems() {
  return useQuery<Item[]>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<PostResponse[]>('/posts?_limit=15');
      return data.map(mapPostToItem);
    },
  });
}

export function useItemById(id: string | number) {
  return useQuery<Item>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<PostResponse>(`/posts/${id}`);
      return mapPostToItem(data);
    },
    enabled: !!id,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, CreateItemPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<PostResponse>('/posts', {
        title: payload.name,
        body: payload.description ?? '',
        userId: 1,
      });
      return mapPostToItem(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Failed to create item:', error.message);
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}