import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { theme } from '../theme';

// ============================================
// ADAPTA ESTA PANTALLA A TU DOMINIO
// ============================================
// Ejemplos de qué mostrar aquí:
// - Biblioteca: lista de libros disponibles
// - Farmacia: catálogo de medicamentos
// - Gimnasio: clases disponibles de la semana
// - Restaurante: menú del día
// - Hotel: habitaciones disponibles

// TODO: Cambia el tipo Item para que represente entidades de tu dominio
interface Item {
  id: number;
  title: string;
  // Agrega campos relevantes a tu dominio
  // Ejemplo (Biblioteca): author: string; available: boolean
  // Ejemplo (Gymansio): time: string; instructor: string; capacity: number
  [key: string]: unknown;
}

// TODO: Cambia la URL por el endpoint relevante a tu dominio
// dummyjson.com tiene muchos recursos disponibles:
// /products, /recipes, /todos, /posts, /quotes, /users, etc.
const ITEMS_URL = 'https://dummyjson.com/products?limit=20';

export function HomeScreen(): React.JSX.Element {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['home-items'],
    queryFn: async () => {
      const response = await axios.get<{ products: Item[] }>(ITEMS_URL);
      return response.data.products;
    },
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.brand} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No se pudo cargar el contenido</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Saludo personalizado — adapta al dominio */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hola, {user?.firstName ?? user?.username} 👋
        </Text>
        {/* TODO: Cambia el subtítulo según tu dominio */}
        <Text style={styles.subtitle}>Aquí está el contenido de tu dominio</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* TODO: Adapta el renderizado a los campos de tu dominio */}
            <Text style={styles.itemTitle}>{String(item.title)}</Text>
            <Text style={styles.itemSubtitle}>ID: {item.id}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay elementos para mostrar</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  greeting: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  list: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  itemTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  itemSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  emptyText: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.md,
  },
});
