// ejercicio-01-usequery-basico/starter/App.tsx
// Ejercicio guiado: consumir una API con useQuery de TanStack Query v5.
// Descomenta cada sección siguiendo los pasos del README.

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';

// ============================================================
// PASO 1: Importar QueryClient y QueryClientProvider
// ============================================================
// Descomenta las siguientes líneas:
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// ============================================================
// PASO 1: Crear el QueryClient (solo una vez, fuera del componente)
// ============================================================
// Descomenta:
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60,  // 1 minuto — los datos son "frescos" por 1 min
//       retry: 1,              // Reintentar 1 vez ante error de red
//     },
//   },
// });

// ============================================================
// TIPOS
// ============================================================
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

// ============================================================
// PASO 2: Función queryFn que llama a la API con Axios
// ============================================================
// Esta función es pura: solo llama a la API y retorna los datos.
// TanStack Query la invoca automáticamente cuando el componente monta.
// Descomenta:
// async function fetchUsers(): Promise<User[]> {
//   const response = await axios.get<User[]>(
//     'https://jsonplaceholder.typicode.com/users'
//   );
//   return response.data;
// }

// ============================================================
// SUB-COMPONENTE: UserCard
// ============================================================
interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.detail}>✉ {user.email}</Text>
      <Text style={styles.detail}>📞 {user.phone}</Text>
      <Text style={styles.detail}>🌐 {user.website}</Text>
    </View>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL: UserListScreen
// ============================================================

function UserListScreen(): React.JSX.Element {
  // PASO 3: Reemplaza este bloque con useQuery
  // ──────────────────────────────────────────
  // Estado placeholder mientras no está useQuery:
  const isLoading = false;
  const isError = false;
  const isFetching = false;
  const data: User[] | undefined = undefined;
  const refetch = (): void => {};

  // Descomenta para PASO 3 (elimina el bloque placeholder de arriba):
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   isFetching,
  //   refetch,
  // } = useQuery<User[]>({
  //   queryKey: ['users'],      // Identificador único en el caché
  //   queryFn: fetchUsers,      // La función que acabas de escribir
  // });

  // ── Render condicional por estado ──────────────────────────
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#61DAFB" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ No se pudo cargar la lista</Text>
        <Text style={styles.hint}>Verifica tu conexión a internet</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<User> = ({ item }) => (
    <UserCard user={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Usuarios (JSONPlaceholder)</Text>

      {/* Sin datos todavía (antes de PASO 3) */}
      {!data && (
        <View style={styles.centered}>
          <Text style={styles.hint}>
            Descomenta PASO 1, 2 y 3 para ver los datos aquí
          </Text>
        </View>
      )}

      {/* PASO 4: Pull-to-refresh — agrega onRefresh y refreshing */}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          // Descomenta para PASO 4:
          // onRefresh={refetch}
          // refreshing={isFetching && !isLoading}
          ListEmptyComponent={
            <Text style={styles.hint}>No hay usuarios</Text>
          }
        />
      )}
    </View>
  );
}

// ============================================================
// ROOT: App
// ============================================================

export default function App(): React.JSX.Element {
  // PASO 1: Envuelve con QueryClientProvider
  // ──────────────────────────────────────────
  // Sin QueryClientProvider useQuery lanzará un error.
  // Reemplaza el return con:
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <UserListScreen />
  //   </QueryClientProvider>
  // );

  return <UserListScreen />;
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    paddingTop: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6edf3',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  separator: { height: 10 },
  card: {
    backgroundColor: '#161b22',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#30363d',
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e6edf3',
  },
  detail: {
    fontSize: 13,
    color: '#8b949e',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loadingText: { fontSize: 14, color: '#8b949e' },
  errorText: { fontSize: 16, color: '#f85149', fontWeight: '600' },
  hint: { fontSize: 13, color: '#484f58', textAlign: 'center', paddingHorizontal: 32 },
});
