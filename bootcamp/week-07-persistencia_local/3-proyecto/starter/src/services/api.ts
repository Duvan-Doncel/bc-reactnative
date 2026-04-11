// src/services/api.ts
import axios from 'axios';
import type { Item } from '../types';

// JSONPlaceholder como backend de práctica
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchItems(): Promise<Item[]> {
  const { data } = await api.get<Item[]>('/posts', { params: { _limit: 15 } });
  return data;
}

export async function fetchItemById(id: number | string): Promise<Item> {
  const { data } = await api.get<Item>(`/posts/${id}`);
  return data;
}

export async function createItem(
  payload: Omit<Item, 'id'>,
): Promise<Item> {
  const { data } = await api.post<Item>('/posts', payload);
  return data;
}

export async function updateItem(
  id: number | string,
  payload: Partial<Omit<Item, 'id'>>,
): Promise<Item> {
  const { data } = await api.put<Item>(`/posts/${id}`, payload);
  return data;
}
