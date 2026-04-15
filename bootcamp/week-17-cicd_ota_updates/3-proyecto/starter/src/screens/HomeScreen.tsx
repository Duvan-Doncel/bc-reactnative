import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';
import type { Item } from '../types';

// TODO: Actualiza este título con el nombre de tu dominio asignado
// Ejemplo: 'Biblioteca Municipal', 'Farmacia Central', 'GymCore'
const SCREEN_TITLE = 'TODO: Nombre de tu Dominio';

// TODO: Actualiza este subtítulo con el contexto de tu dominio
const SCREEN_SUBTITLE = 'Lista de elementos del dominio';

export function HomeScreen(): React.JSX.Element {
  const [items] = useState<Item[]>(MOCK_ITEMS);

  // TODO: Implementa la navegación al detalle del item
  // En producción, aquí irías a la pantalla de detalle:
  // navigation.navigate('Detail', { itemId: item.id })
  function handleItemPress(item: Item): void {
    Alert.alert(
      item.name,
      item.description,
      [{ text: 'Cerrar', style: 'cancel' }]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{SCREEN_TITLE}</Text>
        <Text style={styles.subtitle}>{SCREEN_SUBTITLE}</Text>
      </View>

      <FlatList<Item>
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={handleItemPress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay elementos disponibles</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#475569',
    marginTop: 40,
    fontSize: 16,
  },
});
