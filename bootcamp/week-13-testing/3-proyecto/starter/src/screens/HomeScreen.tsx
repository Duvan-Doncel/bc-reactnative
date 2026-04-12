// ============================================
// SCREEN: HomeScreen.tsx
// Lista principal del dominio con búsqueda y fetch
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
import { filterItems } from '../utils/formatters';
import type { Item } from '../types';

export function HomeScreen(): React.JSX.Element {
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

  const filtered = filterItems(items, search);

  if (isLoading) {
    return (
      <View style={styles.center} testID="loading-indicator">
        <ActivityIndicator size="large" color="#61DAFB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center} testID="error-view">
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="home-screen">
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
        testID="search-input"
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        testID="items-list"
        ListEmptyComponent={
          <Text style={styles.emptyText} testID="empty-message">
            Sin resultados
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  errorText: { color: '#ef4444', fontSize: 14, textAlign: 'center' },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 24 },
});
