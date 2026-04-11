// src/screens/HomeScreen.tsx
// Lista de ítems con soporte offline (caché AsyncStorage) y
// respeto de las preferencias del usuario (orden, modo compacto).
// Esta pantalla está COMPLETAMENTE IMPLEMENTADA — es el punto de partida.

import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { HomeScreenProps } from '../navigation/types';
import { useItems } from '../hooks/useItems';
import { usePreferences } from '../hooks/usePreferences';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';

// ─── Sub-componente: fila de ítem ────────────────────────────────────────────

interface ItemRowProps {
  item: Item;
  compact: boolean;
}

function ItemRow({ item, compact }: ItemRowProps): React.JSX.Element {
  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{String(item.id)}</Text>
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle} numberOfLines={compact ? 1 : 2}>
          {item.title}
        </Text>
        {!compact && (
          <Text style={styles.rowBody} numberOfLines={2}>
            {item.body}
          </Text>
        )}
      </View>
    </View>
  );
}

// ─── Pantalla ────────────────────────────────────────────────────────────────

export function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  const { data, isLoading, isError, refetch, isFetching } = useItems();
  const { sortOrder, compactMode } = usePreferences();

  // Aplicar ordenación de la preferencia MMKV
  const sortedItems = React.useMemo(() => {
    if (!data?.items) return [];
    return [...data.items].sort((a, b) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    );
  }, [data?.items, sortOrder]);

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <ItemRow item={item} compact={compactMode} />
    ),
    [compactMode],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError && !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No hay conexión y no hay caché disponible</Text>
        <Pressable style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Banner offline — visible cuando los datos vienen del cache */}
      {data?.source === 'cache' && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            ⚠️  Sin red — mostrando datos guardados localmente
          </Text>
        </View>
      )}

      <FlatList
        data={sortedItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              {sortedItems.length} ítems · Orden: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
              {compactMode ? ' · Compacto' : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={TYPOGRAPHY.body}>No hay ítems</Text>
          </View>
        }
      />
    </View>
  );
}

// ─── Estilos ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: SPACING.md },
  list: { paddingVertical: SPACING.sm },
  listHeader: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs },
  listHeaderText: { ...TYPOGRAPHY.caption },
  separator: { height: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.md },
  offlineBanner: {
    backgroundColor: '#78350f',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  offlineText: { ...TYPOGRAPHY.caption, color: '#fbbf24' },
  errorText: { ...TYPOGRAPHY.body, textAlign: 'center' },
  retryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryText: { ...TYPOGRAPHY.body, color: '#fff', fontWeight: '700' },
  row: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  rowCompact: { paddingVertical: SPACING.sm },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  rowContent: { flex: 1, gap: 2 },
  rowTitle: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowBody: { ...TYPOGRAPHY.caption },
});
