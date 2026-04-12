// ============================================
// SCREEN: HomeScreen
// Pantalla principal con búsqueda y lista de items del dominio
// ============================================
// OPTIMIZACIONES A IMPLEMENTAR (TODOs):
// 1. useCallback para handleSearch y handleItemPress
// 2. useMemo para la lista filtrada
// 3. useCallback para renderItem
// 4. getItemLayout + windowSize + removeClippedSubviews en FlatList
// ============================================

import React, { useState, useCallback, useMemo } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import { ITEMS, ITEM_HEIGHT } from '../data/mockData';
import { filterByName } from '../utils/formatters';
import { Item } from '../types';

export function HomeScreen(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  // ============================================
  // TODO 1: Memoizar handleSearch con useCallback
  // ============================================
  // Sin useCallback, cada render de HomeScreen crea una nueva referencia de handleSearch,
  // lo que rompe React.memo de SearchBar aunque el valor no haya cambiado.
  //
  // Implementa handleSearch usando useCallback con dependencias vacías [].
  // Recuerda: setSearchQuery es estable (no necesita ir en las dependencias).
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // ============================================
  // TODO 2: Memoizar handleItemPress con useCallback
  // ============================================
  // Mismo problema: nueva referencia en cada render → rompe memo de ItemCard.
  //
  // Implementa handleItemPress usando useCallback con dependencias vacías [].
  const handleItemPress = (item: Item) => {
    Alert.alert(item.name, `Precio: ${item.price}\nEstado: ${item.inStock ? 'Disponible' : 'Agotado'}`);
  };

  // ============================================
  // TODO 3: Memoizar la lista filtrada con useMemo
  // ============================================
  // Sin useMemo, filterByName() se ejecuta en CADA render de HomeScreen
  // (incluso renders que no tienen nada que ver con searchQuery o ITEMS).
  //
  // Implementa filteredItems usando useMemo.
  // Dependencias: [searchQuery] — ITEMS es constante fuera del componente.
  const filteredItems = filterByName(ITEMS, searchQuery);

  // ============================================
  // TODO 4: Memoizar renderItem con useCallback
  // ============================================
  // renderItem es una función nueva en cada render → rompe memo de ItemCard
  // aunque los datos no cambien.
  //
  // Implementa renderItem usando useCallback.
  // Dependencias: [handleItemPress]
  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ItemCard item={item} onPress={handleItemPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {/* TODO: Cambia el título a tu dominio asignado */}
          Mi Dominio — Catálogo
        </Text>
        <Text style={styles.subtitle}>
          {filteredItems.length} de {ITEMS.length} items
        </Text>
      </View>

      {/* Búsqueda */}
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Buscar por nombre…"
      />

      {/* Lista */}
      {/* ============================================
          TODO 5: Optimizar FlatList
          ============================================
          Agrega las siguientes props para mejorar el rendimiento:
          - getItemLayout: calcula offsets sin medir (usa ITEM_HEIGHT de mockData)
          - windowSize={5}: reduce la ventana de items activos
          - maxToRenderPerBatch={10}: items por lote de renderizado
          - removeClippedSubviews={true}: desmonta nodos fuera de pantalla
          - initialNumToRender={8}: items en el primer paint
      */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>No se encontraron resultados</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#1E293B',
  },
  title: { fontSize: 22, fontWeight: '800', color: '#F9FAFB' },
  subtitle: { fontSize: 13, color: '#94A3B8', marginTop: 4 },
  listContent: { flexGrow: 1 },
  empty: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 15,
    color: '#64748B',
  },
});
