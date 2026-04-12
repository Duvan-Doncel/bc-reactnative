// ============================================
// SCREEN: HomeScreen
// Lista de items del dominio con badge de notificación programada
// ============================================
// NOTA PARA EL APRENDIZ:
// Adapta esta pantalla a tu dominio asignado.
// Ejemplos:
// - Biblioteca: lista de libros con fecha de devolución
// - Farmacia: lista de medicamentos con próxima dosis
// - Restaurante: lista de pedidos con estado

import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, SPACING, RADII } from '../theme';
import { RootStackParamList } from '../types/navigation';
import { Item } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Sample data — adaptar al dominio
const SAMPLE_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Item 1 — adaptar al dominio',
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Item 2 — adaptar al dominio',
    scheduledAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Item 3 — sin recordatorio',
  },
];

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const [items] = useState<Item[]>(SAMPLE_ITEMS);

  // TODO: Adaptar los datos al dominio asignado
  // Ejemplo (Biblioteca):
  // const [books] = useState<Item[]>([
  //   { id: '1', name: 'El Principito', scheduledAt: '2026-04-20T10:00:00Z' },
  //   { id: '2', name: 'Don Quijote', scheduledAt: '2026-04-22T10:00:00Z' },
  // ]);

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { itemId: item.id })}
      >
        <View style={styles.cardBody}>
          <Text style={styles.itemName}>{item.name}</Text>
          {item.scheduledAt && (
            <Text style={styles.itemDate}>
              📅 {new Date(item.scheduledAt).toLocaleDateString('es')}
            </Text>
          )}
        </View>
        {item.notificationId && (
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>🔔</Text>
          </View>
        )}
      </Pressable>
    ),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {/* TODO: Cambiar título al dominio asignado */}
          Mi Dominio
        </Text>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay items — adapta los datos de muestra a tu dominio
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  settingsIcon: {
    fontSize: 22,
  },
  list: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBody: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  notifBadge: {
    backgroundColor: COLORS.warning,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    fontSize: 14,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyText: {
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.xl,
    fontSize: 13,
  },
});
