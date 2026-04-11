// ejercicio-02-usemutation/starter/App.tsx
// Ejercicio guiado: crear y eliminar posts con useMutation.
// Descomenta cada sección siguiendo los pasos del README.

import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ListRenderItem,
} from 'react-native';

// ============================================================
// PASO 1: Imports y QueryClient
// ============================================================
// Descomenta:
// import {
//   QueryClient,
//   QueryClientProvider,
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from '@tanstack/react-query';
// import axios from 'axios';

// const queryClient = new QueryClient();

// ============================================================
// TIPOS
// ============================================================
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// ============================================================
// PASO 1: queryFn para listar posts
// ============================================================
// Descomenta:
// async function fetchPosts(): Promise<Post[]> {
//   const { data } = await axios.get<Post[]>(
//     'https://jsonplaceholder.typicode.com/posts?_limit=10'
//   );
//   return data;
// }

// ============================================================
// COMPONENTE: PostCard
// ============================================================
interface PostCardProps {
  post: Post;
  onDelete: () => void;
  isDeleting: boolean;
}

function PostCard({ post, onDelete, isDeleting }: PostCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.postId}>#{post.id}</Text>
        {/* PASO 3: Botón de eliminar */}
        <Pressable
          onPress={onDelete}
          // PASO 4: Descomenta para deshabilitar durante la mutación:
          // disabled={isDeleting}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && { opacity: 0.6 },
            // PASO 4: Descomenta: isDeleting && { opacity: 0.4 },
          ]}
        >
          <Text style={styles.deleteButtonText}>
            {/* PASO 4: Descomenta: {isDeleting ? '...' : '✕'} */}
            ✕
          </Text>
        </Pressable>
      </View>
      <Text style={styles.postTitle} numberOfLines={2}>{post.title}</Text>
      <Text style={styles.postBody} numberOfLines={2}>{post.body}</Text>
    </View>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL: PostsScreen
// ============================================================

function PostsScreen(): React.JSX.Element {
  const [newTitle, setNewTitle] = useState('');

  // PASO 1: Reemplaza el placeholder con useQuery
  // ──────────────────────────────────────────────
  const isLoading = false;
  const isFetching = false;
  const isError = false;
  const data: Post[] | undefined = undefined;
  const refetch = (): void => {};

  // Descomenta para PASO 1 (elimina el bloque placeholder de arriba):
  // const { data, isLoading, isFetching, isError, refetch } = useQuery<Post[]>({
  //   queryKey: ['posts'],
  //   queryFn: fetchPosts,
  // });

  // PASO 2: useMutation para crear un post
  // ──────────────────────────────────────
  // const queryClient = useQueryClient();  // ← necesario para invalidateQueries
  //
  // const { mutate: createPost, isPending: isCreating } = useMutation({
  //   mutationFn: async (title: string) => {
  //     const { data: created } = await axios.post<Post>(
  //       'https://jsonplaceholder.typicode.com/posts',
  //       { title, body: 'Contenido de prueba', userId: 1 }
  //     );
  //     return created;
  //   },
  //   onSuccess: () => {
  //     // Invalida el caché → TanStack Query hace refetch automático
  //     queryClient.invalidateQueries({ queryKey: ['posts'] });
  //     setNewTitle('');  // Limpiar el input después del éxito
  //   },
  // });

  // PASO 3: useMutation para eliminar un post
  // ──────────────────────────────────────────
  // const { mutate: deletePost, isPending: isDeleting, variables: deletingId } = useMutation({
  //   mutationFn: async (id: number) => {
  //     await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['posts'] });
  //   },
  // });

  // Placeholders para PASO 2 y 3 (eliminar cuando descomentes):
  const isCreating = false;
  const createPost = (_title: string): void => {};
  const deletePost = (_id: number): void => {};
  const deletingId: number | undefined = undefined;

  // ── Render condicional ────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#61DAFB" />
        <Text style={styles.hint}>Cargando posts...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ Error al cargar posts</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <PostCard
      post={item}
      onDelete={() => deletePost(item.id)}
      isDeleting={deletingId === item.id}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posts — JSONPlaceholder</Text>

      {/* PASO 2: Formulario para crear un post */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título del nuevo post"
          placeholderTextColor="#484f58"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <Pressable
          style={({ pressed }) => [
            styles.createButton,
            pressed && { opacity: 0.8 },
            // PASO 4: Descomenta: isCreating && styles.createButtonDisabled,
          ]}
          onPress={() => {
            if (newTitle.trim()) createPost(newTitle.trim());
          }}
          // PASO 4: Descomenta: disabled={isCreating || !newTitle.trim()}
        >
          <Text style={styles.createButtonText}>
            {/* PASO 4: Descomenta: {isCreating ? 'Creando...' : 'Crear post'} */}
            Crear post
          </Text>
        </Pressable>
      </View>

      {!data ? (
        <View style={styles.centered}>
          <Text style={styles.hint}>Descomenta PASO 1 para ver los posts</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onRefresh={refetch}
          refreshing={isFetching && !isLoading}
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
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <PostsScreen />
  //   </QueryClientProvider>
  // );

  return <PostsScreen />;
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
  form: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#e6edf3',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#61DAFB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#30363d',
  },
  createButtonText: {
    color: '#0d1117',
    fontWeight: '700',
    fontSize: 13,
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
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postId: {
    fontSize: 11,
    color: '#484f58',
    fontWeight: '600',
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e6edf3',
  },
  postBody: {
    fontSize: 13,
    color: '#8b949e',
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#21262d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#f85149',
    fontSize: 12,
    fontWeight: '700',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  hint: {
    fontSize: 13,
    color: '#484f58',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#f85149',
    fontWeight: '600',
  },
});
