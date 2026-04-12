// ============================================
// COMPONENT: ItemCard.tsx
// Tarjeta de elemento del dominio
// Adapta los campos mostrados a tu dominio asignado
// ============================================
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onPress?: (item: Item) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress?.(item)}
      testID={`item-card-${item.id}`}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        {/* TODO: Mostrar propiedades adicionales de tu dominio */}
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>${item.price}</Text>
        <Text
          style={[styles.stock, item.inStock ? styles.available : styles.unavailable]}
          testID={`stock-status-${item.id}`}
        >
          {item.inStock ? 'Disponible' : 'Sin stock'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  description: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    color: '#61DAFB',
    fontSize: 14,
    fontWeight: '700',
  },
  stock: {
    fontSize: 11,
    fontWeight: '600',
  },
  available: {
    color: '#22c55e',
  },
  unavailable: {
    color: '#ef4444',
  },
});
