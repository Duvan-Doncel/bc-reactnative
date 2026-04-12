// ============================================
// SCREEN: ListScreen
// Lista con 500 items — optimizar paso a paso
// ============================================

import React, { useRef, useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ListItem, { ITEM_HEIGHT } from '../components/ListItem';
import { MOCK_DATA, ListEntry } from '../data/mockData';

export function ListScreen(): React.JSX.Element {
  const listRef = useRef<FlatList<ListEntry>>(null);
  const [renderCount, setRenderCount] = useState(0);

  // ============================================
  // PASO 2: renderItem con useCallback
  // ============================================
  // Sin useCallback: función anónima nueva en cada render → rompe memo de ListItem
  // Con useCallback: referencia estable → memo de ListItem funciona correctamente

  // ❌ Versión sin useCallback (activa por defecto):
  const renderItem: ListRenderItem<ListEntry> = ({ item }) => (
    <ListItem item={item} />
  );

  // Descomenta para el Paso 2 (y comenta la de arriba):
  // const renderItem: ListRenderItem<ListEntry> = useCallback(
  //   ({ item }) => <ListItem item={item} />,
  //   [] // ListItem es estable (definido fuera del componente)
  // );

  const handleScrollToItem400 = useCallback(() => {
    listRef.current?.scrollToIndex({ index: 400, animated: true });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con info y botón de scroll */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de 500 items</Text>
        <Text style={styles.headerSub}>Renders adicionales: {renderCount}</Text>
        <Pressable style={styles.btn} onPress={handleScrollToItem400}>
          <Text style={styles.btnText}>Ir al ítem 400</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => setRenderCount((c) => c + 1)}
        >
          <Text style={styles.btnText}>Re-renderizar padre</Text>
        </Pressable>
      </View>

      {/* ============================================
          PASO 1: keyExtractor con ID único
          ============================================ */}
      {/* ❌ Versión con índice (activa por defecto — problemática): */}
      {/* <FlatList
        data={MOCK_DATA}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
      /> */}

      {/* Descomenta para el Paso 1 (y comenta el bloque de arriba): */}
      {/* <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      /> */}

      {/* ============================================
          PASO 3: getItemLayout
          ============================================ */}
      {/* Descomenta para el Paso 3 (reemplaza el bloque del Paso 1): */}
      {/* <FlatList
        ref={listRef}
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      /> */}

      {/* ============================================
          PASO 4: props de ventana + removeClippedSubviews
          ============================================ */}
      {/* Descomenta para el Paso 4 (reemplaza el bloque del Paso 3): */}
      {/* <FlatList
        ref={listRef}
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={8}
        windowSize={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      /> */}

      {/* Versión base activa (sin optimizaciones) — reemplazar según el paso: */}
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    padding: 16,
    backgroundColor: '#1E293B',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#F1F5F9' },
  headerSub: { fontSize: 12, color: '#94A3B8' },
  btn: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  btnSecondary: { backgroundColor: '#7C3AED' },
  btnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
});
