// ============================================
// SCREEN: ItemListScreen.tsx
// Lista de items con búsqueda y fetch — ya implementada
// ============================================
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ItemCard } from '../components/ItemCard';
import { fetchItems } from '../services/api';

interface Item {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export function ItemListScreen(): React.JSX.Element {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems()
      .then((data) => setItems(data))
      .catch(() => setError('Error al cargar elementos'))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = search
    ? items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    : items;

  if (isLoading) {
    return (
      <View style={styles.center} testID="loading-indicator">
        <ActivityIndicator size="large" color="#61DAFB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="item-list-screen">
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            name={item.name}
            price={item.price}
            inStock={item.inStock}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Sin resultados</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  errorText: { color: '#ef4444', fontSize: 14 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 24 },
});
