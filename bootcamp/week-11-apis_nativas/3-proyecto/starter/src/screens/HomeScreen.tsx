import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { HomeScreenProps } from '../navigation/types';
import type { Item } from '../types';
import { COLORS, RADII, SPACING } from '../theme';

// ============================================
// SCREEN: HomeScreen
// ============================================
// Lista de ítems del dominio asignado.
// Al presionar un ítem, navega a DetailScreen.
//
// TODO: Adapta los datos de ejemplo a tu dominio.
// Ejemplo: si tu dominio es Biblioteca, cambia los ítems por libros.

// Datos de ejemplo genéricos — adaptar al dominio
const SAMPLE_ITEMS: Item[] = [
  { id: '1', name: 'Ítem de ejemplo 1', description: 'Descripción del ítem 1' },
  { id: '2', name: 'Ítem de ejemplo 2', description: 'Descripción del ítem 2' },
  { id: '3', name: 'Ítem de ejemplo 3', description: 'Descripción del ítem 3' },
];

export function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  const [items] = useState<Item[]>(SAMPLE_ITEMS);

  // ============================================
  // TODO: Usar useLocation para mostrar indicador de cercanía
  // ============================================
  // const { permissionGranted, fetchLocation, location } = useLocation();
  // Mostrar badge "📍 Ubicación activa" cuando permissionGranted === true

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { itemId: item.id })}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        {/* TODO: Agregar icono o imagen representativa del dominio */}
        <View style={styles.iconPlaceholder}>
          <Text style={styles.iconText}>📦</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDesc} numberOfLines={2}>
            {item.description}
          </Text>
          {item.locationLabel && (
            <Text style={styles.locationTag}>📍 {item.locationLabel}</Text>
          )}
          {item.photoUri && (
            <Text style={styles.photoTag}>📷 Con foto</Text>
          )}
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* TODO: Agregar banner de ubicación activa cuando permissionGranted */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.hint}>
            Toca un ítem para ver el detalle, agregar foto y ubicación.
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Sin ítems. Adapta los datos a tu dominio.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  list: { padding: SPACING.lg, gap: SPACING.sm },
  hint: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  empty: {
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.xxl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    padding: SPACING.md,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: RADII.md,
    backgroundColor: COLORS.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 22 },
  cardText: { flex: 1, gap: 2 },
  itemName: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '600' },
  itemDesc: { color: COLORS.textSecondary, fontSize: 12 },
  locationTag: { color: COLORS.accent, fontSize: 11, marginTop: 2 },
  photoTag: { color: COLORS.primary, fontSize: 11 },
  chevron: { color: COLORS.textMuted, fontSize: 22 },
});
